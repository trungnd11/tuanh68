'use client';

import {
  AppContainer,
  AppSection,
  AppHeading,
  AppText,
  AppButton,
  AppFlex,
} from '@tuanh68/ui';
import { useInView } from '../../hooks';

export function AboutFactorySection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="secondary" spacing="lg">
      <AppContainer size="2xl">
        <div className="flex flex-col laptop:flex-row items-center gap-12">
          {/* Left — Text */}
          <div className={`w-full laptop:w-[40%] space-y-6 transition-all duration-700 ease-standard ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <AppText variant="overline" color="accent" as="div">
              Về nhà máy
            </AppText>
            <AppHeading level="headline" headline="xl" as="h2">
              Sản Xuất Tại Nhà Máy
            </AppHeading>
            <div className="text-headline-md text-primary-300">
              Hiện Đại Bậc Nhất Việt Nam
            </div>
            <div className="space-y-4 max-w-[45ch]">
              <AppText variant="body" size="lg" color="secondary">
                Với gần 30 năm kinh nghiệm, nhà máy Tuấn Anh 68 tọa lạc tại Bình Dương
                trên diện tích hơn 30.000 m² với dây chuyền sản xuất hiện đại.
              </AppText>
              <AppText variant="body" size="md" color="muted">
                Sở hữu đội ngũ kỹ sư giàu kinh nghiệm, máy móc nhập khẩu từ châu Âu,
                đảm bảo mỗi sản phẩm đạt tiêu chuẩn chất lượng cao nhất.
              </AppText>
            </div>
            {/* Signature */}
            <AppFlex direction="column" gap="4">
              <div className="w-12 h-px bg-primary-400" />
              <AppText variant="body" size="sm" color="muted">
                Mr. Nguyễn Văn A — Nhà sáng lập
              </AppText>
            </AppFlex>
            <AppButton variant="outline" size="lg">
              Tham quan nhà máy
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AppButton>
          </div>

          {/* Right — Images */}
          <div className={`w-full laptop:w-[60%] relative transition-all duration-700 ease-standard delay-100 ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            {/* Main image placeholder */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-tertiary shadow-lg relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <AppText variant="body" size="md" color="muted">
                  TODO: Ảnh nhà máy
                </AppText>
              </div>
            </div>

            {/* Overlay image */}
            <div className={`absolute -bottom-6 right-4 w-[35%] aspect-[4/3] rounded-xl overflow-hidden border-2 border-border-glass bg-surface-elevated shadow-lg transition-all duration-700 ease-standard delay-200 ${
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <AppText variant="body" size="sm" color="muted">
                  TODO: Ảnh máy ép
                </AppText>
              </div>
            </div>

            {/* Floating glass tag */}
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-md bg-surface-glass backdrop-blur-glass border border-border-glass transition-all duration-700 ease-standard delay-300 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}>
              <AppText variant="label" color="accent" as="span">Est. 1995</AppText>
            </div>
          </div>
        </div>
      </AppContainer>
    </AppSection>
  );
}
