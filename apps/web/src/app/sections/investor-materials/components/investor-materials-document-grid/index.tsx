"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  getInvestorMaterialFilters,
  getInvestorMaterialsMoreLabel,
  type InvestorDocumentGroup,
} from "@/app/sections/investor-materials/data";
import InvestorMaterialsDocumentItem from "@/app/sections/investor-materials/components/investor-materials-document-item";
import ArrowsChevronDownOutlined from "@f88/react-icons/icons/ArrowsChevronDownOutlined";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import { appSectionIds } from "@/shared/config/app";
import { appColors } from "@/shared/theme";
import { scrollToElementById } from "@/shared/utils/scroll";

const MOBILE_VISIBLE_COUNT = 4;
const DESKTOP_VISIBLE_COUNT = 8;

type InvestorMaterialsDocumentGridProps = {
  investorDocumentGroups: Record<string, InvestorDocumentGroup>;
};

export default function InvestorMaterialsDocumentGrid({ investorDocumentGroups }: InvestorMaterialsDocumentGridProps) {
  const investorMaterialFilters = getInvestorMaterialFilters();
  const [activeFilter, setActiveFilter] = useState(investorMaterialFilters[0]?.key ?? "legal");
  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const activeGroup = investorDocumentGroups[activeFilter];
  const collapsedVisibleCount = isDesktop ? DESKTOP_VISIBLE_COUNT : MOBILE_VISIBLE_COUNT;
  const hiddenItemCount = Math.max(activeGroup.items.length - collapsedVisibleCount, 0);
  const visibleCount = expanded ? activeGroup.items.length : Math.min(activeGroup.items.length, collapsedVisibleCount);
  const isExpandable = activeGroup.items.length > collapsedVisibleCount;
  const visibleItems = activeGroup.items.slice(0, visibleCount);
  const desktopColumnSplitIndex = Math.ceil(visibleItems.length / 2);
  const desktopColumns = [visibleItems.slice(0, desktopColumnSplitIndex), visibleItems.slice(desktopColumnSplitIndex)];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    function syncViewportMode(event?: MediaQueryListEvent) {
      setIsDesktop(event ? event.matches : mediaQuery.matches);
    }

    syncViewportMode();
    mediaQuery.addEventListener("change", syncViewportMode);

    return () => {
      mediaQuery.removeEventListener("change", syncViewportMode);
    };
  }, []);

  function handleSelectFilter(filterKey: string) {
    setActiveFilter(filterKey);
    setExpanded(false);
  }

  return (
    <div className="flex flex-col gap-5 xl:gap-8" style={{ overflowAnchor: "none" }}>
      <div className="grid grid-cols-2 gap-2 xl:flex xl:gap-4">
        {investorMaterialFilters.map((filter) => {
          const isActive = filter.key === activeFilter;

          return (
            <AppBorderRadius
              key={filter.key}
              cornerRadius={50}
              borderWidth={1}
              {...(isActive
                ? { borderColor: appColors.appGreen[500] }
                : {
                    borderColor: appColors.appNeutral[300],
                    classNameBorder: clsx(" h-full bg-white"),
                  })}
            >
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => handleSelectFilter(filter.key)}
                  className={clsx(
                    "h-10.5 py-2 text-body-sm-medium font-medium xl:h-12.5 xl:min-w-43.25 xl:px-8",
                    "cursor-pointer transition-colors xl:text-base",
                    isActive ? "bg-app-primary-500 text-white" : "text-app-neutral-950"
                  )}
                >
                  {filter.label}
                </button>
              </div>
            </AppBorderRadius>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 xl:gap-5">
        <div className="flex flex-col gap-2 xl:hidden">
          {visibleItems.map((item, index) => (
            <div key={`${item.title}-${index}`} className="min-w-0">
              <InvestorMaterialsDocumentItem item={item} />
            </div>
          ))}
        </div>

        <div className="hidden xl:grid xl:grid-cols-2 xl:gap-7">
          {desktopColumns.map((columnItems, columnIndex) => (
            <div key={columnIndex} className="flex min-w-0 flex-col gap-4">
              {columnItems.map((item, itemIndex) => (
                <div key={`${item.title}-${columnIndex}-${itemIndex}`} className="min-w-0">
                  <InvestorMaterialsDocumentItem item={item} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {isExpandable && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                const wasExpanded = expanded;
                setExpanded(!expanded);

                if (wasExpanded) {
                  scrollToElementById(appSectionIds.investorMaterials, { behavior: "smooth" });
                }
              }}
              className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-semibold leading-5 text-app-primary-550"
            >
              {expanded ? activeGroup.lessLabel : getInvestorMaterialsMoreLabel(activeGroup.key, hiddenItemCount)}
              <span className={clsx("transition-transform", expanded && "rotate-180")}>
                <ArrowsChevronDownOutlined inheritColor width={16} height={16} />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
