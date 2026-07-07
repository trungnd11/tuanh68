# UI Foundation — Design Spec

## Status: Approved

- Architecture: Hybrid styling (Tailwind classes + CSS modules)
- Stack: Next.js 16, React 19, TypeScript strict, TailwindCSS v4
- Package: `packages/ui` (workspace package)

## Key Decisions

1. **Hybrid styling** — Layout via Tailwind utilities + `cn()`, complex visuals via CSS modules. All referencing design tokens from `@theme`.
2. **Component pattern** — Every component: `forwardRef`, `displayName`, `cn()` className merge, TypeScript strict, no `any`.
3. **Design token consumption** — Components use `bg-surface-primary`, `text-text-primary`, `rounded-lg` etc. — never raw hex or arbitrary values.
4. **Accessibility** — Native HTML elements, `:focus-visible` ring, `aria-*` attrs, `prefers-reduced-motion`.
5. **TailwindCSS v4 upgrade** — `@tailwind` → `@import "tailwindcss"`, remove `tailwind.config.ts`.

## Component Architecture

```
packages/ui/src/
├── layout/          # AppContainer, AppSection, AppStack, AppGrid, AppFlex
├── surface/         # AppSurface (default, glass, solid, outlined, elevated)
├── typography/      # AppHeading, AppText, AppBadge
├── button/          # AppButton (primary, secondary, outline, ghost, link)
├── form/            # AppInput, AppTextarea, AppSelect, AppCheckbox, AppRadio,
│                    # AppLabel, AppHelperText, AppErrorText, AppField
├── display/         # Divider, Avatar, IconBox, EmptyState, LoadingSpinner, Skeleton
├── data-display/    # StatisticCard, FeatureCard, InfoCard, GlassCard
├── navigation/      # Navbar, MobileDrawer, Footer, Breadcrumb
├── card/            # AppCard (glass, solid, outline, elevated, interactive)
├── hooks/           # useId, useMediaQuery, useReducedMotion
├── types/           # Shared TypeScript types
├── utils/           # cn() — clsx + tailwind-merge
├── styles/          # Component-specific CSS modules
└── index.ts         # Unified barrel export
```

## Upgrade Path: TailwindCSS v3 → v4

- `globals.css`: `@tailwind base|components|utilities` → `@import "tailwindcss"`
- Delete `tailwind.config.ts` (config moves to `@theme` block in `theme.css`)
- `@tailwindcss/forms` plugin: replace with v4-native form reset in globals
- Update pnpm deps: `tailwindcss@^4`, remove `@tailwindcss/forms`, `autoprefixer`, `postcss`

## Dependencies

```json
{
  "dependencies": {
    "clsx": "^2.x",
    "tailwind-merge": "^3.x"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```
