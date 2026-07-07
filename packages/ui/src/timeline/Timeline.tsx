import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[];
  orientation?: 'vertical' | 'horizontal';
}

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ steps, orientation = 'vertical', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          orientation === 'horizontal'
            ? 'grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-6 gap-6'
            : 'space-y-0',
          className,
        )}
        {...props}
      >
        {steps.map((step, index) => (
          <div key={step.id} className={cn('relative flex', orientation === 'vertical' ? 'gap-4 pb-8' : 'flex-col items-center text-center')}>
            {orientation === 'horizontal' && (
              <>
                <div className="relative flex flex-col items-center">
                  <div className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-500 bg-background-primary text-title-sm font-semibold text-primary-300 z-10',
                  )}>
                    {step.icon ?? (index + 1)}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-6 left-[calc(50%+24px)] right-0 h-0.5 bg-border-default hidden desktop:block" />
                  )}
                </div>
                <div className="mt-3">
                  <h4 className="text-title-sm text-text-primary mb-1">{step.title}</h4>
                  <p className="text-body-sm text-text-muted">{step.description}</p>
                </div>
              </>
            )}
            {orientation === 'vertical' && (
              <>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary-500 bg-background-primary text-label font-semibold text-primary-300 z-10',
                  )}>
                    {step.icon ?? (index + 1)}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mt-2 w-0.5 flex-1 bg-border-default min-h-[40px]" />
                  )}
                </div>
                <div className="pb-4">
                  <h4 className="text-title-sm text-text-primary mb-1">{step.title}</h4>
                  <p className="text-body-sm text-text-muted">{step.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  },
);
Timeline.displayName = 'Timeline';

export { Timeline };
