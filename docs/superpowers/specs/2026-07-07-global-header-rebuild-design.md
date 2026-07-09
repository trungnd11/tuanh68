# Global Header Rebuild Design

## Goal

Rebuild the shared website header for Tuấn Anh 68 so it feels like a premium industrial corporate brand rather than a generic navbar, while staying production-ready in the existing Next.js 16, React 19, Tailwind v4, and `packages/ui` architecture.

## Product Context

Tuấn Anh 68 is a manufacturer of film-faced plywood, coppha, and construction materials. The website serves as a corporate presence and a lead generation surface for contractors, dealers, investors, and construction businesses.

The header must immediately communicate:

- scale
- precision
- trust
- premium positioning
- calm, modern restraint

## Scope

- Rebuild the global header used by `SiteChrome`.
- Keep the header inside `packages/ui/src/navigation/`.
- Keep app-specific content ownership in `apps/web/src/app/SiteChrome.tsx`.
- Rework the current header into a clear component structure instead of a single generic navbar implementation.
- Preserve the existing token system and `AppContainer` usage.
- Support desktop, tablet, and mobile behavior defined in the approved design.

## Out of Scope

- Mega menu
- Search
- Language switcher
- Announcement bar
- Router abstraction beyond a `currentPath` prop
- Framer Motion or other animation libraries

## Design Direction

The header follows an "Invisible Luxury" direction: visually quiet at first load, then more present after scroll. It should feel architectural rather than decorative.

The visual character is:

- dark glass, not glossy glass
- gold used sparingly as a signal, not a wash
- centered navigation as a discipline axis
- quiet motion with short, precise transitions

This avoids the visual patterns of Bootstrap navbars, WordPress themes, and free templates.

## Information Architecture

Desktop menu items:

- Trang chủ
- Giới thiệu
- Sản phẩm
- Dự án
- Tin tức
- Liên hệ

The header also exposes a primary CTA: `Báo giá`.

The mobile drawer contains:

- logo
- divider
- menu
- CTA
- contact details

## Layout

The header is fixed and always sits above the hero.

Core layout rules:

- `position: fixed`
- `top: 0`, `left: 0`, `right: 0`
- high z-index
- full-width shell
- content constrained by `AppContainer size="2xl"`

Heights:

- mobile: `64px`
- tablet: `72px`
- desktop: `80px`

Desktop structure:

- logo pinned left
- menu centered absolutely with `left-1/2 -translate-x-1/2`
- CTA pinned right

The centered menu must remain visually centered regardless of logo or CTA width.

## Visual System

The header background uses layered glassmorphism rather than a flat fill.

Layers:

- dark gradient base
- secondary dark overlay that fades in on scroll
- backdrop blur
- subtle bottom border
- very light shadow that appears on scroll

Top-of-page state:

- nearly transparent
- lighter perceived blur
- border almost invisible
- no visible shadow

Scrolled state:

- darker, more settled glass
- clearer border
- light shadow appears
- transition duration: `300ms`

The exact effect should be built from design tokens and existing Tailwind v4 utilities, with arbitrary values used only where tokens do not already express the approved gradient language.

## Typography and Brand Treatment

Logo consists of:

- a geometric placeholder icon if the final brand mark is unavailable
- a text wordmark

The wordmark should feel compact and precise:

- strong weight
- tight tracking
- bright neutral text with restrained gold accenting

Menu typography:

- calm body or title-small scale
- medium or semibold weight
- no oversized navigation labels

## Interaction Design

### Desktop Navigation

Hover behavior:

- text brightens
- underline animates from center outward
- opacity/contrast changes subtly

Active behavior:

- active text is brighter or softly gold-accented
- underline remains visible
- optional low-opacity active surface is allowed if it stays quiet

### CTA

The `Báo giá` button remains primary gold:

- brighter on hover
- very light shadow
- generous horizontal padding
- radius from design tokens

### Scroll Behavior

When the page scrolls beyond a small threshold, the header transitions into the settled glass state. The header does not auto-hide.

## Mobile and Tablet Behavior

Desktop menu is hidden below desktop breakpoint.

Mobile/tablet header shows:

- logo left
- hamburger right
- no inline CTA in the bar itself below desktop; CTA moves into the drawer

The mobile and tablet open states intentionally use different motion directions:

- mobile `< 768px`: a full-width sheet that drops from the top
- tablet `>= 768px` and below desktop: a side panel that slides in from the right

Mobile open state:

- `w-screen max-w-none`
- downward sheet motion from above the viewport
- visually continuous with the header bar
- dark glass background, visible backdrop, stronger open-state contrast than the resting mobile bar

Tablet open state:

- width around `80-85vw`, capped so it does not feel oversized on larger screens
- slide-in motion from the right
- more separated panel feel than mobile
- backdrop fade and blur remain active

## Animation

Use CSS transitions only.

Required motion:

- hamburger morphs into `X`
- mobile sheet drops from top
- tablet drawer slides in from right
- overlay fades in
- nav underline animates on hover
- glass layers fade between top-of-page and scrolled states

Timing:

- hamburger: `250-300ms`
- scroll state: `300ms`
- drawer: `300-420ms`

Motion tone:

- precise
- calm
- not playful
- not bouncy

## Accessibility

- keyboard reachable logo, nav items, CTA, hamburger, close button
- `aria-label` on logo and toggle buttons
- `aria-expanded` on hamburger
- `aria-current="page"` on active item
- drawer uses `role="dialog"` and `aria-modal="true"`
- escape closes drawer
- click backdrop closes drawer
- clicking a menu item closes drawer
- body scroll locks while drawer is open
- visible focus ring on all interactive controls

## Component Architecture

Rebuild the header around focused units inside `packages/ui/src/navigation/`:

- `AppHeader`
- `HeaderLogo`
- `DesktopNavigation`
- `DesktopMenu`
- `NavItem`
- `HeaderCTA`
- `MobileNavigation`
- `HamburgerButton`
- `HeaderDrawer`

Responsibility split:

- `AppHeader`: shell, scroll state, composition
- `HeaderLogo`: logo icon + wordmark + home link
- `DesktopNavigation`: desktop layout orchestration
- `DesktopMenu`: list rendering for desktop
- `NavItem`: active, hover, underline behavior
- `HeaderCTA`: CTA presentation
- `MobileNavigation`: mobile trigger region
- `HamburgerButton`: icon morph animation
- `HeaderDrawer`: mobile drawer content and close behavior

`packages/ui` should remain framework-agnostic. App routing state is passed in from `apps/web` through `currentPath` rather than pulling router hooks directly into the shared UI package.

## Integration

`apps/web/src/app/SiteChrome.tsx` remains the app-layer composition point. It provides:

- `currentPath`
- link list
- brand logo content
- CTA content
- drawer contact content

The homepage feature must continue to avoid owning its own header.

## Testing and Verification

Update or add focused contract coverage for:

- header uses `AppContainer`
- responsive height rules are present in source
- desktop menu is centered independently of logo and CTA
- `SiteChrome` renders the shared header
- homepage feature does not render its own header

Run:

- `pnpm --filter @tuanh68/web test`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

## Implementation Notes

- Prefer the smallest correct rebuild over introducing a new design system layer.
- Reuse existing primitives such as `AppContainer`, `AppButton`, `Divider`, and any drawer helper that still fits the approved architecture.
- Remove or reduce generic-navbar assumptions from the current header implementation.
- Avoid hardcoded colors and spacing when an existing token already exists.
