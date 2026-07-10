import clsx from "clsx";
import { filterBarContent } from "./content";

export default function FilterBarSection() {
  return (
    <div
      className={clsx(
        "border-b border-solid border-gray-200 bg-white px-[112px] pb-px",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]",
        "max-lg:px-8"
      )}
    >
      <div className={clsx("flex w-full items-center justify-between py-4")}>
        <div className={clsx("flex items-center gap-3 max-md:flex-wrap")}>
          <span className={clsx("pr-2 text-xs font-semibold uppercase leading-4 tracking-[1.2px]", "text-gray-400")}>
            {filterBarContent.label}
          </span>
          {filterBarContent.filters.map((filter, i) => (
            <button
              key={filter}
              className={clsx(
                "rounded-full border-2 px-[22px] py-[10px] text-sm font-semibold",
                "leading-5 whitespace-nowrap",
                i === 0 ? "border-[#2973b2] bg-[#2973b2] text-white" : "border-gray-300 text-gray-600"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={clsx("flex shrink-0 items-center gap-2")}>
          <span className={clsx("inline-flex pb-[3.25px] pt-[2.75px]")}>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="#2973b2" strokeWidth="1.5" />
              <rect x="9.5" y="1" width="5.5" height="5.5" rx="1" stroke="#2973b2" strokeWidth="1.5" />
              <rect x="1" y="7.5" width="5.5" height="5.5" rx="1" stroke="#2973b2" strokeWidth="1.5" />
              <rect x="9.5" y="7.5" width="5.5" height="5.5" rx="1" stroke="#2973b2" strokeWidth="1.5" />
            </svg>
          </span>
          <span className={clsx("text-sm font-semibold leading-5 text-[#2973b2]")}>{filterBarContent.count.value}</span>
          <span className={clsx("text-sm font-normal leading-5 text-gray-500")}>{filterBarContent.count.label}</span>
        </div>
      </div>
    </div>
  );
}
