import clsx from "clsx";
import { appCtaContent } from "./content";

export default function CtaHeader() {
  return (
    <div className={clsx("flex w-full max-w-[896px] flex-col items-center gap-3 lg:gap-6")}>
      <div className={clsx("flex items-center gap-3")}>
        <div className={clsx("h-0.5 w-10 bg-white/40")} />
        <img src="/assets/about/cta-phone-badge.svg" alt="" className={clsx("size-3.5")} />
        <div className={clsx("h-0.5 w-10 bg-white/40")} />
      </div>

      <h2
        className={clsx(
          "text-center text-[32px] font-black leading-[36px] uppercase text-white",
          "lg:text-[48px] lg:leading-[48px]"
        )}
      >
        <p className={clsx("m-0")}>{appCtaContent.title[0]}</p>
        <p className={clsx("m-0 text-[#9acbd0]")}>{appCtaContent.title[1]}</p>
      </h2>

      <div
        className={clsx(
          "max-w-[672px] text-center text-sm leading-[24px] text-[#bfdbfe] lg:text-[18px] lg:leading-[29.25px]"
        )}
      >
        {appCtaContent.description.map((line, i) => (
          <p key={i} className={clsx("m-0")}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
