import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const gridColumns = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 tablet:grid-cols-2',
  3: 'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3',
  4: 'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4',
  6: 'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-6',
  12: 'grid-cols-12',
  auto: 'grid-cols-[repeat(auto-fill,minmax(var(--grid-auto-min,16rem),1fr))]',
} as const;

const gridGaps = {
  sm: 'gap-[var(--grid-column-gap-sm)]',
  md: 'gap-[var(--grid-column-gap-md)]',
  lg: 'gap-[var(--grid-column-gap-lg)]',
} as const;

export interface AppGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: keyof typeof gridColumns;
  gap?: keyof typeof gridGaps;
}

const AppGrid = forwardRef<HTMLDivElement, AppGridProps>(
  ({ columns = 1, gap = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          gridColumns[columns],
          gridGaps[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppGrid.displayName = 'AppGrid';

export { AppGrid };
