# Homepage Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Tuấn Anh 68 homepage into a premium Industrial Luxury design with glassmorphism, gradient backgrounds, spacious layout, and scroll-triggered animations.

**Architecture:** Monorepo with `apps/web` (Next.js 16 app) + `packages/ui` (shared component library). Each page section is a separate component under `features/home/components/`. Scroll-triggered animations via a new `useInView` hook. No heavy animation library — pure CSS keyframes + IntersectionObserver.

**Tech Stack:** Next.js 16, React 19, TailwindCSS v4, CSS custom properties for tokens, Inter font.

## Global Constraints

- All colors must use CSS custom properties (`var(--color-*)`), never raw hex
- All spacing must use `var(--spacing-*)` tokens, never arbitrary values
- Use existing `@tuanh68/ui` components whenever possible (AppContainer, AppSection, AppHeading, AppText, AppButton, AppCard, AppSurface, GlassCard, AppGrid, AppStack, AppFlex, Accordion, Timeline, Divider, AppBadge, Navbar, Footer)
- Respect `prefers-reduced-motion` via existing `useReducedMotion` hook
- No external animation libraries (no framer-motion, no GSAP)
- Semantic HTML (proper heading hierarchy, landmarks)
- All existing section index.ts export files stay unchanged

---

### Task 1: Animation Infrastructure — useInView hook + CSS keyframes

**Files:**

- Create: `apps/web/src/features/home/hooks/useInView.ts`
- Create: `apps/web/src/features/home/hooks/index.ts`
- Modify: `apps/web/src/styles/globals.css` — add keyframes

- [ ] **Step 1: Create useInView hook**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView };
}
```

- [ ] **Step 2: Create hooks index**

```tsx
export { useInView } from "./useInView";
```

- [ ] **Step 3: Add animation keyframes to globals.css**

Add before the `@layer base` block:

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-32px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(32px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes count-up {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 8px var(--color-primary-500);
  }
  50% {
    box-shadow: 0 0 20px var(--color-primary-500);
  }
}
```

Also add a utility class for animation delay (used by all sections):

```css
.animate-delay-100 {
  animation-delay: 100ms;
}
.animate-delay-200 {
  animation-delay: 200ms;
}
.animate-delay-300 {
  animation-delay: 300ms;
}
.animate-delay-400 {
  animation-delay: 400ms;
}
.animate-delay-500 {
  animation-delay: 500ms;
}
.animate-delay-600 {
  animation-delay: 600ms;
}
```

---

### Task 2: Hero Section — Premium Full-Screen

**Files:**

- Modify: `apps/web/src/features/home/components/Hero/Hero.tsx` — full rewrite

**Interfaces:**

- Consumes: `useInView` from hooks, `QuoteForm` from `../QuoteForm`
- Produces: `<HeroSection />` export

- [ ] **Step 1: Rewrite Hero.tsx**

```tsx
"use client";

import { AppContainer, AppHeading, AppText, AppButton, AppSurface } from "@tuanh68/ui";
import { useInView } from "../../hooks";
import { QuoteForm } from "../QuoteForm";

export function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-background-primary)]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-500)]/8 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-[var(--color-primary-300)]/4 via-transparent to-transparent" />
        {/* Abstract grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <AppContainer size="2xl" className="relative z-10 w-full">
        <div className="flex flex-col laptop:flex-row items-center gap-12 py-20 laptop:py-24">
          {/* Left column — Text */}
          <div className="flex-1 space-y-8">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 transition-all duration-700 ease-[var(--ease-standard)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="h-px w-8 bg-[var(--color-primary-400)]" />
              <AppText variant="overline" color="accent" as="span">
                Gần 30 năm dẫn đầu
              </AppText>
            </div>

            {/* Heading */}
            <div
              className={`space-y-2 transition-all duration-700 ease-[var(--ease-standard)] delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <AppHeading level="display" display="lg" as="h1">
                Ván Ép Phủ Phim
              </AppHeading>
              <AppHeading
                level="display"
                display="md"
                as="div"
                className="bg-gradient-to-r from-[var(--color-primary-300)] to-[var(--color-primary-500)] bg-clip-text text-transparent"
              >
                Chất Lượng Cao
              </AppHeading>
            </div>

            {/* Description */}
            <div
              className={`max-w-[45ch] transition-all duration-700 ease-[var(--ease-standard)] delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <AppText variant="body" size="lg" color="secondary">
                Cung cấp coffa, ván ép phủ phim cho các công trình xây dựng lớn trên toàn quốc. Đối tác tin cậy của các
                nhà thầu hàng đầu Việt Nam.
              </AppText>
            </div>

            {/* CTA */}
            <div
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 ease-[var(--ease-standard)] delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <AppButton variant="primary" size="xl">
                Nhận báo giá
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </AppButton>
              <AppButton variant="outline" size="xl">
                Xem sản phẩm
              </AppButton>
            </div>
          </div>

          {/* Right column — Quote Form */}
          <div
            className={`w-full laptop:w-[440px] shrink-0 transition-all duration-800 ease-[var(--ease-standard)] delay-300 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <AppSurface variant="glass" padding="lg" radius="2xl">
              <QuoteForm />
            </AppSurface>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
```

---

### Task 3: Statistics Section — Large Numbers with Count-Up

**Files:**

- Modify: `apps/web/src/features/home/components/Statistics/Statistics.tsx` — full rewrite

- [ ] **Step 1: Create CountUp component**

Create `apps/web/src/features/home/components/Statistics/CountUp.tsx`:

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "../../hooks";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ end, suffix = "", duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Rewrite Statistics.tsx**

```tsx
"use client";

import { AppContainer, AppText } from "@tuanh68/ui";
import { useInView } from "../../hooks";
import { CountUp } from "./CountUp";
import { statistics } from "../../mock/statistics";

const statIcons = [
  <svg key="years" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="projects" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-18v18M3 7h7.5M3 11h7.5m3-4.5H21M3 15h7.5m3-4.5H21M3 19h7.5m3-4.5H21"
    />
  </svg>,
  <svg key="partners" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
    />
  </svg>,
  <svg key="coverage" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
    />
  </svg>,
];

export function StatisticsSection() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-background-primary)] py-[var(--spacing-section-md)]"
    >
      <AppContainer size="2xl">
        <div className="grid grid-cols-2 tablet:grid-cols-4 gap-8 laptop:gap-16">
          {statistics.map((stat, index) => (
            <div
              key={stat.id}
              className={`relative flex flex-col items-center tablet:items-start text-center tablet:text-left transition-all duration-700 ease-[var(--ease-standard)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="text-[var(--color-primary-300)] opacity-60 mb-3">{statIcons[index] ?? statIcons[0]}</div>
              {/* Value */}
              <span className="text-[4rem] tablet:text-[5rem] leading-none font-[650] tracking-[-0.02em] text-[var(--color-text-primary)]">
                <CountUp end={parseInt(stat.value.replace(/[^0-9]/g, ""))} suffix={stat.value.replace(/[0-9]/g, "")} />
              </span>
              {/* Label */}
              <AppText variant="body" size="sm" color="muted" className="mt-1 tracking-[0.05em]">
                {stat.label}
              </AppText>
              {/* Vertical divider (except last) */}
              {index < statistics.length - 1 && (
                <div className="hidden tablet:block absolute right-0 top-1/2 -translate-y-1/2 h-3/5 border-r border-[var(--color-divider)]" />
              )}
            </div>
          ))}
        </div>
      </AppContainer>
    </section>
  );
}
```

- [ ] **Step 3: Parse stat values correctly**

Update the `CountUp` end value parsing in the component. The mock data has values like `"30+"`, `"5000+"`, `"300+"`, `"63"`. The `parseInt` with regex `/[^0-9]/g` will extract `30`, `5000`, `300`, `63`. The remaining characters (`+`) become the suffix. This is correct.

---

### Task 4: About Factory Section — Layered Images

**Files:**

- Modify: `apps/web/src/features/home/components/AboutFactory/AboutFactory.tsx` — full rewrite

- [ ] **Step 1: Rewrite AboutFactory.tsx**

```tsx
"use client";

import { AppContainer, AppSection, AppHeading, AppText, AppButton, AppStack, AppFlex } from "@tuanh68/ui";
import { useInView } from "../../hooks";

export function AboutFactorySection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="secondary" spacing="lg">
      <AppContainer size="2xl">
        <div className="flex flex-col laptop:flex-row items-center gap-12">
          {/* Left — Text */}
          <div
            className={`w-full laptop:w-[40%] space-y-6 transition-all duration-700 ease-[var(--ease-standard)] ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <AppText variant="overline" color="accent" as="div">
              Về nhà máy
            </AppText>
            <AppHeading level="headline" headline="xl" as="h2">
              Sản Xuất Tại Nhà Máy
            </AppHeading>
            <AppHeading level="headline" headline="md" as="div" className="text-[var(--color-primary-300)]">
              Hiện Đại Bậc Nhất Việt Nam
            </AppHeading>
            <div className="space-y-4 max-w-[45ch]">
              <AppText variant="body" size="lg" color="secondary">
                Với gần 30 năm kinh nghiệm, nhà máy Tuấn Anh 68 tọa lạc tại Bình Dương trên diện tích hơn 30.000 m² với
                dây chuyền sản xuất hiện đại.
              </AppText>
              <AppText variant="body" size="md" color="muted">
                Sở hữu đội ngũ kỹ sư giàu kinh nghiệm, máy móc nhập khẩu từ châu Âu, đảm bảo mỗi sản phẩm đạt tiêu chuẩn
                chất lượng cao nhất.
              </AppText>
            </div>
            {/* Signature */}
            <AppFlex direction="column" gap="4">
              <div className="w-12 h-px bg-[var(--color-primary-400)]" />
              <AppText variant="body" size="sm" color="muted">
                Mr. Nguyễn Văn A — Nhà sáng lập
              </AppText>
            </AppFlex>
            <AppButton variant="outline" size="lg">
              Tham quan nhà máy
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AppButton>
          </div>

          {/* Right — Images */}
          <div
            className={`w-full laptop:w-[60%] relative transition-all duration-700 ease-[var(--ease-standard)] delay-100 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Main image placeholder */}
            <div className="aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-surface-tertiary)] shadow-[var(--shadow-lg)] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <AppText variant="body" size="md" color="muted">
                  TODO: Ảnh nhà máy
                </AppText>
              </div>
            </div>

            {/* Overlay image */}
            <div
              className={`absolute -bottom-6 -right-6 w-[35%] aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden border-2 border-[var(--color-border-glass)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-lg)] transition-all duration-700 ease-[var(--ease-standard)] delay-200 ${
                inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <AppText variant="body" size="sm" color="muted">
                  TODO: Ảnh máy ép
                </AppText>
              </div>
            </div>

            {/* Floating glass tag */}
            <div
              className={`absolute top-4 right-4 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)] transition-all duration-700 ease-[var(--ease-standard)] delay-300 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            >
              <AppText variant="label" color="accent" as="span">
                Est. 1995
              </AppText>
            </div>
          </div>
        </div>
      </AppContainer>
    </AppSection>
  );
}
```

---

### Task 5: Product Showcase — Premium Cards

**Files:**

- Modify: `apps/web/src/features/home/components/FeaturedProducts/FeaturedProducts.tsx` — full rewrite

- [ ] **Step 1: Rewrite FeaturedProducts.tsx**

```tsx
"use client";

import { AppContainer, AppSection, AppGrid, AppCard, AppHeading, AppText, AppBadge } from "@tuanh68/ui";
import { useInView } from "../../hooks";
import { products } from "../../mock/products";

export function FeaturedProductsSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="default" spacing="lg">
      <AppContainer size="2xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <AppText variant="overline" color="accent" as="div" className="mb-4">
            Sản phẩm
          </AppText>
          <AppHeading level="headline" headline="xl" as="h2" align="center">
            Ván Ép Phủ Phim Cao Cấp
          </AppHeading>
          <AppText variant="body" size="lg" color="secondary" className="mt-3 max-w-[60ch] mx-auto" as="div">
            Sản phẩm chủ lực được sản xuất trên dây chuyền hiện đại, đáp ứng mọi tiêu chuẩn kỹ thuật khắt khe nhất
          </AppText>
        </div>

        {/* Product grid */}
        <AppGrid columns={2} gap="lg">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ease-[var(--ease-standard)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AppCard variant="elevated" padding="lg" radius="2xl" interactive className="group">
                {/* Image */}
                <div className="aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden mb-5 bg-[var(--color-surface-tertiary)] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-primary)] via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AppText variant="body" size="sm" color="muted">
                      TODO: {product.name}
                    </AppText>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <AppBadge variant="primary">{product.category}</AppBadge>
                  <AppHeading level="title" title="lg" as="h3">
                    {product.name}
                  </AppHeading>
                  <AppText variant="body" size="sm" color="muted" className="line-clamp-2">
                    {product.description}
                  </AppText>

                  {/* Specs pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.specs.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center px-2.5 py-1 rounded-[var(--radius-md)] text-body-sm bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <AppText
                      variant="body"
                      size="sm"
                      color="accent"
                      as="span"
                      className="inline-flex items-center gap-1 cursor-pointer hover:gap-2 transition-all duration-[var(--duration-fast)]"
                    >
                      Xem chi tiết
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </AppText>
                  </div>
                </div>
              </AppCard>
            </div>
          ))}
        </AppGrid>
      </AppContainer>
    </AppSection>
  );
}
```

---

### Task 6: Manufacturing Process — Horizontal Timeline

**Files:**

- Modify: `apps/web/src/features/home/components/Manufacturing/Manufacturing.tsx` — full rewrite

- [ ] **Step 1: Rewrite Manufacturing.tsx**

```tsx
"use client";

import { AppContainer, AppSection, AppHeading, AppText, AppCard, AppStack } from "@tuanh68/ui";
import { useInView } from "../../hooks";

const steps = [
  {
    id: "1",
    title: "Chọn Gỗ",
    desc: "Nguyên liệu gỗ keo, bạch đàn được chọn lọc từ vùng nguyên liệu bền vững.",
    icon: "🌲",
  },
  { id: "2", title: "Bóc & Sấy", desc: "Gỗ được bóc thành từng lớp mỏng và sấy đến độ ẩm tiêu chuẩn.", icon: "🔥" },
  { id: "3", title: "Ép Nhiệt", desc: "Các lớp ván được phết keo chịu nước và ép nhiệt ở nhiệt độ cao.", icon: "⚙️" },
  { id: "4", title: "Phủ Phim", desc: "Bề mặt được phủ phim chất lượng cao, chống thấm và chịu lực.", icon: "🛡️" },
  { id: "5", title: "Kiểm Định", desc: "Sản phẩm được kiểm tra nghiêm ngặt trước khi xuất xưởng.", icon: "✅" },
];

export function ManufacturingSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="secondary" spacing="lg">
      <AppContainer size="lg">
        {/* Header */}
        <div className="text-center mb-16">
          <AppText variant="overline" color="accent" as="div" className="mb-4">
            Quy trình
          </AppText>
          <AppHeading level="headline" headline="xl" as="h2" align="center">
            Quy Trình Sản Xuất 4.0
          </AppHeading>
          <AppText variant="body" size="lg" color="secondary" className="mt-3 max-w-[55ch] mx-auto" as="div">
            5 bước khép kín, đảm bảo chất lượng từ nguyên liệu đến thành phẩm
          </AppText>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden laptop:block">
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-[var(--color-border-default)]" />
            <div
              className={`absolute top-6 left-[10%] h-0.5 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-400)] transition-all duration-1000 ease-[var(--ease-standard)] ${
                inView ? "w-[80%]" : "w-0"
              }`}
            />

            {/* Steps */}
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-center transition-all duration-700 ease-[var(--ease-standard)] ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Number circle */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 bg-[var(--color-background-secondary)] transition-all duration-500 ${
                      inView
                        ? "border-[var(--color-primary-500)] shadow-[0_0_12px_var(--color-primary-500)]"
                        : "border-[var(--color-border-default)]"
                    }`}
                  >
                    <span className="text-title-sm font-semibold text-[var(--color-primary-300)]">{index + 1}</span>
                  </div>

                  {/* Glass card */}
                  <AppCard variant="glass" padding="md" radius="xl" className="mt-4 w-full">
                    <AppStack spacing="8" align="center">
                      <span className="text-2xl">{step.icon}</span>
                      <AppHeading level="title" title="md" as="h3">
                        {step.title}
                      </AppHeading>
                      <AppText variant="body" size="sm" color="muted">
                        {step.desc}
                      </AppText>
                    </AppStack>
                  </AppCard>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Timeline — reuse existing Timeline component */}
        <div className="laptop:hidden">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-[var(--color-background-secondary)] z-10 ${
                      inView ? "border-[var(--color-primary-500)]" : "border-[var(--color-border-default)]"
                    }`}
                  >
                    <span className="text-label font-semibold text-[var(--color-primary-300)]">{index + 1}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mt-2 w-0.5 flex-1 bg-[var(--color-border-default)] min-h-[40px]" />
                  )}
                </div>
                <div className="flex-1">
                  <AppCard variant="glass" padding="md" radius="xl">
                    <AppStack spacing="8">
                      <AppHeading level="title" title="sm" as="h3">
                        {step.icon} {step.title}
                      </AppHeading>
                      <AppText variant="body" size="sm" color="muted">
                        {step.desc}
                      </AppText>
                    </AppStack>
                  </AppCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppContainer>
    </AppSection>
  );
}
```

---

### Task 7: Projects — Cinematic Overlay Cards

**Files:**

- Modify: `apps/web/src/features/home/components/Projects/Projects.tsx` — full rewrite

- [ ] **Step 1: Rewrite Projects.tsx**

```tsx
"use client";

import { AppContainer, AppSection, AppHeading, AppText } from "@tuanh68/ui";
import { useInView } from "../../hooks";
import { projects } from "../../mock/projects";

export function ProjectsSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="default" spacing="lg">
      <AppContainer size="2xl">
        {/* Header */}
        <div className="flex flex-col tablet:flex-row items-start tablet:items-end justify-between mb-12">
          <div>
            <AppText variant="overline" color="accent" as="div" className="mb-4">
              Dự án
            </AppText>
            <AppHeading level="headline" headline="xl" as="h2">
              Công Trình Tiêu Biểu
            </AppHeading>
          </div>
          <AppText
            variant="body"
            size="md"
            color="accent"
            as="span"
            className="inline-flex items-center gap-1 cursor-pointer hover:gap-2 transition-all duration-[var(--duration-fast)] mt-4 tablet:mt-0"
          >
            Xem tất cả
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AppText>
        </div>

        {/* Featured project — full width */}
        {projects.length > 0 && (
          <div
            className={`mb-6 transition-all duration-700 ease-[var(--ease-standard)] ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
            }`}
          >
            <div className="relative aspect-[16/9] laptop:aspect-[21/9] rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-surface-tertiary)] group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <AppText variant="body" size="md" color="muted">
                  TODO: {projects[0].image}
                </AppText>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-primary)]/90 via-[var(--color-background-primary)]/20 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 laptop:p-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-[var(--radius-md)] text-label bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)] text-[var(--color-primary-300)] mb-3">
                  {projects[0].category}
                </span>
                <AppHeading level="headline" headline="lg" as="h3" className="text-[var(--color-text-primary)]">
                  {projects[0].title}
                </AppHeading>
                <AppText variant="body" size="md" color="secondary" className="mt-1 max-w-[50ch]">
                  {projects[0].description}
                </AppText>
              </div>
            </div>
          </div>
        )}

        {/* Remaining projects — grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
          {projects.slice(1).map((project, index) => (
            <div
              key={project.id}
              className={`relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-surface-tertiary)] group cursor-pointer transition-all duration-700 ease-[var(--ease-standard)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <AppText variant="body" size="sm" color="muted">
                  TODO: {project.image}
                </AppText>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-primary)]/90 via-[var(--color-background-primary)]/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-[var(--duration-normal)]" />
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-[var(--color-surface-glass)] opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-[var(--duration-normal)]" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <span className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-md)] text-caption bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)] text-[var(--color-primary-300)] mb-2">
                  {project.category}
                </span>
                <AppHeading level="title" title="md" as="h3" className="text-[var(--color-text-primary)]">
                  {project.title}
                </AppHeading>
                <AppText variant="body" size="sm" color="secondary" className="mt-1 line-clamp-2">
                  {project.description}
                </AppText>
              </div>
            </div>
          ))}
        </div>
      </AppContainer>
    </AppSection>
  );
}
```

---

### Task 8: Partners — Glass Logo Wall

**Files:**

- Modify: `apps/web/src/features/home/components/Partners/Partners.tsx` — full rewrite

- [ ] **Step 1: Rewrite Partners.tsx**

```tsx
"use client";

import { AppContainer, AppSection, AppHeading, AppText, AppCard } from "@tuanh68/ui";
import { useInView } from "../../hooks";
import { partners } from "../../mock/partners";

export function PartnersSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="secondary" spacing="md">
      <AppContainer size="2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <AppText variant="overline" color="accent" as="div" className="mb-4">
            Đối tác
          </AppText>
          <AppHeading level="headline" headline="lg" as="h2" align="center">
            Đối Tác Tin Cậy
          </AppHeading>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-6 gap-4">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`transition-all duration-700 ease-[var(--ease-standard)] ${
                inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AppCard variant="glass" padding="lg" radius="xl" interactive className="group">
                <div className="aspect-[3/2] flex items-center justify-center">
                  <div className="max-h-10 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[var(--duration-normal)]">
                    <AppText variant="body" size="md" color="muted" weight="semibold">
                      {partner.name}
                    </AppText>
                  </div>
                </div>
              </AppCard>
            </div>
          ))}
        </div>
      </AppContainer>
    </AppSection>
  );
}
```

---

### Task 9: FAQ — Glass Accordion

**Files:**

- Modify: `apps/web/src/features/home/components/Faq/Faq.tsx` — enhance with glass cards

- [ ] **Step 1: Rewrite Faq.tsx**

```tsx
"use client";

import { AppContainer, AppSection, AppHeading, AppText, Accordion } from "@tuanh68/ui";
import { faqItems } from "../../mock/faq";

export function FaqSection() {
  return (
    <AppSection background="default" spacing="lg">
      <AppContainer size="lg">
        <div className="text-center mb-12">
          <AppText variant="overline" color="accent" as="div" className="mb-4">
            Hỏi đáp
          </AppText>
          <AppHeading level="headline" headline="lg" as="h2" align="center">
            Câu Hỏi Thường Gặp
          </AppHeading>
        </div>

        <div className="bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)] rounded-[var(--radius-2xl)] p-[var(--spacing-card-md)] laptop:p-[var(--spacing-card-lg)] shadow-[var(--shadow-glass)]">
          <Accordion
            items={faqItems.map((item) => ({
              id: item.id,
              title: item.question,
              content: item.answer,
            }))}
            type="single"
          />
        </div>
      </AppContainer>
    </AppSection>
  );
}
```

---

### Task 10: CTA Section — Bold Gradient with Floating Decorations

**Files:**

- Modify: `apps/web/src/features/home/components/CallToAction/CallToAction.tsx` — full rewrite

- [ ] **Step 1: Rewrite CallToAction.tsx**

```tsx
"use client";

import { AppContainer, AppSection, AppHeading, AppText, AppButton } from "@tuanh68/ui";
import { useInView } from "../../hooks";

export function CallToActionSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="transparent" spacing="lg" className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary-500)]/[0.06] to-transparent" />

      {/* Glass base */}
      <div className="absolute inset-0 bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] mx-[var(--spacing-container-x)] rounded-[var(--radius-3xl)] border border-[var(--color-border-glass)]" />

      {/* Floating decorative elements */}
      <div className="absolute top-12 left-[10%] w-16 h-16 rounded-full bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)] animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-12 right-[15%] w-10 h-10 rounded-full bg-[var(--color-primary-500)]/[0.08] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)] animate-[float_8s_ease-in-out_infinite_1s]" />
      <div className="absolute top-1/3 right-[8%] w-24 h-6 rounded-full bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)] animate-[float_7s_ease-in-out_infinite_0.5s]" />

      <AppContainer size="2xl" className="relative z-10">
        <div
          className={`text-center py-16 laptop:py-24 space-y-8 transition-all duration-700 ease-[var(--ease-standard)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <AppHeading level="display" display="md" as="h2" align="center">
            Sẵn Sàng Hợp Tác?
          </AppHeading>
          <AppText variant="body" size="lg" color="muted" className="max-w-[50ch] mx-auto" as="div">
            Liên hệ ngay để nhận báo giá và tư vấn miễn phí từ đội ngũ chuyên nghiệp của chúng tôi
          </AppText>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <AppButton variant="primary" size="xl" className="shadow-[0_0_20px_var(--color-primary-500)/20]">
              Nhận báo giá ngay
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AppButton>
            <AppButton variant="outline" size="xl">
              Gọi hotline: 1900 XXXX
            </AppButton>
          </div>
        </div>
      </AppContainer>
    </AppSection>
  );
}
```

---

### Task 11: HomePage — Wire Everything Together

**Files:**

- Modify: `apps/web/src/features/home/index.tsx` — add TestimonialsSection import if missing, ensure all sections

- [ ] **Step 1: Verify HomePage index.tsx**

Read the current `apps/web/src/features/home/index.tsx`. It already imports all sections including TestimonialsSection. No changes needed unless imports change. Verify all sections are present:

```tsx
"use client";

import { Navbar, Footer, AppButton } from "@tuanh68/ui";
import { HeroSection } from "./components/Hero";
import { StatisticsSection } from "./components/Statistics";
import { AboutFactorySection } from "./components/AboutFactory";
import { FeaturedProductsSection } from "./components/FeaturedProducts";
import { ManufacturingSection } from "./components/Manufacturing";
import { ProjectsSection } from "./components/Projects";
import { PartnersSection } from "./components/Partners";
import { TestimonialsSection } from "./components/Testimonials";
import { FaqSection } from "./components/Faq";
import { CallToActionSection } from "./components/CallToAction";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Dự án", href: "/projects" },
  { label: "Về chúng tôi", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

const footerColumns = [
  {
    title: "Sản phẩm",
    links: [
      { label: "Ván ép phủ phim 12mm", href: "/products/van-ep-phu-phim-12mm" },
      { label: "Ván ép phủ phim 15mm", href: "/products/van-ep-phu-phim-15mm" },
      { label: "Ván ép phủ phim 18mm", href: "/products/van-ep-phu-phim-18mm" },
      { label: "Coffa đỏ Tuấn Anh 68", href: "/products/coffa-do-tuan-anh-68" },
    ],
  },
  {
    title: "Về chúng tôi",
    links: [
      { label: "Giới thiệu", href: "/about" },
      { label: "Nhà máy", href: "/about#factory" },
      { label: "Quy trình sản xuất", href: "/about#process" },
      { label: "Tin tức", href: "/news" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Câu hỏi thường gặp", href: "/faq" },
      { label: "Chính sách bảo hành", href: "/warranty" },
      { label: "Chính sách vận chuyển", href: "/shipping" },
      { label: "Liên hệ", href: "/contact" },
    ],
  },
  {
    title: "Liên hệ",
    links: [
      { label: "Hotline: 1900 XXXX", href: "tel:1900XXXX" },
      { label: "Email: info@tuananh68.vn", href: "mailto:info@tuananh68.vn" },
      { label: "Bình Dương, Việt Nam", href: "#" },
    ],
  },
];

export function HomePage() {
  return (
    <>
      <Navbar
        variant="glass"
        logo={<span className="text-title-lg font-bold text-[var(--color-primary-300)]">Tuấn Anh 68</span>}
        links={navLinks}
        actions={
          <AppButton variant="primary" size="sm">
            Báo giá
          </AppButton>
        }
      />
      <main>
        <HeroSection />
        <StatisticsSection />
        <AboutFactorySection />
        <FeaturedProductsSection />
        <ManufacturingSection />
        <ProjectsSection />
        <PartnersSection />
        <TestimonialsSection />
        <FaqSection />
        <CallToActionSection />
      </main>
      <Footer
        columns={footerColumns}
        bottomContent={
          <div className="flex flex-col tablet:flex-row items-center justify-between gap-4">
            <span className="text-body-sm text-[var(--color-text-muted)]">
              &copy; {new Date().getFullYear()} Tuấn Anh 68. All rights reserved.
            </span>
            <span className="text-body-sm text-[var(--color-text-subtle)]">Địa chỉ: Bình Dương, Việt Nam</span>
          </div>
        }
      />
    </>
  );
}
```

The HomePage component stays the same — no import changes needed since all exports match.

---

### Task 12: Build & Verify

**Files:** None

- [ ] **Step 1: Typecheck**

Run: `cd apps/web && pnpm typecheck`
Expected: No type errors.

- [ ] **Step 2: Build**

Run: `cd apps/web && pnpm build`
Expected: Build succeeds.

- [ ] **Step 3: Run dev server and verify**

Run: `cd apps/web && pnpm dev`
Expected: Dev server starts at localhost:3000. Open browser and verify:

- Hero loads with animation (gradient background, glass form panel)
- Statistics count-up on scroll
- About Factory with layout and image placeholders
- Products with premium cards
- Manufacturing timeline (horizontal on desktop, vertical on mobile)
- Projects with cinematic overlays
- Partners glass logo wall
- FAQ glass accordion
- CTA with gradient and floating decorations
- Responsive layout on mobile viewport
