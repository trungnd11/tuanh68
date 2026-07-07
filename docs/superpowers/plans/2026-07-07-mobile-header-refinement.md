# Mobile Header Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the mobile and tablet header experience so the header bar, open-state drawer, and motion feel intentionally designed rather than technically functional.

**Architecture:** Keep the existing header decomposition in `packages/ui/src/navigation/`, but refine the mobile/tablet behavior inside `HamburgerButton`, `MobileNavigation`, `HeaderDrawer`, and `MobileDrawer`. Mobile and tablet share one `menuOpen` state, but use different open-direction rules: mobile drops a full-width sheet from the top, tablet keeps a right-side panel.

**Tech Stack:** Next.js 16, React 19, TypeScript, TailwindCSS v4, design tokens from `apps/web/src/styles/theme.css`, existing `@tuanh68/ui`, Vitest source-contract tests.

## Global Constraints

- Keep the header inside `packages/ui/src/navigation/`.
- Keep app-specific content ownership in `apps/web/src/app/SiteChrome.tsx`.
- Preserve `AppContainer` usage for the header bar.
- Mobile `< 768px` must open as a full-width sheet dropping from the top.
- Tablet `>= 768px` and below desktop must open as a right-side panel.
- Below desktop, do not show an inline CTA in the header bar; CTA stays inside the open panel/sheet.
- Use CSS transitions only.
- Avoid hardcoded colors and spacing when an existing token already exists.
- Keep `currentPath` as a prop coming from `apps/web`.

---

### Task 1: Lock the Mobile/Tablet Redesign in Tests

**Files:**
- Modify: `apps/web/src/features/home/components/layout-spacing.test.ts`

**Interfaces:**
- Consumes: `HamburgerButton.tsx`, `HeaderDrawer.tsx`, `MobileDrawer.tsx`, `AppHeader.tsx` source.
- Produces: failing source-contract tests that describe the intended mobile/tablet refinement before implementation.

- [ ] **Step 1: Add mobile-sheet and tablet-drawer source assertions**

Add a new test block like this:

```ts
it('uses a top-drop full-width sheet on mobile and a right drawer on tablet', () => {
  const drawer = read('packages/ui/src/navigation/HeaderDrawer.tsx');
  const primitive = read('packages/ui/src/navigation/MobileDrawer.tsx');

  expect(drawer).toContain("mobile:w-screen mobile:max-w-none");
  expect(drawer).toContain("tablet:w-[85vw] tablet:max-w-sm");
  expect(primitive).toContain("translate-y-[-100%]");
  expect(primitive).toContain("tablet:translate-y-0");
  expect(primitive).toContain("tablet:translate-x-[100%]");
});
```

- [ ] **Step 2: Add source assertions for the refined mobile header bar**

Add a second test:

```ts
it('gives the mobile header bar its own visible glass surface and keeps CTA out of the bar', () => {
  const header = read('packages/ui/src/navigation/AppHeader.tsx');
  const mobileNavigation = read('packages/ui/src/navigation/MobileNavigation.tsx');

  expect(header).toContain('border-b border-border-subtle/60');
  expect(header).toContain('backdrop-blur-glass');
  expect(mobileNavigation).not.toContain('AppButton');
});
```

- [ ] **Step 3: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: FAIL because the current mobile header and drawer do not yet match the refined motion and layout contract.

---

### Task 2: Refine the Hamburger Trigger Visibility and Motion

**Files:**
- Modify: `packages/ui/src/navigation/HamburgerButton.tsx`
- Modify: `packages/ui/src/navigation/MobileNavigation.tsx`

**Interfaces:**
- Consumes: current `open: boolean`, `onClick: () => void`, token-based text and hover colors.
- Produces:
  - `HamburgerButtonProps { open: boolean; onClick: () => void }`
  - `MobileNavigationProps { open: boolean; onToggle: () => void }`

- [ ] **Step 1: Make the icon lines visually robust without utility fragility**

Keep the current `currentColor` strategy, but make the trigger feel more deliberate by adding an always-visible subtle surface:

```tsx
className="flex h-10 w-10 items-center justify-center rounded-md border border-border-glass/60 bg-surface-glass/70 text-text-primary transition-all duration-300 ease-standard hover:border-border-strong hover:bg-hover-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
```

Keep each bar using:

```tsx
style={{ backgroundColor: 'currentColor' }}
```

- [ ] **Step 2: Slightly strengthen the open-state affordance**

When `open` is true, add a wrapper class to the button:

```tsx
open && 'bg-primary-500/10 text-primary-300 border-primary-500/30'
```

Apply it in `cn(...)` so the hamburger visibly transitions into the active state.

- [ ] **Step 3: Keep `MobileNavigation` as a pure wrapper**

Make sure `MobileNavigation.tsx` still only renders the trigger region:

```tsx
export function MobileNavigation({ open, onToggle }: MobileNavigationProps) {
  return (
    <div className="flex shrink-0 items-center desktop:hidden">
      <HamburgerButton open={open} onClick={onToggle} />
    </div>
  );
}
```

- [ ] **Step 4: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: Either PASS for the trigger-related contract or only the drawer-layout contract remains failing.

---

### Task 3: Rebuild the MobileDrawer Primitive for Two Motion Axes

**Files:**
- Modify: `packages/ui/src/navigation/MobileDrawer.tsx`

**Interfaces:**
- Consumes: `open`, `onClose`, `side`, `hideCloseButton`, `className`, `children`.
- Produces: a primitive that supports vertical mobile motion and horizontal tablet motion without changing the public prop API.

- [ ] **Step 1: Update the backdrop to feel more deliberate on open**

Replace the overlay classes with:

```tsx
'fixed inset-0 z-[250] bg-overlay/80 backdrop-blur-md transition-opacity duration-300 ease-standard'
```

Keep:

```tsx
open ? 'opacity-100' : 'pointer-events-none opacity-0'
```

- [ ] **Step 2: Change the panel base position to support top-drop mobile behavior**

Replace the panel shell classes so the panel becomes full-width on mobile and right-docked only from tablet upward:

```tsx
'fixed top-0 right-0 left-0 z-[var(--z-drawer)] w-screen max-w-none tablet:left-auto tablet:w-[85vw] tablet:max-w-sm'
```

- [ ] **Step 3: Use a dual-axis closed state**

Replace the current translate logic:

```tsx
open ? 'translate-x-0' : side === 'right' ? 'translate-x-[100%]' : '-translate-x-[100%]'
```

with a mobile-first top-drop + tablet side-drawer model:

```tsx
open
  ? 'translate-y-0 tablet:translate-x-0'
  : side === 'right'
    ? 'translate-y-[-100%] tablet:translate-y-0 tablet:translate-x-[100%]'
    : 'translate-y-[-100%] tablet:translate-y-0 tablet:-translate-x-[100%]'
```

- [ ] **Step 4: Keep transition timing on transform only**

Keep:

```tsx
'transition-transform duration-300 ease-standard'
```

This preserves the approved motion tone.

- [ ] **Step 5: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: PASS for the new motion-direction contract.

---

### Task 4: Style the HeaderDrawer as a Mobile Sheet and Tablet Panel

**Files:**
- Modify: `packages/ui/src/navigation/HeaderDrawer.tsx`

**Interfaces:**
- Consumes: `HeaderDrawerProps { open, onClose, logo, links, currentPath, cta, drawerBottom }` and the refined `MobileDrawer` primitive.
- Produces: a mobile-first full-width sheet and a tablet side panel that share content but not identical framing.

- [ ] **Step 1: Update the `MobileDrawer` className passed from `HeaderDrawer`**

Replace the current className with one that distinguishes mobile and tablet shapes:

```tsx
className="mobile:w-screen mobile:max-w-none tablet:w-[85vw] tablet:max-w-sm bg-[linear-gradient(180deg,rgb(8_17_29/0.96),rgb(16_24_39/0.94))] backdrop-blur-modal border-b border-border-glass tablet:border-b-0 tablet:border-l shadow-[0_24px_80px_rgb(0_0_0_/_0.38)]"
```

Use `left-0` and `right-0` behavior from the primitive; `HeaderDrawer` only provides the visual shell.

- [ ] **Step 2: Increase mobile content spacing to make the open state feel designed**

Adjust the internal layout from:

```tsx
<div className="flex h-full flex-col">
```

to:

```tsx
<div className="flex min-h-[100svh] flex-col tablet:min-h-full">
```

Then update inner spacing:

```tsx
<div className="flex items-center justify-between px-5 pt-5 pb-4 tablet:px-4 tablet:pt-6 tablet:pb-4">
...
<nav className="flex-1 space-y-1 px-5 py-6 tablet:px-4 tablet:py-6 overflow-y-auto" ...>
...
<div className="space-y-6 px-5 pb-8 tablet:px-4">
```

- [ ] **Step 3: Make the CTA read as a block action in the sheet**

Wrap the passed CTA inside a full-width container:

```tsx
<div className="w-full [&>*]:w-full">
  {cta}
</div>
```

Keep `drawerBottom` below it.

- [ ] **Step 4: Ensure the mobile sheet feels attached to the header**

Add a top divider treatment that is stronger on mobile and lighter on tablet, for example:

```tsx
<Divider className="border-border-glass/80 tablet:border-divider" />
```

- [ ] **Step 5: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: PASS.

---

### Task 5: Refine the Mobile Header Bar Surface

**Files:**
- Modify: `packages/ui/src/navigation/AppHeader.tsx`

**Interfaces:**
- Consumes: existing `AppHeaderProps`, `DesktopNavigation`, `HeaderLogo`, `MobileNavigation`, `HeaderDrawer`, `AppContainer`.
- Produces: a clearer mobile header bar without changing the public API.

- [ ] **Step 1: Give the header shell a visible mobile-first border**

Update the header class list from:

```tsx
'fixed top-0 left-0 right-0 z-[var(--z-header)]'
```

to include:

```tsx
'fixed top-0 left-0 right-0 z-[var(--z-header)] border-b border-border-subtle/60'
```

- [ ] **Step 2: Strengthen the resting mobile glass state**

Update the first background layer from:

```tsx
className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_17_29/0.72),rgb(8_17_29/0.45))] backdrop-blur-sm"
```

to:

```tsx
className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_17_29/0.82),rgb(8_17_29/0.62))] backdrop-blur-glass"
```

This gives the mobile bar enough visual presence even before scroll.

- [ ] **Step 3: Keep desktop scroll behavior intact**

Do not remove the darker overlay layer or the scroll-triggered shadow. Only make the resting mobile bar more legible.

- [ ] **Step 4: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: PASS.

---

### Task 6: Full Verification

**Files:**
- Verify all changed navigation, app, and test files.

**Interfaces:**
- Consumes: completed Tasks 1-5.
- Produces: verified mobile/tablet header refinement.

- [ ] **Step 1: Run web tests**

Run: `pnpm --filter @tuanh68/web test`

Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `pnpm lint`

Expected: PASS.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`

Expected: PASS.

- [ ] **Step 4: Run production build**

Run: `pnpm build`

Expected: PASS.

- [ ] **Step 5: Commit the refinement**

```bash
git add packages/ui/src/navigation apps/web/src/features/home/components/layout-spacing.test.ts docs/superpowers/specs/2026-07-07-global-header-rebuild-design.md docs/superpowers/plans/2026-07-07-mobile-header-refinement.md
git commit -m "feat: refine mobile header behavior"
```

## Self-Review

- Spec coverage: the plan covers the mobile full-width top-drop sheet, tablet right-side panel, stronger mobile bar surface, CTA staying out of the bar, and verification.
- Placeholder scan: no `TODO`, `TBD`, or vague implementation steps remain.
- Type consistency: `HeaderDrawerProps`, `MobileDrawerProps`, `MobileNavigationProps`, and `HamburgerButtonProps` remain consistent across tasks.
