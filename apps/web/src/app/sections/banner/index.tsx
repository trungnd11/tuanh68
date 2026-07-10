import Image from "next/image";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import RevealBlock from "./reveal-block";
import { bannerContent } from "./content";
import clsx from "clsx";
import Link from "next/link";

export default function BannerSection() {
  return (
    <section
      id={bannerContent.id}
      className={clsx(
        "relative -mt-20.5 flex lg:min-h-200 items-center justify-center",
        "overflow-hidden pt-20.5 lg:pt-40.5 text-white"
      )}
    >
      <Image
        src="/assets/banner/hero-section.png"
        alt="Nhà máy sản xuất ván phủ phim Tu Anh 68"
        fill
        priority
        className={clsx("object-cover")}
        sizes="100vw"
      />

      <div className={clsx("absolute inset-0 bg-app-hero-overlay mix-blend-multiply")} />

      <div
        className={clsx(
          "relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center",
          "gap-3 lg:gap-6 px-4 py-20 lg:pb-20 text-center lg:px-6"
        )}
      >
        <div className={clsx("flex w-full flex-col items-center drop-shadow-hero-title")}>
          <h1
            className={clsx(
              "leading-10 font-extrabold tracking-[2px] text-white uppercase",
              "text-[32px] leading-10",
              "lg:text-[60px] lg:leading-20"
            )}
          >
            <RevealBlock delay={400}>
              <span>{bannerContent.title[0]}</span>
            </RevealBlock>
            <RevealBlock delay={600}>
              <span>{bannerContent.title[1]}</span>
            </RevealBlock>
          </h1>
        </div>

        <RevealBlock delay={800}>
          <p
            className={clsx(
              "drop-shadow-hero-subtitle text-base leading-5 font-medium",
              "tracking-[0.4px] text-app-neutral-200",
              "lg:text-2xl lg:leading-7 lg:tracking-[0.6px]"
            )}
          >
            {bannerContent.subtitle}
          </p>
        </RevealBlock>

        <RevealBlock delay={1000}>
          <div className={clsx("flex w-full flex-col items-center justify-center gap-4 pt-4 sm:flex-row")}>
            <AppBorderRadius cornerRadius={4} classNameBorder="flex w-full">
              <Link
                href={bannerContent.primaryCta.href}
                className={clsx(
                  "flex w-50 h-13 lg:h-15 items-center justify-center bg-white px-6 text-sm",
                  "font-bold text-app-accent-blue uppercase transition-opacity hover:opacity-90"
                )}
              >
                {bannerContent.primaryCta.label}
              </Link>
            </AppBorderRadius>

            <AppBorderRadius cornerRadius={0} classNameBorder="flex w-full">
              <Link
                href={bannerContent.secondaryCta.href}
                className={clsx(
                  "flex w-50 h-13 lg:h-15 items-center rounded-sm justify-center border-2 border-white",
                  "text-white uppercase transition-colors hover:bg-white hover:text-app-accent-blue",
                  "px-6 text-sm font-bold"
                )}
              >
                {bannerContent.secondaryCta.label}
              </Link>
            </AppBorderRadius>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
