import clsx from "clsx";
import { ctaBandContent } from "./content";

export default function CtaBadge() {
  return (
    <div
      className={clsx(
        "inline-flex rounded-full bg-[rgba(72,166,167,0.1)] px-4 py-[6px] text-xs",
        "font-bold uppercase leading-4 tracking-[1.2px] text-app-brand-teal"
      )}
    >
      {ctaBandContent.badge}
    </div>
  );
}
