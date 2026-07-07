"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { useActiveSection } from "./useActiveSection";
import type { AppSectionId } from "@/shared/config/section-config";
import { appSectionNavigatorItems, appSectionTitles, appSectionBackgrounds } from "@/shared/config/section-config";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import type { AppSectionNavigatorProps } from "@/shared/ui/app-section-navigator/types";

export default function AppSectionNavigator({ locale, headerOffset = 95, logo, className }: AppSectionNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const items = useMemo(
    () =>
      appSectionNavigatorItems.map((item) => ({
        ...item,
        title: appSectionTitles[locale][item.key],
      })),
    [locale]
  );
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(sectionIds, headerOffset);
  const currentBg = activeId ? appSectionBackgrounds[activeId as AppSectionId] : "light";

  function handleNavigate(sectionId: string) {
    const targetElement = document.getElementById(sectionId);

    if (!targetElement) {
      return;
    }

    setIsOpen(false);

    const nextTop = window.scrollY + targetElement.getBoundingClientRect().top - headerOffset;

    window.scrollTo({
      top: Math.max(0, nextTop),
      behavior: "smooth",
    });
  }

  return (
    <aside
      className={clsx("fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 xl:flex", className)}
      aria-label="Section navigator"
    >
      <div
        className="relative flex items-stretch"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocusCapture={() => setIsOpen(true)}
        onBlurCapture={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
          }

          setIsOpen(false);
        }}
      >
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-6" />

        <div
          className={clsx(
            "flex items-center gap-3 rounded-xl pr-4 pl-4 py-4",
            "shadow-[0_12px_32px_rgba(3,7,18,0.14)] backdrop-blur-sm",
            "-translate-x-[calc(100%-2px)] transition-all duration-300 ease-out",
            isOpen && "translate-x-2",
            isOpen || currentBg === "dark" ? "bg-white/95" : "bg-app-primary-500"
          )}
        >
          {logo ? <div className="pt-1">{logo}</div> : null}

          <nav className="flex flex-col items-start gap-1.75">
            {items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={item.title}
                  className={clsx(
                    "group/item relative inline-flex items-center rounded-full outline-none transition-[transform] duration-300",
                    "focus-visible:ring-2 focus-visible:ring-app-primary-500/40 focus-visible:ring-offset-2 cursor-pointer"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "block h-1.25 rounded-full transition-all duration-300 ease-out",
                      isActive ? "w-10 bg-app-primary-500" : "w-6.5 bg-[#D9D9D9] group-hover/item:bg-app-primary-500"
                    )}
                  />

                  <span
                    aria-hidden="true"
                    className={clsx(
                      "pointer-events-none absolute left-15.25 top-1/2 inline-flex -translate-y-1/2 items-center",
                      "transition-all duration-300 ease-out",
                      "translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100",
                      "group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100"
                    )}
                  >
                    <span className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rotate-45 rounded-[2px] bg-[#3E3E3E]" />
                    <AppBorderRadius cornerRadius={8}>
                      <span
                        className={clsx(
                          "relative inline-flex whitespace-nowrap bg-[#3E3E3E] p-2.5 leading-4 text-white text-xs",
                          locale === "vi" ? "font-semibold" : "font-medium"
                        )}
                      >
                        {item.title}
                      </span>
                    </AppBorderRadius>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
