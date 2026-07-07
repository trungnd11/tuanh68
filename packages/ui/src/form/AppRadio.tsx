import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface AppRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
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
            'border-border-default bg-surface-secondary',
            'text-primary-500 accent-primary-500',
            'focus:ring-primary-500/30 focus:ring-2 focus:ring-offset-1 focus:ring-offset-background-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...props}
        />
        {label && (
          <span className="text-body-sm text-text-primary select-none">
            {label}
          </span>
        )}
      </label>
    );
  },
);
AppRadio.displayName = 'AppRadio';

export { AppRadio };
