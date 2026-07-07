'use client';

import {
  AppContainer,
  AppSection,
  AppHeading,
  AppText,
  AppButton,
} from '@tuanh68/ui';
import { useInView } from '../../hooks';

export function CallToActionSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="transparent" spacing="lg" className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/6 to-transparent" />

      {/* Glass base */}
      <div className="absolute left-container-x right-container-x top-0 bottom-0 bg-surface-glass backdrop-blur-glass rounded-3xl border border-border-glass" />

      {/* Floating decorative elements */}
      <div className="absolute top-12 left-[10%] w-16 h-16 rounded-full bg-surface-glass backdrop-blur-glass border border-border-glass animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-12 right-[15%] w-10 h-10 rounded-full bg-primary-500/8 backdrop-blur-glass border border-border-glass animate-[float_8s_ease-in-out_infinite_1s]" />
      <div className="absolute top-1/3 right-[8%] w-24 h-6 rounded-full bg-surface-glass backdrop-blur-glass border border-border-glass animate-[float_7s_ease-in-out_infinite_0.5s]" />

      <AppContainer size="2xl" className="relative z-10">
        <div className={`text-center py-16 laptop:py-24 space-y-8 transition-all duration-700 ease-standard ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <AppHeading level="display" display="md" as="h2" align="center">
            Sẵn Sàng Hợp Tác?
          </AppHeading>
          <AppText variant="body" size="lg" color="muted" className="max-w-[50ch] mx-auto" as="div">
            Liên hệ ngay để nhận báo giá và tư vấn miễn phí từ đội ngũ chuyên nghiệp của chúng tôi
          </AppText>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <AppButton variant="primary" size="xl" className="shadow-[0_0_20px_var(--color-primary-500)/20]">
              Nhận báo giá ngay
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AppButton>
            <AppButton variant="outline" size="xl">
              Gọi hotline: 1900 XXXX
            </AppButton>
          </div>
        </div>
      </AppContainer>
    </AppSection>
  );
}
