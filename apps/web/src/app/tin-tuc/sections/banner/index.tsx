import clsx from "clsx";
import PageHeroBanner from "@/shared/ui/page-hero-banner";
import { newsBannerContent } from "./content";

export default function NewsBannerSection() {
  return (
    <PageHeroBanner
      backgroundImage={newsBannerContent.backgroundImage}
      imageAlt="Tin tức và sự kiện Tu Anh 68"
      breadcrumb={newsBannerContent.breadcrumb}
      className={clsx("min-h-175")}
      contentClassName={clsx("min-h-[calc(700px-80px)] grid-rows-[auto_1fr]")}
      backgroundChildren={
        <>
          <div
            className={clsx(
              "absolute inset-0 bg-linear-to-b from-[rgba(41,115,178,0.8)]",
              "via-[rgba(41,115,178,0.6)] to-[rgba(51,51,51,0.8)]"
            )}
          />
          <div className={clsx("absolute inset-0 bg-linear-to-t from-[rgba(15,23,42,0.5)] to-60%", "to-transparent")} />
        </>
      }
    >
      <div className={clsx("relative flex w-full max-w-7xl flex-1 items-center justify-center lg:px-8", "pb-10")}>
        <div className={clsx("mx-auto flex w-full max-w-4xl flex-col items-center gap-5")}>
          <h1
            className={clsx(
              "w-full text-center text-[32px] font-extrabold uppercase leading-10 lg:text-[60px] lg:leading-15",
              "tracking-[1.5px] lg:tracking-[3px] text-white",
              "drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]"
            )}
          >
            {newsBannerContent.title}
          </h1>

          <p
            className={clsx(
              "w-full max-w-2xl text-center font-medium leading-7 lg:text-xl",
              "tracking-[0.5px] text-[#dbeafe]",
              "drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06),0px_4px_1.5px_rgba(0,0,0,0.07)]"
            )}
          >
            {newsBannerContent.subtitle[0]}
            <br />
            {newsBannerContent.subtitle[1]}
          </p>

          <div className={clsx("flex w-full items-center justify-center gap-4 pt-3")}>
            <div className={clsx("h-px w-16 bg-[rgba(72,166,167,0.6)]")} />
            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.5 0L14.081 7.75H22.5L15.709 12.25L18.291 20L11.5 15.5L4.709 20L7.291 12.25L0.5 7.75H8.919L11.5 0Z"
                fill="#48a6a7"
                fillOpacity="0.6"
              />
            </svg>
            <div className={clsx("h-px w-16 bg-[rgba(72,166,167,0.6)]")} />
          </div>
        </div>
      </div>
    </PageHeroBanner>
  );
}
