import { forwardRef } from 'react';
import { AppCard } from '../card/AppCard';
import { AppText } from '../typography/AppText';
import { AppStack } from '../layout/AppStack';

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  ({ label, value, icon, className, ...props }, ref) => {
    return (
      <AppCard ref={ref} variant="outline" padding="md" className={className} {...props}>
        <AppStack spacing="4">
          <div className="flex items-center gap-2">
            {icon && <span className="text-text-muted">{icon}</span>}
            <AppText variant="body" size="sm" color="muted">{label}</AppText>
          </div>
          <div className="text-body-md font-medium text-text-primary">{value}</div>
        </AppStack>
      </AppCard>
    );
  },
);
InfoCard.displayName = 'InfoCard';

export { InfoCard };
