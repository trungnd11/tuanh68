import Image from "next/image";
import AppButton from "@/shared/ui/app-button";
import RevealBlock from "./reveal-block";
import { bannerContent } from "./content";

export default function BannerSection() {
  return (
    <section
      id={bannerContent.id}
      className="relative -mt-20.5 flex min-h-200 items-center justify-center overflow-hidden pt-40.5 text-white"
    >
      <Image
        src="/assets/banner/hero-section.png"
        alt="Nhà máy sản xuất ván phủ phim Tu Anh 68"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-app-hero-overlay mix-blend-multiply" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 pb-20 text-center sm:px-6">
        <div className="flex w-full flex-col items-center drop-shadow-hero-title">
          <h1 className="text-[40px] leading-10 font-extrabold tracking-[2px] text-white uppercase sm:text-[48px] sm:leading-12 md:text-[60px] md:leading-15 md:tracking-[3px]">
            <RevealBlock delay={400}>
              <span>{bannerContent.title[0]}</span>
            </RevealBlock>
            <RevealBlock delay={600}>
              <span>{bannerContent.title[1]}</span>
            </RevealBlock>
          </h1>
        </div>

        <RevealBlock delay={800}>
          <p className="drop-shadow-hero-subtitle text-[20px] leading-7 font-medium tracking-[0.4px] text-app-neutral-200 sm:text-[24px] sm:leading-8 sm:tracking-[0.6px]">
            {bannerContent.subtitle}
          </p>
        </RevealBlock>

        <RevealBlock delay={1000}>
          <div className="flex w-full flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <AppButton href={bannerContent.primaryCta.href} variant="primary">
              {bannerContent.primaryCta.label}
            </AppButton>

            <AppButton href={bannerContent.secondaryCta.href} variant="secondary">
              {bannerContent.secondaryCta.label}
            </AppButton>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
