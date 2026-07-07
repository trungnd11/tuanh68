import clsx from "clsx";
import { useTranslations } from "next-intl";
import { getMarketLeaderHero } from "@/app/sections/f88-market-leader/data";

export default function MarketLeaderHeading() {
  const t = useTranslations("HomePage.f88MarketLeader");
  const marketLeaderHero = getMarketLeaderHero(t);

  return (
    <div className="mx-auto flex flex-col items-center gap-3 px-4 text-center xl:gap-4 xl:px-0">
      <div className={clsx("flex flex-col gap-2")}>
        <h2
          className={clsx(
            "text-[32px] xl:text-[44px] leading-8 xl:leading-11",
            "text-titlepage-sm-bold text-app-neutral-950 tracking-[0.09px]"
          )}
        >
          {marketLeaderHero.title} <span className="text-app-primary-500">{marketLeaderHero.accent}</span>
        </h2>
      </div>
      <p className="text-body-base-medium text-app-neutral-600">{marketLeaderHero.description}</p>
    </div>
  );
}
