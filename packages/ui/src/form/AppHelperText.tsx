import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export type AppHelperTextProps = React.HTMLAttributes<HTMLParagraphElement>;

const AppHelperText = forwardRef<HTMLParagraphElement, AppHelperTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('mt-1.5 text-caption text-text-subtle', className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
AppHelperText.displayName = 'AppHelperText';

export { AppHelperText };
