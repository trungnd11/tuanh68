import clsx from "clsx";
import BannerClock from "@/assets/icons/banner-clock.svg";
import BannerLocation from "@/assets/icons/banner-location.svg";
import BannerTruck from "@/assets/icons/banner-truck.svg";
import BannerChat from "@/assets/icons/banner-chat.svg";
import { bannerContent } from "./content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: BannerClock,
  location: BannerLocation,
  truck: BannerTruck,
  chat: BannerChat,
};

export default function BannerStatsBar() {
  return (
    <div className={clsx("relative")}>
      <div
        className={clsx(
          "grid overflow-clip rounded-t-2xl border-t border-l border-[rgba(255,255,255,0.1)] md:grid-cols-2 lg:grid-cols-4",
          "bg-[rgba(0,0,0,0.4)] backdrop-blur-[6px]"
        )}
      >
        {bannerContent.stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div
              key={stat.icon}
              className={clsx(
                "flex min-w-0 items-center gap-3 border-b border-r border-[rgba(255,255,255,0.1)] px-4 py-4 sm:px-7"
              )}
            >
              <div className={clsx("flex shrink-0 items-center text-white/80")}>
                {Icon && <Icon className={clsx("size-4.5 shrink-0")} />}
              </div>
              <div className={clsx("flex min-w-0 flex-col")}>
                <div className={clsx("text-[14px] font-bold leading-5 text-white")}>{stat.label}</div>
                <div className={clsx("text-[12px] text-[#9ca3af]")}>{stat.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
