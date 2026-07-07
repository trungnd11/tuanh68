"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { getMarketLeaderHighlights } from "@/app/sections/f88-market-leader/data";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";
import { appColors } from "@/shared/theme";

function HighlightCard({ item }: { item: ReturnType<typeof getMarketLeaderHighlights>[number] }) {
  return (
    <AppBorderRadius
      cornerRadius={16}
      borderWidth={1}
      borderColor={appColors.appNeutral[300]}
      classNameBorder={clsx("h-full bg-white")}
    >
      <article className="h-full px-2.75 py-4.75 xl:px-7.75 xl:py-8.75">
        <div className="border-b border-app-neutral-300 pb-[11.5px]">
          <p
            className={clsx(
              "text-[32px] xl:text-[38px] leading-8 xl:leading-[normal]",
              "font-bold xl:font-black tracking-[0.3691px] text-app-primary-500"
            )}
          >
            {item.value}
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-3">
          <h3 className="text-lg xl:text-xl text-heading-sm-bold text-app-neutral-950">{item.title}</h3>
          <AppBorderRadius cornerRadius={50} classNameBorder={clsx("inline-flex self-start")}>
            <span
              className={clsx(
                "inline-flex items-center bg-app-primary-25 px-3 py-1",
                "text-body-sm-semibold text-app-primary-550",
                "leading-4 xl:leading-5"
              )}
            >
              {item.badge}
            </span>
          </AppBorderRadius>
        </div>
      </article>
    </AppBorderRadius>
  );
}

export default function MarketLeaderHighlights() {
  const t = useTranslations("HomePage.f88MarketLeader");
  const marketLeaderHighlights = getMarketLeaderHighlights(t);

  return (
    <AppResponsiveTimeline
      initialIndex={0}
      totalItems={marketLeaderHighlights.length}
      mobileClassName="flex flex-col gap-3"
      navPosition="top"
      renderNav={({ currentIndex, handleNext, handlePrev, totalItems }) => (
        <AppResponsiveTimelineNav
          className="text-sm leading-5"
          counterClassName="text-app-neutral-500"
          currentIndex={currentIndex}
          totalItems={totalItems}
          onPrev={handlePrev}
          onNext={handleNext}
          counter={t("highlights.counter", { total: totalItems })}
          prevLabel={t("highlights.prev")}
          nextLabel={t("highlights.next")}
          showDivider
        />
      )}
      renderTrack={({ handleTrackScroll, trackRef }) => (
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className={clsx(
            "flex overflow-x-auto scroll-smooth snap-x snap-mandatory",
            "scroll-px-4",
            "scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          {marketLeaderHighlights.map((item, index) => (
            <div
              key={item.title}
              className={clsx(index === 0 ? "ml-4" : "ml-0", "w-[calc(61%-3px)] shrink-0 snap-start pr-3")}
            >
              <HighlightCard item={item} />
            </div>
          ))}
        </div>
      )}
      renderDesktop={() => (
        <div className="grid gap-5 xl:grid-cols-3">
          {marketLeaderHighlights.map((item) => (
            <HighlightCard key={item.title} item={item} />
          ))}
        </div>
      )}
    />
  );
}
