# Homepage Premium Redesign — Tuấn Anh 68

- **Date:** 2026-07-07
- **Approach:** Hybrid — Cinematic Chapters + Corporate Premium
- **Design Style:** Industrial Luxury, Dark Theme, Glassmorphism, Minimal, Spacious

---

## Overview

Homepage redesign for Tuấn Anh 68 — a film-faced plywood and formwork manufacturer with nearly 30 years of experience. The site serves as a **Corporate Website + Lead Generation** tool for contractors, investors, distributors, and construction companies. Not e-commerce.

The design communicates: Professional, Corporate, Manufacturing, Premium, Trust, Modern, Industrial.

---

## Section 1 — Hero

### Layout

- Full viewport (100vh)
- 2-column: text left (60%), glass form right (40%)
- Mobile: stacked vertical

### Background (3 layers)

1. **Deep:** `--color-background-primary` (#08111d)
2. **Gradient:** Radial from top-right (primary-500/6–8%), radial from bottom-left (primary-300/3–4%)
3. **Glass overlay:** `.backdrop-blur-[var(--blur-glass)]` block over text area, `--color-surface-glass` + `--color-border-glass`

### Typography

```
Badge:   "GẦN 30 NĂM DẪN ĐẦU" (overline, primary-300)
Heading: "Ván Ép Phủ Phim" (display-lg, weight 650)
Dòng 2:  "Chất Lượng Cao" (display-md, primary-300, weight 640)
Desc:    body-lg, text-secondary, max-w 45ch
```

### CTA

- Primary button "Nhận báo giá" size=xl + icon right
- Outline button "Xem sản phẩm" size=xl

### Form (right column)

- Glass surface, padding-lg, radius-2xl
- Fields: Họ tên, SĐT, submit button full-width

### Animation

- Staggered fade-in + slide-up: badge (0ms), heading (100ms), subtitle (200ms), desc (300ms), buttons (400ms)
- Form: fade-in + slide-right (300ms)

---

## Section 2 — Statistics

### Layout

- `AppSection spacing="md" background="default"`
- 4-column grid (2 tablet, 1 mobile)
- Thin divider line on top

### Card Design (no background box — numbers float)

- **Icon:** 24-28px SVG, primary-300, opacity 60%, above value
- **Value:** `text-[5rem]`, weight 650, letter-spacing -0.02em
- **Label:** body-sm, text-muted, letter-spacing 0.05em
- **Divider:** vertical lines between columns (hidden on tablet/mobile)

### Animation

- Count-up from 0 on scroll (useInView + rAF, ~2s)
- Icon + label: fade-in slide-up

---

## Section 3 — About Factory

### Layout

- `AppSection spacing="lg" background="secondary"`
- 2-column: text left (40%), image right (60%)
- Mobile: stacked, image first

### Text Column

```
Badge:     "VỀ NHÀ MÁY" (overline, primary-300)
Heading:   "Sản Xuất Tại Nhà Máy" + "Hiện Đại Bậc Nhất Việt Nam" (primary-300)
Body:      body-lg, text-secondary, 2 paragraphs, max-w 45ch
Signature: "Mr. Nguyễn Văn A — Nhà sáng lập"
CTA:       "Tham quan nhà máy" (outline + icon right)
```

### Image Column

- **Main image:** Factory/assembly line, ~85% column width, radius-2xl, aspect 4:3
- **Overlay image:** Second image (machine/workers), offset bottom-right -2rem, radius-xl, ~35% size, glass border
- **Floating tag:** "Est. 1995" glass tag on main image corner

### Animation

- Text: slide-in left
- Image: slide-in right
- Overlay: fade-in + scale (200ms delay)
- Tag: fade-in (400ms delay)

---

## Section 4 — Product Showcase

### Layout

- `AppSection spacing="lg" background="default"`
- Centered header + 4-product grid (2 columns desktop, 1 mobile)

### Section Header

```
Badge:   "SẢN PHẨM" (overline, center)
Heading: "Ván Ép Phủ Phim Cao Cấp" (headline-xl, center)
Desc:    body-lg, text-secondary, center, max-w 60ch
```

### Product Card

- Vertical: image top, content bottom
- `AppCard variant="elevated" padding="lg" radius="2xl" interactive`
- **Image:** 16:9, object-cover, radius-xl, gradient overlay bottom
- **Content:** Category badge, title (title-lg), description (body-sm, muted), specs pills, "Xem chi tiết" link
- **Hover:** scale 1.03, shadow increase, border transition

---

## Section 5 — Manufacturing Process

### Layout

- `AppSection spacing="lg" background="secondary"`
- Horizontal timeline on desktop, vertical on mobile

### Timeline (horizontal)

- 5 steps as "stations" on a production line
- **Connector:** Horizontal line (2px), active segment primary-500 gradient fill
- **Each step:** Number circle (28px, border primary-500) → glass card below
- **Glass card:** `AppCard variant="glass" padding="md" radius="xl"`
  - Icon (40px, primary-300)
  - Title (title-md, short: "Chọn gỗ", "Ép nhiệt", etc.)
  - Description (body-sm, text-muted, 1-2 lines)

### Animation

- Steps illuminate sequentially on scroll (glow on circle, connector fill left→right)

---

## Section 6 — Projects

### Layout

- `AppSection spacing="lg" background="default"`
- Heading + CTA right + masonry grid

### Project Card (cinematic overlay style)

- **Image:** aspect-ratio 4/3 or 3/2, object-cover, radius-2xl
- **Overlay:** gradient bottom (black 80% → transparent 0%), height 60%
- **Content (absolute bottom-left):**
  - Category badge (body-sm, bg-glass, radius-md)
  - Title (title-lg)
  - Description (body-sm, text-secondary, 1-2 lines)

### Grid

- Desktop: 1 featured (double width, 16/9) + 3 standard below
- Tablet: 2 columns
- Mobile: 1 column

### Hover

- Image scale 1.05
- Overlay opacity increase
- Glass overlay slide-up from bottom

---

## Section 7 — Partners

### Layout

- `AppSection spacing="md" background="secondary"`
- Centered header + logo wall (3×2 desktop)

### Logo Item

- `AppCard variant="glass" padding="lg" radius="xl"`
- Logo: `aspect-[3/2]`, `max-h-10`, `opacity-50`, grayscale default
- Hover: opacity 100%, color restored, scale 1.05

### Animation

- Staggered fade-in + scale 0.9 on scroll

---

## Section 8 — FAQ

### Layout

- `AppSection spacing="lg" background="default"`
- Container lg, centered header + glass accordion

### Accordion

- Each item wrapped in `AppCard variant="glass"`
- Uses existing `Accordion` UI component
- Title: title-md + chevron (primary-300)
- Content: body-md, text-secondary
- Border between items: `--color-border-glass`

### Animation

- Chevron rotate 180° on open
- Content expand with transition

---

## Section 9 — CTA (Final Call-to-Action)

### Layout

- `AppSection spacing="lg" background="transparent"`
- Full-width gradient background: radial gradient primary-500/10 → transparent
- Glass surface as section base layer

### Content (centered)

```
Heading: "Sẵn Sàng Hợp Tác?" (display-md)
Subtitle: headling-md, text-muted
CTA: [primary "Nhận báo giá ngay" xl] [outline "Gọi hotline" xl]
```

### Decorative

- 2-3 floating glass shapes (circle, pill), absolute, no layout impact

### Animation

- Gradient subtle shift (10s loop)
- Content fade-in + slide-up
- Floating shapes: slow translateY (6s infinite)

---

## Section 10 — Footer

### Layout

- `AppSection spacing="md" background="tertiary"`
- 4-column grid using existing `Footer` component
- Subtle bottom gradient primary-500/2

### Columns

1. **Brand:** Company name (title-lg) + address + social icons (primary-300 hover)
   2–4. Standard link columns

### Bottom Bar

- Divider + copyright + "Built with quality" tagline

---

## Animation Guidelines

- All scroll-triggered animations use `IntersectionObserver` via custom hook
- Respect `prefers-reduced-motion`
- CSS `@keyframes` with `animation-fill-mode: forwards`; no heavy animation library
- Easing: `--ease-standard` (cubic-bezier(0.2, 0, 0, 1))
- Stagger delays: 100ms increments

## Responsive Strategy

- **mobile** (< 48rem): Single column, reduced typography scale, simplified layouts
- **tablet** (48–64rem): 2-column grids, vertical timelines
- **laptop** (64–80rem): Multi-column layouts, horizontal timelines
- **desktop** (80rem+): Full layouts as described
- **wide** (96rem+): Max width capped at --container-2xl

## Component Mapping

| Section       | UI Components Used                                                                 |
| ------------- | ---------------------------------------------------------------------------------- |
| Hero          | AppContainer, AppHeading, AppText, AppButton, AppSurface                           |
| Statistics    | AppContainer, AppGrid, AppText                                                     |
| About Factory | AppSection, AppContainer, AppHeading, AppText, AppButton, AppStack                 |
| Products      | AppSection, AppContainer, AppHeading, AppText, AppGrid, AppCard, AppButton         |
| Manufacturing | AppSection, AppContainer, AppHeading, AppText, AppCard, AppStack (custom timeline) |
| Projects      | AppSection, AppContainer, AppHeading, AppText, AppCard                             |
| Partners      | AppSection, AppContainer, AppHeading, AppText, AppCard                             |
| FAQ           | AppSection, AppContainer, AppHeading, AppText, Accordion, GlassCard                |
| CTA           | AppSection, AppContainer, AppHeading, AppText, AppButton                           |
| Footer        | Footer, AppContainer                                                               |
