import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const buttonVariants = {
  primary: 'bg-primary-500 text-text-inverse hover:bg-primary-400 active:bg-primary-600 shadow-xs',
  secondary: 'bg-surface-elevated text-text-primary border border-border-default hover:bg-surface-tertiary hover:border-border-strong',
  outline: 'border-2 border-primary-500 text-primary-300 hover:bg-primary-500/10',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-hover-surface',
  link: 'text-primary-300 underline-offset-2 hover:underline p-0 h-auto',
} as const;

const buttonSizes = {
  sm: 'h-8 px-3 text-button gap-1.5',
  md: 'h-10 px-4 text-button gap-2',
  lg: 'h-12 px-6 text-button gap-2.5',
  xl: 'h-14 px-8 text-button gap-3',
} as const;

export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
          'relative inline-flex items-center justify-center font-semibold rounded-md transition-all duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
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

export { AppButton };
