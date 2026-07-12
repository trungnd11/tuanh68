"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appSectionIds } from "@/shared/config/app";
import type { HeaderMenuProps } from "./types";

export const navigationItems = [
  { id: appSectionIds.home, label: "TRANG CHỦ", route: "/" },
  { id: appSectionIds.about, label: "GIỚI THIỆU", route: "/gioi-thieu" },
  { id: appSectionIds.products, label: "VÁN PHỦ PHIM", route: "/van-phu-phim" },
  { id: appSectionIds.projects, label: "DỰ ÁN", route: "/du-an" },
  { id: appSectionIds.news, label: "TIN TỨC", route: "/tin-tuc" },
  { id: appSectionIds.contact, label: "LIÊN HỆ", route: "/lien-he" },
] as const;

export default function HeaderMenu({ className, mobile = false, onNavigate, activeId }: HeaderMenuProps) {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(mobile ? "flex flex-col items-stretch gap-1" : "hidden items-center gap-8 xl:flex", className)}
    >
      {navigationItems.map((item) => {
        const isActive = item.route === pathname;

        return (
          <Link
            key={item.id}
            href={item.route}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "relative transition-colors duration-200",
              mobile
                ? "rounded-2xl px-4 py-3 text-[16px] text-white hover:bg-white/5"
                : "inline-flex px-3 pt-2 pb-2.5 text-[14px] leading-5 tracking-[0.35px] uppercase drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]",
              !isActive && mobile && "font-medium text-app-neutral-200",
              isActive && mobile && "font-semibold text-white bg-white/10 rounded-2xl",
              !mobile &&
                isActive &&
                "font-semibold text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[2px] after:bg-app-brand-teal after:content-['']",
              !isActive && !mobile && "font-medium text-app-neutral-200 hover:text-white"
            )}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
