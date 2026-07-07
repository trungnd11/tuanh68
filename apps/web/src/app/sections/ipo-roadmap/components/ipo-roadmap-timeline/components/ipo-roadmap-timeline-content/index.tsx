"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

type IpoRoadmapTimelineContentProps = {
  stepKey: string;
};

export default function IpoRoadmapTimelineContent({ stepKey }: IpoRoadmapTimelineContentProps) {
  const t = useTranslations("HomePage.ipoRoadmap");

  const title = t(`content.${stepKey}.title`);
  const date = t(`content.${stepKey}.date`);
  const items = t.raw(`content.${stepKey}.items`) as string[];

  return (
    <div
      className={clsx(
        "bg-[#edfaf7]",
        "border border-solid border-[rgba(0,132,74,0.5)]",
        "flex flex-col gap-5 items-start px-8 py-9 rounded-2xl w-full"
      )}
    >
      <div className={clsx("flex flex-col gap-2 items-start")}>
        <p className={clsx("text-[20px] font-bold leading-7 text-[#030712]")}>{title}</p>
        <p className={clsx("text-[18px] font-semibold leading-normal text-[#00844a]")}>{date}</p>
      </div>

      <div className={clsx("flex flex-col gap-2 items-start w-full")}>
        {items.map((item, index) => (
          <div key={index} className={clsx("flex gap-2.5 items-start w-full")}>
            <span className={clsx("shrink-0 mt-1.5 size-[6px] rounded-full bg-[#00844a]")} />
            <p className={clsx("flex-1 text-[14px] font-medium leading-5 text-[#030712]")}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
