import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ hasError = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'block w-full h-10 px-3 rounded-md text-body-md text-text-primary placeholder:text-text-subtle',
          'bg-surface-secondary border border-border-default',
          'transition-all duration-fast ease-standard',
          'hover:border-border-strong',
          'focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none',
          'disabled:bg-disabled-surface disabled:text-disabled-text disabled:cursor-not-allowed',
          hasError && 'border-danger focus:border-danger focus:ring-danger/30',
          className,
        )}
        {...props}
      />
    );
  },
);
AppInput.displayName = 'AppInput';

export { AppInput };
