# Homepage/Header Spacing Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix Homepage/Header container, spacing, hierarchy, and responsive layout so the page reads as premium Industrial Luxury and no longer sticks to viewport edges.

**Architecture:** Use shared layout tokens and `AppContainer` as the spacing source of truth. Keep the full-width header and hero background shells, but constrain visible content inside `AppContainer`.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS v4, existing `@tuanh68/ui` primitives.

## Global Constraints

- Do not change business logic.
- Do not create backend code.
- Do not add heavy UI libraries.
- Prefer existing `packages/ui` primitives.
- Container desktop max-width is `1280px`.
- Container horizontal padding is `20px` mobile, `32px` tablet, `48px` desktop.
- Verification must include `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

---

### Task 1: Container Tokens And Base Overflow

**Files:**

- Modify: `apps/web/src/styles/theme.css`
- Modify: `apps/web/src/styles/tokens/spacing.css`
- Modify: `apps/web/src/styles/tokens/layout.css`
- Modify: `apps/web/src/styles/globals.css`
- Verify: `packages/ui/src/layout/AppContainer.tsx`

**Interfaces:**

- Consumes: existing `AppContainer` class `mx-auto w-full px-[var(--spacing-container-x)]`.
- Produces: stable `--spacing-container-x` and `--container-2xl` values used by Header/Homepage sections.

- [ ] **Step 1: Set responsive container token**

Use this token value in both `theme.css` and `tokens/spacing.css`:

```css
--spacing-container-x: clamp(1.25rem, 4.1667vw, 3rem);
```

This maps to `20px` mobile, `32px` at `768px`, and `48px` at desktop.

- [ ] **Step 2: Set desktop max-width**

Use this value in both `theme.css` and `tokens/layout.css`:

```css
--container-2xl: 80rem;
```

- [ ] **Step 3: Prevent accidental horizontal scroll**

Ensure `apps/web/src/styles/globals.css` contains:

```css
html {
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
}
```

- [ ] **Step 4: Verify AppContainer remains the source of truth**

Confirm `packages/ui/src/layout/AppContainer.tsx` keeps:

```tsx
"mx-auto w-full px-[var(--spacing-container-x)]";
```

Expected: no component-specific horizontal page padding is needed outside `AppContainer`.

---

### Task 2: Header Container And Responsive Spacing

**Files:**

- Modify: `packages/ui/src/navigation/Navbar.tsx`

**Interfaces:**

- Consumes: `AppContainer size="2xl"`.
- Produces: full-width header shell with contained nav content and mobile hamburger.

- [ ] **Step 1: Keep full-width header shell**

Header root must keep:

```tsx
"sticky top-0 z-[var(--z-header)] w-full";
```

- [ ] **Step 2: Keep content in AppContainer**

The desktop nav and mobile menu must both be wrapped with:

```tsx
<AppContainer size="2xl">
```

- [ ] **Step 3: Enforce premium header height and alignment**

Use this nav class:

```tsx
className = "flex h-16 items-center justify-between laptop:h-20";
```

Expected: `64px` mobile, `80px` desktop.

- [ ] **Step 4: Improve desktop distribution**

Use this internal structure:

```tsx
<div className="flex min-w-0 items-center gap-10">
  {logo && <div className="shrink-0">{logo}</div>}
  <div className={cn('hidden items-center gap-1', `${desktopBreak}:flex`)}>
    {links.map(...)}
  </div>
</div>
<div className="flex shrink-0 items-center gap-3">
```

Expected: logo never sticks to viewport edge because `AppContainer` supplies horizontal padding.

---

### Task 3: Hero Layout And Hierarchy

**Files:**

- Modify: `apps/web/src/features/home/components/Hero/Hero.tsx`

**Interfaces:**

- Consumes: `AppContainer`, `AppButton`, `AppSurface`, `QuoteForm`, `useInView`.
- Produces: contained hero with two-column desktop layout and stacked mobile layout.

- [ ] **Step 1: Keep full-width shell for background only**

Use this section class:

```tsx
className =
  "relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden bg-[var(--color-background-primary)] laptop:min-h-[calc(100vh-80px)]";
```

- [ ] **Step 2: Add layered premium background**

Hero background should include dark base, radial gold glow, and subtle grid/noise layers inside an absolute `pointer-events-none` wrapper.

- [ ] **Step 3: Constrain hero content**

Hero content must be inside:

```tsx
<AppContainer size="2xl" className="relative z-10 w-full py-20 laptop:py-[120px]">
```

- [ ] **Step 4: Use correct desktop/mobile layout**

Use this layout wrapper:

```tsx
<div className="grid items-center gap-12 laptop:grid-cols-[minmax(0,680px)_440px] laptop:gap-20 desktop:justify-between">
```

Expected: text maxes at `680px`, form is `440px`, desktop gap is `80px`, mobile stacks.

- [ ] **Step 5: Replace loose vertical rhythm**

Use explicit blocks:

```tsx
<div className="max-w-[680px]">
  <div className="inline-flex ...">badge</div>
  <div className="mt-6 space-y-2">headline</div>
  <div className="mt-6">description</div>
  <div className="mt-10 flex flex-wrap gap-4">cta</div>
</div>
```

Expected: badge to headline `24px`, headline to description `24px`, description to CTA `40px`, CTA gap `16px`.

- [ ] **Step 6: Set headline typography**

Use these heading classes:

```tsx
className =
  "text-[2.625rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--color-text-primary)] tablet:text-[3.5rem] laptop:text-[4rem] desktop:text-[5rem]";
```

Use matching secondary line classes with slightly smaller scale and gold gradient.

- [ ] **Step 7: Set CTA button styling**

Primary button class:

```tsx
"bg-[var(--color-primary-500)] px-[22px] py-[14px] text-[var(--color-text-inverse)] rounded-[14px] text-button font-bold shadow-[0_4px_24px_rgb(216_168_74_/_0.3)] hover:bg-[var(--color-primary-400)]";
```

Secondary button class:

```tsx
"border border-[var(--color-border-default)] bg-[var(--color-surface-glass)] px-[22px] py-[14px] text-[var(--color-text-primary)] backdrop-blur-[var(--blur-glass)] rounded-[14px] text-button font-semibold";
```

---

### Task 4: Quote Form Spacing

**Files:**

- Modify: `apps/web/src/features/home/components/Hero/Hero.tsx`
- Modify: `apps/web/src/features/home/components/QuoteForm/QuoteForm.tsx`

**Interfaces:**

- Consumes: existing quote form state and submit handler.
- Produces: `440px` desktop glass form with correct internal spacing.

- [ ] **Step 1: Size hero form column**

Use this form column class in `Hero.tsx`:

```tsx
className = "w-full min-w-0 laptop:w-[440px] laptop:justify-self-end";
```

- [ ] **Step 2: Style form surface**

Use this surface class:

```tsx
className =
  "rounded-[28px] border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] p-6 shadow-[var(--shadow-glass)] backdrop-blur-[var(--blur-glass)] tablet:p-8";
```

- [ ] **Step 3: Preserve business logic**

Keep existing `formData`, `handleChange`, and `handleSubmit` unchanged.

- [ ] **Step 4: Set form spacing and control heights**

Use:

```tsx
<form onSubmit={handleSubmit} className="space-y-[18px]">
```

Inputs/selects keep `className="h-12"`. Submit button keeps:

```tsx
className = "h-[52px] text-[15px] font-bold";
```

---

### Task 5: Stats Section Container And Cards

**Files:**

- Modify: `apps/web/src/features/home/components/Statistics/Statistics.tsx`

**Interfaces:**

- Consumes: existing `statistics`, `CountUp`, and icon list.
- Produces: contained stats grid with premium glass cards.

- [ ] **Step 1: Set section spacing**

Use section class:

```tsx
className = "bg-[var(--color-background-primary)] py-14 laptop:py-20";
```

Expected: `56px` mobile and `80px` desktop.

- [ ] **Step 2: Keep grid in AppContainer**

Use:

```tsx
<AppContainer size="2xl">
  <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
```

- [ ] **Step 3: Set card styling**

Use:

```tsx
className =
  "h-full rounded-[24px] border border-[var(--color-border-glass)] bg-[var(--color-surface-glass)] p-[28px] backdrop-blur-[var(--blur-glass)]";
```

Expected: consistent card height, no edge sticking, glass treatment.

---

### Task 6: Verification

**Files:**

- Verify: package scripts and changed files.

**Interfaces:**

- Consumes: completed Tasks 1-5.
- Produces: passing lint, typecheck, and build evidence.

- [ ] **Step 1: Run lint**

Run: `pnpm lint`

Expected: exits with code `0`.

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`

Expected: exits with code `0`.

- [ ] **Step 3: Run build**

Run: `pnpm build`

Expected: exits with code `0`.

- [ ] **Step 4: Manual responsive check**

Check mobile, tablet, and desktop widths. Expected: Header, Hero, QuoteForm, and Stats content never touches viewport edges and no horizontal scroll appears.

## Self-Review

- Spec coverage: Header, Hero, QuoteForm, Stats, container tokens, background, typography, CTAs, responsive behavior, and verification are covered.
- Placeholder scan: no TBD/TODO/placeholders remain.
- Type consistency: no new exported interfaces are introduced; all tasks use existing React/Tailwind primitives.
