# UI Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `packages/ui` — a production-grade UI Foundation component library for Landing Website, Corporate Website, CMS Admin, and Dashboard.

**Architecture:** Hybrid styling approach — TailwindCSS v4 utility classes via `cn()` for layout/spacing, CSS modules for complex visuals. All components consume design tokens via Tailwind `@theme` variables. Every component uses `forwardRef`, `displayName`, TypeScript strict, and className merge.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, TailwindCSS v4, `clsx` + `tailwind-merge`, pnpm workspace, Turborepo

## Global Constraints

- All components: `forwardRef`, `displayName`, `cn()` className merge, TypeScript strict, no `any`
- No hardcoded colors, spacing, radius — always use design tokens via Tailwind `@theme` classes
- No business components (no Hero, no ProductCard, no Homepage)
- All interactive elements: keyboard-friendly, focus ring, ARIA attributes
- Dark mode compatible via token system (already dark-first)
- `prefers-reduced-motion` respected (already in `globals.css`)
- Export from `packages/ui/src/index.ts` barrel file
- Dependencies: `clsx`, `tailwind-merge` (runtime); `react`, `react-dom` (peer)

---

### Task 0: Package Scaffolding + TailwindCSS v4 Upgrade + cn() + Types

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/src/utils/cn.ts`
- Create: `packages/ui/src/types/index.ts`
- Create: `packages/ui/src/index.ts` (empty barrel for now)
- Modify: `apps/web/package.json` (deps)
- Modify: `apps/web/src/styles/globals.css` (Tailwind v4)
- Delete: `apps/web/tailwind.config.ts`
- Delete: `apps/web/postcss.config.js` (if exists)
- Modify: `apps/web/src/styles/theme.css` (add remaining `@theme` vars)
- Modify: `pnpm-workspace.yaml` (if needed)

- [ ] **Step 1: Add packges/ui to workspace**

Check `pnpm-workspace.yaml` already has `packages/*` — it does, so no change needed.

- [ ] **Step 2: Create `packages/ui/package.json`**

```json
{
  "name": "@tuanh68/ui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint ."
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.2.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tuanh68/eslint-config": "workspace:*",
    "@tuanh68/tsconfig": "workspace:*",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "eslint": "^9.17.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.7.2"
  }
}
```

- [ ] **Step 3: Create `packages/ui/tsconfig.json`**

```json
{
  "extends": "@tuanh68/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Create `packages/ui/src/utils/cn.ts`**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Create `packages/ui/src/types/index.ts`**

```ts
import type { ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type Breakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'wide';

export type SpacingToken =
  | 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20
  | 24 | 32 | 40 | 48 | 56 | 64 | 80 | 96 | 120 | 160;

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}
```

- [ ] **Step 6: Upgrade `apps/web` to TailwindCSS v4**

Check existing PostCSS config:

Run: `Test-Path "D:\nextjs\tuanh68\apps\web\postcss.config.*"`

Update `apps/web/package.json`:
```json
{
  "devDependencies": {
    "tailwindcss": "^4.1.0",
    "@tailwindcss/postcss": "^4.1.0"
  }
}
```
Remove `autoprefixer`, `postcss`, `@tailwindcss/forms` from deps.

Update `apps/web/src/styles/globals.css`:
```css
@import "tailwindcss";
@import "./theme.css" layer(theme);

@layer base {
  * {
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100%;
  }

  html {
    background: var(--color-background-primary);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background:
      radial-gradient(circle at top left, rgb(216 168 74 / 0.08), transparent 32rem),
      linear-gradient(180deg, var(--color-background-primary), var(--color-background-secondary));
    color: var(--color-text-primary);
    margin: 0;
  }

  ::selection {
    background: var(--color-selection);
    color: var(--color-text-primary);
  }

  :focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 1ms !important;
    }
  }
}
```

Delete `apps/web/tailwind.config.ts`.

Create or update `apps/web/postcss.config.mjs`:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

Remove the old forms import from the PostCSS config (Tailwind v4 handles form reset via base layer).

- [ ] **Step 7: Ensure `theme.css` has all needed tokens for components**

The existing `theme.css` already has all tokens needed. Add missing form-specific tokens:

Add to the `@theme` block in `theme.css`:
```
  --color-disabled-surface: rgb(148 163 184 / 0.12);
  --color-disabled-text: rgb(203 213 225 / 0.42);
  --color-hover-surface: rgb(255 255 255 / 0.06);
  --color-hover-primary: #e8b44f;
  --color-success: #3fb981;
  --color-success-surface: rgb(63 185 129 / 0.14);
  --color-success-border: rgb(63 185 129 / 0.34);
  --color-warning: #e5b84d;
  --color-warning-surface: rgb(229 184 77 / 0.14);
  --color-warning-border: rgb(229 184 77 / 0.34);
  --color-danger: #e25d5d;
  --color-danger-surface: rgb(226 93 93 / 0.14);
  --color-danger-border: rgb(226 93 93 / 0.34);
  --color-info: #6aa8ff;
  --color-info-surface: rgb(106 168 255 / 0.14);
  --color-info-border: rgb(106 168 255 / 0.34);
  --color-focus-ring: rgb(216 168 74 / 0.46);
  --color-selection: rgb(216 168 74 / 0.28);
  --color-overlay: rgb(3 8 15 / 0.72);
  --color-skeleton-base: rgb(255 255 255 / 0.08);
  --color-skeleton-highlight: rgb(255 255 255 / 0.16);
  --spacing-form-field: var(--spacing-16);
  --spacing-form-group: var(--spacing-24);
  --spacing-form-section: var(--spacing-40);
```

- [ ] **Step 8: Verify Tailwind v4 upgrade**

Run: `pnpm install` at root
Run: `cd apps/web && pnpm exec next build` — should build successfully

- [ ] **Step 9: Create initial barrel export**

`packages/ui/src/index.ts`:
```ts
export { cn } from './utils/cn';
export type * from './types';
```

- [ ] **Step 10: Commit**

```bash
git add packages/ui apps/web/package.json apps/web/src/styles/globals.css apps/web/postcss.config.mjs
git rm apps/web/tailwind.config.ts
git commit -m "feat: scaffold packages/ui and upgrade TailwindCSS v4"
```

---

### Task 1: Layout Components (AppContainer, AppSection, AppStack, AppGrid, AppFlex)

**Files:**
- Create: `packages/ui/src/layout/AppContainer.tsx`
- Create: `packages/ui/src/layout/AppSection.tsx`
- Create: `packages/ui/src/layout/AppStack.tsx`
- Create: `packages/ui/src/layout/AppGrid.tsx`
- Create: `packages/ui/src/layout/AppFlex.tsx`
- Create: `packages/ui/src/layout/index.ts`

- [ ] **Step 1: Create AppContainer**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const containerSizes = {
  sm: 'max-w-[var(--container-sm)]',
  md: 'max-w-[var(--container-md)]',
  lg: 'max-w-[var(--container-lg)]',
  xl: 'max-w-[var(--container-xl)]',
  '2xl': 'max-w-[var(--container-2xl)]',
  full: 'max-w-full',
} as const;

interface AppContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerSizes;
}

const AppContainer = forwardRef<HTMLDivElement, AppContainerProps>(
  ({ size = 'lg', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-[var(--spacing-container-x)]',
          containerSizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppContainer.displayName = 'AppContainer';

export { AppContainer, type AppContainerProps };
```

- [ ] **Step 2: Create AppSection**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const sectionSpacings = {
  sm: 'py-[var(--spacing-section-sm)]',
  md: 'py-[var(--spacing-section-md)]',
  lg: 'py-[var(--spacing-section-lg)]',
  none: 'py-0',
} as const;

const sectionBackgrounds = {
  default: 'bg-[var(--color-background-primary)]',
  secondary: 'bg-[var(--color-background-secondary)]',
  tertiary: 'bg-[var(--color-background-tertiary)]',
  surface: 'bg-[var(--color-surface-primary)]',
  transparent: 'bg-transparent',
} as const;

interface AppSectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: keyof typeof sectionSpacings;
  background?: keyof typeof sectionBackgrounds;
  as?: 'section' | 'div' | 'article' | 'aside';
}

const AppSection = forwardRef<HTMLElement, AppSectionProps>(
  ({ spacing = 'md', background = 'default', as: Component = 'section', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full',
          sectionSpacings[spacing],
          sectionBackgrounds[background],
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
AppSection.displayName = 'AppSection';

export { AppSection, type AppSectionProps };
```

- [ ] **Step 3: Create AppStack**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const stackDirections = {
  vertical: 'flex-col',
  horizontal: 'flex-row',
} as const;

const stackAlignments = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const stackJustifications = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const stackSpacings: Record<string, string> = {
  0: 'gap-0',
  2: 'gap-0.5',
  4: 'gap-1',
  8: 'gap-2',
  12: 'gap-3',
  16: 'gap-4',
  20: 'gap-5',
  24: 'gap-6',
  32: 'gap-8',
  40: 'gap-10',
  48: 'gap-12',
  64: 'gap-16',
};

interface AppStackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: keyof typeof stackDirections;
  align?: keyof typeof stackAlignments;
  justify?: keyof typeof stackJustifications;
  spacing?: keyof typeof stackSpacings;
}

const AppStack = forwardRef<HTMLDivElement, AppStackProps>(
  ({ direction = 'vertical', align = 'stretch', justify = 'start', spacing = '16', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          stackDirections[direction],
          stackAlignments[align],
          stackJustifications[justify],
          stackSpacings[spacing] ?? 'gap-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppStack.displayName = 'AppStack';

export { AppStack, type AppStackProps };
```

- [ ] **Step 4: Create AppGrid**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const gridColumns = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 tablet:grid-cols-2',
  3: 'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3',
  4: 'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4',
  6: 'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-6',
  12: 'grid-cols-12',
  auto: 'grid-cols-[repeat(auto-fill,minmax(var(--grid-auto-min,16rem),1fr))]',
} as const;

const gridGaps = {
  sm: 'gap-[var(--grid-column-gap-sm)]',
  md: 'gap-[var(--grid-column-gap-md)]',
  lg: 'gap-[var(--grid-column-gap-lg)]',
} as const;

interface AppGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: keyof typeof gridColumns;
  gap?: keyof typeof gridGaps;
}

const AppGrid = forwardRef<HTMLDivElement, AppGridProps>(
  ({ columns = 1, gap = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          gridColumns[columns],
          gridGaps[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppGrid.displayName = 'AppGrid';

export { AppGrid, type AppGridProps };
```

- [ ] **Step 5: Create AppFlex**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const flexDirections = {
  row: 'flex-row',
  rowReverse: 'flex-row-reverse',
  column: 'flex-col',
  columnReverse: 'flex-col-reverse',
} as const;

const flexAlignments = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const flexJustifications = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const flexSpacings: Record<string, string> = {
  0: 'gap-0',
  2: 'gap-0.5',
  4: 'gap-1',
  8: 'gap-2',
  12: 'gap-3',
  16: 'gap-4',
  20: 'gap-5',
  24: 'gap-6',
  32: 'gap-8',
  40: 'gap-10',
  48: 'gap-12',
  64: 'gap-16',
};

interface AppFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: keyof typeof flexDirections;
  align?: keyof typeof flexAlignments;
  justify?: keyof typeof flexJustifications;
  gap?: keyof typeof flexSpacings;
  wrap?: boolean;
}

const AppFlex = forwardRef<HTMLDivElement, AppFlexProps>(
  ({ direction = 'row', align = 'start', justify = 'start', gap = '16', wrap = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          flexDirections[direction],
          flexAlignments[align],
          flexJustifications[justify],
          flexSpacings[gap] ?? 'gap-4',
          wrap && 'flex-wrap',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppFlex.displayName = 'AppFlex';

export { AppFlex, type AppFlexProps };
```

- [ ] **Step 6: Create layout barrel export**

`packages/ui/src/layout/index.ts`:
```ts
export { AppContainer } from './AppContainer';
export type { AppContainerProps } from './AppContainer';

export { AppSection } from './AppSection';
export type { AppSectionProps } from './AppSection';

export { AppStack } from './AppStack';
export type { AppStackProps } from './AppStack';

export { AppGrid } from './AppGrid';
export type { AppGridProps } from './AppGrid';

export { AppFlex } from './AppFlex';
export type { AppFlexProps } from './AppFlex';
```

- [ ] **Step 7: Update barrel export**

Add to `packages/ui/src/index.ts`:
```ts
export * from './layout';
```

- [ ] **Step 8: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 9: Commit**

```bash
git add packages/ui/src/utils packages/ui/src/types packages/ui/src/layout packages/ui/src/index.ts
git commit -m "feat(ui): add layout components - AppContainer, AppSection, AppStack, AppGrid, AppFlex"
```

---

### Task 2: Surface Component (AppSurface)

**Files:**
- Create: `packages/ui/src/surface/AppSurface.tsx`
- Create: `packages/ui/src/surface/index.ts`

- [ ] **Step 1: Create AppSurface**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const surfaceVariants = {
  default: 'bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)]',
  glass: 'bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)] shadow-[var(--shadow-glass)]',
  solid: 'bg-[var(--color-surface-elevated)]',
  outlined: 'border border-[var(--color-border-default)] bg-transparent',
  elevated: 'bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]',
} as const;

const surfacePaddings = {
  none: 'p-0',
  sm: 'p-[var(--spacing-card-sm)]',
  md: 'p-[var(--spacing-card-md)]',
  lg: 'p-[var(--spacing-card-lg)]',
} as const;

const surfaceRadii = {
  none: 'rounded-none',
  sm: 'rounded-[var(--radius-sm)]',
  md: 'rounded-[var(--radius-md)]',
  lg: 'rounded-[var(--radius-lg)]',
  xl: 'rounded-[var(--radius-xl)]',
  '2xl': 'rounded-[var(--radius-2xl)]',
  full: 'rounded-full',
} as const;

interface AppSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof surfaceVariants;
  padding?: keyof typeof surfacePaddings;
  radius?: keyof typeof surfaceRadii;
}

const AppSurface = forwardRef<HTMLDivElement, AppSurfaceProps>(
  ({ variant = 'default', padding = 'md', radius = 'lg', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          surfaceVariants[variant],
          surfacePaddings[padding],
          surfaceRadii[radius],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppSurface.displayName = 'AppSurface';

export { AppSurface, type AppSurfaceProps };
```

- [ ] **Step 2: Create surface barrel and update main index**

`packages/ui/src/surface/index.ts`:
```ts
export { AppSurface } from './AppSurface';
export type { AppSurfaceProps } from './AppSurface';
```

Add to `packages/ui/src/index.ts`:
```ts
export * from './surface';
```

- [ ] **Step 3: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 4: Commit**

```bash
git add packages/ui/src/surface packages/ui/src/index.ts
git commit -m "feat(ui): add AppSurface component with glass, solid, outlined, elevated variants"
```

---

### Task 3: Typography Components (AppHeading, AppText, AppBadge)

**Files:**
- Create: `packages/ui/src/typography/AppHeading.tsx`
- Create: `packages/ui/src/typography/AppText.tsx`
- Create: `packages/ui/src/typography/AppBadge.tsx`
- Create: `packages/ui/src/typography/index.ts`

- [ ] **Step 1: Create AppHeading**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const headingLevels = {
  display: {
    xl: 'text-display-xl font-display',
    lg: 'text-display-lg font-display',
    md: 'text-display-md font-display',
  },
  headline: {
    xl: 'text-headline-xl',
    lg: 'text-headline-lg',
    md: 'text-headline-md',
  },
  title: {
    lg: 'text-title-lg',
    md: 'text-title-md',
    sm: 'text-title-sm',
  },
} as const;

const headingAlignments = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

type Level = 'display' | 'headline' | 'title';
type DisplaySize = keyof typeof headingLevels.display;
type HeadlineSize = keyof typeof headingLevels.headline;
type TitleSize = keyof typeof headingLevels.title;

interface AppHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  display?: DisplaySize;
  headline?: HeadlineSize;
  title?: TitleSize;
  align?: keyof typeof headingAlignments;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const tagMap: Record<string, 'h1' | 'h2' | 'h3' | 'h4'> = {
  display: 'h1',
  headline: 'h2',
  title: 'h3',
};

const AppHeading = forwardRef<HTMLHeadingElement, AppHeadingProps>(
  ({ level = 'headline', display = 'lg', headline = 'lg', title = 'md', align = 'left', as, className, children, ...props }, ref) => {
    const sizeClass = headingLevels[level][level === 'display' ? display : level === 'headline' ? headline : title];
    const Tag = as ?? tagMap[level] ?? 'h2';

    return (
      <Tag
        ref={ref}
        className={cn(sizeClass, headingAlignments[align], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
AppHeading.displayName = 'AppHeading';

export { AppHeading, type AppHeadingProps };
```

- [ ] **Step 2: Create AppText**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const textVariants = {
  body: {
    lg: 'text-body-lg',
    md: 'text-body-md',
    sm: 'text-body-sm',
  },
  caption: 'text-caption',
  label: 'text-label',
  overline: 'text-overline uppercase tracking-[0.08em]',
} as const;

const textColors = {
  primary: 'text-[var(--color-text-primary)]',
  secondary: 'text-[var(--color-text-secondary)]',
  muted: 'text-[var(--color-text-muted)]',
  subtle: 'text-[var(--color-text-subtle)]',
  accent: 'text-[var(--color-text-accent)]',
  inverse: 'text-[var(--color-text-inverse)]',
} as const;

const textWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

interface AppTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: keyof typeof textVariants | 'body';
  size?: keyof typeof textVariants.body;
  color?: keyof typeof textColors;
  weight?: keyof typeof textWeights;
  as?: 'p' | 'span' | 'div' | 'label' | 'small';
}

const AppText = forwardRef<HTMLParagraphElement, AppTextProps>(
  ({ variant = 'body', size = 'md', color = 'primary', weight, as: Tag = 'p', className, children, ...props }, ref) => {
    const variantClass = variant === 'body' ? textVariants.body[size] : textVariants[variant];

    return (
      <Tag
        ref={ref}
        className={cn(
          variantClass,
          textColors[color],
          weight && textWeights[weight],
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
AppText.displayName = 'AppText';

export { AppText, type AppTextProps };
```

- [ ] **Step 3: Create AppBadge**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const badgeVariants = {
  primary: 'bg-[var(--color-primary-500)]/15 text-[var(--color-primary-300)] border border-[var(--color-primary-500)]/25',
  secondary: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-default)]',
  success: 'bg-[var(--color-success-surface)] text-[var(--color-success)] border border-[var(--color-success-border)]',
  warning: 'bg-[var(--color-warning-surface)] text-[var(--color-warning)] border border-[var(--color-warning-border)]',
  danger: 'bg-[var(--color-danger-surface)] text-[var(--color-danger)] border border-[var(--color-danger-border)]',
  outline: 'border border-[var(--color-border-default)] text-[var(--color-text-secondary)] bg-transparent',
} as const;

interface AppBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

const AppBadge = forwardRef<HTMLSpanElement, AppBadgeProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-0.5 text-label font-medium',
          badgeVariants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
AppBadge.displayName = 'AppBadge';

export { AppBadge, type AppBadgeProps };
```

- [ ] **Step 4: Create typography barrel and update main index**

`packages/ui/src/typography/index.ts`:
```ts
export { AppHeading } from './AppHeading';
export type { AppHeadingProps } from './AppHeading';

export { AppText } from './AppText';
export type { AppTextProps } from './AppText';

export { AppBadge } from './AppBadge';
export type { AppBadgeProps } from './AppBadge';
```

Add to `packages/ui/src/index.ts`:
```ts
export * from './typography';
```

- [ ] **Step 5: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 6: Commit**

```bash
git add packages/ui/src/typography packages/ui/src/index.ts
git commit -m "feat(ui): add typography components - AppHeading, AppText, AppBadge"
```

---

### Task 4: AppButton

**Files:**
- Create: `packages/ui/src/button/AppButton.tsx`
- Create: `packages/ui/src/button/index.ts`

- [ ] **Step 1: Create AppButton**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const buttonVariants = {
  primary: 'bg-[var(--color-primary-500)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-400)] active:bg-[var(--color-primary-600)] shadow-[var(--shadow-xs)]',
  secondary: 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-surface-tertiary)] hover:border-[var(--color-border-strong)]',
  outline: 'border-2 border-[var(--color-primary-500)] text-[var(--color-primary-300)] hover:bg-[var(--color-primary-500)]/10',
  ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover-surface)]',
  link: 'text-[var(--color-primary-300)] underline-offset-2 hover:underline p-0 h-auto',
} as const;

const buttonSizes = {
  sm: 'h-8 px-3 text-button gap-1.5',
  md: 'h-10 px-4 text-button gap-2',
  lg: 'h-12 px-6 text-button gap-2.5',
  xl: 'h-14 px-8 text-button gap-3',
} as const;

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    disabled,
    className,
    children,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold rounded-[var(--radius-md)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]',
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && 'w-full',
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!loading && iconLeft && <span className="shrink-0">{iconLeft}</span>}
        {children && <span>{children}</span>}
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  },
);
AppButton.displayName = 'AppButton';

export { AppButton, type AppButtonProps };
```

- [ ] **Step 2: Create button barrel and update main index**

`packages/ui/src/button/index.ts`:
```ts
export { AppButton } from './AppButton';
export type { AppButtonProps } from './AppButton';
```

Add to `packages/ui/src/index.ts`:
```ts
export * from './button';
```

- [ ] **Step 3: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 4: Commit**

```bash
git add packages/ui/src/button packages/ui/src/index.ts
git commit -m "feat(ui): add AppButton with variants, sizes, loading state, icon support"
```

---

### Task 5: Card Foundation (AppCard)

**Files:**
- Create: `packages/ui/src/card/AppCard.tsx`
- Create: `packages/ui/src/card/index.ts`

- [ ] **Step 1: Create AppCard**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import type { AppSurfaceProps } from '../surface/AppSurface';

const cardVariants = {
  glass: 'bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-glass)]',
  solid: 'bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)]',
  outline: 'border border-[var(--color-border-default)] bg-transparent',
  elevated: 'bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]',
} as const;

interface AppCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: keyof typeof cardVariants;
  padding?: AppSurfaceProps['padding'];
  radius?: AppSurfaceProps['radius'];
  interactive?: boolean;
}

const cardPaddings = {
  none: 'p-0',
  sm: 'p-[var(--spacing-card-sm)]',
  md: 'p-[var(--spacing-card-md)]',
  lg: 'p-[var(--spacing-card-lg)]',
} as const;

const cardRadii = {
  none: 'rounded-none',
  sm: 'rounded-[var(--radius-sm)]',
  md: 'rounded-[var(--radius-md)]',
  lg: 'rounded-[var(--radius-lg)]',
  xl: 'rounded-[var(--radius-xl)]',
  '2xl': 'rounded-[var(--radius-2xl)]',
} as const;

const AppCard = forwardRef<HTMLDivElement, AppCardProps>(
  ({ variant = 'solid', padding = 'md', radius = 'xl', interactive = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants[variant],
          cardPaddings[padding],
          cardRadii[radius],
          interactive && [
            'cursor-pointer transition-all duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
            'hover:scale-[1.02] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]',
          ],
          className,
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-interactive={interactive ? 'true' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppCard.displayName = 'AppCard';

export { AppCard, type AppCardProps };
```

- [ ] **Step 2: Create card barrel and update main index**

`packages/ui/src/card/index.ts`:
```ts
export { AppCard } from './AppCard';
export type { AppCardProps } from './AppCard';
```

Add to `packages/ui/src/index.ts`:
```ts
export * from './card';
```

- [ ] **Step 3: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 4: Commit**

```bash
git add packages/ui/src/card packages/ui/src/index.ts
git commit -m "feat(ui): add AppCard with glass, solid, outline, elevated, interactive variants"
```

---

### Task 6: Form Components

**Files:**
- Create: `packages/ui/src/form/AppLabel.tsx`
- Create: `packages/ui/src/form/AppHelperText.tsx`
- Create: `packages/ui/src/form/AppErrorText.tsx`
- Create: `packages/ui/src/form/AppField.tsx`
- Create: `packages/ui/src/form/AppInput.tsx`
- Create: `packages/ui/src/form/AppTextarea.tsx`
- Create: `packages/ui/src/form/AppSelect.tsx`
- Create: `packages/ui/src/form/AppCheckbox.tsx`
- Create: `packages/ui/src/form/AppRadio.tsx`
- Create: `packages/ui/src/form/index.ts`

- [ ] **Step 1: Create AppLabel**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface AppLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const AppLabel = forwardRef<HTMLLabelElement, AppLabelProps>(
  ({ required = false, className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block text-label text-[var(--color-text-secondary)] mb-1.5',
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-[var(--color-danger)]" aria-hidden="true">*</span>
        )}
      </label>
    );
  },
);
AppLabel.displayName = 'AppLabel';

export { AppLabel, type AppLabelProps };
```

- [ ] **Step 2: Create AppHelperText and AppErrorText**

`packages/ui/src/form/AppHelperText.tsx`:
```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface AppHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AppHelperText = forwardRef<HTMLParagraphElement, AppHelperTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('mt-1.5 text-caption text-[var(--color-text-subtle)]', className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
AppHelperText.displayName = 'AppHelperText';

export { AppHelperText, type AppHelperTextProps };
```

`packages/ui/src/form/AppErrorText.tsx`:
```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface AppErrorTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AppErrorText = forwardRef<HTMLParagraphElement, AppErrorTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        role="alert"
        className={cn('mt-1.5 text-caption text-[var(--color-danger)]', className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
AppErrorText.displayName = 'AppErrorText';

export { AppErrorText, type AppErrorTextProps };
```

- [ ] **Step 3: Create AppField**

```tsx
import { forwardRef, useId } from 'react';
import { cn } from '../utils/cn';
import { AppLabel } from './AppLabel';
import { AppHelperText } from './AppHelperText';
import { AppErrorText } from './AppErrorText';

interface AppFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  id?: string;
}

const AppField = forwardRef<HTMLDivElement, AppFieldProps>(
  ({ label, required = false, helperText, error, id: externalId, className, children, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = externalId || generatedId;
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    return (
      <div
        ref={ref}
        className={cn('mb-[var(--spacing-form-field)]', className)}
        {...props}
      >
        {label && (
          <AppLabel htmlFor={fieldId} required={required}>
            {label}
          </AppLabel>
        )}
        {typeof children === 'function'
          ? children({ id: fieldId, 'aria-invalid': !!error, 'aria-describedby': error ? errorId : helperText ? helperId : undefined })
          : children}
        {helperText && !error && (
          <AppHelperText id={helperId}>{helperText}</AppHelperText>
        )}
        {error && (
          <AppErrorText id={errorId}>{error}</AppErrorText>
        )}
      </div>
    );
  },
);
AppField.displayName = 'AppField';

export { AppField, type AppFieldProps };
```

- [ ] **Step 4: Create AppInput**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ hasError = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'block w-full h-10 px-3 rounded-[var(--radius-md)] text-body-md text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)]',
          'bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)]',
          'transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)]',
          'hover:border-[var(--color-border-strong)]',
          'focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]/30 focus:outline-none',
          'disabled:bg-[var(--color-disabled-surface)] disabled:text-[var(--color-disabled-text)] disabled:cursor-not-allowed',
          hasError && 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/30',
          className,
        )}
        {...props}
      />
    );
  },
);
AppInput.displayName = 'AppInput';

export { AppInput, type AppInputProps };
```

- [ ] **Step 5: Create AppTextarea**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface AppTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(
  ({ hasError = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'block w-full min-h-[120px] px-3 py-2.5 rounded-[var(--radius-md)] text-body-md text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)] resize-y',
          'bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)]',
          'transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)]',
          'hover:border-[var(--color-border-strong)]',
          'focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]/30 focus:outline-none',
          'disabled:bg-[var(--color-disabled-surface)] disabled:text-[var(--color-disabled-text)] disabled:cursor-not-allowed',
          hasError && 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/30',
          className,
        )}
        {...props}
      />
    );
  },
);
AppTextarea.displayName = 'AppTextarea';

export { AppTextarea, type AppTextareaProps };
```

- [ ] **Step 6: Create AppSelect**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface AppSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  placeholder?: string;
}

const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(
  ({ hasError = false, placeholder, children, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'block w-full h-10 px-3 rounded-[var(--radius-md)] text-body-md text-[var(--color-text-primary)]',
          'bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)]',
          'transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)]',
          'hover:border-[var(--color-border-strong)]',
          'focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]/30 focus:outline-none',
          'disabled:bg-[var(--color-disabled-surface)] disabled:text-[var(--color-disabled-text)] disabled:cursor-not-allowed',
          hasError && 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/30',
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  },
);
AppSelect.displayName = 'AppSelect';

export { AppSelect, type AppSelectProps };
```

- [ ] **Step 7: Create AppCheckbox**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface AppCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const AppCheckbox = forwardRef<HTMLInputElement, AppCheckboxProps>(
  ({ label, id, className, ...props }, ref) => {
    return (
      <label htmlFor={id} className={cn('inline-flex items-center gap-2 cursor-pointer group', className)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded-[var(--radius-xs)] cursor-pointer',
            'border-[var(--color-border-default)] bg-[var(--color-surface-secondary)]',
            'text-[var(--color-primary-500)] accent-[var(--color-primary-500)]',
            'focus:ring-[var(--color-primary-500)]/30 focus:ring-2 focus:ring-offset-1 focus:ring-offset-[var(--color-background-primary)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...props}
        />
        {label && (
          <span className="text-body-sm text-[var(--color-text-primary)] select-none">
            {label}
          </span>
        )}
      </label>
    );
  },
);
AppCheckbox.displayName = 'AppCheckbox';

export { AppCheckbox, type AppCheckboxProps };
```

- [ ] **Step 8: Create AppRadio**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface AppRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const AppRadio = forwardRef<HTMLInputElement, AppRadioProps>(
  ({ label, id, className, ...props }, ref) => {
    return (
      <label htmlFor={id} className={cn('inline-flex items-center gap-2 cursor-pointer group', className)}>
        <input
          ref={ref}
          id={id}
          type="radio"
          className={cn(
            'h-4 w-4 cursor-pointer',
            'border-[var(--color-border-default)] bg-[var(--color-surface-secondary)]',
            'text-[var(--color-primary-500)] accent-[var(--color-primary-500)]',
            'focus:ring-[var(--color-primary-500)]/30 focus:ring-2 focus:ring-offset-1 focus:ring-offset-[var(--color-background-primary)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...props}
        />
        {label && (
          <span className="text-body-sm text-[var(--color-text-primary)] select-none">
            {label}
          </span>
        )}
      </label>
    );
  },
);
AppRadio.displayName = 'AppRadio';

export { AppRadio, type AppRadioProps };
```

- [ ] **Step 9: Create form barrel and update main index**

`packages/ui/src/form/index.ts`:
```ts
export { AppLabel } from './AppLabel';
export type { AppLabelProps } from './AppLabel';

export { AppHelperText } from './AppHelperText';
export type { AppHelperTextProps } from './AppHelperText';

export { AppErrorText } from './AppErrorText';
export type { AppErrorTextProps } from './AppErrorText';

export { AppField } from './AppField';
export type { AppFieldProps } from './AppField';

export { AppInput } from './AppInput';
export type { AppInputProps } from './AppInput';

export { AppTextarea } from './AppTextarea';
export type { AppTextareaProps } from './AppTextarea';

export { AppSelect } from './AppSelect';
export type { AppSelectProps } from './AppSelect';

export { AppCheckbox } from './AppCheckbox';
export type { AppCheckboxProps } from './AppCheckbox';

export { AppRadio } from './AppRadio';
export type { AppRadioProps } from './AppRadio';
```

Add to `packages/ui/src/index.ts`:
```ts
export * from './form';
```

- [ ] **Step 10: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 11: Commit**

```bash
git add packages/ui/src/form packages/ui/src/index.ts
git commit -m "feat(ui): add form components - AppInput, AppTextarea, AppSelect, AppCheckbox, AppRadio, AppField, AppLabel, AppHelperText, AppErrorText"
```

---

### Task 7: Display Components

**Files:**
- Create: `packages/ui/src/display/Divider.tsx`
- Create: `packages/ui/src/display/Avatar.tsx`
- Create: `packages/ui/src/display/IconBox.tsx`
- Create: `packages/ui/src/display/EmptyState.tsx`
- Create: `packages/ui/src/display/LoadingSpinner.tsx`
- Create: `packages/ui/src/display/Skeleton.tsx`
- Create: `packages/ui/src/display/index.ts`
- Create: `packages/ui/src/styles/skeleton.module.css`

- [ ] **Step 1: Create Divider**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          orientation === 'horizontal'
            ? 'w-full border-t border-[var(--color-divider)]'
            : 'h-full border-l border-[var(--color-divider)]',
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = 'Divider';

export { Divider, type DividerProps };
```

- [ ] **Step 2: Create Avatar**

```tsx
import { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';

const avatarSizes = {
  sm: 'h-8 w-8 text-caption',
  md: 'h-10 w-10 text-label',
  lg: 'h-12 w-12 text-body-sm',
  xl: 'h-16 w-16 text-body-md',
} as const;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: keyof typeof avatarSizes;
  fallback?: React.ReactNode;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', initials, size = 'md', fallback, className, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);

    return (
      <div
        ref={ref}
        role={src ? 'img' : undefined}
        aria-label={src ? alt : undefined}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0',
          'bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)] font-semibold',
          avatarSizes[size],
          className,
        )}
        {...props}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true">
            {fallback ?? initials ?? (
              <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
        )}
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';

export { Avatar, type AvatarProps };
```

- [ ] **Step 3: Create IconBox**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const iconBoxSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
} as const;

const iconBoxVariants = {
  default: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]',
  primary: 'bg-[var(--color-primary-500)]/15 text-[var(--color-primary-300)]',
  success: 'bg-[var(--color-success-surface)] text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning-surface)] text-[var(--color-warning)]',
  danger: 'bg-[var(--color-danger-surface)] text-[var(--color-danger)]',
} as const;

interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof iconBoxSizes;
  variant?: keyof typeof iconBoxVariants;
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const iconBoxRadii = {
  sm: 'rounded-[var(--radius-sm)]',
  md: 'rounded-[var(--radius-md)]',
  lg: 'rounded-[var(--radius-lg)]',
  xl: 'rounded-[var(--radius-xl)]',
  full: 'rounded-full',
} as const;

const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
  ({ size = 'md', variant = 'default', radius = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center shrink-0',
          iconBoxSizes[size],
          iconBoxVariants[variant],
          iconBoxRadii[radius],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
IconBox.displayName = 'IconBox';

export { IconBox, type IconBoxProps };
```

- [ ] **Step 4: Create EmptyState**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppText } from '../typography/AppText';
import { AppStack } from '../layout/AppStack';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-[var(--color-text-muted)]">
            {icon}
          </div>
        )}
        <AppStack spacing="8" align="center">
          {title && <AppText variant="body" size="lg" weight="semibold" color="primary">{title}</AppText>}
          {description && <AppText variant="body" size="sm" color="muted">{description}</AppText>}
          {action && <div className="mt-2">{action}</div>}
        </AppStack>
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';

export { EmptyState, type EmptyStateProps };
```

- [ ] **Step 5: Create LoadingSpinner**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
} as const;

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof spinnerSizes;
  label?: string;
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ size = 'md', label = 'Loading...', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn('inline-flex items-center justify-center', className)}
        {...props}
      >
        <svg
          className={cn('animate-spin text-[var(--color-primary-500)]', spinnerSizes[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="sr-only">{label}</span>
      </div>
    );
  },
);
LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner, type LoadingSpinnerProps };
```

- [ ] **Step 6: Create Skeleton**

`packages/ui/src/styles/skeleton.module.css`:
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-skeleton-base) 25%,
    var(--color-skeleton-highlight) 50%,
    var(--color-skeleton-base) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}
```

`packages/ui/src/display/Skeleton.tsx`:
```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import styles from '../styles/skeleton.module.css';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          styles.skeleton,
          variant === 'text' && 'h-4 rounded-[var(--radius-sm)]',
          variant === 'circular' && 'rounded-full',
          variant === 'rectangular' && 'rounded-[var(--radius-md)]',
          className,
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
        {...props}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';

export { Skeleton, type SkeletonProps };
```

- [ ] **Step 7: Create display barrel and update main index**

`packages/ui/src/display/index.ts`:
```ts
export { Divider } from './Divider';
export type { DividerProps } from './Divider';

export { Avatar } from './Avatar';
export type { AvatarProps } from './Avatar';

export { IconBox } from './IconBox';
export type { IconBoxProps } from './IconBox';

export { EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';

export { LoadingSpinner } from './LoadingSpinner';
export type { LoadingSpinnerProps } from './LoadingSpinner';

export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';
```

Add to `packages/ui/src/index.ts`:
```ts
export * from './display';
```

- [ ] **Step 8: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 9: Commit**

```bash
git add packages/ui/src/display packages/ui/src/styles packages/ui/src/index.ts
git commit -m "feat(ui): add display components - Divider, Avatar, IconBox, EmptyState, LoadingSpinner, Skeleton"
```

---

### Task 8: Data Display Components

**Files:**
- Create: `packages/ui/src/data-display/StatisticCard.tsx`
- Create: `packages/ui/src/data-display/FeatureCard.tsx`
- Create: `packages/ui/src/data-display/InfoCard.tsx`
- Create: `packages/ui/src/data-display/GlassCard.tsx`
- Create: `packages/ui/src/data-display/index.ts`

- [ ] **Step 1: Create StatisticCard**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppCard } from '../card/AppCard';
import { AppText } from '../typography/AppText';

interface StatisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatisticCard = forwardRef<HTMLDivElement, StatisticCardProps>(
  ({ label, value, icon, trend, className, ...props }, ref) => {
    return (
      <AppCard ref={ref} variant="solid" padding="md" className={className} {...props}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <AppText variant="body" size="sm" color="muted">{label}</AppText>
            <p className="text-headline-lg font-semibold text-[var(--color-text-primary)]">{value}</p>
            {trend && (
              <AppText
                variant="body"
                size="sm"
                color={trend.positive ? 'primary' : 'danger'}
                className="flex items-center gap-1"
              >
                <span aria-hidden="true">{trend.positive ? '↑' : '↓'}</span>
                {trend.value}
              </AppText>
            )}
          </div>
          {icon && (
            <div className="text-[var(--color-text-muted)]">{icon}</div>
          )}
        </div>
      </AppCard>
    );
  },
);
StatisticCard.displayName = 'StatisticCard';

export { StatisticCard, type StatisticCardProps };
```

- [ ] **Step 2: Create FeatureCard**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppCard } from '../card/AppCard';
import { AppHeading } from '../typography/AppHeading';
import { AppText } from '../typography/AppText';
import { AppStack } from '../layout/AppStack';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, className, ...props }, ref) => {
    return (
      <AppCard ref={ref} variant="solid" padding="lg" className={className} {...props}>
        <AppStack spacing="16">
          {icon && (
            <div className="text-[var(--color-primary-500)]">{icon}</div>
          )}
          <AppStack spacing="8">
            <AppHeading level="title" title="md">{title}</AppHeading>
            <AppText variant="body" size="sm" color="muted">{description}</AppText>
          </AppStack>
        </AppStack>
      </AppCard>
    );
  },
);
FeatureCard.displayName = 'FeatureCard';

export { FeatureCard, type FeatureCardProps };
```

- [ ] **Step 3: Create InfoCard**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppCard } from '../card/AppCard';
import { AppText } from '../typography/AppText';
import { AppStack } from '../layout/AppStack';

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  ({ label, value, icon, className, ...props }, ref) => {
    return (
      <AppCard ref={ref} variant="outline" padding="md" className={className} {...props}>
        <AppStack spacing="4">
          <div className="flex items-center gap-2">
            {icon && <span className="text-[var(--color-text-muted)]">{icon}</span>}
            <AppText variant="body" size="sm" color="muted">{label}</AppText>
          </div>
          <div className="text-body-md font-medium text-[var(--color-text-primary)]">{value}</div>
        </AppStack>
      </AppCard>
    );
  },
);
InfoCard.displayName = 'InfoCard';

export { InfoCard, type InfoCardProps };
```

- [ ] **Step 4: Create GlassCard**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppCard } from '../card/AppCard';
import type { AppCardProps } from '../card/AppCard';

interface GlassCardProps extends Omit<AppCardProps, 'variant'> {}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AppCard
        ref={ref}
        variant="glass"
        padding="lg"
        radius="xl"
        className={cn('backdrop-blur-[var(--blur-glass)]', className)}
        {...props}
      >
        {children}
      </AppCard>
    );
  },
);
GlassCard.displayName = 'GlassCard';

export { GlassCard, type GlassCardProps };
```

- [ ] **Step 5: Create data-display barrel and update main index**

`packages/ui/src/data-display/index.ts`:
```ts
export { StatisticCard } from './StatisticCard';
export type { StatisticCardProps } from './StatisticCard';

export { FeatureCard } from './FeatureCard';
export type { FeatureCardProps } from './FeatureCard';

export { InfoCard } from './InfoCard';
export type { InfoCardProps } from './InfoCard';

export { GlassCard } from './GlassCard';
export type { GlassCardProps } from './GlassCard';
```

Add to `packages/ui/src/index.ts`:
```ts
export * from './data-display';
```

- [ ] **Step 6: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 7: Commit**

```bash
git add packages/ui/src/data-display packages/ui/src/index.ts
git commit -m "feat(ui): add data display components - StatisticCard, FeatureCard, InfoCard, GlassCard"
```

---

### Task 9: Navigation Components

**Files:**
- Create: `packages/ui/src/navigation/Navbar.tsx`
- Create: `packages/ui/src/navigation/MobileDrawer.tsx`
- Create: `packages/ui/src/navigation/Footer.tsx`
- Create: `packages/ui/src/navigation/Breadcrumb.tsx`
- Create: `packages/ui/src/navigation/index.ts`

- [ ] **Step 1: Create Breadcrumb**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = '/', className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center gap-2 text-caption text-[var(--color-text-subtle)]', className)}
        {...props}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-[var(--color-text-subtle)]" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)]"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={isLast ? 'text-[var(--color-text-primary)] font-medium' : ''}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem };
```

- [ ] **Step 2: Create Navbar**

```tsx
import { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';
import { AppContainer } from '../layout/AppContainer';

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: NavLink[];
  actions?: React.ReactNode;
  variant?: 'default' | 'glass';
  mobileBreakpoint?: 'tablet' | 'laptop';
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ logo, links = [], actions, variant = 'default', mobileBreakpoint = 'laptop', className, ...props }, ref) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const mobileBreakClass = mobileBreakpoint === 'laptop' ? 'laptop' : 'tablet';

    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-50 w-full',
          variant === 'glass'
            ? 'bg-[var(--color-surface-glass)] backdrop-blur-[var(--blur-glass)] border-b border-[var(--color-border-glass)]'
            : 'bg-[var(--color-background-primary)] border-b border-[var(--color-border-subtle)]',
          className,
        )}
        {...props}
      >
        <AppContainer size="2xl">
          <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
            <div className="flex items-center gap-8">
              {logo && <div className="shrink-0">{logo}</div>}
              <div className={cn(
                'hidden items-center gap-1',
                `${mobileBreakClass}:flex`,
              )}>
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover-surface)] rounded-[var(--radius-md)] transition-colors duration-[var(--duration-fast)]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {actions && <div className={cn('hidden', `${mobileBreakClass}:flex`)}>{actions}</div>}
              <button
                type="button"
                className={cn(
                  'inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)]',
                  'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover-surface)]',
                  `${mobileBreakClass}:hidden`,
                )}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </AppContainer>
        {menuOpen && (
          <div className={cn('border-t border-[var(--color-border-subtle)]', `${mobileBreakClass}:hidden`)}>
            <AppContainer size="2xl">
              <div className="py-4 space-y-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-body-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover-surface)] rounded-[var(--radius-md)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                {actions && <div className="pt-2 px-3">{actions}</div>}
              </div>
            </AppContainer>
          </div>
        )}
      </header>
    );
  },
);
Navbar.displayName = 'Navbar';

export { Navbar, type NavbarProps, type NavLink };
```

- [ ] **Step 3: Create MobileDrawer**

```tsx
import { forwardRef, useEffect, useCallback } from 'react';
import { cn } from '../utils/cn';

interface MobileDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
}

const MobileDrawer = forwardRef<HTMLDivElement, MobileDrawerProps>(
  ({ open, onClose, side = 'right', className, children, ...props }, ref) => {
    const handleEscape = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
      if (open) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [open, handleEscape]);

    return (
      <>
        <div
          className={cn(
            'fixed inset-0 z-[250] bg-[var(--color-overlay)] transition-opacity duration-[var(--duration-slow)]',
            open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            'fixed top-0 bottom-0 z-[var(--z-drawer)] w-full max-w-sm',
            'bg-[var(--color-surface-primary)] border-[var(--color-border-subtle)]',
            'shadow-[var(--shadow-xl)]',
            'transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
            side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
            open ? 'translate-x-0' : side === 'right' ? 'translate-x-full' : '-translate-x-full',
            className,
          )}
          {...props}
        >
          <div className="flex items-center justify-end p-4">
            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover-surface)]"
              aria-label="Close drawer"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-4 pb-4">
            {children}
          </div>
        </div>
      </>
    );
  },
);
MobileDrawer.displayName = 'MobileDrawer';

export { MobileDrawer, type MobileDrawerProps };
```

- [ ] **Step 4: Create Footer**

```tsx
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppContainer } from '../layout/AppContainer';
import { Divider } from '../display/Divider';

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
  bottomContent?: React.ReactNode;
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ columns = [], bottomContent, className, ...props }, ref) => {
    return (
      <footer ref={ref} className={cn('bg-[var(--color-background-secondary)] border-t border-[var(--color-border-subtle)]', className)} {...props}>
        <AppContainer size="2xl">
          {columns.length > 0 && (
            <div className="py-16">
              <div className="grid grid-cols-2 laptop:grid-cols-4 gap-8">
                {columns.map((column) => (
                  <div key={column.title}>
                    <h4 className="text-label text-[var(--color-text-primary)] mb-4">{column.title}</h4>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)]"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {bottomContent && (
            <>
              <Divider />
              <div className="py-6">{bottomContent}</div>
            </>
          )}
        </AppContainer>
      </footer>
    );
  },
);
Footer.displayName = 'Footer';

export { Footer, type FooterProps, type FooterColumn };
```

- [ ] **Step 5: Create navigation barrel and update main index**

`packages/ui/src/navigation/index.ts`:
```ts
export { Navbar } from './Navbar';
export type { NavbarProps, NavLink } from './Navbar';

export { MobileDrawer } from './MobileDrawer';
export type { MobileDrawerProps } from './MobileDrawer';

export { Footer } from './Footer';
export type { FooterProps, FooterColumn } from './Footer';

export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb';
```

Add to `packages/ui/src/index.ts`:
```ts
export * from './navigation';
```

- [ ] **Step 6: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 7: Commit**

```bash
git add packages/ui/src/navigation packages/ui/src/index.ts
git commit -m "feat(ui): add navigation components - Navbar, MobileDrawer, Footer, Breadcrumb"
```

---

### Task 10: Hooks, Final Barrel, README

**Files:**
- Create: `packages/ui/src/hooks/useId.ts`
- Create: `packages/ui/src/hooks/useMediaQuery.ts`
- Create: `packages/ui/src/hooks/useReducedMotion.ts`
- Create: `packages/ui/src/hooks/index.ts`
- Update: `packages/ui/src/index.ts` (final barrel)
- Create: `packages/ui/README.md`

- [ ] **Step 1: Create hooks**

`packages/ui/src/hooks/useId.ts`:
```ts
import { useId as useReactId } from 'react';

export function useId(id?: string): string {
  const generatedId = useReactId();
  return id ?? generatedId;
}
```

`packages/ui/src/hooks/useMediaQuery.ts`:
```ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

`packages/ui/src/hooks/useReducedMotion.ts`:
```ts
import { useMediaQuery } from './useMediaQuery';

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
```

`packages/ui/src/hooks/index.ts`:
```ts
export { useId } from './useId';
export { useMediaQuery } from './useMediaQuery';
export { useReducedMotion } from './useReducedMotion';
```

- [ ] **Step 2: Final barrel export**

`packages/ui/src/index.ts`:
```ts
// Utils
export { cn } from './utils/cn';

// Layout
export * from './layout';

// Surface
export * from './surface';

// Typography
export * from './typography';

// Button
export * from './button';

// Form
export * from './form';

// Display
export * from './display';

// Card
export * from './card';

// Data Display
export * from './data-display';

// Navigation
export * from './navigation';

// Hooks
export * from './hooks';
```

- [ ] **Step 3: Create README**

`packages/ui/README.md`:
```markdown
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

### Layout Decisions

| Goal | Component | Why |
|------|-----------|-----|
| Max-width centered content | `AppContainer` | Sets max-width via token, auto margins, container-x padding |
| Page/feature section | `AppSection` | Full-width wrapper with section spacing and background variant |
| Vertical/horizontal stack | `AppStack` | Flex layout with token-based gap, alignment, direction |
| Responsive grid | `AppGrid` | CSS Grid with responsive column counts and token gaps |
| Custom flex layout | `AppFlex` | Full flexbox control with gap, wrap, alignment |

### Surface Decisions

| Goal | Component | Variant |
|------|-----------|---------|
| Default card | `AppSurface` or `AppCard` | `default` / `solid` |
| Glass effect | `AppSurface` or `AppCard` | `glass` |
| Transparent card | `AppSurface` | `outlined` |
| Clickable card | `AppCard` | `interactive: true` |
| Dashboard metric | `StatisticCard` | Composes AppCard |
| Marketing feature | `FeatureCard` | Composes AppCard |

### Typography Decisions

| Role | Component | Props |
|------|-----------|-------|
| Page heading | `AppHeading` | `level="display"` or `level="headline"` |
| Section title | `AppHeading` | `level="title"` |
| Body content | `AppText` | `variant="body"` |
| Label | `AppText` | `variant="label"` |
| Status indicator | `AppBadge` | `variant="primary"` / `"success"` / `"danger"` |

### Button Decisions

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
# Typecheck
pnpm --filter @tuanh68/ui typecheck

# Lint
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
        <AppText variant="body" size="lg" color="secondary" align="center">
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
```

- [ ] **Step 4: Typecheck**

Run: `pnpm --filter @tuanh68/ui typecheck`

- [ ] **Step 5: Run full build to verify everything works**

Run: `cd apps/web && pnpm exec next build`

- [ ] **Step 6: Commit**

```bash
git add packages/ui/src/hooks packages/ui/src/index.ts packages/ui/README.md
git commit -m "feat(ui): add hooks, finalize barrel export, add README"
```
