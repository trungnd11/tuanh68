import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const cardVariants = {
  glass: 'bg-surface-glass backdrop-blur-glass border border-border-glass',
  solid: 'bg-surface-primary border border-border-subtle',
  outline: 'border border-border-default bg-transparent',
  elevated: 'bg-surface-primary border border-border-subtle shadow-sm',
} as const;

const cardPaddings = {
  none: 'p-0',
  sm: 'p-card-sm',
  md: 'p-card-md',
  lg: 'p-card-lg',
} as const;

const cardRadii = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
} as const;

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants;
  padding?: keyof typeof cardPaddings;
  radius?: keyof typeof cardRadii;
  interactive?: boolean;
}

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
            'cursor-pointer transition-all duration-normal ease-standard',
            'hover:scale-[1.02] hover:border-border-strong hover:shadow-md',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
          ],
          className,
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppCard.displayName = 'AppCard';

export { AppCard };
