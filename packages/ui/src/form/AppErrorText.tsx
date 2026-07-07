import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export type AppErrorTextProps = React.HTMLAttributes<HTMLParagraphElement>;

const AppErrorText = forwardRef<HTMLParagraphElement, AppErrorTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        role="alert"
        className={cn('mt-1.5 text-caption text-danger', className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
AppErrorText.displayName = 'AppErrorText';

export { AppErrorText };
