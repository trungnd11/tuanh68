import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import styles from '../styles/skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          styles.skeleton,
          variant === 'text' && 'h-4 rounded-sm',
          variant === 'circular' && 'rounded-full',
          variant === 'rectangular' && 'rounded-md',
          className,
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
        {...props}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
