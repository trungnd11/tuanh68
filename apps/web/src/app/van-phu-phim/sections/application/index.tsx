import clsx from "clsx";
import AppContainer from "@/shared/ui/app-container";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import { applicationContent } from "./content";
import ApplicationGrid from "./application-grid";

export default function ApplicationSection() {
  return (
    <section className={clsx("bg-[#111827] py-6 lg:py-20")}>
      <AppContainer className={clsx("flex flex-col items-start gap-6 lg:gap-14")}>
        <div className={clsx("flex w-full flex-col items-center gap-3 lg:gap-4")}>
          <AppSectionBadge centered>{applicationContent.badge}</AppSectionBadge>
          <h2
            className={clsx(
              "w-full text-center text-2xl font-black uppercase leading-8 text-white",
              "sm:text-[28px] sm:leading-9 lg:text-4xl lg:leading-10"
            )}
          >
            {applicationContent.titleParts[0]}
            <span className={clsx("text-app-brand-teal")}>{applicationContent.titleParts[1]}</span>
          </h2>
          <p
            className={clsx(
              "w-full max-w-xl text-center text-sm font-normal leading-[22.75px]",
              "text-gray-400 lg:text-base lg:leading-7"
            )}
          >
            {applicationContent.description}
          </p>
        </div>

        <ApplicationGrid />
      </AppContainer>
    </section>
  );
}
