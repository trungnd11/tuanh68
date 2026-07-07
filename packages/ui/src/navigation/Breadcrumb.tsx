import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = '/', className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center gap-2 text-caption text-text-subtle', className)}
        {...props}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-text-subtle" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-text-secondary transition-colors duration-fast"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={isLast ? 'text-text-primary font-medium' : ''}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
