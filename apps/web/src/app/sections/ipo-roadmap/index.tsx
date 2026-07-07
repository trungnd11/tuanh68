import clsx from "clsx";
import AppContent from "@/shared/ui/app-content";
import IpoRoadmapHeading from "@/app/sections/ipo-roadmap/components/ipo-roadmap-heading";
import IpoRoadmapTimeline from "@/app/sections/ipo-roadmap/components/ipo-roadmap-timeline";
import { appSectionIds } from "@/shared/config/app";

export default function IpoRoadmapSection() {
  return (
    <section id={appSectionIds.ipoRoadmap} className={clsx("xl:pt-16")}>
      <AppContent className={clsx("flex flex-col gap-7 xl:gap-11 px-0!")}>
        <IpoRoadmapHeading />
        <div className={clsx("flex flex-col gap-4 xl:gap-5.25")}>
          <IpoRoadmapTimeline />
        </div>
      </AppContent>
    </section>
  );
}
