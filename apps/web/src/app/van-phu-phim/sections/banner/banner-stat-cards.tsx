import clsx from "clsx";
import Image from "next/image";
import { bannerContent } from "./content";

export default function BannerStatCards() {
  return (
    <div className={clsx("grid w-full gap-2 lg:gap-4 self-center grid-cols-2 lg:min-h-87")}>
      {bannerContent.statCards.map((card) => (
        <div
          key={card.label}
          className={clsx(
            "flex flex-col items-center gap-1 rounded-2xl border",
            "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] p-3 lg:p-6.25",
            "backdrop-blur-[2px]"
          )}
        >
          <div
            className={clsx("flex size-12 items-center justify-center rounded-full")}
            style={{ background: card.iconBg }}
          >
            <Image src={card.icon} alt="" width={20} height={20} className={clsx("size-5")} />
          </div>
          <div className={clsx("flex w-full flex-col items-center pt-2")}>
            <span className={clsx("text-center text-3xl font-black leading-9 text-white")}>{card.value}</span>
          </div>
          <span
            className={clsx(
              "w-full text-center text-xs font-semibold uppercase tracking-[0.6px]",
              "text-app-brand-teal"
            )}
          >
            {card.label}
          </span>
        </div>
      ))}
    </div>
  );
}
