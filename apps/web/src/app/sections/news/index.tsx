"use client";

import clsx from "clsx";
import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppNewsCard from "@/shared/ui/app-news-card";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";
import { newsContent } from "./content";

export default function NewsSection() {
  const { cards } = newsContent;

  return (
    <section
      id={newsContent.id}
      className={clsx("border-t border-solid border-app-neutral-200", "bg-[#f8f9fa] py-6 lg:pb-20 lg:pt-20.25")}
    >
      <AppContainer className={clsx("flex flex-col gap-4 lg:gap-12 px-0!")}>
        <AppContainer>
          <AppSectionHeading>{newsContent.heading}</AppSectionHeading>
        </AppContainer>
        <div className={clsx("w-full")}>
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
                  "scroll-px-4",
                  "scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                )}
              >
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className={clsx(
                      index === 0 ? "ml-4" : "ml-0",
                      index === 0 && "w-74.25",
                      index !== 0 && index !== cards.length - 1 && "w-80.25 px-3",
                      index === cards.length - 1 && "w-78.25 pr-4",
                      "flex shrink-0 snap-center"
                    )}
                  >
                    <AppNewsCard
                      src={card.src}
                      alt={card.alt}
                      category={card.category}
                      categoryBg={card.categoryBg}
                      title={card.title}
                      description={card.description}
                      href={card.href}
                    />
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
              <div className={clsx("grid gap-8 md:grid-cols-2 lg:grid-cols-3")}>
                {cards.map((card) => (
                  <AppNewsCard
                    key={card.id}
                    src={card.src}
                    alt={card.alt}
                    category={card.category}
                    categoryBg={card.categoryBg}
                    title={card.title}
                    description={card.description}
                    href={card.href}
                  />
                ))}
              </div>
            )}
          />
        </div>
      </AppContainer>
    </section>
  );
}
