import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const containerSizes = {
  sm: 'max-w-[var(--container-sm)]',
  md: 'max-w-[var(--container-md)]',
  lg: 'max-w-[var(--container-lg)]',
  xl: 'max-w-[var(--container-xl)]',
  '2xl': 'max-w-[var(--container-2xl)]',
  full: 'max-w-full',
} as const;

export interface AppContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerSizes;
}

const AppContainer = forwardRef<HTMLDivElement, AppContainerProps>(
  ({ size = 'lg', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-[var(--spacing-container-x)]',
          containerSizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppContainer.displayName = 'AppContainer';

export { AppContainer };
