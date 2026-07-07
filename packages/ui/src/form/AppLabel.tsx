import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface AppLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const AppLabel = forwardRef<HTMLLabelElement, AppLabelProps>(
  ({ required = false, className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block text-label text-text-secondary mb-1.5',
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">*</span>
        )}
      </label>
    );
  },
);
AppLabel.displayName = 'AppLabel';

export { AppLabel };
