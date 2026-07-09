# Tin Tức Banner Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a banner/hero section to the `/tin-tuc` news page.

**Architecture:** Follow the existing du-an banner pattern — a server component section with static content data, using shared UI components (`AppBreadcrumb`).

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, TypeScript

## Global Constraints

- Do NOT use `next-intl` or any i18n — site is Vietnamese-only
- Use existing shared UI components where possible
- Follow existing section pattern: `sections/<name>/index.tsx` + `sections/<name>/content.ts`
- No additional dependencies needed

---

### Task 1: Create banner content data

**Files:**

- Create: `apps/web/src/app/tin-tuc/sections/banner/content.ts`

- [ ] **Create content.ts**

```ts
export const newsBannerContent = {
  breadcrumb: { home: "Trang Chủ", current: "Tin Tức", homeHref: "/" },
  title: "TIN TỨC & SỰ KIỆN",
  subtitle: ["Cập nhật những tin tức mới nhất về hoạt động sản xuất, dự án", "và thông tin ngành ván ép từ Tu Anh 68"],
  backgroundImage: "/assets/banner/hero-section.png",
} as const;
```

### Task 2: Create banner section component

**Files:**

- Create: `apps/web/src/app/tin-tuc/sections/banner/index.tsx`

- [ ] **Create index.tsx**

```tsx
import Image from "next/image";
import AppBreadcrumb from "@/shared/ui/app-breadcrumb";
import { newsBannerContent } from "./content";

export default function NewsBannerSection() {
  return (
    <section className="relative flex min-h-[700px] items-center justify-center overflow-hidden pt-20 text-white">
      <div className="absolute inset-0 flex flex-col items-start justify-center overflow-clip">
        <Image
          src={newsBannerContent.backgroundImage}
          alt="Tin tức và sự kiện Tu Anh 68"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(41,115,178,0.8)] via-[rgba(41,115,178,0.6)] to-[rgba(51,51,51,0.8)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.5)] to-[60%] to-transparent" />
      </div>

      <AppBreadcrumb
        items={[
          { href: newsBannerContent.breadcrumb.homeHref, label: newsBannerContent.breadcrumb.home },
          { href: "#", label: newsBannerContent.breadcrumb.current },
        ]}
        className="absolute left-20 right-20 top-24 max-lg:left-8 max-lg:right-8"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-4">
        <h1 className="w-full text-center text-[60px] font-extrabold uppercase leading-15 tracking-[3px] text-white drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)] max-md:text-[42px] max-md:leading-11">
          {newsBannerContent.title}
        </h1>

        <p className="w-full max-w-2xl text-center text-xl font-medium leading-7 tracking-[0.5px] text-[#dbeafe] drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06),0px_4px_1.5px_rgba(0,0,0,0.07)]">
          {newsBannerContent.subtitle[0]}
          <br />
          {newsBannerContent.subtitle[1]}
        </p>

        <div className="flex w-full items-center justify-center gap-4 pt-3">
          <div className="h-px w-16 bg-[rgba(72,166,167,0.6)]" />
          <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.5 0L14.081 7.75H22.5L15.709 12.25L18.291 20L11.5 15.5L4.709 20L7.291 12.25L0.5 7.75H8.919L11.5 0Z"
              fill="#48a6a7"
              fillOpacity="0.6"
            />
          </svg>
          <div className="h-px w-16 bg-[rgba(72,166,167,0.6)]" />
        </div>
      </div>
    </section>
  );
}
```

### Task 3: Update tin-tuc page to render banner

**Files:**

- Modify: `apps/web/src/app/tin-tuc/page.tsx`

- [ ] **Update page.tsx**

```tsx
import NewsBannerSection from "./sections/banner";

export default function NewsPage() {
  return (
    <>
      <NewsBannerSection />
    </>
  );
}
```
