import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const iconBoxSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
} as const;

const iconBoxVariants = {
  default: 'bg-surface-secondary text-text-secondary',
  primary: 'bg-primary-500/15 text-primary-300',
  success: 'bg-success-surface text-success',
  warning: 'bg-warning-surface text-warning',
  danger: 'bg-danger-surface text-danger',
} as const;

const iconBoxRadii = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

export interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof iconBoxSizes;
  variant?: keyof typeof iconBoxVariants;
  radius?: keyof typeof iconBoxRadii;
}

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

export { IconBox };
