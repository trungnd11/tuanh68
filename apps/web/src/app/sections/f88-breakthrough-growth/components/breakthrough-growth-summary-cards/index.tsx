import { useTranslations } from "next-intl";
import { getGrowthSummaryCards } from "@/app/sections/f88-breakthrough-growth/data";

export default function BreakthroughGrowthSummaryCards() {
  const t = useTranslations("HomePage.f88BreakthroughGrowth");
  const cards = getGrowthSummaryCards(t);

  return (
    <div className="flex w-full max-w-[1024px] flex-wrap gap-4 xl:flex-nowrap">
      {cards.map((card) => (
        <div
          key={card.key}
          className="flex flex-1 flex-col gap-2 rounded-2xl border px-3 py-4 xl:p-5 shadow-[0_0_4px_0_rgba(0,0,0,0.08)]"
          style={{ borderColor: card.borderColor }}
        >
          <span className="text-sm font-medium text-[#030712]">{card.label}</span>
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-bold leading-7" style={{ color: card.valueColor }}>
              {card.value}
            </span>
            <span
              className="inline-flex h-8 w-fit items-center rounded-full px-3 text-sm font-semibold whitespace-nowrap"
              style={{
                backgroundColor: card.badgeBg,
                color: card.badgeTextColor,
              }}
            >
              {card.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
