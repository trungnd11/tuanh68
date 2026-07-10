import clsx from "clsx";
import { urgentCtaContent } from "./content";
import { urgentCtaContactIconMap } from "./urgent-cta-contact-icons";

export default function UrgentCtaContactList() {
  return (
    <div
      className={clsx(
        "grid w-full shrink-0 grid-cols-1 gap-4 border-t border-[rgba(255,255,255,0.2)] pt-6",
        "md:grid-cols-3 lg:gap-8 lg:pt-[41px]"
      )}
    >
      {urgentCtaContent.contactInfo.map((info) => (
        <div key={info.label} className={clsx("min-w-0")}>
          <div className={clsx("flex items-center gap-3")}>
            <span className={clsx("inline-flex shrink-0 pb-[5.75px] pt-[4.25px]")}>
              <span className={clsx("size-[18px]")}>{urgentCtaContactIconMap[info.icon]}</span>
            </span>
            <div className={clsx("flex min-w-0 flex-col")}>
              <span className={clsx("text-xs font-normal uppercase leading-4 tracking-[0.3px] text-[#ccfbf1]")}>
                {info.label}
              </span>
              <span className={clsx("text-sm font-bold leading-5 text-white lg:text-base lg:leading-6")}>
                {info.value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
