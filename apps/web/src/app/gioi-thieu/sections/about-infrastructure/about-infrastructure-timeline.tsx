"use client";

import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";
import AboutInfrastructureCard from "./about-infrastructure-card";
import { aboutInfrastructureContent } from "./content";

export default function AboutInfrastructureTimeline() {
  return (
    <div className={clsx("w-full")}>
      <AppResponsiveTimeline
        totalItems={aboutInfrastructureContent.cards.length}
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
            {aboutInfrastructureContent.cards.map((card, index) => (
              <div
                key={card.number}
                className={clsx(
                  index === 0 ? "ml-4" : "ml-0",
                  index === 0 && "w-80.25",
                  index !== 0 && index !== aboutInfrastructureContent.cards.length - 1 && "w-80.25 px-3",
                  index === aboutInfrastructureContent.cards.length - 1 && "w-78.25 pr-4",
                  "flex shrink-0 snap-center"
                )}
              >
                <AboutInfrastructureCard card={card} i={index} />
              </div>
            ))}
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
          <div className={clsx("grid w-full grid-cols-1 gap-6 lg:grid-cols-3")}>
            {aboutInfrastructureContent.cards.map((card, i) => (
              <AppScrollReveal key={card.number} variant="fade-in-up" delayMs={i * 100}>
                <AboutInfrastructureCard card={card} i={i} />
              </AppScrollReveal>
            ))}
          </div>
        )}
      />
    </div>
  );
}
