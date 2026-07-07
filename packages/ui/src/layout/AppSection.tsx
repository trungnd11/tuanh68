import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const sectionSpacings = {
  sm: 'py-section-sm',
  md: 'py-section-md',
  lg: 'py-section-lg',
  none: 'py-0',
} as const;

const sectionBackgrounds = {
  default: 'bg-background-primary',
  secondary: 'bg-background-secondary',
  tertiary: 'bg-background-tertiary',
  surface: 'bg-surface-primary',
  transparent: 'bg-transparent',
} as const;

export interface AppSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: keyof typeof sectionSpacings;
  background?: keyof typeof sectionBackgrounds;
}

const AppSection = forwardRef<HTMLDivElement, AppSectionProps>(
  ({ spacing = 'md', background = 'default', className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'w-full',
          sectionSpacings[spacing],
          sectionBackgrounds[background],
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);
AppSection.displayName = 'AppSection';

export { AppSection };
