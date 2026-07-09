"use client";

import { useState, type ReactNode } from "react";

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
      className={className}
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
    <div className="flex w-full flex-col gap-3">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb]">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-[16px] leading-[24px] font-semibold text-[#1f2937]">{item.title}</span>
              <ChevronIcon
                className={`size-4 shrink-0 text-[#1f2937] transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <div className="px-6 pb-4 text-[14px] leading-[22px] text-[#4b5563]">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
