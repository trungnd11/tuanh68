# Homepage Layout Chrome Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move shared Header/Footer chrome from the homepage feature into the app layout.

**Architecture:** `RootLayout` owns global site chrome around route children. `HomePage` owns only homepage sections inside `<main>`.

**Tech Stack:** Next.js App Router, React, TypeScript, existing `@tuanh68/ui`, Vitest static contract tests.

## Global Constraints

- Do not change business logic.
- Do not change Header/Footer copy, links, or visual styling.
- Do not add backend code.
- Do not add heavy UI libraries.
- Keep `apps/web/src/app/page.tsx` unchanged.

---

### Task 1: Static Contract Test

**Files:**

- Modify: `apps/web/src/features/home/components/layout-spacing.test.ts`

**Interfaces:**

- Consumes: file contents for `apps/web/src/features/home/index.tsx` and `apps/web/src/app/layout.tsx`.
- Produces: failing test proving Header/Footer are currently in the wrong file.

- [ ] **Step 1: Add assertions**

Add a test that asserts:

```ts
expect(home).not.toContain("<Navbar");
expect(home).not.toContain("<Footer");
expect(layout).toContain("<Navbar");
expect(layout).toContain("<Footer");
```

- [ ] **Step 2: Run failing test**

Run: `pnpm --filter @tuanh68/web test`

Expected: FAIL because `HomePage` currently renders `<Navbar>` and `<Footer>`.

---

### Task 2: Move Chrome To RootLayout

**Files:**

- Modify: `apps/web/src/app/layout.tsx`
- Modify: `apps/web/src/features/home/index.tsx`

**Interfaces:**

- Consumes: existing `Navbar`, `Footer`, `AppButton`, `navLinks`, and `footerColumns` usage.
- Produces: Root layout wrapping every route with Header/Footer; HomePage returns only content.

- [ ] **Step 1: Update RootLayout imports and constants**

Move `Navbar`, `Footer`, `AppButton`, `navLinks`, and `footerColumns` into `apps/web/src/app/layout.tsx`.

- [ ] **Step 2: Wrap children with Header/Footer**

Change body content to:

```tsx
<body suppressHydrationWarning>
  <Navbar ... />
  {children}
  <Footer ... />
</body>
```

- [ ] **Step 3: Simplify HomePage**

Remove Header/Footer imports/constants and return only:

```tsx
<main>
  <HeroSection />
  ...
</main>
```

---

### Task 3: Verification

**Files:**

- Verify changed app/home files and tests.

**Interfaces:**

- Consumes: completed Tasks 1-2.
- Produces: verified refactor.

- [ ] **Step 1: Run focused tests**

Run: `pnpm --filter @tuanh68/web test`

Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `pnpm lint`

Expected: PASS.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`

Expected: PASS.

- [ ] **Step 4: Run build**

Run: `pnpm build`

Expected: PASS.

## Self-Review

- Spec coverage: Header/Footer move, HomePage simplification, no style/copy/business changes, and verification are covered.
- Placeholder scan: no placeholders remain.
- Type consistency: no new exported interfaces are introduced.
