import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const textVariants = {
  body: {
    lg: 'text-body-lg',
    md: 'text-body-md',
    sm: 'text-body-sm',
  },
  caption: 'text-caption',
  label: 'text-label',
  overline: 'text-overline uppercase tracking-[0.08em]',
} as const;

const textColors = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  subtle: 'text-text-subtle',
  accent: 'text-text-accent',
  inverse: 'text-text-inverse',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
} as const;

const textWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

export interface AppTextProps {
  variant?: keyof typeof textVariants | 'body';
  size?: keyof typeof textVariants.body;
  color?: keyof typeof textColors;
  weight?: keyof typeof textWeights;
  as?: 'p' | 'span' | 'div' | 'label' | 'small';
  className?: string;
  children?: React.ReactNode;
}

const AppText = forwardRef<HTMLParagraphElement, AppTextProps>(
  ({ variant = 'body', size = 'md', color = 'primary', weight, as: Tag = 'p', className, children, ...props }, ref) => {
    const variantClass = variant === 'body' ? textVariants.body[size] : textVariants[variant];

    return (
      <Tag
        ref={ref as never}
        className={cn(
          variantClass,
          textColors[color],
          weight && textWeights[weight],
          className,
        )}
        {...props as React.Attributes}
      >
        {children}
      </Tag>
    );
  },
);
AppText.displayName = 'AppText';

export { AppText };
