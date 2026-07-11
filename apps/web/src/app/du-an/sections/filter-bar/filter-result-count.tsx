import clsx from "clsx";
import { filterBarContent } from "./content";

export default function FilterResultCount() {
  return (
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
  );
}
