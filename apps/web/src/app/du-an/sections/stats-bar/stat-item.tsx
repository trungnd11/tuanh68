"use client";

import clsx from "clsx";
import { useCountUp } from "@/shared/hooks/useCountUp";

type StatItemProps = {
  value: string;
  suffix: string;
  label: string;
  isFirst?: boolean;
  borderRightMobile?: boolean;
  borderBottomMobile?: boolean;
};

export default function StatItem({
  value,
  suffix,
  label,
  isFirst,
  borderRightMobile,
  borderBottomMobile,
}: StatItemProps) {
  const numericValue = Number.parseInt(value, 10);
  const { count, ref } = useCountUp(numericValue);

  return (
    <div
      ref={ref}
      className={clsx(
        "flex min-w-px flex-1 flex-col items-center justify-center py-6 pr-0 lg:py-14 lg:pr-[24px]",
        !isFirst && "lg:border-l lg:border-[rgba(255,255,255,0.2)] lg:pl-[25px]",
        borderRightMobile && "border-r border-[rgba(255,255,255,0.2)] lg:border-r-0",
        borderBottomMobile && "border-b border-[rgba(255,255,255,0.2)] lg:border-b-0"
      )}
    >
      <div
        className={clsx("pb-2 text-[40px] font-extrabold leading-[40px] text-white lg:text-[60px] lg:leading-[60px]")}
      >
        {count}
        <span className={clsx("text-app-brand-teal")}>{suffix}</span>
      </div>
      <div
        className={clsx("pt-1 text-xs font-semibold uppercase leading-5 tracking-[1.4px] lg:text-sm", "text-[#bfdbfe]")}
      >
        {label}
      </div>
      <div className={clsx("h-[14px] w-10 pt-3")}>
        <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
      </div>
    </div>
  );
}
