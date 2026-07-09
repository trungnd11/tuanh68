# Tin Tức Banner Section Design

## Overview

Add a banner/hero section to the `/tin-tuc` (news) page following the existing inner-page banner pattern (like `/du-an`).

## Design Reference

- Figma node 9:1943 — gradient overlay: `bg-gradient-to-t from-[rgba(15,23,42,0.5)] to-[60%] to-transparent`
- Pattern: Simple banner (matching Dự Án page)

## Structure

```
app/tin-tuc/sections/banner/
  index.tsx        # Section component (server component)
  content.ts       # Static content data
```

## Layout

- Full-width `<section>` with `min-h-[700px]`, centered content, `pt-20` for header clearance
- Background image (`<Image fill object-cover priority sizes="100vw">`) with gradient overlay
- `AppBreadcrumb` at top: Trang Chủ / Tin Tức
- Centered content area:
  - `h1`: "TIN TỨC & SỰ KIỆN" (60px, font-extrabold, uppercase, white, drop-shadow)
  - Subtitle: 2-line description in `text-[#dbeafe]`
  - Decorative star divider (SVG star + horizontal lines)

## Gradient Overlay (from Figma)

```css
bg-gradient-to-t from-[rgba(15,23,42,0.5)] to-[60%] to-transparent
```

Combined with the du-an-style blue overlay:

```css
bg-linear-to-b from-[rgba(41,115,178,0.8)] via-[rgba(41,115,178,0.6)] to-[rgba(51,51,51,0.8)]
```

## Background Image

Use `/assets/banner/hero-section.png` — same hero image used site-wide, or a news-related image.

## Content

- Breadcrumb: Trang Chủ / Tin Tức
- Title: "TIN TỨC & SỰ KIỆN"
- Subtitle: "Cập nhật những tin tức mới nhất về hoạt động sản xuất, dự án và thông tin ngành ván ép từ Tu Anh 68"

## Integration

- Import `AppBreadcrumb` from `@/shared/ui/app-breadcrumb`
- Update `app/tin-tuc/page.tsx` to render `BannerSection`

## Dependencies

- None beyond existing shared UI components
