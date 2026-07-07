type MarketLeaderTranslations = {
  (key: "hero.title"): string;
  (key: "hero.accent"): string;
  (key: "hero.description"): string;
  (key: "highlights.first.title"): string;
  (key: "highlights.first.badge"): string;
  (key: "highlights.second.title"): string;
  (key: "highlights.second.badge"): string;
  (key: "highlights.third.title"): string;
  (key: "highlights.third.badge"): string;
  (key: "details.marketPotential.eyebrow"): string;
  (key: "details.marketPotential.title"): string;
  (key: "details.marketPotential.rows.marketSize.label"): string;
  (key: "details.marketPotential.rows.marketSize.description"): string;
  (key: "details.marketPotential.rows.modernPenetration.label"): string;
  (key: "details.marketPotential.rows.modernPenetration.description"): string;
  (key: "details.marketPotential.footnote.highlight"): string;
  (key: "details.marketPotential.footnote.description"): string;
  (key: "details.growth.eyebrow"): string;
  (key: "details.growth.title"): string;
  (key: "details.growth.rows.revenue.label"): string;
  (key: "details.growth.rows.revenue.description"): string;
  (key: "details.growth.rows.loanBook.label"): string;
  (key: "details.growth.rows.loanBook.description"): string;
  (key: "details.growth.rows.customer.label"): string;
  (key: "details.growth.rows.customer.description"): string;
  (key: "ecosystem.eyebrow"): string;
  (key: "ecosystem.title"): string;
  (key: "ecosystem.items.core.badge"): string;
  (key: "ecosystem.items.core.title"): string;
  (key: "ecosystem.items.core.description"): string;
  (key: "ecosystem.items.insurance.badge"): string;
  (key: "ecosystem.items.insurance.title"): string;
  (key: "ecosystem.items.insurance.description"): string;
  (key: "ecosystem.items.bank.badge"): string;
  (key: "ecosystem.items.bank.title"): string;
  (key: "ecosystem.items.bank.description"): string;
  (key: "ecosystem.items.other.badge"): string;
  (key: "ecosystem.items.other.title"): string;
  (key: "ecosystem.items.other.description"): string;
};

export function getMarketLeaderHero(t: MarketLeaderTranslations) {
  return {
    title: t("hero.title"),
    accent: t("hero.accent"),
    description: t("hero.description"),
  };
}

export function getMarketLeaderHighlights(t: MarketLeaderTranslations) {
  return [
    { value: "976+", title: t("highlights.first.title"), badge: t("highlights.first.badge") },
    { value: "85%", title: t("highlights.second.title"), badge: t("highlights.second.badge") },
    { value: "1.5M+", title: t("highlights.third.title"), badge: t("highlights.third.badge") },
  ];
}

export function getMarketLeaderDetailCards(t: MarketLeaderTranslations) {
  return [
    {
      eyebrow: t("details.marketPotential.eyebrow"),
      title: t("details.marketPotential.title"),
      rows: [
        {
          label: t("details.marketPotential.rows.marketSize.label"),
          description: t("details.marketPotential.rows.marketSize.description"),
          value: "$10B+",
        },
        {
          label: t("details.marketPotential.rows.modernPenetration.label"),
          description: t("details.marketPotential.rows.modernPenetration.description"),
          value: "3%-4%",
        },
      ],
      footnote: {
        highlight: t("details.marketPotential.footnote.highlight"),
        description: t("details.marketPotential.footnote.description"),
      },
    },
    {
      eyebrow: t("details.growth.eyebrow"),
      title: t("details.growth.title"),
      rows: [
        {
          label: t("details.growth.rows.revenue.label"),
          description: t("details.growth.rows.revenue.description"),
          value: "38.3%+",
        },
        {
          label: t("details.growth.rows.loanBook.label"),
          description: t("details.growth.rows.loanBook.description"),
          value: "45.3%+",
        },
        {
          label: t("details.growth.rows.customer.label"),
          description: t("details.growth.rows.customer.description"),
          value: "22.5%+",
        },
      ],
    },
  ];
}

export function getMarketLeaderEcosystem(t: MarketLeaderTranslations) {
  return {
    eyebrow: t("ecosystem.eyebrow"),
    title: t("ecosystem.title"),
    items: [
      {
        icon: "store" as const,
        badge: t("ecosystem.items.core.badge"),
        title: t("ecosystem.items.core.title"),
        description: t("ecosystem.items.core.description"),
      },
      {
        icon: "insurance" as const,
        badge: t("ecosystem.items.insurance.badge"),
        title: t("ecosystem.items.insurance.title"),
        description: t("ecosystem.items.insurance.description"),
      },
      {
        icon: "bank" as const,
        badge: t("ecosystem.items.bank.badge"),
        title: t("ecosystem.items.bank.title"),
        description: t("ecosystem.items.bank.description"),
      },
      {
        icon: "spark" as const,
        badge: t("ecosystem.items.other.badge"),
        title: t("ecosystem.items.other.title"),
        description: t("ecosystem.items.other.description"),
      },
    ],
  };
}
