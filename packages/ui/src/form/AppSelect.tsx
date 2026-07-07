import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface AppSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  placeholder?: string;
}

const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(
  ({ hasError = false, placeholder, children, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'block w-full h-10 px-3 rounded-md text-body-md text-text-primary',
          'bg-surface-secondary border border-border-default',
          'transition-all duration-fast ease-standard',
          'hover:border-border-strong',
          'focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none',
          'disabled:bg-disabled-surface disabled:text-disabled-text disabled:cursor-not-allowed',
          hasError && 'border-danger focus:border-danger focus:ring-danger/30',
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

export { AppSelect };
