"use client";

import clsx from "clsx";
import { Fragment } from "react";
import TimelineArrow from "@/assets/icons/timeline-arrow.svg";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";
import { getJourneyItems } from "./data";

type JourneyItem = ReturnType<typeof getJourneyItems>[number];

function JourneyCard({ title, description, mobile = false }: JourneyItem & { mobile?: boolean }) {
  return (
    <AppBorderRadius
      borderWidth={1}
      cornerRadius={16}
      borderColor="rgba(0,132,74,0.50)"
      classNameBorder={clsx("bg-app-primary-25 h-full")}
      classNameContainer={clsx(mobile ? "block min-h-66 h-full w-full" : "block min-h-66 w-65.25")}
    >
      <article className={clsx("flex h-full shrink-0 flex-col gap-3 px-4 py-4")}>
        <h4 className={clsx("text-lg font-bold leading-7 text-app-primary-500")}>{title}</h4>
        <p className={clsx("text-main-app-text-body text-sm font-medium leading-5")}>{description}</p>
      </article>
    </AppBorderRadius>
  );
}

export default function JourneyTimeline() {
  const journeyItems = getJourneyItems();

  return (
    <AppResponsiveTimeline
      initialIndex={0}
      totalItems={journeyItems.length}
      mobileClassName={clsx("flex flex-col gap-4")}
      navPosition="top"
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
          {journeyItems.map((item, index) => {
            const isLastItem = index === journeyItems.length - 1;

            return (
              <div
                key={index}
                className={clsx(
                  index === 0 ? "ml-4" : "ml-0",
                  "flex w-78.25 shrink-0 snap-center items-stretch gap-4 pr-4"
                )}
              >
                <div className="min-w-0 flex-1 self-stretch">
                  <JourneyCard {...item} mobile />
                </div>
                {!isLastItem && <TimelineArrow className={clsx("shrink-0 self-center")} />}
              </div>
            );
          })}
        </div>
      )}
      renderNav={({ currentIndex, handleNext, handlePrev, totalItems }) => (
        <AppResponsiveTimelineNav
          showDivider
          currentIndex={currentIndex}
          totalItems={totalItems}
          onPrev={handlePrev}
          onNext={handleNext}
          counter={`${currentIndex + 1}/${totalItems}`}
          prevLabel="Trước"
          nextLabel="Sau"
        />
      )}
      renderDesktop={() => (
        <div className={clsx("flex items-stretch justify-between gap-4")}>
          {journeyItems.map((item, index) => {
            const isLastItem = index === journeyItems.length - 1;

            return (
              <Fragment key={index}>
                <JourneyCard {...item} />
                {!isLastItem && <TimelineArrow className={clsx("self-center")} />}
              </Fragment>
            );
          })}
        </div>
      )}
    />
  );
}
