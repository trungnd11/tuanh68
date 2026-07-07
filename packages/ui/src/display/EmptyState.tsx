import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppText } from '../typography/AppText';
import { AppStack } from '../layout/AppStack';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-text-muted">
            {icon}
          </div>
        )}
        <AppStack spacing="8" align="center">
          {title && <AppText variant="body" size="lg" weight="semibold" color="primary">{title}</AppText>}
          {description && <AppText variant="body" size="sm" color="muted">{description}</AppText>}
          {action && <div className="mt-2">{action}</div>}
        </AppStack>
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
