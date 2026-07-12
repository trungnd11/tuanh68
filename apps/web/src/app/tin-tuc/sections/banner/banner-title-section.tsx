import clsx from "clsx";
import { newsBannerContent } from "./content";

export default function NewsBannerTitleSection() {
  return (
    <div className={clsx("mx-auto flex w-full max-w-4xl flex-col items-center gap-3 lg:gap-5")}>
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
          "w-full max-w-2xl text-center text-sm font-medium leading-6 lg:text-xl lg:leading-7",
          "tracking-[0.5px] text-[#dbeafe]",
          "drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06),0px_4px_1.5px_rgba(0,0,0,0.07)]"
        )}
      >
        {newsBannerContent.subtitle[0]}
        <br />
        {newsBannerContent.subtitle[1]}
      </p>

      <div className={clsx("flex w-full items-center justify-center gap-4 pt-3")}>
        <div className={clsx("h-px w-12 lg:w-16 bg-[rgba(72,166,167,0.6)]")} />
        <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.5 0L14.081 7.75H22.5L15.709 12.25L18.291 20L11.5 15.5L4.709 20L7.291 12.25L0.5 7.75H8.919L11.5 0Z"
            fill="#48a6a7"
            fillOpacity="0.6"
          />
        </svg>
        <div className={clsx("h-px w-12 lg:w-16 bg-[rgba(72,166,167,0.6)]")} />
      </div>
    </div>
  );
}
