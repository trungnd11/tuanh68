import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { AppCard } from '../card/AppCard';
import type { AppCardProps } from '../card/AppCard';

export type GlassCardProps = Omit<AppCardProps, 'variant'>;

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AppCard
        ref={ref}
        variant="glass"
        padding="lg"
        radius="xl"
        className={cn('backdrop-blur-glass', className)}
        {...props}
      >
        {children}
      </AppCard>
    );
  },
);
GlassCard.displayName = 'GlassCard';

export { GlassCard };
