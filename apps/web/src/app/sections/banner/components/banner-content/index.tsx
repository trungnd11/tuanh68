"use client";

import clsx from "clsx";
import { useEffect, useState, type ReactNode } from "react";
import AppContent from "@/shared/ui/app-content";
import BannerActions from "../banner-actions";
import BannerBadge from "../banner-badge";
import BannerCountdown from "../banner-countdown";
import BannerHeading from "../banner-heading";
import { BannerCountdownUtil } from "../../utils/bannerCountdownUtil";
import { resolveBannerCountdownTargetDate } from "./countdown-target";

const COUNTDOWN_LABELS: [string, string, string, string] = ["Ngày", "Giờ", "Phút", "Giây"];

type BannerRevealItemProps = {
  children: ReactNode;
  delayMs: number;
  isEntered: boolean;
};

function BannerRevealItem({ children, delayMs, isEntered }: BannerRevealItemProps) {
  return (
    <div
      className={clsx(
        "transition-[opacity,translate] duration-[1s]",
        isEntered
          ? "translate-x-0 opacity-100"
          : "translate-x-[60vw] opacity-0 md:translate-x-[40vw] xl:translate-x-[10vw]"
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function BannerContent() {
  const [isEntered, setIsEntered] = useState(false);
  const dateRangeLabel = "";
  const countdownTargetDate = resolveBannerCountdownTargetDate(dateRangeLabel);
  const initialRemainingSeconds = BannerCountdownUtil.getRemainingSeconds(countdownTargetDate);
  const countdownLabels = COUNTDOWN_LABELS;

  useEffect(() => {
    const timer = window.setTimeout(() => setIsEntered(true), 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AppContent className={clsx("relative flex min-h-137.5 w-full items-center py-10.75 px-0! lg:min-h-185 lg:py-0")}>
      <div className="absolute w-full px-[17.5px] text-center xl:px-0 xl:text-start">
        <BannerRevealItem delayMs={0} isEntered={isEntered}>
          <BannerBadge />
        </BannerRevealItem>

        <BannerRevealItem delayMs={250} isEntered={isEntered}>
          <BannerHeading />
        </BannerRevealItem>

        <div className={clsx("xl:max-w-145")}>
          <BannerRevealItem delayMs={500} isEntered={isEntered}>
            <BannerCountdown
              dateRangeLabel={dateRangeLabel}
              dateRangePrefix=""
              targetDate={countdownTargetDate}
              countdownLabels={countdownLabels}
              initialRemainingSeconds={initialRemainingSeconds}
            />
          </BannerRevealItem>

          <BannerRevealItem delayMs={750} isEntered={isEntered}>
            <BannerActions />
          </BannerRevealItem>
        </div>
      </div>
    </AppContent>
  );
}
