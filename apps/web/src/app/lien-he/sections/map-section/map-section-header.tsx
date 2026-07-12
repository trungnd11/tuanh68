import clsx from "clsx";
import { mapSectionContent } from "./content";

export default function MapSectionHeader() {
  return (
    <div className={clsx("flex flex-col items-center gap-3")}>
      <div className={clsx("flex items-center gap-3")}>
        <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
        <div className={clsx("text-sm font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
          {mapSectionContent.badge}
        </div>
        <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
      </div>
      <h2 className={clsx("pt-1 text-center text-[28px] font-black uppercase leading-10 text-white lg:text-[36px]")}>
        {mapSectionContent.heading}{" "}
        <span className={clsx("text-app-brand-teal")}>{mapSectionContent.headingHighlight}</span>
      </h2>
      <p className={clsx("max-w-[512px] text-center text-sm leading-5 text-[#9ca3af]")}>
        {mapSectionContent.description[0]}
        <br />
        {mapSectionContent.description[1]}
      </p>
    </div>
  );
}
