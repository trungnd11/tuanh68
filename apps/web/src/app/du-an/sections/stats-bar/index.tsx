import { statsBarContent } from "./content";

export default function StatsBarSection() {
  return (
    <div className="flex flex-col items-start bg-[#2973b2] px-[112px] max-lg:px-8">
      <div className="flex w-full items-start justify-center max-md:flex-col max-md:items-stretch">
        {statsBarContent.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex min-w-px flex-1 flex-col items-center justify-center py-14 ${
              i > 0 ? "border-l border-[rgba(255,255,255,0.2)] pl-[25px]" : ""
            } pr-[24px]`}
          >
            <div className="pb-2 text-[60px] font-extrabold leading-[60px] text-white">
              {stat.value}
              <span className="text-app-brand-teal">{stat.suffix}</span>
            </div>
            <div className="pt-1 text-sm font-semibold uppercase leading-5 tracking-[1.4px] text-[#bfdbfe]">
              {stat.label}
            </div>
            <div className="h-[14px] w-10 pt-3">
              <div className="h-0.5 w-10 bg-app-brand-teal" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
