"use client";

import clsx from "clsx";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";
import { whyContactUsContent } from "./content";
import WhyContactUsCard from "./why-contact-us-card";

export default function WhyContactUsSection() {
  const cards = whyContactUsContent.cards;

  return (
    <section
      id={whyContactUsContent.id}
      className={clsx("border-t border-[#f3f4f6] bg-white px-4 py-6 lg:px-14 lg:pb-16 lg:pt-[65px]")}
    >
      <div className={clsx("mx-auto max-w-[1216px]")}>
        <AppResponsiveTimeline
          totalItems={cards.length}
          mobileClassName="flex flex-col gap-4"
          navPosition="top"
          renderTrack={({ handleTrackScroll, trackRef }) => (
            <div
              ref={trackRef}
              onScroll={handleTrackScroll}
              className={clsx(
                "flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4",
                "scroll-px-4 scrollbar-none"
              )}
            >
              {cards.map((card, i) => (
                <div
                  key={card.icon}
                  className={clsx(
                    "flex shrink-0 snap-center",
                    i === 0 && "ml-4 w-[calc(100vw-48px)]",
                    i > 0 && i < cards.length - 1 && "w-[calc(100vw-48px)] px-3",
                    i === cards.length - 1 && "w-[calc(100vw-48px)] pr-4"
                  )}
                >
                  <WhyContactUsCard {...card} />
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
            <div className={clsx("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4")}>
              {cards.map((card) => (
                <WhyContactUsCard key={card.icon} {...card} />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
}
