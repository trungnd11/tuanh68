# @tuanh68/ui — Tuấn Anh 68 UI Foundation

Production-grade UI Foundation component library for Landing Website, Corporate Website, CMS Admin, and Dashboard.

## Component Philosophy

- **Design token first** — Every component references CSS custom properties from the design token system. No hardcoded colors, spacing, or radius.
- **Composable over monolithic** — Small, focused components that compose well (AppSection > AppContainer > AppSurface > AppCard).
- **Accessibility built-in** — Keyboard navigation, focus rings, ARIA attributes, reduced motion support.
- **TypeScript strict** — Zero `any` types, full type inference.

## Naming Convention

All components use the `App` prefix namespace to distinguish from native HTML elements and third-party components:

| Pattern | Example | Purpose |
|---------|---------|---------|
| `App{Category}` | `AppContainer`, `AppSurface` | Foundation layout/surface |
| `App{Thing}` | `AppButton`, `AppCard`, `AppBadge` | Interactive components |
| `{PlainName}` | `Breadcrumb`, `Divider`, `Skeleton` | Display-only components |

## Folder Structure

```
src/
├── layout/         # AppContainer, AppSection, AppStack, AppGrid, AppFlex
├── surface/        # AppSurface (glass, solid, outlined, elevated, default)
├── typography/     # AppHeading, AppText, AppBadge
├── button/         # AppButton (primary, secondary, outline, ghost, link)
├── form/           # AppInput, AppTextarea, AppSelect, AppCheckbox, AppRadio, AppField, etc.
├── display/        # Divider, Avatar, IconBox, EmptyState, LoadingSpinner, Skeleton
├── data-display/   # StatisticCard, FeatureCard, InfoCard, GlassCard
├── navigation/     # Navbar, MobileDrawer, Footer, Breadcrumb
├── card/           # AppCard (glass, solid, outline, elevated, interactive)
├── hooks/          # useId, useMediaQuery, useReducedMotion
├── utils/          # cn() utility
├── types/          # Shared TypeScript types
└── styles/         # Component-specific CSS modules
```

## When to Use Each Component

### Layout

| Goal | Component | Why |
|------|-----------|-----|
| Max-width centered content | `AppContainer` | Sets max-width via token, auto margins, container-x padding |
| Page/feature section | `AppSection` | Full-width wrapper with section spacing and background variant |
| Vertical/horizontal stack | `AppStack` | Flex layout with token-based gap, alignment, direction |
| Responsive grid | `AppGrid` | CSS Grid with responsive column counts and token gaps |
| Custom flex layout | `AppFlex` | Full flexbox control with gap, wrap, alignment |

### Surface

| Goal | Component | Variant |
|------|-----------|---------|
| Default card | `AppSurface` or `AppCard` | `default` / `solid` |
| Glass effect | `AppSurface` or `AppCard` | `glass` |
| Transparent card | `AppSurface` | `outlined` |
| Clickable card | `AppCard` | `interactive: true` |
| Dashboard metric | `StatisticCard` | Composes AppCard |
| Marketing feature | `FeatureCard` | Composes AppCard |

### Typography

| Role | Component | Props |
|------|-----------|-------|
| Page heading | `AppHeading` | `level="display"` or `level="headline"` |
| Section title | `AppHeading` | `level="title"` |
| Body content | `AppText` | `variant="body"` |
| Label | `AppText` | `variant="label"` |
| Status indicator | `AppBadge` | `variant="primary"` / `"success"` / `"danger"` |

### Button

| Use Case | Variant |
|----------|---------|
| Primary CTA | `primary` |
| Secondary action | `secondary` |
| Low emphasis | `ghost` |
| Navigation link styled as button | `link` |
| Loading state | Set `loading` prop |
| Full-width mobile button | Set `fullWidth` prop |

## Accessibility

- All interactive elements are keyboard-focusable and have visible focus rings
- Form inputs have associated labels via `AppField` or explicit `aria-label`
- Loading states use `aria-busy` and `role="status"`
- `.sr-only` text provided for icon-only controls
- Motion respects `prefers-reduced-motion`

## Dark Mode

The design token system is dark-first. To support light mode, add a `.light` class to `<html>` that overrides the token values.

## Development

```bash
pnpm --filter @tuanh68/ui typecheck
pnpm --filter @tuanh68/ui lint
```

## Usage

```tsx
import { AppContainer, AppSection, AppHeading, AppText, AppButton, AppCard } from '@tuanh68/ui';

function HomePage() {
  return (
    <AppSection>
      <AppContainer size="lg">
        <AppHeading level="display" display="lg" align="center">
          Welcome
        </AppHeading>
        <AppText variant="body" size="lg" color="secondary">
          Build with confidence.
        </AppText>
        <AppButton variant="primary" size="lg">
          Get Started
        </AppButton>
      </AppContainer>
    </AppSection>
  );
}
```
