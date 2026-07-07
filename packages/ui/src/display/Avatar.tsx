import { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';

const avatarSizes = {
  sm: 'h-8 w-8 text-caption',
  md: 'h-10 w-10 text-label',
  lg: 'h-12 w-12 text-body-sm',
  xl: 'h-16 w-16 text-body-md',
} as const;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: keyof typeof avatarSizes;
  fallback?: React.ReactNode;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', initials, size = 'md', fallback, className, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);

    return (
      <div
        ref={ref}
        role={src ? 'img' : undefined}
        aria-label={src ? alt : undefined}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0',
          'bg-surface-tertiary text-text-secondary font-semibold',
          avatarSizes[size],
          className,
        )}
        {...props}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true">
            {fallback ?? initials ?? (
              <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
        )}
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';

export { Avatar };
