"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppContent from "@/shared/ui/app-content";
import BreakthroughGrowthHeading from "@/app/sections/f88-breakthrough-growth/components/breakthrough-growth-heading";
import BreakthroughGrowthSummaryCards from "@/app/sections/f88-breakthrough-growth/components/breakthrough-growth-summary-cards";
import BreakthroughGrowthChartCard from "@/app/sections/f88-breakthrough-growth/components/breakthrough-growth-chart-card";
import { appSectionIds } from "@/shared/config/app";

function isPastVisibleFrom(visibleFrom: string, currentTimestamp = Date.now()) {
  const [datePart, timePart] = visibleFrom.split(" ");
  if (!datePart || !timePart) return false;
  const [day, month, year] = datePart.split("/");
  const target = new Date(`${year}-${month}-${day}T${timePart}+07:00`).getTime();
  if (Number.isNaN(target)) return false;
  return currentTimestamp >= target;
}

export default function F88BreakthroughGrowthSection() {
  const t = useTranslations("HomePage.f88BreakthroughGrowth");
  const visibleFrom = t("visibleFrom");
  const isVisible = isPastVisibleFrom(visibleFrom);
  if (!isVisible) return null;

  return (
    <section id={appSectionIds.f88BreakthroughGrowth} className={clsx("bg-white py-[36px] xl:py-16")}>
      <AppContent className={clsx("flex flex-col items-center gap-4 xl:gap-10 px-4 md:px-6 xl:px-0")}>
        <BreakthroughGrowthHeading />
        <div className="flex w-full flex-col items-center gap-4 xl:gap-5">
          <BreakthroughGrowthSummaryCards />
          <BreakthroughGrowthChartCard />
        </div>
      </AppContent>
    </section>
  );
}
