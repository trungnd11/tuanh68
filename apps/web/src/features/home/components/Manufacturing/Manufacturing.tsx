'use client';

import {
  AppContainer,
  AppSection,
  AppHeading,
  AppText,
  AppCard,
  AppStack,
} from '@tuanh68/ui';
import { useInView } from '../../hooks';

const steps = [
  { id: '1', title: 'Chọn Gỗ', desc: 'Nguyên liệu gỗ keo, bạch đàn được chọn lọc từ vùng nguyên liệu bền vững.', icon: '🌲' },
  { id: '2', title: 'Bóc & Sấy', desc: 'Gỗ được bóc thành từng lớp mỏng và sấy đến độ ẩm tiêu chuẩn.', icon: '🔥' },
  { id: '3', title: 'Ép Nhiệt', desc: 'Các lớp ván được phết keo chịu nước và ép nhiệt ở nhiệt độ cao.', icon: '⚙️' },
  { id: '4', title: 'Phủ Phim', desc: 'Bề mặt được phủ phim chất lượng cao, chống thấm và chịu lực.', icon: '🛡️' },
  { id: '5', title: 'Kiểm Định', desc: 'Sản phẩm được kiểm tra nghiêm ngặt trước khi xuất xưởng.', icon: '✅' },
];

export function ManufacturingSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="secondary" spacing="lg">
      <AppContainer size="lg">
        {/* Header */}
        <div className="text-center mb-16">
          <AppText variant="overline" color="accent" as="div" className="mb-4">
            Quy trình
          </AppText>
          <AppHeading level="headline" headline="xl" as="h2" align="center">
            Quy Trình Sản Xuất 4.0
          </AppHeading>
          <AppText variant="body" size="lg" color="secondary" className="mt-3 max-w-[55ch] mx-auto" as="div">
            5 bước khép kín, đảm bảo chất lượng từ nguyên liệu đến thành phẩm
          </AppText>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden laptop:block">
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-border-default" />
            <div
              className={`absolute top-6 left-[10%] h-0.5 bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-1000 ease-standard ${
                inView ? 'w-[80%]' : 'w-0'
              }`}
            />

            {/* Steps */}
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-center transition-all duration-700 ease-standard ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Number circle */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 bg-background-secondary transition-all duration-500 ${
                      inView
                        ? 'border-primary-500 shadow-[0_0_12px_var(--color-primary-500)]'
                        : 'border-border-default'
                    }`}
                  >
                    <span className="text-title-sm font-semibold text-primary-300">
                      {index + 1}
                    </span>
                  </div>

                  {/* Glass card */}
                  <AppCard variant="glass" padding="md" radius="xl" className="mt-4 w-full">
                    <AppStack spacing="8" align="center">
                      <span className="text-2xl">{step.icon}</span>
                      <AppHeading level="title" title="md" as="h3">
                        {step.title}
                      </AppHeading>
                      <AppText variant="body" size="sm" color="muted">
                        {step.desc}
                      </AppText>
                    </AppStack>
                  </AppCard>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Timeline */}
        <div className="laptop:hidden">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background-secondary z-10 ${
                      inView
                        ? 'border-primary-500'
                        : 'border-border-default'
                    }`}
                  >
                    <span className="text-label font-semibold text-primary-300">
                      {index + 1}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mt-2 w-0.5 flex-1 bg-border-default min-h-[40px]" />
                  )}
                </div>
                <div className="flex-1">
                  <AppCard variant="glass" padding="md" radius="xl">
                    <AppStack spacing="8">
                      <AppHeading level="title" title="sm" as="h3">
                        {step.icon} {step.title}
                      </AppHeading>
                      <AppText variant="body" size="sm" color="muted">
                        {step.desc}
                      </AppText>
                    </AppStack>
                  </AppCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppContainer>
    </AppSection>
  );
}
