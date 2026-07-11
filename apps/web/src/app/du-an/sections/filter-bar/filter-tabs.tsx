import clsx from "clsx";
import { filterBarContent } from "./content";

export default function FilterTabs() {
  return (
    <div className={clsx("flex flex-col gap-3 sm:flex-row sm:items-center")}>
      <span className={clsx("text-xs font-semibold uppercase leading-4 tracking-[1.2px] sm:pr-2", "text-gray-400")}>
        {filterBarContent.label}
      </span>
      <div className={clsx("grid grid-cols-2 gap-3 sm:flex sm:items-center")}>
        {filterBarContent.filters.map((filter, i) => (
          <button
            key={filter}
            className={clsx(
              "rounded-full border-2 px-3 py-[10px] text-xs font-semibold sm:px-[22px] sm:text-sm",
              "leading-5 text-center min-w-0",
              i === 0 ? "border-[#2973b2] bg-[#2973b2] text-white" : "border-gray-300 text-gray-600"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
