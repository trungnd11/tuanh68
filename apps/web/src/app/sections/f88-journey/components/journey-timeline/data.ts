type JourneyTimelineTranslations = {
  (key: "items.first.title"): string;
  (key: "items.first.description"): string;
  (key: "items.second.title"): string;
  (key: "items.second.description"): string;
  (key: "items.third.title"): string;
  (key: "items.third.description"): string;
  (key: "items.fourth.title"): string;
  (key: "items.fourth.description"): string;
};

export function getJourneyItems(t: JourneyTimelineTranslations) {
  return [
    {
      title: t("items.first.title"),
      description: t("items.first.description"),
    },
    {
      title: t("items.second.title"),
      description: t("items.second.description"),
    },
    {
      title: t("items.third.title"),
      description: t("items.third.description"),
    },
    {
      title: t("items.fourth.title"),
      description: t("items.fourth.description"),
    },
  ];
}
