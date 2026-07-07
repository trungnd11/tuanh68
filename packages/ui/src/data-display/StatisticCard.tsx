import { forwardRef } from 'react';
import { AppCard } from '../card/AppCard';
import { AppText } from '../typography/AppText';

export interface StatisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatisticCard = forwardRef<HTMLDivElement, StatisticCardProps>(
  ({ label, value, icon, trend, className, ...props }, ref) => {
    return (
      <AppCard ref={ref} variant="solid" padding="md" className={className} {...props}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <AppText variant="body" size="sm" color="muted">{label}</AppText>
            <p className="text-headline-lg font-semibold text-text-primary">{value}</p>
            {trend && (
              <AppText
                variant="body"
                size="sm"
                color={trend.positive ? 'primary' : 'danger'}
                className="flex items-center gap-1"
              >
                <span aria-hidden="true">{trend.positive ? '↑' : '↓'}</span>
                {trend.value}
              </AppText>
            )}
          </div>
          {icon && (
            <div className="text-text-muted">{icon}</div>
          )}
        </div>
      </AppCard>
    );
  },
);
StatisticCard.displayName = 'StatisticCard';

export { StatisticCard };
