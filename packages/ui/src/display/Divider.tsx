import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          orientation === 'horizontal'
            ? 'w-full border-t border-divider'
            : 'self-stretch border-l border-divider',
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = 'Divider';

export { Divider };
