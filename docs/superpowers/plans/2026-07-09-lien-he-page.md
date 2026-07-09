# Liên Hệ Page Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Add a hero banner section and a contact-form-with-FAQ section to the `/lien-he` route, following the same pattern as other pages (gioi-thieu, van-phu-phim, du-an).

**Architecture:** Two new section directories under `src/app/lien-he/sections/` — `banner/` (server component) and `contact-faq/` (client component for interactive FAQ + form). The page imports and composes both sections.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript

## Global Constraints

- Follow existing section patterns: `content.ts` for static data, `index.tsx` for component
- Use shared UI components: `AppBreadcrumb`, `AppInput`, `AppTextarea`, `AppButton`, `AppCollapse`, `AppSectionBadge`, `AppSectionHeading`
- Server component unless interactivity needed (FAQ accordion, form submit)
- All text content in Vietnamese
- Background image: reuse existing `hero-section.png` from `public/assets/banner/hero-section.png`

---

### Task 1: Banner Section

**Files:**

- Create: `src/app/lien-he/sections/banner/content.ts`
- Create: `src/app/lien-he/sections/banner/index.tsx`

**Interfaces:**

- Consumes: `AppBreadcrumb` from `@/shared/ui/app-breadcrumb`
- Produces: Default-exported `BannerSection` server component

- [ ] **Create `content.ts`**

```ts
export const bannerContent = {
  id: "lien-he",
  breadcrumb: {
    home: "Trang Chủ",
    current: "Liên Hệ",
    homeHref: "/",
  },
  badge: "LIÊN HỆ",
  title: ["LIÊN HỆ VỚI", "TU ANH 68"],
  description: [
    "Tu Anh 68 luôn sẵn sàng hỗ trợ bạn — từ tư vấn sản phẩm, báo giá,",
    "đến giải đáp mọi thắc mắc về ván ép phủ phim và các sản phẩm",
    "khác. Liên hệ ngay để nhận được sự hỗ trợ tốt nhất.",
  ],
  backgroundImage: "/assets/banner/hero-section.png",
  stats: [
    { value: "30+", label: "NĂM KINH NGHIỆM" },
    { value: "500+", label: "ĐỐI TÁC TIN CẬY" },
    { value: "1000+", label: "CÔNG TRÌNH" },
  ],
} as const;
```

- [ ] **Create `index.tsx`**

```tsx
import Image from "next/image";
import AppBreadcrumb from "@/shared/ui/app-breadcrumb";
import { bannerContent } from "./content";

export default function BannerSection() {
  return (
    <section
      id={bannerContent.id}
      className="relative -mt-20.5 flex min-h-[680px] items-center justify-center overflow-hidden pt-20 text-white"
    >
      <div className="absolute inset-0 overflow-clip">
        <Image
          src={bannerContent.backgroundImage}
          alt="Nhà máy sản xuất ván ép Tu Anh 68"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(41,115,178,0.3) 0%, rgba(41,115,178,0) 60%)",
          }}
        />
      </div>

      <AppBreadcrumb
        items={[
          { href: bannerContent.breadcrumb.homeHref, label: bannerContent.breadcrumb.home },
          { href: "#", label: bannerContent.breadcrumb.current },
        ]}
        className="absolute left-20 right-20 top-24 max-lg:left-8 max-lg:right-8"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] px-[32px]">
        <div className="flex w-full max-w-[768px] flex-col gap-[24px]">
          <div className="flex items-center gap-[12px]">
            <div className="h-[2px] w-[48px] bg-app-brand-teal" />
            <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal">
              {bannerContent.badge}
            </span>
          </div>

          <h1 className="text-[60px] font-black leading-[60px] tracking-[1.5px] uppercase drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]">
            {bannerContent.title[0]}
            <br />
            <span className="text-app-brand-teal">{bannerContent.title[1]}</span>
          </h1>

          <p className="max-w-[672px] text-[20px] font-medium leading-[28px] text-[#e5e7eb]">
            {bannerContent.description[0]}
            <br />
            {bannerContent.description[1]}
            <br />
            {bannerContent.description[2]}
          </p>

          <div className="flex w-full flex-wrap gap-8 gap-y-6 pt-4 md:gap-0 md:pt-0">
            {bannerContent.stats.slice(0, 2).map((stat, i) => (
              <div key={stat.value} className="flex items-center gap-8 md:gap-0">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-center text-[36px] font-black leading-[40px] text-white">{stat.value}</span>
                  <span className="text-center text-[14px] font-medium uppercase tracking-[0.35px] text-app-brand-teal">
                    {stat.label}
                  </span>
                </div>
                {i < 1 && <div className="mx-8 hidden h-[64px] w-px bg-[rgba(255,255,255,0.2)] md:block" />}
              </div>
            ))}
            <div className="flex w-full md:w-auto">
              <div className="flex flex-col gap-[4px]">
                <span className="text-center text-[36px] font-black leading-[40px] text-white md:text-left">
                  {bannerContent.stats[2].value}
                </span>
                <span className="text-center text-[14px] font-medium uppercase tracking-[0.35px] text-app-brand-teal md:text-left">
                  {bannerContent.stats[2].label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Task 2: Contact-FAQ Section

**Files:**

- Create: `src/app/lien-he/sections/contact-faq/content.ts`
- Create: `src/app/lien-he/sections/contact-faq/index.tsx`

**Interfaces:**

- Consumes: `AppSectionHeading`, `AppContainer`, `AppCollapse`, `AppInput`, `AppTextarea`, `AppButton`
- Produces: Default-exported `ContactFaqSection` client component

- [ ] **Create `content.ts`**

```ts
export const contactFaqContent = {
  id: "lien-he-form",
  heading: "LIÊN HỆ VỚI CHÚNG TÔI",
  subtitle: "Liên hệ trực tiếp qua Hotline để được tư vấn chi tiết và báo giá tốt nhất.",
  phone: "0983 570 760",
  faq: {
    title: "Câu Hỏi Thường Gặp",
    items: [
      {
        id: "faq-1",
        title: "Tu Anh 68 chuyên sản xuất những loại ván ép nào?",
        content:
          "Chúng tôi chuyên sản xuất ván ép phủ phim chất lượng cao, ván ép nội thất, ván ép công nghiệp và các sản phẩm ván ép chuyên dụng khác. Sản phẩm của chúng tôi đáp ứng tiêu chuẩn xuất khẩu và được kiểm định chất lượng nghiêm ngặt.",
      },
      {
        id: "faq-2",
        title: "Ván phủ phim của công ty có thể tái sử dụng bao nhiêu lần?",
        content:
          "Ván phủ phim của Tu Anh 68 có thể tái sử dụng từ 8-12 lần tùy vào điều kiện thi công và bảo quản. Bề mặt phủ phim chịu nước tốt, chống thấm hiệu quả, giúp tiết kiệm chi phí cho các công trình xây dựng.",
      },
      {
        id: "faq-3",
        title: "Chính sách giao hàng và vận chuyển như thế nào?",
        content:
          "Chúng tôi cung cấp dịch vụ giao hàng tận chân công trình trên toàn quốc. Thời gian giao hàng nhanh chóng, đảm bảo đúng tiến độ. Đối với các đơn hàng số lượng lớn, chúng tôi có chính sách ưu đãi vận chuyển và hỗ trợ chi phí.",
      },
    ],
  },
  form: {
    title: "Gửi Yêu Cầu Tư Vấn",
    nameLabel: "Tên của bạn",
    namePlaceholder: "Nhập họ và tên",
    phoneLabel: "Số điện thoại",
    phonePlaceholder: "Nhập số điện thoại",
    messageLabel: "Nội dung tin nhắn",
    messagePlaceholder: "Nhập yêu cầu báo giá hoặc câu hỏi...",
    submitLabel: "Gửi Yêu Cầu",
  },
} as const;
```

- [ ] **Create `index.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppCollapse from "@/shared/ui/app-collapse";
import AppInput from "@/shared/ui/app-input";
import AppTextarea from "@/shared/ui/app-textarea";
import AppButton from "@/shared/ui/app-button";
import IconSend from "@/assets/icons/icon-send.svg";
import { contactFaqContent } from "./content";

export default function ContactFaqSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000);
  }

  return (
    <section id={contactFaqContent.id} className="bg-white py-14 sm:py-20">
      <AppContainer className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4">
          <AppSectionHeading showDivider={false}>{contactFaqContent.heading}</AppSectionHeading>
          <p className="text-center text-base leading-6 text-[#4b5563]">{contactFaqContent.subtitle}</p>
          <a
            href={`tel:${contactFaqContent.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full bg-app-brand-teal px-8 py-3 text-lg leading-7 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M9.84375 0.000792688C14.3473 0.000792688 18 3.65353 18 8.15704C18 8.62462 17.6238 9.00079 17.1562 9.00079C16.6887 9.00079 16.3125 8.62462 16.3125 8.15704C16.3125 4.58517 13.4156 1.68829 9.84375 1.68829C9.37617 1.68829 9 1.31212 9 0.844543C9 0.376965 9.37617 0.000792688 9.84375 0.000792688ZM10.125 6.75079C10.7459 6.75079 11.25 7.25489 11.25 7.87579C11.25 8.4967 10.7459 9.00079 10.125 9.00079C9.5041 9.00079 9 8.4967 9 7.87579C9 7.25489 9.5041 6.75079 10.125 6.75079ZM9 4.21954C9 3.75196 9.37617 3.37579 9.84375 3.37579C12.484 3.37579 14.625 5.51681 14.625 8.15704C14.625 8.62462 14.2488 9.00079 13.7812 9.00079C13.3137 9.00079 12.9375 8.62462 12.9375 8.15704C12.9375 6.44845 11.5523 5.06329 9.84375 5.06329C9.37617 5.06329 9 4.68712 9 4.21954ZM4.13086 0.0500114C4.81289 -0.136317 5.52656 0.21173 5.79727 0.865636L7.20352 4.24064C7.44258 4.81368 7.27734 5.47814 6.7957 5.86837L5.0625 7.28868C6.2332 9.76368 8.23711 11.7676 10.7121 12.9383L12.1289 11.2051C12.5227 10.7234 13.1836 10.5582 13.7566 10.7973L17.1316 12.2035C17.7855 12.4742 18.1336 13.1879 17.9473 13.8699L17.1035 16.9637C16.9383 17.5754 16.3828 18.0008 15.75 18.0008C7.05234 18.0008 0 10.9484 0 2.25079C0 1.61798 0.425391 1.06251 1.03711 0.893761L4.13086 0.0500114Z"
                fill="currentColor"
              />
            </svg>
            {contactFaqContent.phone}
          </a>
        </div>

        <div className="grid gap-12 quote-faq-grid">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl leading-8 font-bold text-app-accent-blue">{contactFaqContent.faq.title}</h3>
            <AppCollapse items={contactFaqContent.faq.items} />
          </div>

          <div className="flex flex-col gap-6 rounded-xl border border-gray-100 bg-gray-50 p-[33px] shadow-sm">
            <h3 className="text-2xl leading-8 font-bold text-app-accent-blue">{contactFaqContent.form.title}</h3>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
              <div className="flex flex-col gap-4">
                <AppInput
                  name="name"
                  label={contactFaqContent.form.nameLabel}
                  placeholder={contactFaqContent.form.namePlaceholder}
                  required
                  className="w-full"
                />
                <AppInput
                  name="phone"
                  type="tel"
                  label={contactFaqContent.form.phoneLabel}
                  placeholder={contactFaqContent.form.phonePlaceholder}
                  required
                  className="w-full"
                />
                <AppTextarea
                  name="message"
                  label={contactFaqContent.form.messageLabel}
                  placeholder={contactFaqContent.form.messagePlaceholder}
                  rows={3}
                  className="w-full"
                />
                <AppButton
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#2973b2] py-4 text-sm font-black uppercase leading-5 tracking-[0.35px] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <IconSend className="size-4 shrink-0" />
                  <span>{contactFaqContent.form.submitLabel}</span>
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
```

### Task 3: Update Page

- [ ] **Update `src/app/lien-he/page.tsx`**

```tsx
import BannerSection from "./sections/banner";
import ContactFaqSection from "./sections/contact-faq";

export default function ContactPage() {
  return (
    <>
      <BannerSection />
      <ContactFaqSection />
    </>
  );
}
```

### Task 4: Build & Verify

- [ ] **Run build to check for errors**

```bash
cd apps/web && npx next build
```
