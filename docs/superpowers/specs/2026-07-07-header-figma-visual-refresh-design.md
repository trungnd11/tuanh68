# Header Figma Visual Refresh

## Objective

Update the global header to match the Figma design at `RxxMys5Wku0Tgb8s24n9Pk` node `2:354`. All new color values must be defined as CSS custom properties (variables) and used via `var()` in Tailwind.

---

## Token Additions (`apps/web/src/styles/tokens/colors.css`)

| Variable | Value | Purpose |
|---|---|---|
| `--color-accent-teal` | `#48a6a7` | CTA button background |
| `--color-accent-teal-hover` | `#3d9293` | CTA hover state |
| `--color-text-nav-inactive` | `#e5e7eb` | Nav items (non-active) |
| `--color-header-bg-from` | `rgb(15 23 42 / 0.8)` | Header gradient start |
| `--color-header-bg-to` | `rgb(30 41 59 / 0.5)` | Header gradient end |
| `--color-header-border` | `rgb(255 255 255 / 0.15)` | Header bottom border |
| `--color-header-shadow` | `0px 8px 32px 0px rgba(0, 0, 0, 0.4)` | Header box-shadow |

---

## Component Visual Changes

### `AppHeader.tsx`

| Property | Current | Figma |
|---|---|---|
| Background gradient | `180deg, rgb(8 17 29 / 0.82) → rgb(8 17 29 / 0.62)` | `134deg, var(--color-header-bg-from) → var(--color-header-bg-to)` |
| Backdrop blur | `backdrop-blur-glass` | `backdrop-blur-[12px]` |
| Bottom border | `border-border-subtle/60` | `border-[var(--color-header-border)]` |
| Box shadow | `shadow-xs` (on scroll) | `shadow-[var(--color-header-shadow)]` (always visible) |
| Inset highlight | none | `shadow-[inset_0px_1px_0px_0px_rgb(255_255_255_/_0.1)]` (absolute div, pointer-events-none) |

Keep scroll-based secondary gradient layer but adjust its composition colors. Keep scroll-based shadow toggle (`shadow-xs` → the new shadow).

### `NavItem.tsx` (desktop variant)

| Property | Current | Figma |
|---|---|---|
| Text transform | none | `uppercase` |
| Font size | `text-body-sm` (14px) | `text-[14px]` |
| Font weight | `font-medium` | `font-medium` |
| Letter spacing | none | `tracking-[0.35px]` |
| Active text color | `text-primary-300` (gold) | `text-white` |
| Inactive text color | `text-text-secondary` | `text-[var(--color-text-nav-inactive)]` |
| Active background | `bg-primary-500/8` | none (transparent) |
| Underline indicator | gold bar below | remove entirely |
| Text drop-shadow | none | `drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]` |

### `DesktopMenu.tsx`

| Property | Current | Figma |
|---|---|---|
| Item gap | `gap-[2px]` | `gap-[32px]` |

### `SiteChrome.tsx` (app wiring)

| Property | Current | Figma |
|---|---|---|
| Nav label #3 | `{ label: 'Sản phẩm', href: '/products' }` | `{ label: 'Ván phủ phim', href: '/products' }` |
| CTA content | `<AppButton variant="primary" size="lg">Báo giá</AppButton>` | Phone link with icon + `0983 570 760`, `bg-[var(--color-accent-teal)]`, `rounded-[6px]`, href `tel:0983570760` |

### Logo area

Keep current logo structure (SVG icon + "Tuấn Anh 68" wordmark). The Figma uses a plain image + "Tu Anh 68" (no accent); we keep the existing richer brand mark since it matches the brand identity better.

### Mobile/Tablet drawer behavior

No changes — already refined and passing.

---

## Affected Files

1. `apps/web/src/styles/tokens/colors.css` — add 7 new variables
2. `packages/ui/src/navigation/AppHeader.tsx` — gradient, blur, border, shadow, inset highlight
3. `packages/ui/src/navigation/NavItem.tsx` — desktop variant styling (uppercase, tracking, colors, no underline)
4. `packages/ui/src/navigation/DesktopMenu.tsx` — gap spacing
5. `apps/web/src/app/SiteChrome.tsx` — nav label, CTA content
6. `apps/web/src/features/home/components/layout-spacing.test.ts` — update assertions for changed selectors

---

## Out of Scope

- Mobile/tablet drawer behavior (already complete)
- Footer design
- Other page sections
- General component library refactoring

---

## Verification

```bash
pnpm --filter @tuanh68/web test
pnpm lint
pnpm typecheck
pnpm build
```
