import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import { appColors } from "@/shared/theme";
import CoreBusinessIcon from "@/assets/icons/core-business.svg";
import UmbrellaIcon from "@/assets/icons/umbrella.svg";
import BuildingIcon from "@/assets/icons/building.svg";
import LayersIcon from "@/assets/icons/layers.svg";
import { getMarketLeaderEcosystem } from "@/app/sections/f88-market-leader/data";

const iconMap = {
  store: CoreBusinessIcon,
  insurance: UmbrellaIcon,
  bank: BuildingIcon,
  spark: LayersIcon,
};

export default function MarketLeaderEcosystem() {
  const t = useTranslations("HomePage.f88MarketLeader");
  const marketLeaderEcosystem = getMarketLeaderEcosystem(t);

  return (
    <div className="flex flex-col gap-5 px-4 xl:gap-8 xl:px-0">
      <div className="mx-auto flex max-w-300 flex-col items-center gap-2 text-center">
        <p className="text-body-base-bold uppercase text-app-primary-550 leading-5">{marketLeaderEcosystem.eyebrow}</p>
        <h3 className="text-heading-base-bold text-app-neutral-950">{marketLeaderEcosystem.title}</h3>
      </div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-[285px_285px_285px_285px] xl:justify-between xl:gap-5">
        {marketLeaderEcosystem.items.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <AppBorderRadius
              key={item.title}
              cornerRadius={16}
              borderWidth={1}
              borderColor={appColors.appNeutral[300]}
              classNameBorder={clsx("bg-white h-full")}
            >
              <article className="p-3.75 flex flex-col gap-3 xl:min-h-73 xl:gap-5 xl:px-4.75 xl:py-6.75">
                <AppBorderRadius
                  cornerRadius={16}
                  classNameContainer={clsx("hidden xl:inline-flex")}
                  classNameBorder={clsx("inline-flex")}
                >
                  <div className="flex size-13 items-center justify-center bg-app-primary-75 text-app-primary-500">
                    <Icon className="size-6" />
                  </div>
                </AppBorderRadius>
                <div className="flex flex-col gap-2">
                  <AppBorderRadius cornerRadius={50} classNameBorder={clsx("inline-flex")}>
                    <span
                      className={clsx(
                        "inline-flex h-7 w-fit items-center bg-app-primary-25",
                        "px-3 text-body-sm-semibold text-app-primary-550"
                      )}
                    >
                      {item.badge}
                    </span>
                  </AppBorderRadius>
                  <h3 className="text-lg font-bold text-app-neutral-950">{item.title}</h3>
                </div>
                <p className="text-body-sm-medium leading-5 text-app-neutral-600">{item.description}</p>
              </article>
            </AppBorderRadius>
          );
        })}
      </div>
    </div>
  );
}
