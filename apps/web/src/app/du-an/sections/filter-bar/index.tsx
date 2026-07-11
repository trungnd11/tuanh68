import clsx from "clsx";
import FilterTabs from "./filter-tabs";
import FilterResultCount from "./filter-result-count";

export default function FilterBarSection() {
  return (
    <div
      className={clsx(
        "border-b border-solid border-gray-200 bg-white pb-px",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]",
        "px-4 sm:px-8 lg:px-[112px]"
      )}
    >
      <div className={clsx("flex w-full flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between")}>
        <FilterTabs />
        <FilterResultCount />
      </div>
    </div>
  );
}
