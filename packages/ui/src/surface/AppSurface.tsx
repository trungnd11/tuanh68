import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const surfaceVariants = {
  default: 'bg-surface-primary border border-border-subtle',
  glass: 'bg-surface-glass backdrop-blur-glass border border-border-glass shadow-glass',
  solid: 'bg-surface-elevated',
  outlined: 'border border-border-default bg-transparent',
  elevated: 'bg-surface-primary border border-border-subtle shadow-sm',
} as const;

const surfacePaddings = {
  none: 'p-0',
  sm: 'p-card-sm',
  md: 'p-card-md',
  lg: 'p-card-lg',
} as const;

const surfaceRadii = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
} as const;

export interface AppSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
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

export { AppSurface };
