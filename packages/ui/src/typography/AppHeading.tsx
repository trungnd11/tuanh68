import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const headingLevels = {
  display: {
    xl: 'text-display-xl font-display',
    lg: 'text-display-lg font-display',
    md: 'text-display-md font-display',
  },
  headline: {
    xl: 'text-headline-xl',
    lg: 'text-headline-lg',
    md: 'text-headline-md',
  },
  title: {
    lg: 'text-title-lg',
    md: 'text-title-md',
    sm: 'text-title-sm',
  },
} as const;

const headingAlignments = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

type Level = 'display' | 'headline' | 'title';
type DisplaySize = keyof typeof headingLevels.display;
type HeadlineSize = keyof typeof headingLevels.headline;
type TitleSize = keyof typeof headingLevels.title;

export interface AppHeadingProps {
  level?: Level;
  display?: DisplaySize;
  headline?: HeadlineSize;
  title?: TitleSize;
  align?: keyof typeof headingAlignments;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children?: React.ReactNode;
}

const tagMap: Record<string, 'h1' | 'h2' | 'h3' | 'h4'> = {
  display: 'h1',
  headline: 'h2',
  title: 'h3',
};

function getHeadingClasses(level: Level, display: DisplaySize, headline: HeadlineSize, title: TitleSize): string {
  if (level === 'display') return headingLevels.display[display];
  if (level === 'headline') return headingLevels.headline[headline];
  return headingLevels.title[title];
}

const AppHeading = forwardRef<HTMLHeadingElement, AppHeadingProps>(
  ({ level = 'headline', display = 'lg', headline = 'lg', title = 'md', align = 'left', as, className, children, ...props }, ref) => {
    const sizeClass = getHeadingClasses(level, display, headline, title);
    const Tag = as ?? tagMap[level] ?? 'h2';

    return (
      <Tag
        ref={ref}
        className={cn(sizeClass, headingAlignments[align], className)}
        {...props as React.HTMLAttributes<HTMLHeadingElement>}
      >
        {children}
      </Tag>
    );
  },
);
AppHeading.displayName = 'AppHeading';

export { AppHeading };
