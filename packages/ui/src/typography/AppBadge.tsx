import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const badgeVariants = {
  primary: 'bg-primary-500/15 text-primary-300 border border-primary-500/25',
  secondary: 'bg-surface-secondary text-text-secondary border border-border-default',
  success: 'bg-success-surface text-success border border-success-border',
  warning: 'bg-warning-surface text-warning border border-warning-border',
  danger: 'bg-danger-surface text-danger border border-danger-border',
  outline: 'border border-border-default text-text-secondary bg-transparent',
} as const;

export interface AppBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

const AppBadge = forwardRef<HTMLSpanElement, AppBadgeProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-label font-medium',
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

export { AppBadge };
