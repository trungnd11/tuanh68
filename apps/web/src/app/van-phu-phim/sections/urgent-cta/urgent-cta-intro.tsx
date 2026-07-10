import clsx from "clsx";
import IconEye from "@/assets/icons/icon-eye.svg";
import IconDocument from "@/assets/icons/icon-document.svg";
import { urgentCtaContent } from "./content";

export default function UrgentCtaIntro() {
  return (
    <div className={clsx("flex min-w-0 flex-1 flex-col gap-4 lg:gap-5")}>
      <div className={clsx("flex w-full shrink-0 items-center gap-3")}>
        <div className={clsx("h-0.5 w-10 shrink-0 bg-white/50")} />
        <span className={clsx("text-sm font-semibold uppercase leading-5 tracking-[1.4px] text-white/80")}>
          {urgentCtaContent.badge}
        </span>
      </div>

      <div
        className={clsx(
          "w-full text-3xl font-black uppercase leading-9 text-white",
          "sm:text-4xl sm:leading-[44px] lg:text-5xl lg:leading-[48px]"
        )}
      >
        <p className={clsx("mb-0")}>{urgentCtaContent.titleLines[0]}</p>
        <p className={clsx("mb-0 text-white/80")}>{urgentCtaContent.titleLines[1]}</p>
      </div>

      <div className={clsx("w-full text-base font-normal leading-7 text-[#ccfbf1] lg:text-lg lg:leading-[29.25px]")}>
        {urgentCtaContent.description.map((line) => (
          <p key={line} className={clsx("mb-0")}>
            {line}
          </p>
        ))}
      </div>

      <div
        className={clsx(
          "flex w-full shrink-0 flex-col items-start gap-3 pt-2 sm:flex-row sm:flex-wrap lg:gap-4 lg:pt-3"
        )}
      >
        <a
          href={urgentCtaContent.buttons.primary.href}
          className={clsx(
            "relative flex w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-white",
            "px-8 py-4 text-sm font-black uppercase leading-5 tracking-[0.35px] text-[#48a6a7]",
            "shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:w-auto"
          )}
        >
          <span className={clsx("inline-flex shrink-0 items-center")}>
            <IconEye className={clsx("size-4.5")} />
          </span>
          <span className={clsx("whitespace-nowrap")}>{urgentCtaContent.buttons.primary.label}</span>
        </a>
        <a
          href={urgentCtaContent.buttons.secondary.href}
          className={clsx(
            "relative flex w-full shrink-0 items-center justify-center gap-3 rounded-xl",
            "border-2 border-solid border-white px-8 py-4 text-sm font-bold uppercase",
            "leading-5 tracking-[0.35px] text-white sm:w-auto"
          )}
        >
          <span className={clsx("inline-flex shrink-0 items-center")}>
            <IconDocument className={clsx("size-3.5")} />
          </span>
          <span className={clsx("whitespace-nowrap")}>{urgentCtaContent.buttons.secondary.label}</span>
        </a>
      </div>
    </div>
  );
}
