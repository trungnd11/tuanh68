# Backend Architecture & Database — Tu Anh 68

> Status: Implementation Plan  
> Last updated: 2026-07-09

---

## 1. Tổng quan

Đây là tài liệu thiết kế kiến trúc backend và database cho website **Tu Anh 68** — công ty sản xuất ván ép phủ phim. Backend phục vụ 2 nhóm:

| Nhóm           | Mục đích                                  | Auth      |
| -------------- | ----------------------------------------- | --------- |
| **Public API** | Frontend website đọc dữ liệu, submit form | Không cần |
| **Admin API**  | Quản trị nội dung (CRUD) qua admin panel  | JWT       |

---

## 2. Technology Stack

| Thành phần        | Lựa chọn                                             | Lý do                                          |
| ----------------- | ---------------------------------------------------- | ---------------------------------------------- |
| **Runtime**       | Node.js 22 (LTS)                                     | Đồng bộ với Docker image                       |
| **Framework**     | NestJS 10                                            | Module-based, decorators, DI                   |
| **Database**      | PostgreSQL 16                                        | JSONB cho spec linh hoạt, FTS cho search       |
| **ORM**           | Prisma 6.x                                           | DX tốt nhất, auto migration, type-safe         |
| **Auth**          | JWT + Passport (`@nestjs/jwt`, `@nestjs/passport`)   | Stateless, dễ scale                            |
| **Validation**    | `class-validator` + Zod (shared package)             | class-validator cho DTO, Zod cho shared schema |
| **File Storage**  | Cloudflare R2 (S3-compatible)                        | Rẻ (free 10GB), CDN tích hợp                   |
| **Upload**        | `multer` + `@aws-sdk/client-s3`                      | Express native, S3 multipart upload            |
| **API Docs**      | `@nestjs/swagger`                                    | Auto-generate OpenAPI spec                     |
| **Search**        | PostgreSQL Full-Text Search (`pg_trgm` + `unaccent`) | Không cần Elasticsearch                        |
| **Rate Limiting** | `@nestjs/throttler`                                  | Chống spam form                                |
| **Caching**       | `@nestjs/cache-manager` + Redis (optional)           | Cache public GET endpoints                     |
| **Email**         | Resend                                               | Gửi thông báo lead mới                         |
| **Health Check**  | `@nestjs/terminus`                                   | Kubernetes/Docker health probes                |

---

## 3. Monorepo Package Structure

```
tuanh68/
├── apps/
│   ├── api/                        # NestJS backend (hiện có skeleton)
│   │   └── src/
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       ├── common/             # Guards, decorators, filters, interceptors
│   │       │   ├── decorators/     # @Public(), @CurrentUser()
│   │       │   ├── filters/        # HttpExceptionFilter, PrismaExceptionFilter
│   │       │   ├── guards/         # JwtAuthGuard, RolesGuard
│   │       │   ├── interceptors/   # TransformInterceptor, LoggingInterceptor
│   │       │   └── pipes/          # ZodValidationPipe
│   │       ├── config/             # App config, Prisma config, R2 config
│   │       ├── modules/
│   │       │   ├── auth/           # Login, JWT, refresh, roles
│   │       │   ├── users/          # CRUD admin accounts
│   │       │   ├── products/       # Products + Categories
│   │       │   ├── projects/       # Portfolio projects
│   │       │   ├── news/           # Articles + Categories
│   │       │   ├── leads/          # Form submissions
│   │       │   ├── partners/       # Partner logos
│   │       │   ├── faqs/           # FAQ management
│   │       │   ├── search/         # Global search
│   │       │   ├── media/          # File upload to R2
│   │       │   ├── site-config/    # Key-value settings
│   │       │   └── sections/       # Dynamic page sections
│   │       └── prisma/
│   │           └── schema.prisma   # Database schema
│   └── web/                        # Next.js frontend (existing)
├── packages/
│   ├── database/                   # Shared Prisma client + types (NEW)
│   ├── schemas/                    # Zod schemas (existing, extends)
│   ├── types/                      # Shared TS types (existing, extends)
│   ├── utils/                      # Shared utilities (existing)
│   ├── tsconfig/                   # TS configs (existing)
│   └── eslint-config/              # ESLint configs (existing)
└── docs/
    └── BACKEND_ARCHITECTURE.md     # This file
```

---

## 4. Database Schema

### 4.1 Entity Relationship Diagram

```
users ─────────────┬─────────────────────── leads
                   │
news_articles ─────┤
                   │
media ─────────────┘

product_categories ──────── products

news_categories ─────────── news_articles

partners   (standalone)
faqs       (standalone)
site_config (standalone)
sections   (standalone)
projects   (standalone)
users      (standalone — self-referencing for assigned leads)
```

### 4.2 Prisma Schema

```prisma
// ─── GENERATOR & DATASOURCE ────────────────────────────────────────────────

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ─────────────────────────────────────────────────────────────────

enum UserRole {
  super_admin
  admin
  editor
}

enum ContentStatus {
  draft
  published
  archived
}

enum LeadSource {
  quote_form
  consultation_form
  contact_page
}

enum LeadStatus {
  new
  contacted
  qualified
  lost
}

// ─── USERS ─────────────────────────────────────────────────────────────────

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  fullName      String    @map("full_name")
  role          UserRole  @default(admin)
  isActive      Boolean   @default(true) @map("is_active")
  lastLoginAt   DateTime? @map("last_login_at")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  assignedLeads Lead[]
  uploadedMedia Media[]
  newsArticles  NewsArticle[]

  @@map("users")
}

// ─── PRODUCT CATEGORIES ────────────────────────────────────────────────────

model ProductCategory {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  description String?
  imageUrl    String?  @map("image_url")
  sortOrder   Int      @default(0) @map("sort_order")
  isActive    Boolean  @default(true) @map("is_active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  products Product[]

  @@map("product_categories")
}

// ─── PRODUCTS ──────────────────────────────────────────────────────────────

model Product {
  id              String        @id @default(uuid())
  categoryId      String?       @map("category_id")
  name            String
  slug            String        @unique
  thumbnailUrl    String?       @map("thumbnail_url")
  description     String?       // Markdown
  content         String?       // Markdown — long-form detail
  images          Json          @default("[]")       // [{ url: string, alt: string }]
  technicalSpecs  Json          @default("[]")       // [{ param: string, icon: string, values: object }]
  applications    Json          @default("[]")       // [{ title: string, desc: string, icon: string }]
  status          ContentStatus @default(draft)
  isFeatured      Boolean       @default(false) @map("is_featured")
  metaTitle       String?       @map("meta_title")
  metaDescription String?       @map("meta_description")
  sortOrder       Int           @default(0) @map("sort_order")
  createdAt       DateTime      @default(now()) @map("created_at")
  updatedAt       DateTime      @updatedAt @map("updated_at")

  category ProductCategory? @relation(fields: [categoryId], references: [id])

  @@index([status])
  @@index([categoryId])
  @@index([isFeatured])
  @@map("products")
}

// ─── PROJECTS ──────────────────────────────────────────────────────────────

model Project {
  id             String        @id @default(uuid())
  name           String
  slug           String        @unique
  thumbnailUrl   String?       @map("thumbnail_url")
  images         Json          @default("[]")       // [{ url: string, alt: string }]
  description    String?       // Markdown
  content        String?       // Markdown
  category       String                              // "Công nghiệp" | "Dân dụng" | "Hạ tầng giao thông"
  location       String?
  client         String?                             // SC5, IDJ, Vinaconex...
  area           String?                             // "45,000 m²"
  materialsUsed  String?       @map("materials_used") // "Ván phủ phim 18mm – 12,000 tấm"
  status         ContentStatus @default(draft)
  isFeatured     Boolean       @default(false) @map("is_featured")
  completionDate DateTime?     @map("completion_date")
  sortOrder      Int           @default(0) @map("sort_order")
  createdAt      DateTime      @default(now()) @map("created_at")
  updatedAt      DateTime      @updatedAt @map("updated_at")

  @@index([status])
  @@index([category])
  @@index([isFeatured])
  @@map("projects")
}

// ─── NEWS CATEGORIES ───────────────────────────────────────────────────────

model NewsCategory {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  color     String?  // "#48a6a7", "#2973b2", "#7a9c59"
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  articles NewsArticle[]

  @@map("news_categories")
}

// ─── NEWS ARTICLES ─────────────────────────────────────────────────────────

model NewsArticle {
  id              String        @id @default(uuid())
  title           String
  slug            String        @unique
  excerpt         String?
  content         String?       // Markdown
  thumbnailUrl    String?       @map("thumbnail_url")
  categoryId      String?       @map("category_id")
  authorId        String?       @map("author_id")
  tags            Json          @default("[]")       // ["thị trường", "ván ép"]
  views           Int           @default(0)
  status          ContentStatus @default(draft)
  isFeatured      Boolean       @default(false) @map("is_featured")
  publishedAt     DateTime?     @map("published_at")
  metaTitle       String?       @map("meta_title")
  metaDescription String?       @map("meta_description")
  createdAt       DateTime      @default(now()) @map("created_at")
  updatedAt       DateTime      @updatedAt @map("updated_at")

  category NewsCategory? @relation(fields: [categoryId], references: [id])
  author   User?         @relation(fields: [authorId], references: [id])

  @@index([status])
  @@index([categoryId])
  @@index([isFeatured])
  @@index([publishedAt])
  @@map("news_articles")
}

// ─── LEADS ─────────────────────────────────────────────────────────────────

model Lead {
  id         String     @id @default(uuid())
  fullName   String     @map("full_name")
  phone      String
  email      String?
  company    String?
  subject    String?    // Sản phẩm/chủ đề quan tâm
  quantity   String?    // Số lượng dự kiến
  message    String?
  source     LeadSource
  status     LeadStatus @default(new)
  notes      String?    // Ghi chú nội bộ (admin)
  assignedTo String?    @map("assigned_to")
  createdAt  DateTime   @default(now()) @map("created_at")
  updatedAt  DateTime   @updatedAt @map("updated_at")

  assignee User? @relation(fields: [assignedTo], references: [id])

  @@index([status])
  @@index([source])
  @@index([createdAt])
  @@map("leads")
}

// ─── PARTNERS ──────────────────────────────────────────────────────────────

model Partner {
  id        String   @id @default(uuid())
  name      String
  logoUrl   String   @map("logo_url")
  website   String?
  sortOrder Int      @default(0) @map("sort_order")
  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("partners")
}

// ─── FAQS ──────────────────────────────────────────────────────────────────

model Faq {
  id        String   @id @default(uuid())
  question  String
  answer    String
  category  String   @default("general")  // "product" | "order" | "delivery" | "general"
  sortOrder Int      @default(0) @map("sort_order")
  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("faqs")
}

// ─── MEDIA ─────────────────────────────────────────────────────────────────

model Media {
  id           String   @id @default(uuid())
  filename     String
  originalName String   @map("original_name")
  url          String
  mimeType     String   @map("mime_type")
  sizeBytes    BigInt   @map("size_bytes")
  width        Int?
  height       Int?
  altText      String?  @map("alt_text")
  folder       String   @default("/")
  uploadedBy   String?  @map("uploaded_by")
  createdAt    DateTime @default(now()) @map("created_at")

  uploader User? @relation(fields: [uploadedBy], references: [id])

  @@map("media")
}

// ─── SITE CONFIG ───────────────────────────────────────────────────────────

model SiteConfig {
  id          String   @id @default(uuid())
  key         String   @unique
  value       Json
  description String?
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("site_config")
}

// ─── SECTIONS ──────────────────────────────────────────────────────────────

model Section {
  id         String   @id @default(uuid())
  page       String   // "home" | "about" | "products" | "projects" | "news" | "contact"
  identifier String   // "hero" | "heritage" | "infrastructure" | "quality" | "team" | ...
  title      String?
  subtitle   String?
  content    Json     @default("{}")
  imageUrl   String?  @map("image_url")
  sortOrder  Int      @default(0) @map("sort_order")
  isActive   Boolean  @default(true) @map("is_active")
  updatedAt  DateTime @updatedAt @map("updated_at")

  @@unique([page, identifier])
  @@map("sections")
}
```

---

## 5. Full-Text Search Implementation

### 5.1 Why PostgreSQL FTS (not Elasticsearch)

| Criteria           | Elasticsearch              | PostgreSQL FTS             |
| ------------------ | -------------------------- | -------------------------- |
| Data scale         | >100k docs                 | <10k docs (this project)   |
| Infrastructure     | Separate server, 2-4GB RAM | Built-in, zero ops         |
| Latency            | 50-200ms                   | <10ms                      |
| Vietnamese support | Via plugin                 | Via `unaccent` + `pg_trgm` |
| DevOps complexity  | High                       | None                       |

**Decision:** Use PostgreSQL with `pg_trgm` extension for fuzzy matching.

### 5.2 Migration SQL

```sql
-- Create extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Products search index
CREATE INDEX idx_products_trgm ON products
  USING GIN (unaccent(name || ' ' || COALESCE(description, '')) gin_trgm_ops);

-- Projects search index
CREATE INDEX idx_projects_trgm ON projects
  USING GIN (unaccent(name || ' ' || COALESCE(description, '') || ' ' || COALESCE(client, '') || ' ' || COALESCE(location, '')) gin_trgm_ops);

-- News search index
CREATE INDEX idx_news_trgm ON news_articles
  USING GIN (unaccent(title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(content, '')) gin_trgm_ops);
```

### 5.3 Search Service Logic (`apps/api/src/modules/search/search.service.ts`)

```typescript
@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async globalSearch(query: string, limit = 20) {
    const results: SearchResult[] = [];

    // Products
    const products = await this.prisma.$queryRaw<SearchRow[]>`
      SELECT id, name, 'product' AS type, slug,
             similarity(unaccent(name), unaccent(${query})) AS rank
      FROM products
      WHERE status = 'published'
        AND (unaccent(name) % unaccent(${query})
          OR unaccent(description) % unaccent(${query}))
      ORDER BY rank DESC
      LIMIT ${limit}
    `;
    results.push(...products.map((p) => ({ ...p, url: `/van-phu-phim/${p.slug}` })));

    // Projects
    const projects = await this.prisma.$queryRaw<SearchRow[]>`
      SELECT id, name, 'project' AS type, slug,
             similarity(unaccent(name), unaccent(${query})) AS rank
      FROM projects
      WHERE status = 'published'
        AND (unaccent(name) % unaccent(${query})
          OR unaccent(client) % unaccent(${query})
          OR unaccent(location) % unaccent(${query}))
      ORDER BY rank DESC
      LIMIT ${limit}
    `;
    results.push(...projects.map((p) => ({ ...p, url: `/du-an/${p.slug}` })));

    // News
    const articles = await this.prisma.$queryRaw<SearchRow[]>`
      SELECT id, title AS name, 'news' AS type, slug,
             similarity(unaccent(title), unaccent(${query})) AS rank
      FROM news_articles
      WHERE status = 'published'
        AND (unaccent(title) % unaccent(${query})
          OR unaccent(excerpt) % unaccent(${query}))
      ORDER BY rank DESC
      LIMIT ${limit}
    `;
    results.push(...articles.map((p) => ({ ...p, url: `/tin-tuc/${p.slug}` })));

    // Sort all results by rank, then truncate
    return results.sort((a, b) => b.rank - a.rank).slice(0, limit);
  }
}
```

### 5.4 Search API Endpoint

```
GET /api/search?q=ván+ép+phủ+phim&type=all    → all results
GET /api/search?q=SC5&type=project             → only projects
GET /api/search?q=bảo+dưỡng&type=news          → only news
```

---

## 6. API Endpoint Design

### 6.1 Public API (no auth)

```
GET  /api/health                              → Health check

# Products
GET  /api/products?category={slug}&page={n}&limit={n}&featured={true|false}
GET  /api/product-categories
GET  /api/products/:slug

# Projects
GET  /api/projects?category={string}&page={n}&limit={n}
GET  /api/projects/:slug

# News
GET  /api/news?category={slug}&page={n}&limit={n}&featured={true|false}
GET  /api/news-categories
GET  /api/news/:slug

# Partners
GET  /api/partners

# FAQs
GET  /api/faqs?category={string}

# Site Config
GET  /api/site-config/:key

# Sections
GET  /api/sections/:page

# Search
GET  /api/search?q={query}&type={all|product|project|news}

# Leads (form submissions)
POST /api/leads
POST /api/leads/quote                        → Alias for consultation form
```

### 6.2 Admin API (JWT required)

```
# Auth
POST   /api/admin/auth/login                  → { email, password } → { accessToken, refreshToken }
POST   /api/admin/auth/refresh                → { refreshToken } → { accessToken }
GET    /api/admin/auth/me                     → Current user info
PATCH  /api/admin/auth/change-password

# Users
GET    /api/admin/users?page={n}&limit={n}
POST   /api/admin/users
GET    /api/admin/users/:id
PATCH  /api/admin/users/:id
DELETE /api/admin/users/:id

# Products
GET    /api/admin/products?status={string}&category={slug}&page={n}
POST   /api/admin/products
GET    /api/admin/products/:id
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
PATCH  /api/admin/products/:id/status

# Product Categories
GET    /api/admin/product-categories
POST   /api/admin/product-categories
PATCH  /api/admin/product-categories/:id
DELETE /api/admin/product-categories/:id
PATCH  /api/admin/product-categories/reorder  → { ids: string[] }

# Projects
GET    /api/admin/projects?status={string}&page={n}
POST   /api/admin/projects
GET    /api/admin/projects/:id
PATCH  /api/admin/projects/:id
DELETE /api/admin/projects/:id
PATCH  /api/admin/projects/:id/status

# News Articles
GET    /api/admin/news?status={string}&category={slug}&page={n}
POST   /api/admin/news
GET    /api/admin/news/:id
PATCH  /api/admin/news/:id
DELETE /api/admin/news/:id
PATCH  /api/admin/news/:id/status

# News Categories
GET    /api/admin/news-categories
POST   /api/admin/news-categories
PATCH  /api/admin/news-categories/:id
DELETE /api/admin/news-categories/:id

# Partners
GET    /api/admin/partners
POST   /api/admin/partners
PATCH  /api/admin/partners/:id
DELETE /api/admin/partners/:id
PATCH  /api/admin/partners/reorder

# FAQs
GET    /api/admin/faqs?category={string}
POST   /api/admin/faqs
PATCH  /api/admin/faqs/:id
DELETE /api/admin/faqs/:id
PATCH  /api/admin/faqs/reorder

# Leads
GET    /api/admin/leads?status={string}&source={string}&page={n}&limit={n}
GET    /api/admin/leads/:id
PATCH  /api/admin/leads/:id/status            → { status: LeadStatus }
POST   /api/admin/leads/:id/notes             → { notes: string }
PATCH  /api/admin/leads/:id/assign            → { userId: string }
DELETE /api/admin/leads/:id

# Media
POST   /api/admin/media/upload                → multipart/form-data
POST   /api/admin/media/upload-multiple       → multipart/form-data (max 10 files)
GET    /api/admin/media?folder={string}&page={n}
DELETE /api/admin/media/:id

# Site Config
GET    /api/admin/site-config
PATCH  /api/admin/site-config/:key            → { value: any }

# Sections
GET    /api/admin/sections?page={string}
POST   /api/admin/sections
PATCH  /api/admin/sections/:id
DELETE /api/admin/sections/:id
PATCH  /api/admin/sections/reorder            → { ids: string[] }
```

---

## 7. Standard API Response Format

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {                           // Pagination (only for list endpoints)
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",       // Machine-readable
    "message": "Họ tên là bắt buộc",  // Human-readable (Vietnamese)
    "details": [...]                  // Optional field-level errors
  }
}
```

---

## 8. Authentication Flow

```
┌──────────┐                    ┌──────────────┐
│  Admin   │                    │  NestJS API   │
│  Panel   │                    │               │
└────┬─────┘                    └──────┬────────┘
     │  POST /api/admin/auth/login      │
     │  { email, password }             │
     │ ─────────────────────────────────>│
     │                                  │ Validate bcrypt
     │  { accessToken, refreshToken }   │ Generate JWT (15min + 7d)
     │ <─────────────────────────────────│
     │                                  │
     │  GET /api/admin/products         │
     │  Authorization: Bearer <token>   │
     │ ─────────────────────────────────>│
     │                                  │ Verify JWT + check role
     │  { success: true, data: [...] }  │
     │ <─────────────────────────────────│
```

- **Access Token**: 15 phút, chứa `{ sub: userId, role: UserRole }`
- **Refresh Token**: 7 ngày, stored in DB, dùng để cấp access token mới
- **Role-based access**:
  - `super_admin`: Full access + manage other admins
  - `admin`: CRUD all content + manage leads
  - `editor`: CRUD content only (products, projects, news)

---

## 9. Request DTOs (Data Transfer Objects)

### 9.1 Lead Submission

**Shared schema (single source of truth)** — `packages/schemas/src/index.ts`:

```typescript
import { z } from "zod";

export const leadSourceValues = ["quote_form", "consultation_form", "contact_page"] as const;

export const createLeadSchema = z.object({
  fullName: z.string().trim().min(1, "Họ tên là bắt buộc"),
  phone: z.string().trim().min(8, "Số điện thoại không hợp lệ"),
  email: z.string().trim().email().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  subject: z.string().trim().optional().or(z.literal("")),
  quantity: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.enum(leadSourceValues),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
```

**Backend DTO** — uses `LeadSource` enum from `@tuanh68/types`:

```typescript
import { IsString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { LeadSource } from "@tuanh68/types";

export class CreateLeadDto {
  @ApiProperty({ example: "Nguyễn Văn A" })
  @IsString()
  fullName: string;

  @ApiProperty({ example: "0983570760" })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: "admin@vanphuphim.vn.com" })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: "Công ty ABC" })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({ example: "van-ep-phu-phim" })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional({ example: "500 tấm" })
  @IsOptional()
  @IsString()
  quantity?: string;

  @ApiPropertyOptional({ example: "Cần báo giá ván phủ phim 18mm giao Hà Nội" })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ enum: LeadSource })
  @IsEnum(LeadSource)
  source: LeadSource;
}
```

> **Contract rule:** Shared schema (`@tuanh68/schemas`) validates **only lead data**. Transport concerns like reCAPTCHA tokens, CSRF tokens, or auth headers are extracted and verified **separately** — they are not part of the lead schema. In NestJS, Guards run **before** Pipes, so reCAPTCHA verification via a Guard is verified prior to Zod schema validation.

**Controller approach** — use `RecaptchaGuard` (runs before `@Body` pipe):

```typescript
// apps/api/src/modules/leads/recaptcha.guard.ts
@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly recaptchaService: RecaptchaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-recaptcha-token'];

    if (!token) throw new BadRequestException('reCAPTCHA token is required');

    const valid = await this.recaptchaService.verify(token);
    if (!valid) throw new BadRequestException('reCAPTCHA verification failed');

    return true;
  }
}

// apps/api/src/modules/leads/leads.controller.ts
@Public()
@UseGuards(RecaptchaGuard)
@Post()
async create(
  @Body(new ZodValidationPipe(createLeadSchema)) body: CreateLeadInput,
) {
  // body already validated. reCAPTCHA already passed in Guard.
  return this.leadsService.create(body);
}
```

**NestJS execution order (Guards before Pipes):**

| Step | Component           | What happens                                                         |
| ---- | ------------------- | -------------------------------------------------------------------- |
| 1    | `RecaptchaGuard`    | Extract `X-Recaptcha-Token` header, verify with Google `/siteverify` |
| 2    | `ZodValidationPipe` | Validate body against shared `createLeadSchema`                      |
| 3    | Controller method   | Insert lead into DB, send notification                               |

This ensures:

- `createLeadSchema` stays pure — only lead data fields (fullName, phone, email, company, subject, quantity, message, source)
- `recaptchaToken` is a transport concern verified via Guard, not leaked into schema

### 9.2 Pagination DTO

```typescript
// apps/api/src/common/dto/pagination.dto.ts
import { Type } from "class-transformer";
import { IsOptional, IsInt, Min, Max } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;
}
```

---

## 10. Media Upload Flow (Cloudflare R2)

```typescript
// apps/api/src/modules/media/media.service.ts
@Injectable()
export class MediaService {
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor(private readonly config: AppConfigService) {
    this.s3 = new S3Client({
      region: "auto",
      endpoint: config.r2Endpoint, // https://<account>.r2.cloudflarestorage.com
      credentials: {
        accessKeyId: config.r2AccessKey,
        secretAccessKey: config.r2SecretKey,
      },
    });
    this.bucket = config.r2Bucket;
  }

  async upload(file: Express.Multer.File, folder: string, userId?: string): Promise<Media> {
    const key = `${folder}/${Date.now()}-${randomBytes(8).toString("hex")}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    const url = `${this.config.r2PublicUrl}/${key}`;

    return this.prisma.media.create({
      data: {
        filename: key.split("/").pop()!,
        originalName: file.originalname,
        url,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        folder,
        uploadedBy: userId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const media = await this.prisma.media.findUniqueOrThrow({ where: { id } });
    const key = new URL(media.url).pathname.slice(1);

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );

    await this.prisma.media.delete({ where: { id } });
  }
}
```

**R2 Bucket Structure:**

```
vanphuphim/
├── products/       # Ảnh sản phẩm
├── projects/       # Ảnh dự án
├── news/           # Ảnh bài viết
├── partners/       # Logo đối tác
├── banners/        # Ảnh hero/banner
├── about/          # Ảnh về công ty
└── misc/           # Khác
```

---

## 11. Environment Variables

```bash
# apps/api/.env
# ─── App ───
NODE_ENV=development
PORT=4000
API_PREFIX=api
CORS_ORIGINS=http://localhost:3000

# ─── Database ───
DATABASE_URL=postgresql://user:password@localhost:5432/vanphuphim

# ─── JWT ───
JWT_ACCESS_SECRET=your-access-secret-min-32-chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
JWT_REFRESH_EXPIRES_IN=7d

# ─── Cloudflare R2 ───
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET_NAME=vanphuphim
R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://cdn.vanphuphim.vn

# ─── Email (Resend) ───
RESEND_API_KEY=re_xxx
ADMIN_NOTIFICATION_EMAIL=admin@vanphuphim.vn.com

# ─── Throttle ───
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

---

## 12. Lead Processing Flow

```
User submits form (website)
        │
        ▼
POST /api/leads
  Headers: X-Recaptcha-Token
  Body: { fullName, phone, email?, company?, subject?, quantity?, message?, source }
        ├── 1. RecaptchaGuard: extract X-Recaptcha-Token, verify with Google /siteverify
        ├── 2. ZodValidationPipe: validate body against shared createLeadSchema
        ├── 3. Insert into `leads` table (status: "new")
        ├── 4. Send email notification to admin (Resend)
        └── 5. Return 201 { success: true, data: { id } }

Admin panel:
        │
        ▼
  List leads (filter by status/source/date)
        │
        ├── View detail
        ├── Change status: new → contacted → qualified → lost
        ├── Add internal notes
        └── Assign to team member
```

### 12.1 ReCAPTCHA Server-Side Verification

> **Important:** The existing `apps/web/src/shared/utils/recaptcha.ts` runs only in browser — it calls `grecaptcha.execute()` to generate a token. Backend must implement its own verifier that posts that token to Google's `/siteverify` endpoint with the **secret** key. The two utilities serve different roles and cannot be shared directly.

```typescript
// apps/api/src/modules/leads/recaptcha.service.ts (NEW — backend-specific)
@Injectable()
export class RecaptchaService {
  constructor(private readonly config: AppConfigService) {}

  async verify(token: string, expectedAction?: string): Promise<boolean> {
    const params = new URLSearchParams({
      secret: this.config.recaptchaSecretKey,
      response: token,
    });

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: params,
    });

    const data = await res.json();
    if (!data.success) return false;
    if (expectedAction && data.action !== expectedAction) return false;
    if ((data.score ?? 1) < 0.5) return false; // v3 threshold

    return true;
  }
}
```

Frontend flow:

1. Browser: `executeRecaptcha(action)` from `shared/utils/recaptcha.ts` → returns token
2. Browser: Include token in `X-Recaptcha-Token` HTTP header (not body)
3. Backend: Extract header `@Headers('x-recaptcha-token')` → `RecaptchaService.verify(token)` → calls Google `/siteverify`

---

## 13. Caching Strategy

```typescript
// apps/api/src/common/interceptors/cache.interceptor.ts

// Cache duration per endpoint type
const TTL = {
  products: 300, // 5 min — product details change rarely
  projects: 600, // 10 min
  news: 120, // 2 min — news may update more frequently
  partners: 1800, // 30 min
  faqs: 3600, // 1 hour
  siteConfig: 600, // 10 min
  sections: 600, // 10 min
  categories: 1800, // 30 min
};
```

Cache invalidation triggers:

- On any content update (PUT/PATCH/DELETE), invalidate related cache keys
- Use `Cache-Control: public, max-age=...` header for CDN/browser caching

---

## 14. Error Handling

```typescript
// apps/api/src/common/filters/http-exception.filter.ts

// Standard error codes
const ErrorCodes = {
  VALIDATION_ERROR: { status: 400, message: "Dữ liệu không hợp lệ" },
  UNAUTHORIZED: { status: 401, message: "Vui lòng đăng nhập" },
  FORBIDDEN: { status: 403, message: "Không có quyền truy cập" },
  NOT_FOUND: { status: 404, message: "Không tìm thấy" },
  CONFLICT: { status: 409, message: "Dữ liệu đã tồn tại" },
  RATE_LIMITED: { status: 429, message: "Quá nhiều yêu cầu" },
  INTERNAL_ERROR: { status: 500, message: "Lỗi hệ thống" },
};
```

---

## 15. Frontend Integration — Search Modal

### 15.1 Component Architecture

```
AppHeader
  └── [Search Button] ──onClick──> SearchModal (Radix Dialog)
                                     ├── Search Input (auto-focus, debounce 300ms)
                                     ├── Group: Sản phẩm
                                     │   ├── Result item
                                     │   └── ...
                                     ├── Group: Dự án
                                     │   └── ...
                                     ├── Group: Tin tức
                                     │   └── ...
                                     └── Empty state: "Không tìm thấy kết quả"
```

### 15.2 Key behaviors

```typescript
// apps/web/src/shared/ui/app-search-modal/index.tsx (to be created)
// - Open with Cmd/Ctrl+K keyboard shortcut
// - Close on Escape, click outside, or route change
// - Debounce search input 300ms before calling API
// - Show loading skeleton while fetching
// - Navigate to result page on click
// - Mobile: full-screen overlay
```

### 15.3 API Client Hook

```typescript
// Use @tanstack/react-query for the search call
function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => axios.get("/api/search", { params: { q: query } }),
    enabled: query.length >= 2, // Min 2 characters
    staleTime: 60_000, // Cache for 1 minute
  });
}
```

---

## 16. Implementation Order (Incremental)

> **Principle:** Build only what's needed, when it's needed. The current frontend is a static site with hardcoded content in `content.ts` files and form submissions that call mock callbacks. Start with the minimum viable backend (leads only), then expand based on actual requirements.

### Phase A — MVP: Leads only (start here)

| Step | Task                                                                  | Effort | Why                                            |
| ---- | --------------------------------------------------------------------- | ------ | ---------------------------------------------- |
| A1   | Standardize shared lead schema (`@tuanh68/schemas`)                   | 0.5h   | Single source of truth before any backend code |
| A2   | `packages/database` — Prisma schema (leads table only) + migration    | 1h     | Only table we actually need right now          |
| A3   | NestJS base — Config, PrismaModule, Swagger, global pipes             | 2h     | Foundation for all future modules              |
| A4   | `POST /api/leads` — validate via shared schema, insert DB             | 2h     | Replaces mock `setTimeout` in forms            |
| A5   | ReCAPTCHA server-side verifier                                        | 1h     | New service, not "reusing" browser utility     |
| A6   | Frontend: wire up `AppQuoteForm` + `ContactForm` to `POST /api/leads` | 2h     | Replace mock `onSubmit` with real HTTP call    |
| A7   | Email notification on new lead (Resend)                               | 1h     | Admin gets notified of new submissions         |

### Phase B — Admin panel (when needed)

| Step | Task                                                     | Effort | Why                                  |
| ---- | -------------------------------------------------------- | ------ | ------------------------------------ |
| B1   | Auth module — Login, JWT, Guards                         | 3h     | Only when there are real admin users |
| B2   | `GET /api/admin/leads` — list, filter, status management | 2h     | Basic lead CRM                       |
| B3   | Admin panel UI (separate app or sub-route)               | —      | Out of scope for this doc            |

### Phase C — Dynamic content (when frontend needs it)

Only migrate a section to dynamic API **when** the static `content.ts` approach becomes a bottleneck (e.g., non-technical content editors need to update content without code changes):

| Step | Task                                                       | Effort | Why |
| ---- | ---------------------------------------------------------- | ------ | --- |
| C1   | Products module (if số lượng sản phẩm tăng, cần filter)    | 3h     |     |
| C2   | Projects module (if danh sách dự án cần phân trang)        | 2h     |     |
| C3   | News module (if cần đăng bài thường xuyên)                 | 2h     |     |
| C4   | Site-config (if cần thay đổi hotline/email không qua code) | 1h     |     |

### Phase D — Search (when content volume justifies it)

| Step | Task                                          | Effort | Why                                |
| ---- | --------------------------------------------- | ------ | ---------------------------------- |
| D1   | PostgreSQL FTS setup (`pg_trgm` + `unaccent`) | 1h     | Only if >50 products/projects/news |
| D2   | `GET /api/search` unified endpoint            | 2h     |                                    |
| D3   | `SearchModal` UI in header                    | 2h     |                                    |

### Phase E — Media (when admin panel needs upload)

| Step | Task                                 | Effort | Why                                    |
| ---- | ------------------------------------ | ------ | -------------------------------------- |
| E1   | Cloudflare R2 setup + upload service | 3h     | Only when admins need to upload images |

---

## Current State vs Target

| Component | Current (Jul 2026)  | Phase A (MVP)          | Phase B+ (Future)        |
| --------- | ------------------- | ---------------------- | ------------------------ |
| Content   | Static `content.ts` | Static                 | Dynamic via API          |
| Forms     | Mock `onSubmit`     | Real `POST /api/leads` | Real + admin view        |
| Auth      | None                | None                   | JWT + admin panel        |
| Search    | None                | None                   | PostgreSQL FTS in header |

---

## 17. References

- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)
- [pg_trgm Extension](https://www.postgresql.org/docs/current/pgtrgm.html)
