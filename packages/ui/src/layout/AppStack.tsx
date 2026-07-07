import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const stackDirections = {
  vertical: 'flex-col',
  horizontal: 'flex-row',
} as const;

const stackAlignments = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const stackJustifications = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const stackSpacings: Record<string, string> = {
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

export interface AppStackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: keyof typeof stackDirections;
  align?: keyof typeof stackAlignments;
  justify?: keyof typeof stackJustifications;
  spacing?: keyof typeof stackSpacings;
}

const AppStack = forwardRef<HTMLDivElement, AppStackProps>(
  ({ direction = 'vertical', align = 'stretch', justify = 'start', spacing = '16', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          stackDirections[direction],
          stackAlignments[align],
          stackJustifications[justify],
          stackSpacings[spacing] ?? 'gap-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AppStack.displayName = 'AppStack';

export { AppStack };
