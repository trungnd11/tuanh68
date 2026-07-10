import clsx from "clsx";
import AppContainer from "@/shared/ui/app-container";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import { specTableContent } from "./content";
import { getSpecificationTableIcon } from "./specification-table-icons";
import SpecificationTablePanel from "./specification-table-panel";

export default function SpecificationTableSection() {
  const rows = specTableContent.rows.map((row) => ({
    ...row,
    icon: getSpecificationTableIcon(row.iconKey),
  }));

  return (
    <section className={clsx("bg-[#f9fafb] py-6 lg:py-20")}>
      <AppContainer className={clsx("flex flex-col items-start gap-6 lg:gap-14")}>
        <div className={clsx("flex w-full flex-col items-center gap-3 lg:gap-4")}>
          <AppSectionBadge centered>{specTableContent.badge}</AppSectionBadge>
          <h2
            className={clsx(
              "w-full text-center text-2xl font-black uppercase leading-8 text-[#333]",
              "sm:text-[28px] sm:leading-9 lg:text-4xl lg:leading-10"
            )}
          >
            {specTableContent.titleParts[0]}
            <span className={clsx("text-[#2973b2]")}>{specTableContent.titleParts[1]}</span>
          </h2>
          <p
            className={clsx(
              "w-full max-w-xl text-center text-sm font-normal leading-[22.75px]",
              "text-gray-500 lg:text-base lg:leading-7"
            )}
          >
            {specTableContent.description[0]}
            <br />
            {specTableContent.description[1]}
          </p>
        </div>

        <SpecificationTablePanel rows={rows} />
      </AppContainer>
    </section>
  );
}
