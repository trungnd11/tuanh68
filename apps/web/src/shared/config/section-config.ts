import type { AppLocale } from "@/i18n/routing";

export const appSectionIds = {
  banner: "banner",
  offeringInfo: "offering-info",
  ipoRoadmap: "ipo-roadmap",
  f88Overview: "f88-overview",
  f88Journey: "f88-journey",
  f88StrategicDirection: "f88-strategic-direction",
  f88MarketLeader: "f88-market-leader",
  f88BreakthroughGrowth: "f88-breakthrough-growth",
  investorMaterials: "investor-materials",
  investorFaq: "investor-faq",
  newsSection: "news-section",
  purchaseGuide: "purchase-guide",
} as const;

export type AppSectionKey = keyof typeof appSectionIds;
export type AppSectionId = (typeof appSectionIds)[AppSectionKey];

export const appSectionTitles = {
  vi: {
    banner: "F88 PO",
    offeringInfo: "Thông tin chào bán",
    f88Overview: "Tổng quan về F88",
    f88MarketLeader: "Vị thế dẫn đầu",
    f88BreakthroughGrowth: "Kết quả kinh doanh",
    f88StrategicDirection: "Định hướng chiến lược",
    f88Journey: "Hành trình F88",
    ipoRoadmap: "Lộ trình PO",
    investorMaterials: "Tài liệu nhà đầu tư",
    purchaseGuide: "Hướng dẫn mua",
    newsSection: "Tin tức",
    investorFaq: "Câu hỏi thường gặp",
  },
  en: {
    banner: "F88 PO",
    offeringInfo: "Offering Information",
    f88Overview: "F88 Overview",
    f88MarketLeader: "Market Leadership",
    f88BreakthroughGrowth: "Financial Performance",
    f88StrategicDirection: "Strategic Direction",
    f88Journey: "F88 Journey",
    ipoRoadmap: "PO Roadmap",
    investorMaterials: "Investor Materials",
    purchaseGuide: "Purchase Guide",
    newsSection: "News",
    investorFaq: "FAQ",
  },
} as const satisfies Record<AppLocale, Record<AppSectionKey, string>>;

export type AppSectionBackground = "light" | "dark";

export const appSectionBackgrounds: Record<AppSectionId, AppSectionBackground> = {
  banner: "dark",
  "offering-info": "light",
  "ipo-roadmap": "light",
  "f88-overview": "light",
  "f88-journey": "light",
  "f88-strategic-direction": "light",
  "f88-market-leader": "light",
  "f88-breakthrough-growth": "light",
  "investor-materials": "light",
  "investor-faq": "light",
  "news-section": "light",
  "purchase-guide": "light",
};

export const appSectionNavigatorItems = (Object.entries(appSectionIds) as [AppSectionKey, AppSectionId][]).map(
  ([key, id]) => ({
    key,
    id,
  })
);
