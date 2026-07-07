# Header Figma Visual Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the global header to match Figma design `RxxMys5Wku0Tgb8s24n9Pk` node `2:354` — gradient background, teal CTA, updated nav styling, new tokens.

**Architecture:** Add 7 CSS custom properties to `colors.css`, then update 4 components (`AppHeader`, `NavItem`, `DesktopMenu`, `SiteChrome`) and 1 test file with focused visual changes.

**Tech Stack:** Next.js 16, Tailwind CSS v4, TypeScript, Vitest, `@tuanh68/ui` (internal package)

## Global Constraints

- All new color values MUST be defined as CSS custom properties in `colors.css` and referenced via `var()` in Tailwind classes
- Follow existing Tailwind v4 syntax patterns (`rgb(r g b / alpha)` not `rgba(r,g,b,alpha)`)
- Maintain `'use client'` directive where present
- Do NOT restructure component hierarchy

---

### Task 1: Add CSS token variables + update contract tests

**Files:**
- Modify: `apps/web/src/styles/tokens/colors.css`
- Modify: `apps/web/src/features/home/components/layout-spacing.test.ts`

**Interfaces:**
- Consumes: existing token system conventions in `colors.css`
- Produces: 7 new CSS variables for header use

- [ ] **Step 1: Add 7 new token variables to `colors.css`**

Insert before the closing `}` of `:root`:

```css
  --color-accent-teal: #48a6a7;
  --color-accent-teal-hover: #3d9293;
  --color-text-nav-inactive: #e5e7eb;
  --color-header-bg-from: rgb(15 23 42 / 0.8);
  --color-header-bg-to: rgb(30 41 59 / 0.5);
  --color-header-border: rgb(255 255 255 / 0.15);
  --color-header-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.4);
```

- [ ] **Step 2: Update test assertions for changed selectors**

In `layout-spacing.test.ts`:

Line 71: change `expect(header).toContain('border-b border-border-subtle/60');` to `expect(header).toContain('border-[var(--color-header-border)]');`

Line 72: change `expect(header).toContain('backdrop-blur-glass');` to `expect(header).toContain('backdrop-blur-[12px]');`

- [ ] **Step 3: Run tests to verify they pass (should fail since no implementation yet)**

```bash
pnpm --filter @tuanh68/web test -- --reporter=verbose 2>&1 | head -40
```

Expected: the test at line 71-72 should still fail (old assertions removed, new ones not yet satisfied by implementation). But other tests should be unaffected.

Wait — actually the test reads file contents as strings. If I update the test assertion to check `border-[var(--color-header-border)]` but the implementation (`AppHeader.tsx`) still has `border-border-subtle/60`, the test WILL fail. That's correct TDD — test fails, then we implement.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/styles/tokens/colors.css apps/web/src/features/home/components/layout-spacing.test.ts
git commit -m "feat(tokens): add header Figma color tokens and update test assertions"
```

---

### Task 2: Update AppHeader.tsx visuals

**Files:**
- Modify: `packages/ui/src/navigation/AppHeader.tsx`

**Interfaces:**
- Consumes: `--color-header-*`, `--color-accent-teal` tokens from Task 1
- Produces: visually updated header component

- [ ] **Step 1: Replace background gradient layers**

In the first gradient div (line 60-61), change:
```
bg-[linear-gradient(180deg,rgb(8_17_29/0.82),rgb(8_17_29/0.62))] backdrop-blur-glass
```
to:
```
bg-[linear-gradient(134.29deg,var(--color-header-bg-from),var(--color-header-bg-to))] backdrop-blur-[12px]
```

In the second (scroll-based) gradient div (line 64-66), change the gradient to use the new tokens so the scroll layer also matches the Figma palette:
```
bg-[linear-gradient(180deg,var(--color-header-bg-from)_30%,var(--color-header-bg-to)_80%)]
```

- [ ] **Step 2: Replace border class**

On line 51, change `border-border-subtle/60` to `border-[var(--color-header-border)]`

- [ ] **Step 3: Replace shadow**

On line 53, change `scrolled && 'shadow-xs'` to `scrolled && 'shadow-[var(--color-header-shadow)]'`

- [ ] **Step 4: Add inset top highlight div**

After the second gradient div (after line 68), add:
```tsx
<div
  aria-hidden="true"
  className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgb(255_255_255_/_0.1)]"
/>
```

- [ ] **Step 5: Run passing test**

```bash
pnpm --filter @tuanh68/web test -- --reporter=verbose 2>&1 | head -40
```

Expected: the test at line 71-72 should now PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/ui/src/navigation/AppHeader.tsx
git commit -m "feat(header): update gradient, blur, shadow, border, add inset highlight per Figma"
```

---

### Task 3: Update NavItem desktop styling

**Files:**
- Modify: `packages/ui/src/navigation/NavItem.tsx`

**Interfaces:**
- Consumes: `--color-text-nav-inactive` token from Task 1
- Produces: updated desktop nav item rendering

- [ ] **Step 1: Update the desktop NavItem variant**

Change the desktop `<a>` element's className block (lines 36-53):

```tsx
<a
  href={href}
  onClick={onClick}
  aria-current={active ? 'page' : undefined}
  className={cn(
    'group relative rounded-md px-3 py-2 transition-colors duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]',
  )}
>
  <span
    className={cn(
      'text-[14px] font-medium uppercase tracking-[0.35px] transition-colors duration-fast ease-standard',
      active ? 'text-white' : 'text-[var(--color-text-nav-inactive)] group-hover:text-white',
    )}
  >
    {label}
  </span>
</a>
```

Key changes from current:
- Removed `active && 'bg-primary-500/8'` from anchor
- Added `drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]` to anchor
- Changed `text-body-sm` to `text-[14px]`
- Added `uppercase` and `tracking-[0.35px]`
- Changed active text from `text-primary-300` to `text-white`
- Changed inactive text from `text-text-secondary` to `text-[var(--color-text-nav-inactive)]`
- Removed the underline indicator `<span>` entirely

- [ ] **Step 2: Verify compilation**

```bash
pnpm lint 2>&1 | tail -10
pnpm typecheck 2>&1 | tail -10
```

Expected: clean lint and typecheck.

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/navigation/NavItem.tsx
git commit -m "feat(navitem): apply Figma typography and color styling to desktop variant"
```

---

### Task 4: Update DesktopMenu gap

**Files:**
- Modify: `packages/ui/src/navigation/DesktopMenu.tsx`

- [ ] **Step 1: Change gap from 2px to 32px**

Line 14: change `gap-[2px]` to `gap-[32px]`

- [ ] **Step 2: Commit**

```bash
git add packages/ui/src/navigation/DesktopMenu.tsx
git commit -m "fix(desktopmenu): increase nav item gap to 32px per Figma"
```

---

### Task 5: Update SiteChrome CTA and nav label

**Files:**
- Modify: `apps/web/src/app/SiteChrome.tsx`

**Interfaces:**
- Consumes: `--color-accent-teal`, `--color-accent-teal-hover` tokens from Task 1
- Produces: updated CTA (phone link) and nav label

- [ ] **Step 1: Change nav label "Sản phẩm" to "Ván phủ phim"**

Line 9: change `{ label: 'Sản phẩm', href: '/products' },` to `{ label: 'Ván phủ phim', href: '/products' },`

- [ ] **Step 2: Replace CTA content**

Lines 73-76: replace:
```tsx
<HeaderCTA>
  <AppButton variant="primary" size="lg">Báo giá</AppButton>
</HeaderCTA>
```
with:
```tsx
<HeaderCTA>
  <a
    href="tel:0983570760"
    className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--color-accent-teal)] px-5 py-2 text-[14px] font-bold text-white shadow-lg transition-colors duration-fast ease-standard hover:bg-[var(--color-accent-teal-hover)]"
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M13 10.08v1.77a1.18 1.18 0 0 1-1.29 1.18 11.66 11.66 0 0 1-5.07-1.81 11.5 11.5 0 0 1-3.53-3.52A11.67 11.67 0 0 1 1.3 2.29 1.18 1.18 0 0 1 2.47 1h1.77a1.18 1.18 0 0 1 1.18.95 7.57 7.57 0 0 0 .41 1.67 1.18 1.18 0 0 1-.27 1.25l-.75.75a9.44 9.44 0 0 0 3.53 3.52l.75-.75a1.18 1.18 0 0 1 1.25-.27 7.57 7.57 0 0 0 1.67.41A1.18 1.18 0 0 1 13 10.08z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    0983 570 760
  </a>
</HeaderCTA>
```

- [ ] **Step 3: Verify build**

```bash
pnpm --filter @tuanh68/web test 2>&1 | tail -10
pnpm lint 2>&1 | tail -10
pnpm typecheck 2>&1 | tail -10
pnpm build 2>&1 | tail -15
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/app/SiteChrome.tsx
git commit -m "feat(sitechrome): update CTA to phone link and rename nav label per Figma"
```

---

### Task 6: Final verification

- [ ] **Step 1: Run full test suite**

```bash
pnpm --filter @tuanh68/web test
pnpm lint
pnpm typecheck
pnpm build
```

- [ ] **Step 2: Verify no stale artifacts**

```bash
pnpm --filter @tuanh68/web clean 2>/dev/null; pnpm build 2>&1 | tail -5
```
