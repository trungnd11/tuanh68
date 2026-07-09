# Global Header Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the shared Tuấn Anh 68 header so it feels like a premium industrial corporate header and works cleanly across desktop, tablet, and mobile.

**Architecture:** Keep the global header in `packages/ui/src/navigation/` as a framework-agnostic component driven by props from `apps/web/src/app/SiteChrome.tsx`. Split the header into focused navigation subcomponents so visual behavior, mobile drawer behavior, and menu states can evolve without returning to a generic single-file navbar.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, TailwindCSS v4, design tokens in `apps/web/src/styles/theme.css`, existing `@tuanh68/ui` primitives, Vitest source contract tests.

## Global Constraints

- Keep the header inside `packages/ui/src/navigation/`.
- Keep app-specific content ownership in `apps/web/src/app/SiteChrome.tsx`.
- Preserve the existing token system and `AppContainer` usage.
- Desktop menu items must be: `Trang chủ`, `Giới thiệu`, `Sản phẩm`, `Dự án`, `Tin tức`, `Liên hệ`.
- CTA text must remain `Báo giá`.
- Header must be fixed and always above the hero.
- Heights must be `64px` mobile, `72px` tablet, `80px` desktop.
- Desktop menu must stay centered independently of logo and CTA width.
- Below desktop, do not show an inline CTA in the bar itself; keep CTA inside the drawer.
- Use CSS transitions only. Do not add Framer Motion or other animation libraries.
- Avoid hardcoded colors and spacing when an existing token already exists.
- Keep `packages/ui` framework-agnostic by passing `currentPath` from `apps/web`.

---

### Task 1: Lock The Rebuild Contract In Tests

**Files:**

- Modify: `apps/web/src/features/home/components/layout-spacing.test.ts`

**Interfaces:**

- Consumes: source contents for `packages/ui/src/navigation/AppHeader.tsx` and `apps/web/src/app/SiteChrome.tsx`.
- Produces: failing source-contract assertions that describe the rebuilt header before implementation.

- [ ] **Step 1: Replace old header assertions with rebuild-specific assertions**

Update the existing header test block so it checks the rebuilt source contract instead of the current generic implementation:

```ts
it("keeps header content inside AppContainer with premium responsive height", () => {
  const header = read("packages/ui/src/navigation/AppHeader.tsx");

  expect(header).toContain('<AppContainer size="2xl">');
  expect(header).toContain("flex h-16 tablet:h-[72px] desktop:h-20 items-center justify-between");
  expect(header).toContain("absolute left-1/2 -translate-x-1/2 hidden desktop:flex");
  expect(header).toContain("fixed top-0 left-0 right-0");
});

it("renders mobile navigation as logo plus hamburger with drawer CTA content", () => {
  const header = read("packages/ui/src/navigation/AppHeader.tsx");

  expect(header).toContain("flex desktop:hidden items-center");
  expect(header).toContain("<MobileDrawer");
  expect(header).toContain("hideCloseButton");
  expect(header).toContain("drawerBottom");
});
```

- [ ] **Step 2: Add source assertions for the app-layer integration**

Extend the existing `SiteChrome` contract test with these assertions:

```ts
expect(chrome).toContain("<AppHeader");
expect(chrome).toContain("currentPath={pathname}");
expect(chrome).toContain("{ label: 'Giới thiệu', href: '/about' }");
expect(chrome).toContain("{ label: 'Tin tức', href: '/news' }");
```

- [ ] **Step 3: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: FAIL because the current implementation still reflects the old header structure and behavior.

---

### Task 2: Rebuild Navigation File Structure

**Files:**

- Create: `packages/ui/src/navigation/HeaderLogo.tsx`
- Create: `packages/ui/src/navigation/DesktopNavigation.tsx`
- Create: `packages/ui/src/navigation/DesktopMenu.tsx`
- Create: `packages/ui/src/navigation/NavItem.tsx`
- Create: `packages/ui/src/navigation/HeaderCTA.tsx`
- Create: `packages/ui/src/navigation/MobileNavigation.tsx`
- Create: `packages/ui/src/navigation/HamburgerButton.tsx`
- Create: `packages/ui/src/navigation/HeaderDrawer.tsx`
- Modify: `packages/ui/src/navigation/AppHeader.tsx`
- Modify: `packages/ui/src/navigation/index.ts`

**Interfaces:**

- Consumes: `cn`, `AppContainer`, `AppButton`, `Divider`, `MobileDrawer`, and the existing token-based Tailwind classes.
- Produces:
  - `HeaderLogoProps { children?: React.ReactNode; href?: string; className?: string }`
  - `NavItemProps { href: string; label: string; active?: boolean; onClick?: () => void; mobile?: boolean }`
  - `DesktopMenuProps { links: HeaderLink[]; currentPath?: string }`
  - `DesktopNavigationProps { links: HeaderLink[]; currentPath?: string; cta?: React.ReactNode }`
  - `HeaderCTAProps { children: React.ReactNode; mobile?: boolean }`
  - `HamburgerButtonProps { open: boolean; onClick: () => void }`
  - `MobileNavigationProps { open: boolean; onToggle: () => void }`
  - `HeaderDrawerProps { open: boolean; onClose: () => void; logo?: React.ReactNode; links: HeaderLink[]; currentPath?: string; cta?: React.ReactNode; drawerBottom?: React.ReactNode }`
  - `AppHeaderProps` continues to accept `logo`, `links`, `cta`, `drawerBottom`, `currentPath`

- [ ] **Step 1: Create `NavItem.tsx`**

Add a single-responsibility link component with desktop and mobile variants:

```tsx
import { cn } from "../utils/cn";

export interface NavItemProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

export function NavItem({ href, label, active = false, onClick, mobile = false }: NavItemProps) {
  if (mobile) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center rounded-md px-3 py-3 text-body-md font-medium transition-colors duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          active
            ? "bg-primary-500/10 text-primary-300"
            : "text-text-secondary hover:bg-hover-surface hover:text-text-primary"
        )}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative rounded-md px-3 py-2 transition-colors duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        active && "bg-primary-500/8"
      )}
    >
      <span
        className={cn(
          "text-body-sm font-medium transition-colors duration-fast ease-standard",
          active ? "text-primary-300" : "text-text-secondary group-hover:text-text-primary"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "absolute left-1/2 top-[calc(100%-2px)] h-0.5 -translate-x-1/2 rounded-full bg-primary-400 transition-all duration-fast ease-standard",
          active ? "w-4 opacity-100" : "w-0 opacity-70 group-hover:w-4"
        )}
      />
    </a>
  );
}
```

- [ ] **Step 2: Create `DesktopMenu.tsx`**

Render the approved desktop links and compute active state locally:

```tsx
import type { HeaderLink } from "./AppHeader";
import { NavItem } from "./NavItem";

export interface DesktopMenuProps {
  links: HeaderLink[];
  currentPath?: string;
}

const isActivePath = (currentPath: string | undefined, href: string) =>
  currentPath === href || (href !== "/" && Boolean(currentPath?.startsWith(href)));

export function DesktopMenu({ links, currentPath }: DesktopMenuProps) {
  return (
    <div className="flex items-center gap-[2px]">
      {links.map((link) => (
        <NavItem key={link.href} href={link.href} label={link.label} active={isActivePath(currentPath, link.href)} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `DesktopNavigation.tsx`**

Wrap the centered desktop menu and right-aligned CTA:

```tsx
import type { HeaderLink } from "./AppHeader";
import { DesktopMenu } from "./DesktopMenu";

export interface DesktopNavigationProps {
  links: HeaderLink[];
  currentPath?: string;
  cta?: React.ReactNode;
}

export function DesktopNavigation({ links, currentPath, cta }: DesktopNavigationProps) {
  return (
    <>
      <nav aria-label="Main navigation" className="absolute left-1/2 hidden -translate-x-1/2 desktop:flex">
        <DesktopMenu links={links} currentPath={currentPath} />
      </nav>
      <div className="hidden shrink-0 desktop:flex">{cta}</div>
    </>
  );
}
```

- [ ] **Step 4: Create `HamburgerButton.tsx`**

Move the icon morph out of `AppHeader`:

```tsx
import { cn } from "../utils/cn";

export interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
}

export function HamburgerButton({ open, onClick }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? "Đóng menu" : "Mở menu"}
      className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors duration-fast ease-standard hover:bg-hover-surface hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
    >
      <div className="relative flex h-[18px] w-6 flex-col justify-between">
        <span
          className={cn(
            "block h-[2px] w-full origin-center rounded-full bg-current transition-all duration-300 ease-standard",
            open && "translate-y-[8px] -rotate-45"
          )}
        />
        <span
          className={cn(
            "block h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-standard",
            open && "scale-0 opacity-0"
          )}
        />
        <span
          className={cn(
            "block h-[2px] w-full origin-center rounded-full bg-current transition-all duration-300 ease-standard",
            open && "-translate-y-[8px] rotate-45"
          )}
        />
      </div>
    </button>
  );
}
```

- [ ] **Step 5: Create `MobileNavigation.tsx`**

Render only the mobile trigger area:

```tsx
import { HamburgerButton } from "./HamburgerButton";

export interface MobileNavigationProps {
  open: boolean;
  onToggle: () => void;
}

export function MobileNavigation({ open, onToggle }: MobileNavigationProps) {
  return (
    <div className="flex shrink-0 items-center desktop:hidden">
      <HamburgerButton open={open} onClick={onToggle} />
    </div>
  );
}
```

- [ ] **Step 6: Create `HeaderLogo.tsx` and `HeaderCTA.tsx`**

Keep the shared wrappers small and composable:

```tsx
import { cn } from "../utils/cn";

export interface HeaderLogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export function HeaderLogo({ href = "/", className, children, ...props }: HeaderLogoProps) {
  return (
    <a href={href} aria-label="Trang chủ" className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </a>
  );
}
```

```tsx
export interface HeaderCTAProps {
  children: React.ReactNode;
  mobile?: boolean;
}

export function HeaderCTA({ children, mobile = false }: HeaderCTAProps) {
  return <div className={mobile ? "w-full" : undefined}>{children}</div>;
}
```

- [ ] **Step 7: Create `HeaderDrawer.tsx`**

Build the drawer content shell around `MobileDrawer`:

```tsx
import type { HeaderLink } from "./AppHeader";
import { Divider } from "../display/Divider";
import { MobileDrawer } from "./MobileDrawer";
import { NavItem } from "./NavItem";
import { HeaderLogo } from "./HeaderLogo";

export interface HeaderDrawerProps {
  open: boolean;
  onClose: () => void;
  logo?: React.ReactNode;
  links: HeaderLink[];
  currentPath?: string;
  cta?: React.ReactNode;
  drawerBottom?: React.ReactNode;
}

const isActivePath = (currentPath: string | undefined, href: string) =>
  currentPath === href || (href !== "/" && Boolean(currentPath?.startsWith(href)));

export function HeaderDrawer({ open, onClose, logo, links, currentPath, cta, drawerBottom }: HeaderDrawerProps) {
  return (
    <MobileDrawer
      open={open}
      onClose={onClose}
      side="right"
      hideCloseButton
      className="w-[85vw] max-w-sm bg-[linear-gradient(180deg,rgb(8_17_29/0.95),rgb(16_24_39/0.92))] backdrop-blur-modal"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 pt-6 pb-4">
          {logo ? <HeaderLogo onClick={onClose}>{logo}</HeaderLogo> : <div />}
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors duration-fast ease-standard hover:bg-hover-surface hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            ×
          </button>
        </div>
        <Divider />
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
          {links.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActivePath(currentPath, link.href)}
              onClick={onClose}
              mobile
            />
          ))}
        </nav>
        <div className="space-y-6 px-4 pb-8">
          {cta}
          {drawerBottom}
        </div>
      </div>
    </MobileDrawer>
  );
}
```

- [ ] **Step 8: Rewrite `AppHeader.tsx` as a thin orchestrator**

Replace the current monolithic implementation with a composition shell that imports the new subcomponents and owns only `scrolled` and `menuOpen` state. The key JSX shape should be:

```tsx
<header className={cn("fixed top-0 left-0 right-0 z-(--z-header)", scrolled && "shadow-xs", className)}>
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_17_29/0.72),rgb(8_17_29/0.45))]"
  />
  <div
    aria-hidden="true"
    className={cn(
      "absolute inset-0 bg-[linear-gradient(180deg,rgb(8_17_29/0.22),rgb(8_17_29/0.38))] transition-opacity duration-300 ease-standard backdrop-blur-glass",
      scrolled ? "opacity-100" : "opacity-0"
    )}
  />
  <div
    aria-hidden="true"
    className={cn(
      "absolute bottom-0 left-0 right-0 h-px bg-border-subtle transition-opacity duration-300 ease-standard",
      scrolled ? "opacity-100" : "opacity-0"
    )}
  />

  <div className="relative z-10">
    <AppContainer size="2xl">
      <div className="flex h-16 items-center justify-between tablet:h-[72px] desktop:h-20">
        <div className="shrink-0">{logo && <HeaderLogo>{logo}</HeaderLogo>}</div>
        <DesktopNavigation links={links} currentPath={currentPath} cta={cta} />
        <MobileNavigation open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />
      </div>
    </AppContainer>
  </div>

  <HeaderDrawer
    open={menuOpen}
    onClose={() => setMenuOpen(false)}
    logo={logo}
    links={links}
    currentPath={currentPath}
    cta={cta}
    drawerBottom={drawerBottom}
  />
</header>
```

Keep the scroll listener and body scroll lock inside `AppHeader`.

- [ ] **Step 9: Update `navigation/index.ts` exports**

Export the new components and their types:

```ts
export { AppHeader } from "./AppHeader";
export type { AppHeaderProps, HeaderLink } from "./AppHeader";
export { HeaderLogo } from "./HeaderLogo";
export type { HeaderLogoProps } from "./HeaderLogo";
export { DesktopNavigation } from "./DesktopNavigation";
export type { DesktopNavigationProps } from "./DesktopNavigation";
export { DesktopMenu } from "./DesktopMenu";
export type { DesktopMenuProps } from "./DesktopMenu";
export { NavItem } from "./NavItem";
export type { NavItemProps } from "./NavItem";
export { HeaderCTA } from "./HeaderCTA";
export type { HeaderCTAProps } from "./HeaderCTA";
export { MobileNavigation } from "./MobileNavigation";
export type { MobileNavigationProps } from "./MobileNavigation";
export { HamburgerButton } from "./HamburgerButton";
export type { HamburgerButtonProps } from "./HamburgerButton";
export { HeaderDrawer } from "./HeaderDrawer";
export type { HeaderDrawerProps } from "./HeaderDrawer";
```

- [ ] **Step 10: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: either PASS or reveal the next missing integration requirement before app-layer changes.

---

### Task 3: Rebuild The App-Layer Branding And Integration

**Files:**

- Modify: `apps/web/src/app/SiteChrome.tsx`

**Interfaces:**

- Consumes: `AppHeader`, `HeaderCTA`, `usePathname`, approved desktop links, footer data.
- Produces: app-owned branding, CTA content, drawer contact content, and current path wiring.

- [ ] **Step 1: Update navigation data to the approved IA**

Make sure the header links are exactly:

```ts
const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Dự án", href: "/projects" },
  { label: "Tin tức", href: "/news" },
  { label: "Liên hệ", href: "/contact" },
];
```

- [ ] **Step 2: Replace the generic logo fragment with a token-aligned placeholder brand lockup**

Use an icon + wordmark fragment with no inline colors. Replace current hardcoded `style` and raw hexes with token-backed classes or SVG values that mirror the token palette:

```tsx
logo={
  <>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="2" y="2" width="32" height="32" rx="6" className="fill-primary-500/15 stroke-primary-500" strokeWidth="1.5" />
      <path d="M10 18h16M18 10v16" className="stroke-primary-300" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="18" r="4" className="fill-primary-300/30" />
      <circle cx="18" cy="18" r="1.5" className="fill-primary-300" />
    </svg>
    <span className="text-title-lg font-bold tracking-[-0.02em] text-text-primary">Tuấn Anh 68</span>
  </>
}
```

- [ ] **Step 3: Upgrade the CTA usage to match the approved header behavior**

Wrap the app CTA in a `HeaderCTA` and use a larger button size:

```tsx
cta={
  <HeaderCTA>
    <AppButton variant="primary" size="lg">Báo giá</AppButton>
  </HeaderCTA>
}
```

- [ ] **Step 4: Keep drawer contact content in the app layer**

Pass a branded contact block as `drawerBottom`:

```tsx
drawerBottom={
  <div className="space-y-1.5 border-t border-border-subtle pt-4">
    <p className="text-caption text-text-subtle">Hotline: 1900 XXXX</p>
    <p className="text-caption text-text-subtle">info@tuananh68.vn</p>
    <p className="text-caption text-text-subtle">Bình Dương, Việt Nam</p>
  </div>
}
```

- [ ] **Step 5: Wire `currentPath` through `usePathname()`**

Keep the framework-specific routing hook in the app layer:

```tsx
const pathname = usePathname();
...
<AppHeader currentPath={pathname} ... />
```

- [ ] **Step 6: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: PASS.

---

### Task 4: Polish Drawer Primitive Support

**Files:**

- Modify: `packages/ui/src/navigation/MobileDrawer.tsx`

**Interfaces:**

- Consumes: existing `MobileDrawerProps`, ESC handling, backdrop click handling.
- Produces: drawer primitive that supports the rebuilt header composition cleanly.

- [ ] **Step 1: Keep `hideCloseButton` support and align the shell to the new drawer contract**

Ensure the prop stays in the interface and the inner content wrapper becomes:

```tsx
<div className={cn(hideCloseButton ? "p-0" : "px-4 pb-4")}>{children}</div>
```

- [ ] **Step 2: Upgrade the overlay transition class to feel more premium**

Adjust the overlay classes to include blur perception and a shorter UI-oriented duration than the current generic slow timing:

```tsx
"fixed inset-0 z-[250] bg-overlay/90 backdrop-blur-sm transition-opacity duration-300 ease-standard";
```

- [ ] **Step 3: Tighten the panel transition timing to match the approved motion tone**

Use:

```tsx
"transition-transform duration-300 ease-standard";
```

instead of the generic slower value.

- [ ] **Step 4: Run the focused test suite**

Run: `pnpm --filter @tuanh68/web test`

Expected: PASS.

---

### Task 5: Full Verification

**Files:**

- Verify all changed navigation, app, and test files.

**Interfaces:**

- Consumes: completed Tasks 1-4.
- Produces: verified rebuilt header with passing quality gates.

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

- [ ] **Step 5: Commit the rebuild**

```bash
git add packages/ui/src/navigation apps/web/src/app/SiteChrome.tsx apps/web/src/features/home/components/layout-spacing.test.ts docs/superpowers/specs/2026-07-07-global-header-rebuild-design.md docs/superpowers/plans/2026-07-07-global-header-rebuild.md
git commit -m "feat: rebuild global site header"
```

## Self-Review

- Spec coverage: the plan covers the rebuild scope, app/ui ownership split, fixed glass shell, centered desktop nav, drawer behavior, CTA treatment, accessibility, and verification.
- Placeholder scan: no `TODO`, `TBD`, or unresolved steps remain.
- Type consistency: `HeaderLink`, `AppHeaderProps`, and all subcomponent prop names are defined before downstream tasks rely on them.
