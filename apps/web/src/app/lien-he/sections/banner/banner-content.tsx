import clsx from "clsx";
import BannerPhone from "@/assets/icons/banner-phone.svg";
import BannerMessage from "@/assets/icons/banner-message.svg";
import { bannerContent } from "./content";

const headingClasses = clsx(
  "text-[32px] font-black uppercase leading-10 lg:text-[60px] lg:leading-15",
  "tracking-[1.5px] text-white lg:tracking-[3px]",
  "drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]"
);

export default function BannerContent() {
  return (
    <div className={clsx("flex w-full max-w-3xl flex-col gap-3 lg:gap-6")}>
      <div className={clsx("flex items-center gap-3")}>
        <div className={clsx("h-0.5 w-12 bg-app-brand-teal")} />
        <div className={clsx("text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
          {bannerContent.badge}
        </div>
      </div>

      <h1 className={clsx(headingClasses)}>
        {bannerContent.title[0]}
        <br />
        <span className={clsx("text-app-brand-teal")}>{bannerContent.title[1]}</span>
      </h1>

      <p className={clsx("max-w-2xl text-sm font-medium leading-7 text-[#e5e7eb] lg:text-[20px]")}>
        {bannerContent.description[0]}
        <br />
        {bannerContent.description[1]}
      </p>

      <div className={clsx("flex flex-col items-start gap-4 pt-4 sm:flex-row sm:flex-wrap sm:gap-6")}>
        <a
          href={bannerContent.buttons.primary.href}
          className={clsx(
            "inline-flex w-full items-center justify-center gap-3 rounded-lg bg-app-brand-teal px-7 py-3.5 sm:w-auto",
            "text-[14px] font-bold uppercase tracking-[0.35px] text-white",
            "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
            "transition-opacity hover:opacity-90"
          )}
        >
          <BannerPhone className={clsx("size-3.5 shrink-0")} />
          {bannerContent.buttons.primary.label}
        </a>
        <a
          href={bannerContent.buttons.secondary.href}
          className={clsx(
            "inline-flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[rgba(255,255,255,0.6)] sm:w-auto",
            "px-[30px] py-4 text-[14px] font-bold uppercase tracking-[0.35px] text-white",
            "transition-colors hover:border-white hover:bg-white hover:text-app-accent-blue"
          )}
        >
          <BannerMessage className={clsx("size-3.5 shrink-0")} />
          {bannerContent.buttons.secondary.label}
        </a>
      </div>
    </div>
  );
}
