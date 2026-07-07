"use client";

import { useTranslations } from "next-intl";
import { getGrowthTableData } from "@/app/sections/f88-breakthrough-growth/data";
import clsx from "clsx";

export default function BreakthroughGrowthTable() {
  const t = useTranslations("HomePage.f88BreakthroughGrowth");
  const rows = getGrowthTableData();

  const columns = [
    { key: "year", label: t("table.column.year"), mobileLabel: t("table.column.year"), align: "left" as const },
    {
      key: "revenue",
      label: t("table.column.revenue"),
      mobileLabel: t("table.column.revenueMobile"),
      align: "right" as const,
    },
    {
      key: "profit",
      label: t("table.column.profit"),
      mobileLabel: t("table.column.profitMobile"),
      align: "right" as const,
    },
    {
      key: "loanBook",
      label: t("table.column.loanBook"),
      mobileLabel: t("table.column.loanBookMobile"),
      align: "right" as const,
    },
  ];

  return (
    <div className="w-full overflow-x-auto px-3 pb-5 md:px-8">
      <div className="min-w-[320px] md:min-w-[912px]">
        <div className="grid grid-cols-4 border-b border-[#e5e7eb] py-[6.5px]">
          {columns.map((col) => (
            <div
              key={col.key}
              className={clsx(
                "text-sm font-medium text-[#6a7282]",
                col.key === "year" ? "pl-3 text-left md:pl-[28px]" : "text-right pr-3"
              )}
            >
              <span className="md:hidden">{col.mobileLabel}</span>
              <span className="hidden md:inline">{col.label}</span>
            </div>
          ))}
        </div>

        {rows.map((row) => (
          <div
            key={row.year}
            className={clsx(
              "grid grid-cols-4 border-t border-[#e5e7eb] py-[7px] md:py-[10px]",
              row.isForecast && "bg-[#f3f4f6]"
            )}
          >
            <div
              className={clsx(
                "pl-3 text-left text-sm md:pl-[28px]",
                row.isForecast ? "font-semibold text-[#7c3aed]" : "font-medium text-[#030712]"
              )}
            >
              {row.year}
            </div>
            <div className="pr-3 text-right text-sm font-normal text-[#030712]">{row.revenue}</div>
            <div
              className={clsx(
                "pr-3 text-right text-sm font-medium",
                row.profitRaw >= 0 ? "text-[#096]" : "text-[#6a7282]"
              )}
            >
              {row.profit}
            </div>
            <div className="pr-3 text-right text-sm font-medium text-[#7c3aed]">{row.loanBook}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
