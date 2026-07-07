"use client";

import clsx from "clsx";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import TimelineArrow from "@/assets/icons/timeline-arrow.svg";
import { StepBadgeIcon } from "@/app/sections/purchase-guide/components/purchase-guide-icons";
import { getPurchaseGuideStepLabels, getPurchaseGuideSteps } from "@/app/sections/purchase-guide/data";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";

function PurchaseGuideStepCard({
  step,
  mobile = false,
}: {
  step: ReturnType<typeof getPurchaseGuideSteps>[number];
  mobile?: boolean;
}) {
  return (
    <article className={clsx("flex flex-col items-center gap-5 text-center", mobile && "shrink-0")}>
      <StepBadgeIcon value={step.number} />
      <h3
        className={clsx("text-body-lg-bold text-app-neutral-950", mobile ? "max-w-29 text-base leading-5" : "max-w-48")}
      >
        {step.title}
      </h3>
      <p className={clsx("max-w-48 text-body-sm-medium text-app-neutral-600", mobile ? "hidden" : "hidden xl:block")}>
        {step.description}
      </p>
    </article>
  );
}

export default function PurchaseGuideSteps() {
  const t = useTranslations("HomePage.purchaseGuide");
  const purchaseGuideSteps = getPurchaseGuideSteps(t);
  const purchaseGuideStepLabels = getPurchaseGuideStepLabels(t);

  return (
    <AppResponsiveTimeline
      initialIndex={0}
      totalItems={purchaseGuideSteps.length}
      mobileClassName="flex flex-col gap-8"
      navPosition="top"
      renderNav={({ currentIndex, handleNext, handlePrev, totalItems }) => (
        <AppResponsiveTimelineNav
          counter={purchaseGuideStepLabels.getCounter(totalItems)}
          counterClassName="text-body-sm-medium text-app-neutral-500"
          currentIndex={currentIndex}
          totalItems={totalItems}
          onPrev={handlePrev}
          onNext={handleNext}
          prevLabel={purchaseGuideStepLabels.prev}
          nextLabel={purchaseGuideStepLabels.next}
          prevDisabledClassName="cursor-not-allowed text-app-neutral-500"
          prevLabelClassName="text-body-sm-medium"
          nextLabelClassName="text-body-sm-medium"
          showDivider
        />
      )}
      renderTrack={({ handleTrackScroll, trackRef }) => (
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className={clsx(
            "flex items-start overflow-x-auto scroll-smooth snap-x snap-mandatory",
            "scroll-px-4 pb-5",
            "scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          {purchaseGuideSteps.map((step, index) => {
            const isLastItem = index === purchaseGuideSteps.length - 1;

            return (
              <div
                key={step.number}
                className={clsx(index === 0 ? "ml-4" : "ml-0", "flex shrink-0 snap-start items-start")}
              >
                <PurchaseGuideStepCard step={step} mobile />
                {!isLastItem && <TimelineArrow className="mt-3.75 shrink-0 self-start" />}
              </div>
            );
          })}
        </div>
      )}
      renderDesktop={() => (
        <div className="flex gap-5">
          {purchaseGuideSteps.map((step, index) => (
            <Fragment key={step.number}>
              <PurchaseGuideStepCard step={step} />
              {index < purchaseGuideSteps.length - 1 ? (
                <div className="hidden items-start justify-center pt-3.75 xl:flex">
                  <TimelineArrow />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      )}
    />
  );
}
