'use client';

import {
  AppContainer,
  AppText,
  AppButton,
  AppSurface,
} from '@tuanh68/ui';
import { useInView } from '../../hooks';
import { QuoteForm } from '../QuoteForm';

export function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden bg-background-primary laptop:min-h-[calc(100vh-80px)]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(216_168_74_/_0.18),transparent_34rem)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgb(247_202_102_/_0.10),transparent_28rem)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-500/3 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <AppContainer size="2xl" className="relative z-10 w-full py-20 laptop:py-[120px]">
        <div className="grid items-center gap-12 laptop:grid-cols-[minmax(0,680px)_440px] laptop:gap-20 desktop:justify-between">
          {/* Left column — Text */}
          <div className="max-w-[680px]">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-3 transition-all duration-700 ease-standard ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="h-px w-8 bg-primary-400" />
              <AppText variant="overline" color="accent" as="span" className="text-[14px] font-semibold tracking-[0.12em]">
                Gần 30 năm dẫn đầu
              </AppText>
            </div>

            {/* Heading */}
            <div
              className={`mt-6 space-y-2 transition-all duration-700 ease-standard delay-100 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h1 className="text-[2.625rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-text-primary tablet:text-[3.5rem] laptop:text-[4rem] desktop:text-[5rem]">
                Ván Ép Phủ Phim
              </h1>
              <div className="bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.04em] tablet:text-[3rem] laptop:text-[3.5rem] desktop:text-[4.5rem]">
                Chất Lượng Cao
              </div>
            </div>

            {/* Description */}
            <div
              className={`mt-6 transition-all duration-700 ease-standard delay-200 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <AppText variant="body" size="lg" color="secondary" className="text-[18px] laptop:text-[20px] leading-[1.7]">
                Cung cấp coffa, ván ép phủ phim cho các công trình xây dựng lớn trên toàn quốc.
                Đối tác tin cậy của các nhà thầu hàng đầu Việt Nam.
              </AppText>
            </div>

            {/* CTA */}
            <div
              className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 ease-standard delay-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <AppButton
                variant="primary"
                size="xl"
                className="bg-primary-500 px-[22px] py-[14px] text-text-inverse rounded-[14px] text-button font-bold shadow-[0_4px_24px_rgb(216_168_74_/_0.3)] hover:bg-primary-400 hover:shadow-[0_6px_32px_rgb(216_168_74_/_0.4)] transition-all duration-normal"
              >
                Nhận báo giá
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </AppButton>
              <AppButton
                variant="outline"
                size="xl"
                className="border border-border-default bg-surface-glass px-[22px] py-[14px] text-text-primary backdrop-blur-glass rounded-[14px] text-button font-semibold hover:bg-hover-surface hover:border-border-strong transition-all duration-normal"
              >
                Xem sản phẩm
              </AppButton>
            </div>
          </div>

          {/* Right column — Quote Form */}
          <div
            className={`w-full min-w-0 laptop:w-[440px] laptop:justify-self-end transition-all duration-800 ease-standard delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <AppSurface
              variant="glass"
              padding="none"
              radius="2xl"
              className="rounded-[28px] border border-border-glass bg-surface-glass p-6 shadow-glass backdrop-blur-glass tablet:p-8"
            >
              <QuoteForm />
            </AppSurface>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
