import clsx from "clsx";
import Link from "next/link";
import { appCtaContent } from "./content";

export default function CtaActions() {
  return (
    <div className={clsx("flex gap-4 pb-6 pt-4 max-sm:flex-col")}>
      <Link
        href={appCtaContent.buttons[0].href}
        className={clsx(
          "inline-flex items-center justify-center gap-3 rounded-lg bg-white px-8",
          "py-4 text-sm font-bold uppercase tracking-[0.35px]",
          "text-[#2973b2] no-underline",
          "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
          "transition-shadow w-full sm:w-auto",
          "hover:shadow-[0px_25px_30px_-5px_rgba(0,0,0,0.15),0px_10px_12px_-6px_rgba(0,0,0,0.15)]"
        )}
      >
        <img src={appCtaContent.buttons[0].icon} alt="" className={clsx("size-3.5")} />
        {appCtaContent.buttons[0].text}
      </Link>
      <Link
        href={appCtaContent.buttons[1].href}
        className={clsx(
          "inline-flex items-center justify-center gap-3 rounded-lg border-2 border-white",
          "px-[34px] py-4 text-sm font-bold uppercase tracking-[0.35px]",
          "text-white no-underline transition-colors w-full sm:w-auto",
          "hover:bg-white/10"
        )}
      >
        <img src={appCtaContent.buttons[1].icon} alt="" className={clsx("size-3.5")} />
        {appCtaContent.buttons[1].text}
      </Link>
    </div>
  );
}
