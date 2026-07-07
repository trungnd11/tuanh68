export const bannerActionItems = [
  {
    labelKey: "purchase",
    className: "bg-main-app-yellow text-app-neutral-900 shadow-lg shadow-black/30",
  },
  {
    labelKey: "roadshow",
    className: "gap-3 bg-main-app-red text-white",
    hasPlayIcon: true,
  },
] as const;

export const bannerCountdownLabelKeys = ["days", "hours", "minutes", "seconds"] as const;
