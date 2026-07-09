export const appSectionIds = {
  home: "trang-chu",
  about: "gioi-thieu",
  products: "van-phu-phim",
  projects: "du-an",
  news: "tin-tuc",
  contact: "lien-he",
} as const;

export type AppSectionKey = keyof typeof appSectionIds;
export type AppSectionId = (typeof appSectionIds)[AppSectionKey];

export const appSectionTitles: Record<AppSectionKey, string> = {
  home: "Trang chủ",
  about: "Giới thiệu",
  products: "Ván phủ phim",
  projects: "Dự án",
  news: "Tin tức",
  contact: "Liên hệ",
} as const;

export type AppSectionBackground = "light" | "dark";

export const appSectionBackgrounds: Record<AppSectionId, AppSectionBackground> = {
  "trang-chu": "dark",
  "gioi-thieu": "light",
  "van-phu-phim": "light",
  "du-an": "light",
  "tin-tuc": "light",
  "lien-he": "light",
};

export const appSectionNavigatorItems = (Object.entries(appSectionIds) as [AppSectionKey, AppSectionId][]).map(
  ([key, id]) => ({
    key,
    id,
  })
);
