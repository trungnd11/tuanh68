import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface AppTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(
  ({ hasError = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'block w-full min-h-[120px] px-3 py-2.5 rounded-md text-body-md text-text-primary placeholder:text-text-subtle resize-y',
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
AppTextarea.displayName = 'AppTextarea';

export { AppTextarea };
