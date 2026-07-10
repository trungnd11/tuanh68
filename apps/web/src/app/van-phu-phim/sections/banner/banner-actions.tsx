import clsx from "clsx";
import IconEye from "@/assets/icons/icon-eye.svg";
import IconDocument from "@/assets/icons/icon-document.svg";
import { bannerContent } from "./content";

export default function BannerActions({ className }: { className?: string }) {
  return (
    <div className={clsx("flex flex-col gap-4 pt-5 sm:flex-row sm:flex-wrap", className)}>
      <a
        href={bannerContent.buttons.primary.href}
        className={clsx(
          "flex h-13 min-h-0 items-center justify-center gap-3 rounded-lg",
          "bg-[#2973b2] px-8 text-sm font-bold uppercase tracking-[0.35px]",
          "text-white",
          "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
          "w-full sm:w-auto"
        )}
      >
        <IconEye className={clsx("h-3.5 w-[15.75px] shrink-0")} />
        <span>{bannerContent.buttons.primary.label}</span>
      </a>
      <a
        href={bannerContent.buttons.secondary.href}
        className={clsx(
          "flex h-13 min-h-0 items-center justify-center gap-3 rounded-lg",
          "border-2 border-white bg-transparent px-8.5 text-sm font-bold",
          "uppercase tracking-[0.35px] text-white w-full sm:w-auto"
        )}
      >
        <IconDocument className={clsx("h-3.5 w-[10.5px] shrink-0")} />
        <span>{bannerContent.buttons.secondary.label}</span>
      </a>
    </div>
  );
}
