import clsx from "clsx";
import { useTranslations } from "next-intl";
import { getMarketLeaderDetailCards } from "@/app/sections/f88-market-leader/data";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import { appColors } from "@/shared/theme";

export default function MarketLeaderDetails() {
  const t = useTranslations("HomePage.f88MarketLeader");
  const marketLeaderDetailCards = getMarketLeaderDetailCards(t);

  return (
    <div className={clsx("grid gap-3 px-4 xl:grid-cols-[590px_590px] xl:gap-5 xl:px-0")}>
      {marketLeaderDetailCards.map((card) => (
        <AppBorderRadius
          key={card.title}
          cornerRadius={16}
          borderWidth={1}
          borderColor={appColors.appNeutral[300]}
          classNameBorder={clsx("bg-white h-full")}
        >
          <article className="px-3.75 pt-6.75 pb-4.75 xl:px-7.75 py-9.75 xl:min-h-99.75">
            <div className={clsx("flex flex-col gap-2")}>
              <p className="text-body-base-bold uppercase text-app-primary-550 leading-5">{card.eyebrow}</p>
              <h3 className="text-heading-base-bold text-app-neutral-950">{card.title}</h3>
            </div>
            <div className="mt-6 xl:mt-8">
              {card.rows.map((row) => (
                <div
                  key={row.label}
                  className={clsx(
                    "flex items-center justify-between xl:gap-4 xl:px-5 pt-2.75 pb-3",
                    "border-t border-app-neutral-300"
                  )}
                >
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="text-[18px] xl:text-xl text-heading-sm-bold text-app-neutral-950">{row.label}</p>
                    <p className="mr-3 xl:mr-0 text-body-sm-medium text-app-neutral-600">{row.description}</p>
                  </div>
                  <p className="shrink-0 text-heading-base-bold text-app-primary-500 leading-7">{row.value}</p>
                </div>
              ))}
            </div>
            {card.footnote ? (
              <div className="bg-[#FFF3F3] px-5 py-4 text-body-sm-medium text-app-neutral-950">
                <span className="font-bold text-app-danger-500 leading-6">{card.footnote.highlight}</span>{" "}
                {card.footnote.description}
              </div>
            ) : null}
          </article>
        </AppBorderRadius>
      ))}
    </div>
  );
}
