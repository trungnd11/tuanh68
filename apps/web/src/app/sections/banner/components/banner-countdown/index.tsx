"use client";

import clsx from "clsx";
import { Fragment, useMemo } from "react";
import { useBannerCountdown } from "@/app/sections/banner/hooks/useBannerCountdown";
import { BannerCountdownUtil } from "../../utils/bannerCountdownUtil";
import type { BannerCountdownProps } from "./types";

export default function BannerCountdown({
  dateRangePrefix,
  dateRangeLabel,
  countdownLabels,
  targetDate,
  initialRemainingSeconds,
}: BannerCountdownProps) {
  const { remainingSeconds } = useBannerCountdown({
    targetDate,
    initialRemainingSeconds,
  });

  const items = useMemo(
    () => BannerCountdownUtil.createCountdownItems(remainingSeconds, countdownLabels),
    [countdownLabels, remainingSeconds]
  );

  return (
    <div className="mt-9 flex flex-col gap-5 xl:mt-12">
      <p
        className={clsx(
          "flex flex-col xl:flex-row justify-center gap-3 text-body-base-semibold leading-4.75",
          "text-white xl:justify-start xl:gap-5 xl:text-body-lg-semibold xl:leading-5.5"
        )}
      >
        <span>{dateRangePrefix}</span>
        <span className={clsx("text-body-lg-semibold leading-4.75 text-main-app-yellow xl:leading-5.5")}>
          {dateRangeLabel}
        </span>
      </p>
      <div
        className={clsx(
          "relative overflow-hidden rounded-[24px] bg-black/20 py-5",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]",
          "backdrop-blur-[27px]"
        )}
      >
        <div
          aria-hidden="true"
          className={clsx(
            "pointer-events-none absolute inset-0 rounded-[24px]",
            "bg-[radial-gradient(28%_60%_at_0%_100%,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.16)_34%,rgba(0,0,0,0)_72%),radial-gradient(28%_60%_at_100%_0%,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.16)_34%,rgba(0,0,0,0)_72%)]"
          )}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[inset_1px_1px_0_rgba(255,255,255,0.16),inset_-1px_-1px_0_rgba(255,255,255,0.16)]"
        />
        <div className="relative flex items-center justify-between px-5 xl:justify-center xl:gap-x-6.5 xl:px-0">
          {items.map((item, index) => (
            <Fragment key={item.label}>
              <div className="flex flex-col items-center justify-center gap-1 text-center">
                <span
                  suppressHydrationWarning
                  className={clsx(
                    "text-[34px] font-black leading-10.25 tracking-[0.369px] xl:text-[38px] xl:leading-11.5",
                    item.isActive ? "text-main-app-yellow" : "text-white/70"
                  )}
                >
                  {item.value}
                </span>
                <span className={clsx("text-body-sm-bold uppercase", item.isActive ? "text-white" : "text-white/70")}>
                  {item.label}
                </span>
              </div>

              {index < items.length - 1 ? (
                <span className="text-[28px] font-medium text-white/50" aria-hidden="true">
                  :
                </span>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
