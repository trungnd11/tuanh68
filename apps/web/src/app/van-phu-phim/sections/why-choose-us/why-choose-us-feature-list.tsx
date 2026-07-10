"use client";

import clsx from "clsx";
import AppFeatureCard from "@/shared/ui/app-feature-card";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";
import { whyChooseUsContent } from "./content";
import { whyChooseUsIconMap } from "./why-choose-us-icons";

export default function WhyChooseUsFeatureList() {
  const { features } = whyChooseUsContent;

  return (
    <div className={clsx("w-full pt-1 lg:pt-3")}>
      <AppResponsiveTimeline
        totalItems={features.length}
        mobileClassName="flex flex-col gap-4"
        navPosition="top"
        renderTrack={({ handleTrackScroll, trackRef }) => (
          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            className={clsx(
              "flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4",
              "scroll-px-4",
              "scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            {features.map((feature, index) => {
              const IconComp = whyChooseUsIconMap[feature.icon];

              return (
                <div
                  key={feature.title}
                  className={clsx(
                    index === 0 ? "ml-4" : "ml-0",
                    index === 0 && "w-74.25",
                    index !== 0 && index !== features.length - 1 && "w-80.25 px-3",
                    index === features.length - 1 && "w-78.25 pr-4",
                    "flex shrink-0 snap-center"
                  )}
                >
                  <AppFeatureCard
                    icon={<IconComp className={clsx("text-[#2973b2]")} />}
                    iconBg={feature.iconBg}
                    title={feature.title}
                    description={feature.description}
                    className={clsx("h-full flex-col gap-3 p-4")}
                  />
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
          <div className={clsx("flex w-full flex-col gap-4")}>
            {features.map((feature) => {
              const IconComp = whyChooseUsIconMap[feature.icon];

              return (
                <AppFeatureCard
                  key={feature.title}
                  icon={<IconComp className={clsx("text-[#2973b2]")} />}
                  iconBg={feature.iconBg}
                  title={feature.title}
                  description={feature.description}
                />
              );
            })}
          </div>
        )}
      />
    </div>
  );
}
