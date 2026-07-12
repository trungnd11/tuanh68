import clsx from "clsx";
import Link from "next/link";
import { sidebarContent } from "./content";

export default function SidebarContactCta() {
  return (
    <div
      className={clsx(
        "relative overflow-clip rounded-[16px] bg-gradient-to-br from-[#2973b2]",
        "to-[#1a4f8a] p-6",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <div
        className={clsx("absolute -right-8 -top-8 size-32 rounded-full opacity-10")}
        style={{ background: "radial-gradient(circle, rgba(72,166,167,1) 0%, rgba(72,166,167,0) 100%)" }}
      />
      <div className={clsx("relative z-10 mb-4 flex size-12 items-center justify-center rounded-full", "bg-white/20")}>
        <svg width="22.5" height="20" viewBox="0 0 22.5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 1.25C1.80859 1.25 1.25 1.80859 1.25 2.5V11.875V13.75V16.875C1.25 17.9102 2.08984 18.75 3.125 18.75H19.375C20.4102 18.75 21.25 17.9102 21.25 16.875V11.875V5.94531C21.25 5.23438 20.4922 4.78516 19.8672 5.12109L13.75 8.41406V5.94531C13.75 5.23438 12.9922 4.78516 12.3672 5.12109L6.25 8.41406V2.5C6.25 1.80859 5.69141 1.25 5 1.25H2.5Z"
            fill="white"
          />
        </svg>
      </div>
      <h4 className={clsx("relative z-10 mb-2 text-[16px] font-black uppercase leading-[22px]", "text-white")}>
        {sidebarContent.contactCta.heading}
      </h4>
      <p className={clsx("relative z-10 mb-5 text-[12px] leading-[18px] text-[#bfdbfe]")}>
        {sidebarContent.contactCta.description[0]}
        <br />
        {sidebarContent.contactCta.description[1]}
      </p>
      <Link
        href="tel:0983570760"
        className={clsx(
          "relative z-10 flex w-full items-center justify-center gap-2",
          "rounded-[8px] bg-app-brand-teal px-4 py-3 text-[14px] font-bold",
          "text-white transition-opacity hover:opacity-90"
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.65625 0.000616536C11.159 0.000616536 14 2.84163 14 6.34437C14 6.70804 13.7074 7.00062 13.3438 7.00062C12.9801 7.00062 12.6875 6.70804 12.6875 6.34437C12.6875 3.56624 10.4344 1.31312 7.65625 1.31312C7.29258 1.31312 7 1.02054 7 0.656867C7 0.293195 7.29258 0.000616536 7.65625 0.000616536ZM7.875 5.25062C8.35793 5.25062 8.75 5.64269 8.75 6.12562C8.75 6.60854 8.35793 7.00062 7.875 7.00062C7.39207 7.00062 7 6.60854 7 6.12562C7 5.64269 7.39207 5.25062 7.875 5.25062ZM7 3.28187C7 2.91819 7.29258 2.62562 7.65625 2.62562C9.70977 2.62562 11.375 4.29085 11.375 6.34437C11.375 6.70804 11.0824 7.00062 10.7188 7.00062C10.3551 7.00062 10.0625 6.70804 10.0625 6.34437C10.0625 5.01546 8.98516 3.93812 7.65625 3.93812C7.29258 3.93812 7 3.64554 7 3.28187Z"
            fill="white"
          />
        </svg>
        {sidebarContent.contactCta.phone}
      </Link>
    </div>
  );
}
