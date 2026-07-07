import clsx from "clsx";
import AppContent from "@/shared/ui/app-content";
import StrategicDirectionHeading from "@/app/sections/f88-strategic-direction/components/strategic-direction-heading";
import StrategicDirectionPillars from "@/app/sections/f88-strategic-direction/components/strategic-direction-pillars";
import StrategicDirectionValues from "@/app/sections/f88-strategic-direction/components/strategic-direction-values";
import { appSectionIds } from "@/shared/config/app";

export default function F88StrategicDirectionSection() {
  return (
    <section id={appSectionIds.f88StrategicDirection} className={clsx("bg-app-neutral-50 pt-6 xl:pt-20")}>
      <AppContent className={clsx("flex flex-col gap-20 px-4 md:px-6 xl:px-0")}>
        <div className="flex flex-col gap-6 xl:gap-13">
          <StrategicDirectionHeading />
          <div className="flex flex-col gap-3 xl:gap-6">
            <StrategicDirectionPillars />
            <StrategicDirectionValues />
          </div>
        </div>
      </AppContent>
    </section>
  );
}
