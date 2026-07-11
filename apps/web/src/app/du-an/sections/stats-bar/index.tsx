import clsx from "clsx";
import { statsBarContent } from "./content";
import StatItem from "./stat-item";

const TOTAL = statsBarContent.length;

export default function StatsBarSection() {
  return (
    <div className={clsx("flex flex-col items-start bg-[#2973b2] px-4 lg:px-[112px]")}>
      <div className={clsx("grid w-full grid-cols-2 lg:flex lg:items-start lg:justify-center")}>
        {statsBarContent.map((stat, i) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            isFirst={i === 0}
            borderRightMobile={i % 2 === 0 && i < TOTAL - 1}
            borderBottomMobile={i < TOTAL - 2}
          />
        ))}
      </div>
    </div>
  );
}
