type BreakthroughGrowthTranslations = {
  (key: "visibleFrom"): string;
  (key: "heading.title"): string;
  (key: "heading.yearTitle"): string;
  (key: "heading.subTitle"): string;
  (key: "heading.description"): string;
  (key: "series.revenue"): string;
  (key: "series.profit"): string;
  (key: "series.loanBook"): string;
  (key: "chart.header.unitLabel"): string;
  (key: "chart.header.unit"): string;
  (key: "chart.header.aLabel"): string;
  (key: "chart.header.actual"): string;
  (key: "chart.header.fLabel"): string;
  (key: "chart.header.forecast"): string;
  (key: "chart.legend.grey"): string;
  (key: "chart.scrollHint"): string;
  (key: "summary.revenue.value"): string;
  (key: "summary.revenue.label"): string;
  (key: "summary.revenue.badge"): string;
  (key: "summary.profit.value"): string;
  (key: "summary.profit.label"): string;
  (key: "summary.profit.badge"): string;
  (key: "summary.roe.value"): string;
  (key: "summary.roe.label"): string;
  (key: "summary.roe.badge"): string;
  (key: "summary.loanBook.value"): string;
  (key: "summary.loanBook.label"): string;
  (key: "summary.loanBook.badge"): string;
  (key: "table.column.year"): string;
  (key: "table.column.revenue"): string;
  (key: "table.column.revenueMobile"): string;
  (key: "table.column.profit"): string;
  (key: "table.column.profitMobile"): string;
  (key: "table.column.loanBook"): string;
  (key: "table.column.loanBookMobile"): string;
  (key: "footnote"): string;
  (key: "units.billion"): string;
};

export function getBreakthroughGrowthHeading(t: BreakthroughGrowthTranslations) {
  return {
    title: t("heading.title"),
    yearTitle: t("heading.yearTitle"),
    subTitle: t("heading.subTitle"),
    description: t("heading.description"),
  };
}

export type GrowthSummaryCard = {
  key: "revenue" | "profit" | "roe" | "loan_book";
  value: string;
  label: string;
  badge: string;
  borderColor: string;
  valueColor: string;
  badgeBg: string;
  badgeTextColor: string;
};

export type GrowthTableRow = {
  year: string;
  revenue: string;
  profit: string;
  profitRaw: number;
  loanBook: string;
  isForecast: boolean;
};

export function getGrowthChartData() {
  return [
    { year: "2021A", revenue: 1197, profit: 52, loanBook: 1664, isForecast: false },
    { year: "2022A", revenue: 2214, profit: 166, loanBook: 4753, isForecast: false },
    { year: "2023A", revenue: 2474, profit: -545, loanBook: 3736, isForecast: false },
    { year: "2024A", revenue: 2855, profit: 351, loanBook: 4585, isForecast: false },
    { year: "2025A", revenue: 4029, profit: 719, loanBook: 7216, isForecast: false },
    { year: "2026F", revenue: 6053, profit: 1200, loanBook: 10797, isForecast: true },
    { year: "2027F", revenue: 8002, profit: 1582, loanBook: 14515, isForecast: true },
    { year: "2028F", revenue: 10411, profit: 2075, loanBook: 18994, isForecast: true },
    { year: "2029F", revenue: 13380, profit: 2715, loanBook: 24707, isForecast: true },
    { year: "2030F", revenue: 16997, profit: 3549, loanBook: 31730, isForecast: true },
  ];
}

export function getGrowthTableData(): GrowthTableRow[] {
  return [
    { year: "2021A", revenue: "1,197", profit: "52", profitRaw: 52, loanBook: "1,664", isForecast: false },
    { year: "2022A", revenue: "2,214", profit: "166", profitRaw: 166, loanBook: "4,753", isForecast: false },
    { year: "2023A", revenue: "2,474", profit: "(545)", profitRaw: -545, loanBook: "3,736", isForecast: false },
    { year: "2024A", revenue: "2,855", profit: "351", profitRaw: 351, loanBook: "4,585", isForecast: false },
    { year: "2025A", revenue: "4,029", profit: "719", profitRaw: 719, loanBook: "7,216", isForecast: false },
    { year: "2026F", revenue: "6,053", profit: "1,200", profitRaw: 1200, loanBook: "10,797", isForecast: true },
    { year: "2027F", revenue: "8,002", profit: "1,582", profitRaw: 1582, loanBook: "14,515", isForecast: true },
    { year: "2028F", revenue: "10,411", profit: "2,075", profitRaw: 2075, loanBook: "18,994", isForecast: true },
    { year: "2029F", revenue: "13,380", profit: "2,715", profitRaw: 2715, loanBook: "24,707", isForecast: true },
    { year: "2030F", revenue: "16,997", profit: "3,549", profitRaw: 3549, loanBook: "31,730", isForecast: true },
  ];
}

export function getChartConfig(t: BreakthroughGrowthTranslations) {
  return {
    data: getGrowthChartData(),
    yTicks: [0, 6000, 12000, 18000],
    rightYTicks: [0, 8000, 16000, 24000, 32000],
    series: [
      { key: "revenue", label: t("series.revenue"), color: "#00844a", type: "bar" as const },
      { key: "profit", label: t("series.profit"), color: "#2563eb", type: "bar" as const },
      { key: "loanBook", label: t("series.loanBook"), color: "#7c3aed", type: "line" as const },
    ],
  };
}

export function getChartGreyLegend(t: BreakthroughGrowthTranslations) {
  return t("chart.legend.grey");
}

export function getGrowthSummaryCards(t: BreakthroughGrowthTranslations): GrowthSummaryCard[] {
  return [
    {
      key: "revenue",
      value: t("summary.revenue.value"),
      label: t("summary.revenue.label"),
      badge: t("summary.revenue.badge"),
      borderColor: "rgba(0,132,74,0.5)",
      valueColor: "#00844a",
      badgeBg: "#daf2ed",
      badgeTextColor: "#00844a",
    },
    {
      key: "profit",
      value: t("summary.profit.value"),
      label: t("summary.profit.label"),
      badge: t("summary.profit.badge"),
      borderColor: "rgba(37,99,235,0.5)",
      valueColor: "#2563eb",
      badgeBg: "#d3e6fe",
      badgeTextColor: "#2563eb",
    },
    {
      key: "roe",
      value: t("summary.roe.value"),
      label: t("summary.roe.label"),
      badge: t("summary.roe.badge"),
      borderColor: "rgba(0,132,74,0.5)",
      valueColor: "#16a34a",
      badgeBg: "#dffbdb",
      badgeTextColor: "#16a34a",
    },
    {
      key: "loan_book",
      value: t("summary.loanBook.value"),
      label: t("summary.loanBook.label"),
      badge: t("summary.loanBook.badge"),
      borderColor: "#b99dda",
      valueColor: "#7c3aed",
      badgeBg: "#f9effe",
      badgeTextColor: "#7c3aed",
    },
  ];
}

export function getGrowthFootnote(t: BreakthroughGrowthTranslations) {
  return t("footnote");
}
