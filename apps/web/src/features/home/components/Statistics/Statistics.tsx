'use client';

import { AppContainer, AppText, AppCard } from '@tuanh68/ui';
import { useInView } from '../../hooks';
import { CountUp } from './CountUp';
import { statistics } from '../../mock/statistics';

const statIcons = [
  <svg key="years" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="projects" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-18v18M3 7h7.5M3 11h7.5m3-4.5H21M3 15h7.5m3-4.5H21M3 19h7.5m3-4.5H21" />
  </svg>,
  <svg key="partners" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
  <svg key="coverage" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>,
];

export function StatisticsSection() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="bg-background-primary py-14 laptop:py-20"
    >
      <AppContainer size="2xl">
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          {statistics.map((stat, index) => (
            <div
              key={stat.id}
              className={`transition-all duration-700 ease-standard ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AppCard
                variant="glass"
                padding="none"
                radius="xl"
                className="h-full rounded-[24px] border border-border-glass bg-surface-glass p-[28px] backdrop-blur-glass"
              >
                <div className="relative flex flex-col items-center text-center">
                  <div className="text-primary-300 opacity-60 mb-4">
                    {statIcons[index] ?? statIcons[0]}
                  </div>
                  <span className="text-[3.5rem] tablet:text-[4rem] desktop:text-[4.5rem] leading-none font-[650] tracking-[-0.02em] text-text-primary">
                    <CountUp
                      end={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                      suffix={stat.value.replace(/[0-9]/g, '')}
                    />
                  </span>
                  <AppText variant="body" size="sm" color="muted" className="mt-2 tracking-[0.05em]">
                    {stat.label}
                  </AppText>
                </div>
              </AppCard>
            </div>
          ))}
        </div>
      </AppContainer>
    </section>
  );
}
