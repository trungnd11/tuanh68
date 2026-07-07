import clsx from "clsx";
import AppContent from "@/shared/ui/app-content";
import { appSectionIds } from "@/shared/config/app";
import OfferingInfoHeading from "./components/offering-info-heading";
import OfferingInfoStats from "./components/offering-info-stats";

export default function OfferingInfoSection() {
  return (
    <section
      id={appSectionIds.offeringInfo}
      className={clsx(
        "relative py-11 xl:py-18 text-app-neutral-950",
        "before:absolute before:bottom-0 before:left-0 before:xl:h-px before:w-full",
        "before:bg-[#ccc] before:content-['']"
      )}
    >
      <AppContent className={clsx("flex flex-col gap-6 xl:gap-13", "px-4 xl:px-0")}>
        <OfferingInfoHeading />
        <OfferingInfoStats />
      </AppContent>
    </section>
  );
}
