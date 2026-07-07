export type DirectionCardTone = "primary" | "default";
export type DirectionIconKey =
  "vision" | "mission" | "heart" | "shield" | "bulb" | "wing" | "store" | "insurance" | "bank" | "spark";

type StrategicDirectionTranslations = {
  (key: "hero.eyebrow"): string;
  (key: "hero.title"): string;
  (key: "pillars.vision.label"): string;
  (key: "pillars.vision.title"): string;
  (key: "pillars.vision.description"): string;
  (key: "pillars.mission.label"): string;
  (key: "pillars.mission.title"): string;
  (key: "pillars.mission.description"): string;
  (key: "values.eyebrow"): string;
  (key: "values.title"): string;
  (key: "values.items.first.title"): string;
  (key: "values.items.first.subtitle"): string;
  (key: "values.items.second.title"): string;
  (key: "values.items.second.subtitle"): string;
  (key: "values.items.third.title"): string;
  (key: "values.items.third.subtitle"): string;
  (key: "values.items.fourth.title"): string;
  (key: "values.items.fourth.subtitle"): string;
};

export function getStrategicDirectionHero(t: StrategicDirectionTranslations) {
  return {
    eyebrow: t("hero.eyebrow"),
    title: t("hero.title"),
  };
}

export function getStrategicPillars(t: StrategicDirectionTranslations) {
  return [
    {
      tone: "primary" as const,
      icon: "vision" as const,
      label: t("pillars.vision.label"),
      title: t("pillars.vision.title"),
      description: t("pillars.vision.description"),
    },
    {
      tone: "default" as const,
      icon: "mission" as const,
      label: t("pillars.mission.label"),
      title: t("pillars.mission.title"),
      description: t("pillars.mission.description"),
    },
  ];
}

export function getStrategicValues(t: StrategicDirectionTranslations) {
  return {
    eyebrow: t("values.eyebrow"),
    title: t("values.title"),
    items: [
      {
        icon: "heart" as const,
        title: t("values.items.first.title"),
        subtitle: t("values.items.first.subtitle"),
        accentClassName: "text-main-app-yellow",
        ringClassName: "border-app-primary-500/20",
        haloClassName: "bg-app-primary-25",
      },
      {
        icon: "shield" as const,
        title: t("values.items.second.title"),
        subtitle: t("values.items.second.subtitle"),
        accentClassName: "text-app-primary-500",
        ringClassName: "border-app-primary-500/25",
        haloClassName: "bg-app-primary-25",
      },
      {
        icon: "bulb" as const,
        title: t("values.items.third.title"),
        subtitle: t("values.items.third.subtitle"),
        accentClassName: "text-app-lime-500",
        ringClassName: "border-app-lime-500/25",
        haloClassName: "bg-app-primary-25",
      },
      {
        icon: "wing" as const,
        title: t("values.items.fourth.title"),
        subtitle: t("values.items.fourth.subtitle"),
        accentClassName: "text-main-app-yellow",
        ringClassName: "border-main-app-yellow/25",
        haloClassName: "bg-app-primary-25",
      },
    ],
  };
}
