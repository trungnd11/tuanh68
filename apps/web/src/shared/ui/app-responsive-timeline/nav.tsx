"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

type AppResponsiveTimelineNavProps = {
  className?: string;
  counter: ReactNode;
  counterClassName?: string;
  currentIndex: number;
  nextDisabledClassName?: string;
  nextEnabledClassName?: string;
  nextLabel: ReactNode;
  nextLabelClassName?: string;
  onNext: () => void;
  onPrev: () => void;
  prevDisabledClassName?: string;
  prevEnabledClassName?: string;
  prevLabel: ReactNode;
  prevLabelClassName?: string;
  showDivider?: boolean;
  totalItems: number;
};

export default function AppResponsiveTimelineNav({
  className,
  counter,
  counterClassName,
  currentIndex,
  nextDisabledClassName = "cursor-not-allowed text-app-neutral-400",
  nextEnabledClassName = "text-app-primary-500",
  nextLabel,
  nextLabelClassName,
  onNext,
  onPrev,
  prevDisabledClassName = "cursor-not-allowed text-app-neutral-400",
  prevEnabledClassName = "text-app-primary-500",
  prevLabel,
  prevLabelClassName,
  showDivider = false,
  totalItems,
}: AppResponsiveTimelineNavProps) {
  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= totalItems - 1;

  return (
    <div className={clsx("flex items-center justify-between gap-3 px-4", className)}>
      <p className={clsx("text-sm leading-5 text-app-neutral-500", counterClassName)}>{counter}</p>

      <div className={clsx("flex items-center gap-4")}>
        <button
          type="button"
          onClick={onPrev}
          disabled={isPrevDisabled}
          className={clsx(
            "inline-flex items-center gap-2 text-sm font-medium",
            isPrevDisabled ? prevDisabledClassName : prevEnabledClassName,
            prevLabelClassName
          )}
        >
          <span aria-hidden="true" className="text-base leading-none">
            &larr;
          </span>
          {prevLabel}
        </button>

        {showDivider ? <span className="h-4 w-px bg-[#969696]" /> : null}

        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className={clsx(
            "inline-flex items-center gap-2 text-sm font-medium",
            isNextDisabled ? nextDisabledClassName : nextEnabledClassName,
            nextLabelClassName
          )}
        >
          {nextLabel}
          <span aria-hidden="true" className="text-base leading-none">
            &rarr;
          </span>
        </button>
      </div>
    </div>
  );
}
