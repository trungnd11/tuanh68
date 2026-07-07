"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getChartConfig, getChartGreyLegend } from "@/app/sections/f88-breakthrough-growth/data";
import BreakthroughGrowthChart from "./breakthrough-growth-chart";
import BreakthroughGrowthTable from "@/app/sections/f88-breakthrough-growth/components/breakthrough-growth-table";
import clsx from "clsx";

export default function BreakthroughGrowthChartCard() {
  const t = useTranslations("HomePage.f88BreakthroughGrowth");
  const config = getChartConfig(t);
  const greyLegend = getChartGreyLegend(t);
  // const footnote = getGrowthFootnote(t);

  const [barSize, setBarSize] = useState(20);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBarSize(mq.matches ? 18 : 20);
    const handler = (e: MediaQueryListEvent) => setBarSize(e.matches ? 18 : 20);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="w-full max-w-5xl bg-app-neutral-100 p-0 xl:shadow-[0_4px_4px_-2px_rgba(0,0,0,0.07)] md:p-6">
      <div className="bg-white shadow-[0_0_18px_rgba(0,0,0,0.13)] xl:shadow-none">
        <div className="flex flex-col gap-3 pt-3">
          <div className="flex h-6 items-center justify-center px-3 md:px-6">
            <span className="text-sm text-[#030712] tracking-[-0.1504px]">
              <span className="font-normal">{t("chart.header.unitLabel")}</span>{" "}
              <span className="font-bold">{t("chart.header.unit")}</span>
              {"  /  "}
              <span className="font-normal">{t("chart.header.aLabel")}</span>{" "}
              <span className="font-bold">{t("chart.header.actual")}</span>
              {"  /  "}
              <span className="font-normal">{t("chart.header.fLabel")}</span>{" "}
              <span className="font-bold">{t("chart.header.forecast")}</span>
            </span>
          </div>
          <div className="h-px w-full bg-[#d9d9d9]" />
        </div>

        <div className="overflow-x-auto md:overflow-visible w-full">
          <div className="flex flex-col w-187.5 md:w-full">
            <div
              className={clsx(
                "flex items-center gap-x-3.25 xl:gap-x-8",
                "gap-y-2 px-3 xl:pt-6.25 xl:pb-6.5 md:px-6 md:flex-wrap",
                "pt-4.5 pb-4.75"
              )}
            >
              <div className="flex items-center gap-1.25 xl:gap-2 shrink-0">
                <span className="block size-2.5 xl:size-3 rounded bg-app-primary-500" />
                <span className="text-sm font-normal xl:font-medium text-app-neutral-950 whitespace-nowrap">
                  {config.series[0].label}
                </span>
              </div>
              <div className="flex items-center gap-1.25 xl:gap-2 shrink-0">
                <span className="block size-2.5 xl:size-3 rounded bg-[#2563eb]" />
                <span className="text-sm font-normal xl:font-medium text-app-neutral-950 whitespace-nowrap">
                  {config.series[1].label}
                </span>
              </div>
              <div className="flex items-center gap-1.25 xl:gap-2 shrink-0">
                <svg width="34" height="10" viewBox="0 0 34 10" className="shrink-0">
                  <rect x="0" y="4" width="20" height="2" fill="#7C3AED" />
                  <circle cx="29" cy="5" r="5" fill="#7C3AED" />
                </svg>
                <span className="text-sm font-normal xl:font-medium text-app-neutral-950 whitespace-nowrap">
                  {config.series[2].label}
                </span>
              </div>
              <div className="flex items-center gap-1.25 xl:gap-2 shrink-0">
                <span className="block size-2.5 xl:size-3 rounded bg-[#90a1b9] opacity-40" />
                <span className="text-sm font-normal xl:font-medium text-app-neutral-950 whitespace-nowrap">
                  {greyLegend}
                </span>
              </div>
            </div>

            <div className="w-full px-2.5 xl:px-5 pb-2 xl:mb-6.5">
              <BreakthroughGrowthChart
                config={config}
                footnote={null}
                barSize={barSize}
                tooltipUnit={t("units.billion")}
              />
            </div>
          </div>
        </div>

        {/*{footnote && (*/}
        {/*  <p className="px-2.75 pt-4 pb-2 text-center text-xs text-body-sm-medium text-app-neutral-400">{footnote}</p>*/}
        {/*)}*/}

        <div
          className={clsx(
            "flex items-center justify-center bg-main-app-bg-content border-b",
            "border-app-neutral-200 py-2 md:hidden"
          )}
        >
          <p className="text-[12px] font-semibold leading-3.75 text-app-primary-500 tracking-[0.6px] whitespace-pre">
            {t("chart.scrollHint")}
          </p>
        </div>

        <BreakthroughGrowthTable />
      </div>
    </div>
  );
}
