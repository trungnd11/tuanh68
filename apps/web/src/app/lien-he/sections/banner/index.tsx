import Image from "next/image";
import clsx from "clsx";
import AppBreadcrumb from "@/shared/ui/app-breadcrumb";
import BannerPhone from "@/assets/icons/banner-phone.svg";
import BannerMessage from "@/assets/icons/banner-message.svg";
import BannerClock from "@/assets/icons/banner-clock.svg";
import BannerLocation from "@/assets/icons/banner-location.svg";
import BannerTruck from "@/assets/icons/banner-truck.svg";
import BannerChat from "@/assets/icons/banner-chat.svg";
import { bannerContent } from "./content";

const sectionClasses = clsx(
  "relative flex -mt-20.5 min-h-175 items-center justify-center overflow-hidden text-white",
  "max-md:flex-col max-md:justify-start max-md:min-h-screen max-md:pt-24"
);

const breadcrumbClasses = clsx(
  "absolute left-20 right-20 top-24",
  "max-sm:left-4 max-sm:right-4",
  "max-md:w-full max-md:max-w-7xl max-md:mx-auto max-md:px-4"
);

const contentWrapperClasses = clsx(
  "relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-4 sm:px-8",
  "max-md:z-auto max-md:flex-1 max-md:flex max-md:items-center max-md:justify-center"
);

const statsWrapperClasses = clsx("absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-28", "max-md:w-full max-md:pb-4");

const headingClasses = clsx(
  "text-[60px] font-black uppercase leading-15 tracking-[1.5px] text-white",
  "drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]",
  "max-md:text-[42px] max-md:leading-[44px] max-sm:text-[32px] max-sm:leading-[36px]"
);

const primaryBtnClasses = clsx(
  "inline-flex items-center gap-3 rounded-lg bg-app-brand-teal px-7 py-3.5",
  "text-[14px] font-bold uppercase tracking-[0.35px] text-white",
  "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
  "transition-opacity hover:opacity-90"
);

const secondaryBtnClasses = clsx(
  "inline-flex items-center gap-3 rounded-lg border-2 border-[rgba(255,255,255,0.6)]",
  "px-[30px] py-4 text-[14px] font-bold uppercase tracking-[0.35px] text-white",
  "transition-colors hover:border-white hover:bg-white hover:text-app-accent-blue"
);

const statsBarClasses = clsx(
  "flex flex-wrap overflow-clip rounded-t-2xl border-t border-[rgba(255,255,255,0.1)]",
  "bg-[rgba(0,0,0,0.4)] backdrop-blur-[6px]"
);

const statItemClasses = clsx(
  "flex min-w-40 flex-1 items-center gap-3 px-4 py-4",
  "border-l border-[rgba(255,255,255,0.1)] first:border-l-0 sm:px-7"
);

export default function BannerSection() {
  return (
    <section id={bannerContent.id} className={sectionClasses}>
      <div className="absolute inset-0 flex flex-col items-start justify-center overflow-clip">
        <Image
          src={bannerContent.backgroundImage}
          alt="Nhà máy sản xuất ván ép Tu Anh 68"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(124deg, rgba(41,115,178,0.88) 0%, rgba(30,41,59,0.82) 60%, rgba(15,23,42,0.75) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[rgba(15,23,42,0.5)] to-60% to-transparent" />
      </div>

      <AppBreadcrumb
        items={[
          { href: bannerContent.breadcrumb.homeHref, label: bannerContent.breadcrumb.home },
          { href: "#", label: bannerContent.breadcrumb.current },
        ]}
        className={breadcrumbClasses}
      />

      <div className={contentWrapperClasses}>
        <div className="flex w-full max-w-3xl flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-12 bg-app-brand-teal" />
            <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal">
              {bannerContent.badge}
            </span>
          </div>

          <h1 className={headingClasses}>
            {bannerContent.title[0]}
            <br />
            <span className="text-app-brand-teal">{bannerContent.title[1]}</span>
          </h1>

          <p className="max-w-2xl text-[20px] font-medium leading-7 text-[#e5e7eb] max-md:text-base max-md:leading-6">
            {bannerContent.description[0]}
            <br />
            {bannerContent.description[1]}
          </p>

          <div className="flex flex-wrap items-start gap-4 pt-4 sm:gap-6 max-sm:flex-col">
            <a href={bannerContent.buttons.primary.href} className={primaryBtnClasses}>
              <BannerPhone className="size-3.5 shrink-0" />
              {bannerContent.buttons.primary.label}
            </a>
            <a href={bannerContent.buttons.secondary.href} className={secondaryBtnClasses}>
              <BannerMessage className="size-3.5 shrink-0" />
              {bannerContent.buttons.secondary.label}
            </a>
          </div>
        </div>
      </div>

      <div className={statsWrapperClasses}>
        <div className={statsBarClasses}>
          {bannerContent.stats.map((stat) => (
            <div key={stat.icon} className={statItemClasses}>
              <span className="flex shrink-0 items-center text-white/80">
                {stat.icon === "clock" && <BannerClock className="size-4.5 shrink-0" />}
                {stat.icon === "location" && <BannerLocation className="size-4.5 shrink-0" />}
                {stat.icon === "truck" && <BannerTruck className="size-4.5 shrink-0" />}
                {stat.icon === "chat" && <BannerChat className="size-4.5 shrink-0" />}
              </span>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold leading-5 text-white">{stat.label}</span>
                <span className="text-[12px] text-[#9ca3af]">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
