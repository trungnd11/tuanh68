"use client";

import clsx from "clsx";
import { useRef, useState } from "react";
import { AppIcon } from "@f88/react-icons";
import CheckCircleFilled from "@f88/react-icons/icons/CheckCircleFilled";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";
import { ipoRoadmapItems } from "../../data";
import { ipoRoadmapItemKeys } from "../../content";
import { RoadmapTimelineUtil } from "../../utils/roadmapTimelineUtil";
import IpoRoadmapCta from "@/app/sections/ipo-roadmap/components/ipo-roadmap-cta";
import IpoRoadmapTimelineContent from "./components/ipo-roadmap-timeline-content";

const TIMELINE_TITLES: Record<string, string> = {
  introduceStock: "Giới thiệu cổ phiếu",
  subscription: "Đăng ký mua",
  allocation: "Phân bổ",
  payment: "Thanh toán",
  ipoResult: "Kết quả IPO",
  hoseListingRegistration: "Đăng ký niêm yết HOSE",
  hoseListing: "Niêm yết HOSE",
};

const TIMELINE_DATES: Record<string, string> = {
  introduceStock: "02/07 - 05/07",
  subscription: "06/07 - 27/07",
  allocation: "27/07 - 28/07",
  payment: "30/07 - 04/08",
  ipoResult: "06/08/2026",
  hoseListingRegistration: "Dự kiến T8/2026",
  hoseListing: "Dự kiến Q4 2026",
};

export default function IpoRoadmapTimeline() {
  const activeIndex = ipoRoadmapItems.findIndex((_, itemIndex) => RoadmapTimelineUtil.isItemActive(itemIndex));
  const initialIndex = activeIndex >= 0 ? activeIndex : 0;
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentIndex, setContentIndex] = useState(initialIndex);

  function handleItemClick(index: number) {
    setContentIndex(index);
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <>
      <AppResponsiveTimeline
        initialIndex={initialIndex}
        onIndexChange={(index) => setContentIndex(index)}
        totalItems={ipoRoadmapItems.length}
        mobileClassName={clsx("flex flex-col gap-1 xl:gap-3")}
        navPosition="bottom"
        renderTrack={({ handleTrackScroll, trackRef }) => (
          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            className={clsx(
              "flex snap-x snap-mandatory items-start overflow-x-auto scroll-smooth",
              "scroll-px-4 pb-2 pt-6",
              "scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            {ipoRoadmapItems.map((item, index) => {
              const { fill, stroke } = RoadmapTimelineUtil.getShapeColors(index);
              const isFirstItem = index === 0;
              const isLastItem = index === ipoRoadmapItems.length - 1;
              const successItem = item.isSuccess;
              const activeItem = RoadmapTimelineUtil.isItemActive(index);

              return (
                <div
                  key={item.titleKey}
                  onClick={() => handleItemClick(index)}
                  className={clsx(index === 0 ? "ml-4" : "-ml-1", "relative shrink-0 snap-center cursor-pointer")}
                  style={{ zIndex: index + 1 }}
                >
                  <AppIcon
                    width={isLastItem ? 162 : isFirstItem ? 180.6 : 178.5}
                    height={72}
                    svgString={RoadmapTimelineUtil.renderShape(isFirstItem, isLastItem, fill, stroke)}
                  />

                  {activeItem && (
                    <div
                      className={clsx(
                        "absolute -top-5.75 left-[40.28px]",
                        "flex items-center gap-2 text-main-app-text-red"
                      )}
                    >
                      <span className={clsx("relative inline-block h-3.5 w-3.5 rounded-full", "bg-[#FFBCBC]")}>
                        <span
                          className={clsx(
                            "absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main-app-text-red"
                          )}
                        />
                      </span>
                      <span className={clsx("text-xs font-semibold")}>Đang diễn ra</span>
                    </div>
                  )}

                  <div
                    className={clsx(
                      "absolute box-border top-1/2 ml-[23.28px] flex h-full w-35 -translate-y-1/2 flex-col justify-center gap-1 text-sm",
                      isFirstItem && "ml-4.25",
                      activeItem && "text-white"
                    )}
                  >
                    <p className={clsx("font-bold")}>{TIMELINE_TITLES[item.titleKey]}</p>
                    {successItem ? (
                      <div className={clsx("flex items-center gap-1 text-main-app-green")}>
                        <CheckCircleFilled inheritColor className={clsx("text-base")} />
                        <span className={clsx("text-xs font-semibold")}>Đã hoàn thành</span>
                      </div>
                    ) : (
                      <p className={clsx(!activeItem && "text-main-app-gray", "text-xs font-normal")}>
                        {TIMELINE_DATES[item.dateLabelKey]}
                      </p>
                    )}
                  </div>
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
          <div className={clsx("mx-auto flex w-full max-w-300 items-start gap-2 overflow-visible")}>
            {ipoRoadmapItems.map((item, index) => {
              const { fill, stroke } = RoadmapTimelineUtil.getShapeColors(index);
              const isFirstItem = index === 0;
              const isLastItem = index === ipoRoadmapItems.length - 1;
              const successItem = item.isSuccess;
              const activeItem = RoadmapTimelineUtil.isItemActive(index);

              return (
                <div
                  key={item.titleKey}
                  onClick={() => handleItemClick(index)}
                  className={clsx("relative h-18 min-w-0 flex-1 overflow-visible cursor-pointer")}
                  style={{ zIndex: index + 1 }}
                >
                  <div className={clsx("absolute inset-y-0", isFirstItem ? "left-0" : "left-[2.15px]")}>
                    <AppIcon
                      width={isLastItem ? 162 : isFirstItem ? 180.6 : 178.5}
                      height={72}
                      svgString={RoadmapTimelineUtil.renderShape(isFirstItem, isLastItem, fill, stroke)}
                    />
                  </div>

                  {activeItem && (
                    <div
                      className={clsx(
                        "absolute -top-5.75 left-[40.28px]",
                        "flex items-center gap-2 text-main-app-text-red"
                      )}
                    >
                      <span className={clsx("relative inline-block h-3.5 w-3.5 rounded-full", "bg-[#FFBCBC]")}>
                        <span
                          className={clsx(
                            "absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main-app-text-red"
                          )}
                        />
                      </span>
                      <span className={clsx("text-xs font-semibold")}>Đang diễn ra</span>
                    </div>
                  )}

                  <div
                    className={clsx(
                      "absolute box-border top-1/2 ml-[23.28px] flex h-full w-35 -translate-y-1/2 flex-col justify-center gap-1 text-sm",
                      isFirstItem && "ml-4.25",
                      activeItem && "text-white"
                    )}
                  >
                    <p className={clsx("font-bold")}>{TIMELINE_TITLES[item.titleKey]}</p>
                    {successItem ? (
                      <div className={clsx("flex items-center gap-1 text-main-app-green")}>
                        <CheckCircleFilled inheritColor className={clsx("text-base")} />
                        <span className={clsx("text-xs font-semibold")}>Đã hoàn thành</span>
                      </div>
                    ) : (
                      <p className={clsx(!activeItem && "text-main-app-gray", "text-xs font-normal")}>
                        {TIMELINE_DATES[item.dateLabelKey]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      />

      <div ref={contentRef} className={clsx("w-full px-4 xl:px-0")}>
        {contentIndex === 0 ? (
          <IpoRoadmapCta />
        ) : (
          <IpoRoadmapTimelineContent stepKey={ipoRoadmapItemKeys[contentIndex]} />
        )}
      </div>
    </>
  );
}
