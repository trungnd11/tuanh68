import Image from "next/image";
import AppBreadcrumb from "@/shared/ui/app-breadcrumb";
import { aboutHeroContent } from "./content";

export default function AboutHeroSection() {
  return (
    <section
      id={aboutHeroContent.id}
      className="relative -mt-20.5 flex min-h-[680px] items-center justify-center overflow-hidden pt-[80px] text-white"
    >
      <div className="absolute inset-0 overflow-clip">
        <Image
          src="/assets/about/hero-banner.jpg"
          alt="Nhà máy sản xuất ván ép Tu Anh 68"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(41,115,178,0.3) 0%, rgba(41,115,178,0) 60%)",
          }}
        />
      </div>

      <AppBreadcrumb
        items={[
          { href: aboutHeroContent.breadcrumb.homeHref, label: aboutHeroContent.breadcrumb.home },
          { href: "#", label: aboutHeroContent.breadcrumb.current },
        ]}
        className="absolute left-20 right-20 top-24 max-lg:left-8 max-lg:right-8"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] px-[32px]">
        <div className="flex w-full max-w-[768px] flex-col gap-[24px]">
          <div className="flex items-center gap-[12px]">
            <div className="h-[2px] w-[48px] bg-app-brand-teal" />
            <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal">
              {aboutHeroContent.badge}
            </span>
          </div>

          <h1 className="text-[60px] font-black leading-[60px] tracking-[1.5px] uppercase drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]">
            {aboutHeroContent.title[0]}
            <br />
            <span className="text-app-brand-teal">{aboutHeroContent.title[1]}</span>
          </h1>

          <p className="max-w-[672px] text-[20px] font-medium leading-[28px] text-[#e5e7eb]">
            {aboutHeroContent.description[0]}
            <br />
            {aboutHeroContent.description[1]}
            <br />
            {aboutHeroContent.description[2]}
          </p>

          <div className="flex w-full flex-wrap gap-8 gap-y-6 pt-4 md:gap-0 md:pt-0">
            {aboutHeroContent.stats.slice(0, 3).map((stat, i) => (
              <div key={stat.value} className="flex items-center gap-8 md:gap-0">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-center text-[36px] font-black leading-[40px] text-white">{stat.value}</span>
                  <span className="text-center text-[14px] font-medium uppercase tracking-[0.35px] text-app-brand-teal">
                    {stat.label}
                  </span>
                </div>
                {i < 2 && <div className="mx-8 hidden h-[64px] w-px bg-[rgba(255,255,255,0.2)] md:block" />}
              </div>
            ))}
            <div className="flex w-full md:w-auto">
              <div className="flex flex-col gap-[4px]">
                <span className="text-center text-[36px] font-black leading-[40px] text-white md:text-left">
                  {aboutHeroContent.stats[3].value}
                </span>
                <span className="text-center text-[14px] font-medium uppercase tracking-[0.35px] text-app-brand-teal md:text-left">
                  {aboutHeroContent.stats[3].label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
