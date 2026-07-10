"use client";

import { useState, type ReactNode } from "react";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import { appColors } from "@/shared/theme";
import clsx from "clsx";

export interface AppCollapseItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AppCollapseProps {
  items: readonly AppCollapseItem[];
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AppCollapse({ items }: AppCollapseProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  function toggle(id: string) {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  return (
    <div className={clsx("flex w-full flex-col gap-3")}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <AppBorderRadius key={item.id} cornerRadius={8} borderWidth={1} borderColor={appColors.appNeutral[200]}>
            <div className={clsx("bg-app-neutral-50")}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className={clsx(
                  "flex w-full items-center justify-between",
                  "px-4 py-3 lg:px-6 lg:py-4 text-left cursor-pointer"
                )}
              >
                <span className={clsx("text-sm lg:text-base lg:leading-6 font-semibold text-app-neutral-800")}>
                  {item.title}
                </span>
                <ChevronIcon
                  className={clsx(
                    "size-4 shrink-0 text-app-neutral-800 transition-transform duration-200 ",
                    isOpen ? "rotate-90" : ""
                  )}
                />
              </button>
              <div
                className={clsx("grid transition-all duration-300")}
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className={clsx("overflow-hidden")}>
                  <div className={clsx("px-4 lg:px-6 pb-4 text-xs lg:text-sm leading-5.5 text-app-neutral-600")}>
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          </AppBorderRadius>
        );
      })}
    </div>
  );
}
