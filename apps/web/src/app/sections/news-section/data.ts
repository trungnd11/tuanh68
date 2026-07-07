import type { StaticImageData } from "next/image";
import NewsCard1 from "@/assets/images/investor-materials-card-1.png";
import NewsCard2 from "@/assets/images/investor-materials-card-2.png";
import NewsCard3 from "@/assets/images/investor-materials-card-3.png";

export type NewsItem = {
  date: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  href: string;
};

type NewsSectionTranslations = {
  (key: "heading.eyebrow"): string;
  (key: "heading.title"): string;
  (key: "heading.description"): string;
  (key: "items.0.date"): string;
  (key: "items.0.title"): string;
  (key: "items.0.description"): string;
  (key: "items.0.imageAlt"): string;
  (key: "items.1.date"): string;
  (key: "items.1.title"): string;
  (key: "items.1.description"): string;
  (key: "items.1.imageAlt"): string;
  (key: "items.2.date"): string;
  (key: "items.2.title"): string;
  (key: "items.2.description"): string;
  (key: "items.2.imageAlt"): string;
  (key: "card.readMore"): string;
  (key: "moreLink.label"): string;
};

export function getNewsSectionHeading(t: NewsSectionTranslations) {
  return {
    eyebrow: t("heading.eyebrow"),
    title: t("heading.title"),
    description: t("heading.description"),
  };
}

export function getNewsSectionItems(t: NewsSectionTranslations): NewsItem[] {
  return [
    {
      date: t("items.0.date"),
      title: t("items.0.title"),
      description: t("items.0.description"),
      image: NewsCard1,
      imageAlt: t("items.0.imageAlt"),
      href: "https://f88.vn/nikkei-asia-f88-dang-o-giai-doan-phat-trien-thuan-loi-nhat",
    },
    {
      date: t("items.1.date"),
      title: t("items.1.title"),
      description: t("items.1.description"),
      image: NewsCard2,
      imageAlt: t("items.1.imageAlt"),
      href: "https://f88.vn/tai-dinh-vi-chien-luoc-f88-huong-den-phat-trien-toan-dien-va-ben-vung",
    },
    {
      date: t("items.2.date"),
      title: t("items.2.title"),
      description: t("items.2.description"),
      image: NewsCard3,
      imageAlt: t("items.2.imageAlt"),
      href: "https://f88.vn/truoc-them-chuyen-san-hose-loi-the-o2o-va-vu-khi-giup-f88-dat-ty-suat-sinh-loi-roae-toi-344",
    },
  ];
}

export function getNewsSectionCardLabels(t: NewsSectionTranslations) {
  return {
    readMore: t("card.readMore"),
  };
}

export function getNewsSectionMoreLink(t: NewsSectionTranslations) {
  return {
    label: t("moreLink.label"),
    href: "https://f88.vn/tin-tuc",
  };
}
