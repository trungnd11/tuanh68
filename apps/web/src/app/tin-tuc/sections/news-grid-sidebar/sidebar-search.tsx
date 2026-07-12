import clsx from "clsx";
import { sidebarContent } from "./content";

export default function SidebarSearch() {
  return (
    <div
      className={clsx(
        "rounded-[16px] bg-white p-6",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <h4 className={clsx("mb-4 flex items-center gap-2 text-[14px] font-black uppercase", "text-[#333]")}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.375 5.6875C11.375 6.94258 10.9676 8.10195 10.2812 9.04258L13.743 12.507C14.0848 12.8488 14.0848 13.4039 13.743 13.7457C13.4012 14.0875 12.8461 14.0875 12.5043 13.7457L9.04258 10.2812C8.10195 10.9703 6.94258 11.375 5.6875 11.375C2.5457 11.375 0 8.8293 0 5.6875C0 2.5457 2.5457 0 5.6875 0C8.8293 0 11.375 2.5457 11.375 5.6875ZM5.6875 9.625C7.86067 9.625 9.625 7.86067 9.625 5.6875C9.625 3.51433 7.86067 1.75 5.6875 1.75C3.51433 1.75 1.75 3.51433 1.75 5.6875C1.75 7.86067 3.51433 9.625 5.6875 9.625Z"
            fill="#48A6A7"
          />
        </svg>
        {sidebarContent.search.heading}
      </h4>
      <div className={clsx("flex items-center gap-2")}>
        <input
          type="text"
          placeholder={sidebarContent.search.placeholder}
          className={clsx(
            "flex-1 rounded-[8px] border border-[#e5e7eb] px-4 py-2.5 text-[14px]",
            "text-[#6b7280] outline-none transition-colors placeholder:text-[#9ca3af]",
            "focus:border-app-brand-teal"
          )}
        />
        <button
          className={clsx(
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            "bg-app-accent-blue text-white"
          )}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.75 4.875C9.75 5.95078 9.40078 6.94453 8.8125 7.75078L11.7797 10.7203C12.0727 11.0133 12.0727 11.4891 11.7797 11.782C11.4867 12.075 11.0109 12.075 10.718 11.782L7.75078 8.8125C6.94453 9.40312 5.95078 9.75 4.875 9.75C2.18203 9.75 0 7.56797 0 4.875C0 2.18203 2.18203 0 4.875 0C7.56797 0 9.75 2.18203 9.75 4.875ZM4.875 8.25C6.73771 8.25 8.25 6.73771 8.25 4.875C8.25 3.01229 6.73771 1.5 4.875 1.5C3.01229 1.5 1.5 3.01229 1.5 4.875C1.5 6.73771 3.01229 8.25 4.875 8.25Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
