import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const flexDirections = {
  row: 'flex-row',
  rowReverse: 'flex-row-reverse',
  column: 'flex-col',
  columnReverse: 'flex-col-reverse',
} as const;

const flexAlignments = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const flexJustifications = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const flexSpacings: Record<string, string> = {
  0: 'gap-0',
  2: 'gap-0.5',
  4: 'gap-1',
  8: 'gap-2',
  12: 'gap-3',
  16: 'gap-4',
  20: 'gap-5',
  24: 'gap-6',
  32: 'gap-8',
  40: 'gap-10',
  48: 'gap-12',
  64: 'gap-16',
};

export interface AppFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: keyof typeof flexDirections;
  align?: keyof typeof flexAlignments;
  justify?: keyof typeof flexJustifications;
  gap?: keyof typeof flexSpacings;
  wrap?: boolean;
}

const AppFlex = forwardRef<HTMLDivElement, AppFlexProps>(
  ({ direction = 'row', align = 'start', justify = 'start', gap = '16', wrap = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          flexDirections[direction],
          flexAlignments[align],
          flexJustifications[justify],
          flexSpacings[gap] ?? 'gap-4',
          wrap && 'flex-wrap',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppFlex.displayName = 'AppFlex';

export { AppFlex };
