# Liên Hệ Page — Design Spec

## Overview

Add a banner section and implement the full `/lien-he` contact page for the Tu Anh 68 corporate website, following the existing page patterns (gioi-thieu, van-phu-phim, du-an) and Figma design (Quote & FAQ Section node 2:136).

## Sections

### 1. Banner Section

- Full-width hero background image with blue gradient overlay
- `AppBreadcrumb`: Trang Chủ → Liên Hệ
- Title: "LIÊN HỆ" (font-black, uppercase, with teal highlight)
- Subtitle: 2-line description
- Stats row: 3 columns (30+ NĂM KINH NGHIỆM, 500+ ĐỐI TÁC, 1000+ CÔNG TRÌNH)

### 2. Contact Form + FAQ Section

Based on Figma node 2:136.

- Centered heading "LIÊN HỆ VỚI CHÚNG TÔI" with teal divider
- Subtitle + teal hotline pill "0983 570 760"
- 2-column grid:
  - **Left**: FAQ accordion (3 questions, uses `AppCollapse`)
  - **Right**: Contact form card — Name, Phone, Message fields + Submit button

## Structure

```
src/app/lien-he/
  page.tsx
  sections/
    banner/
      index.tsx          # Server component
      content.ts
    contact-faq/
      index.tsx          # Client component (FAQ collapse + form)
      content.ts
```

## Shared Components Used

- `AppBreadcrumb`, `AppInput`, `AppTextarea`, `AppButton`, `AppCollapse`, `AppSectionBadge`, `AppSectionHeading`
- Pattern follows existing pages: server component for sections, `content.ts` for static data, `use client` only for interactive parts.
