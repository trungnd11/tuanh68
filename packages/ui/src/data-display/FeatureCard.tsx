import { forwardRef } from 'react';
import { AppCard } from '../card/AppCard';
import { AppHeading } from '../typography/AppHeading';
import { AppText } from '../typography/AppText';
import { AppStack } from '../layout/AppStack';

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, className, ...props }, ref) => {
    return (
      <AppCard ref={ref} variant="solid" padding="lg" className={className} {...props}>
        <AppStack spacing="16">
          {icon && (
            <div className="text-primary-500">{icon}</div>
          )}
          <AppStack spacing="8">
            <AppHeading level="title" title="md">{title}</AppHeading>
            <AppText variant="body" size="sm" color="muted">{description}</AppText>
          </AppStack>
        </AppStack>
      </AppCard>
    );
  },
);
FeatureCard.displayName = 'FeatureCard';

export { FeatureCard };
