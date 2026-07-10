import clsx from "clsx";
import PageHeroBanner from "@/shared/ui/page-hero-banner";
import BannerPhone from "@/assets/icons/banner-phone.svg";
import BannerMessage from "@/assets/icons/banner-message.svg";
import BannerClock from "@/assets/icons/banner-clock.svg";
import BannerLocation from "@/assets/icons/banner-location.svg";
import BannerTruck from "@/assets/icons/banner-truck.svg";
import BannerChat from "@/assets/icons/banner-chat.svg";
import { bannerContent } from "./content";

const headingClasses = clsx(
  "text-[32px] font-black uppercase leading-10 tracking-[1.5px] text-white lg:text-[60px] lg:leading-15",
  "drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]"
);

const primaryBtnClasses = clsx(
  "inline-flex w-full items-center justify-center gap-3 rounded-lg bg-app-brand-teal px-7 py-3.5 sm:w-auto",
  "text-[14px] font-bold uppercase tracking-[0.35px] text-white",
  "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
  "transition-opacity hover:opacity-90"
);

const secondaryBtnClasses = clsx(
  "inline-flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[rgba(255,255,255,0.6)] sm:w-auto",
  "px-[30px] py-4 text-[14px] font-bold uppercase tracking-[0.35px] text-white",
  "transition-colors hover:border-white hover:bg-white hover:text-app-accent-blue"
);

const statsBarClasses = clsx(
  "grid overflow-clip rounded-t-2xl border-t border-l border-[rgba(255,255,255,0.1)] md:grid-cols-2 lg:grid-cols-4",
  "bg-[rgba(0,0,0,0.4)] backdrop-blur-[6px]"
);

const statItemClasses = clsx(
  "flex min-w-0 items-center gap-3 border-b border-r border-[rgba(255,255,255,0.1)] px-4 py-4 sm:px-7"
);

export default function BannerSection() {
  return (
    <PageHeroBanner
      id={bannerContent.id}
      backgroundImage={bannerContent.backgroundImage}
      imageAlt="Nhà máy sản xuất ván ép Tu Anh 68"
      breadcrumb={bannerContent.breadcrumb}
      className={clsx("min-h-175")}
      contentClassName={clsx("pb-6")}
      backgroundChildren={
        <>
          <div
            className={clsx("absolute inset-0")}
            style={{
              background:
                "linear-gradient(124deg, rgba(41,115,178,0.88) 0%, rgba(30,41,59,0.82) 60%, rgba(15,23,42,0.75) 100%)",
            }}
          />
          <div className={clsx("absolute inset-0 bg-linear-to-t from-[rgba(15,23,42,0.5)] to-60%", "to-transparent")} />
        </>
      }
    >
      <div className={clsx("relative flex w-full max-w-7xl lg:px-8")}>
        <div className={clsx("flex w-full max-w-3xl flex-col gap-3 lg:gap-6")}>
          <div className={clsx("flex items-center gap-3")}>
            <div className={clsx("h-0.5 w-12 bg-app-brand-teal")} />
            <span className={clsx("text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
              {bannerContent.badge}
            </span>
          </div>

          <h1 className={clsx(headingClasses)}>
            {bannerContent.title[0]}
            <br />
            <span className={clsx("text-app-brand-teal")}>{bannerContent.title[1]}</span>
          </h1>

          <p className={clsx("max-w-2xl font-medium leading-7 text-[#e5e7eb] lg:text-[20px]")}>
            {bannerContent.description[0]}
            <br />
            {bannerContent.description[1]}
          </p>

          <div className={clsx("flex flex-col items-start gap-4 pt-4 sm:flex-row sm:flex-wrap sm:gap-6")}>
            <a href={bannerContent.buttons.primary.href} className={clsx(primaryBtnClasses)}>
              <BannerPhone className={clsx("size-3.5 shrink-0")} />
              {bannerContent.buttons.primary.label}
            </a>
            <a href={bannerContent.buttons.secondary.href} className={clsx(secondaryBtnClasses)}>
              <BannerMessage className={clsx("size-3.5 shrink-0")} />
              {bannerContent.buttons.secondary.label}
            </a>
          </div>
        </div>
      </div>

      <div className={clsx("relative")}>
        <div className={clsx(statsBarClasses)}>
          {bannerContent.stats.map((stat) => (
            <div key={stat.icon} className={clsx(statItemClasses)}>
              <span className={clsx("flex shrink-0 items-center text-white/80")}>
                {stat.icon === "clock" && <BannerClock className={clsx("size-4.5 shrink-0")} />}
                {stat.icon === "location" && <BannerLocation className={clsx("size-4.5 shrink-0")} />}
                {stat.icon === "truck" && <BannerTruck className={clsx("size-4.5 shrink-0")} />}
                {stat.icon === "chat" && <BannerChat className={clsx("size-4.5 shrink-0")} />}
              </span>
              <div className={clsx("flex min-w-0 flex-col")}>
                <span className={clsx("text-[14px] font-bold leading-5 text-white")}>{stat.label}</span>
                <span className={clsx("text-[12px] text-[#9ca3af]")}>{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageHeroBanner>
  );
}
