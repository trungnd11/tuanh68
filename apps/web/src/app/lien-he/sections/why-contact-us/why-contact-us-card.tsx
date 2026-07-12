import clsx from "clsx";
import { CardIcon } from "./why-contact-us-icons";
import type { whyContactUsContent } from "./content";

type CardData = (typeof whyContactUsContent.cards)[number];

export default function WhyContactUsCard({ icon, iconBg, title, description }: CardData) {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col items-center gap-[6.9px]",
        "rounded-[16px] border border-[#f3f4f6] bg-[#f9fafb]",
        "p-[25px] pb-[47.75px] pt-[25px]",
        "shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
      )}
    >
      <div className={clsx("flex size-14 items-center justify-center rounded-full")} style={{ background: iconBg }}>
        <CardIcon icon={icon} />
      </div>
      <h4 className={clsx("pt-[9px] text-center text-sm font-bold leading-6 text-[#333] lg:text-base")}>{title}</h4>
      <p className={clsx("text-center text-xs leading-[22.75px] text-[#6b7280] lg:text-sm")}>{description.join(" ")}</p>
    </div>
  );
}
