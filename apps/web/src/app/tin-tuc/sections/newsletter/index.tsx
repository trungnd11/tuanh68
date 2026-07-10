"use client";

import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { newsletterContent } from "./content";

export default function NewsletterSection() {
  return (
    <section
      className={clsx("border-t border-[#1f2937] bg-[#111827] px-5 py-16 sm:px-8 lg:px-28", "lg:pb-16 lg:pt-[65px]")}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10",
          "lg:flex-row lg:items-center"
        )}
      >
        <AppScrollReveal variant="fade-in-up" className={clsx("flex flex-1 flex-col gap-3")}>
          <div className={clsx("flex items-center gap-3")}>
            <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
            <span className={clsx("text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
              {newsletterContent.badge}
            </span>
          </div>

          <h2 className={clsx("pt-1 text-[30px] font-black uppercase leading-[36px] text-white")}>
            {newsletterContent.titleBefore}
            <span className={clsx("text-app-brand-teal")}>{newsletterContent.titleAccent}</span>
            {newsletterContent.titleAfter}
          </h2>

          <p className={clsx("max-w-[448px] text-[14px] leading-[22.75px] text-[#9ca3af]")}>
            {newsletterContent.description[0]}
            <br />
            {newsletterContent.description[1]}
            <br />
            {newsletterContent.description[2]}
          </p>
        </AppScrollReveal>

        <AppScrollReveal
          variant="fade-in-up"
          delayMs={100}
          className={clsx("flex w-full flex-1 items-start gap-3 lg:w-auto")}
        >
          <div className={clsx("flex-1 rounded-[8px] border border-[#374151] bg-[#1f2937] px-[21px]", "py-[18px]")}>
            <input
              type="email"
              placeholder={newsletterContent.inputPlaceholder}
              className={clsx(
                "w-full bg-transparent text-[14px] text-white outline-none",
                "placeholder:text-[#6b7280]"
              )}
            />
          </div>
          <button
            className={clsx(
              "flex items-center gap-2 rounded-[8px] bg-app-brand-teal px-7 py-[16.5px]",
              "text-[14px] font-bold uppercase tracking-[0.35px] text-white",
              "transition-opacity hover:opacity-90"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.6202 0.15323C13.8964 0.344636 14.0413 0.675495 13.9893 1.00635L12.2393 12.3814C12.1983 12.6466 12.037 12.879 11.8018 13.0103C11.5667 13.1415 11.2851 13.1579 11.0362 13.054L7.76591 11.695L5.89286 13.7212C5.6495 13.9864 5.26669 14.0739 4.93036 13.9427C4.59403 13.8114 4.37528 13.486 4.37528 13.1251V10.8392C4.37528 10.7298 4.4163 10.6259 4.49013 10.5466L9.07294 5.54542C9.23153 5.37315 9.22607 5.10792 9.062 4.94385C8.89794 4.77979 8.63271 4.76885 8.46044 4.92471L2.89872 9.86573L0.484269 8.65714C0.194425 8.51221 0.00848792 8.22237 0.0002848 7.89971C-0.00791832 7.57706 0.161613 7.27628 0.440519 7.11495L12.6905 0.114948C12.9831 -0.0518486 13.344 -0.0354423 13.6202 0.15323Z"
                fill="white"
              />
            </svg>
            {newsletterContent.buttonText}
          </button>
        </AppScrollReveal>
      </div>
    </section>
  );
}
