'use client';

import {
  AppContainer,
  AppSection,
  AppHeading,
  AppText,
  AppCard,
} from '@tuanh68/ui';
import { useInView } from '../../hooks';
import { partners } from '../../mock/partners';

export function PartnersSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="secondary" spacing="md">
      <AppContainer size="2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <AppText variant="overline" color="accent" as="div" className="mb-4">
            Đối tác
          </AppText>
          <AppHeading level="headline" headline="lg" as="h2" align="center">
            Đối Tác Tin Cậy
          </AppHeading>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-6 gap-4">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`transition-all duration-700 ease-standard ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AppCard variant="glass" padding="lg" radius="xl" interactive className="group">
                <div className="aspect-[3/2] flex items-center justify-center">
                  <div className="max-h-10 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-normal">
                    <AppText variant="body" size="md" color="muted" weight="semibold">
                      {partner.name}
                    </AppText>
                  </div>
                </div>
              </AppCard>
            </div>
          ))}
        </div>
      </AppContainer>
    </AppSection>
  );
}
