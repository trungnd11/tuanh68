import clsx from "clsx";
import AppTable, { type AppTableRow } from "@/shared/ui/app-table";
import IconGrid from "@/assets/icons/icon-grid.svg";
import IconDowload from "@/assets/icons/dowload.svg";
import IconInfo from "@/assets/icons/icon-info.svg";
import { specTableContent } from "./content";

type SpecificationTablePanelProps = {
  rows: AppTableRow[];
};

export default function SpecificationTablePanel({ rows }: SpecificationTablePanelProps) {
  return (
    <div
      className={clsx(
        "flex w-full flex-col items-start overflow-hidden rounded-2xl border",
        "border-gray-200 bg-white",
        "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className={clsx("flex w-full items-center gap-3 bg-[#2973b2] px-4 py-4 sm:gap-4 lg:px-8 lg:py-5")}>
        <IconGrid className={clsx("size-5 shrink-0 text-white")} />
        <h3
          className={clsx(
            "text-base font-bold uppercase leading-6 tracking-[0.45px] text-white lg:text-lg lg:leading-7"
          )}
        >
          {specTableContent.tableHeader.title}
        </h3>
      </div>

      <AppTable columns={specTableContent.columns} rows={rows} className={clsx("max-w-full")} minWidth="820px" />

      <div
        className={clsx(
          "flex w-full flex-col gap-3 border-t border-gray-200 px-4 py-4",
          "lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-[19px]"
        )}
      >
        <div className={clsx("flex items-start gap-2 lg:items-center")}>
          <IconInfo className={clsx("mt-0.5 size-3 shrink-0 lg:mt-0")} />
          <span className={clsx("text-xs font-normal leading-4 text-gray-500")}>{specTableContent.footer.text}</span>
        </div>
        <a
          href="#"
          className={clsx(
            "flex h-auto w-fit items-center gap-2 bg-transparent px-0 text-sm font-semibold",
            "leading-5 text-[#2973b2]"
          )}
        >
          <IconDowload className={clsx("size-3.5 shrink-0")} />
          <span>{specTableContent.footer.downloadLabel}</span>
        </a>
      </div>
    </div>
  );
}
