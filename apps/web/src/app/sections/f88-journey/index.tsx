import clsx from "clsx";
import AppContent from "@/shared/ui/app-content";
import JourneyHeading from "@/app/sections/f88-journey/components/journey-heading";
import JourneyTimeline from "@/app/sections/f88-journey/components/journey-timeline";
import { appSectionIds } from "@/shared/config/app";

export default function F88JourneySection() {
  return (
    <section id={appSectionIds.f88Journey} className={clsx("pt-8 xl:pt-20")}>
      <AppContent className={clsx("flex flex-col px-0! gap-5 xl:gap-10")}>
        <JourneyHeading />
        <JourneyTimeline />
      </AppContent>
    </section>
  );
}
