"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { appSectionIds } from "@/shared/config/app";
import type { HeaderMenuProps } from "./types";

export const navigationItems = [
  {
    id: appSectionIds.ipoRoadmap,
    labelKey: "ipoRoadmap",
  },
  {
    id: appSectionIds.f88Overview,
    labelKey: "f88Overview",
  },
  {
    id: appSectionIds.f88BreakthroughGrowth,
    labelKey: "businessResults",
  },
  {
    id: appSectionIds.investorMaterials,
    labelKey: "ipoMaterials",
  },
  {
    id: appSectionIds.investorFaq,
    labelKey: "faq",
  },
  {
    id: appSectionIds.newsSection,
    labelKey: "news",
  },
] as const;

export default function HeaderMenu({ className, mobile = false, onNavigate, activeId }: HeaderMenuProps) {
  const t = useTranslations("HomePage.header.menu");

  return (
    <nav
      className={clsx(
        "text-body-base-semibold",
        mobile
          ? "flex flex-col items-stretch gap-1 text-app-neutral-900"
          : "hidden items-center gap-7 text-app-neutral-800 xl:flex",
        className
      )}
    >
      {navigationItems.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          onClick={onNavigate}
          className={clsx(
            "relative transition-colors duration-200",
            "hover:text-app-primary-500 hover:[text-shadow:0_0_1px_currentColor]",
            mobile && "rounded-2xl px-4 py-3 hover:bg-app-neutral-900/5",
            activeId === item.id && "text-app-primary-500 [text-shadow:0_0_1px_currentColor] after:scale-x-100",
            activeId === item.id && mobile && "bg-app-primary-50"
          )}
        >
          <span>{t(item.labelKey)}</span>
        </Link>
      ))}
    </nav>
  );
}
