import clsx from "clsx";
import Image from "next/image";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import { bannerContent } from "./content";

export default function BannerContent() {
  return (
    <div className={clsx("flex w-full max-w-3xl flex-col gap-3 lg:gap-5")}>
      <AppSectionBadge>{bannerContent.badge}</AppSectionBadge>

      <h1
        className={clsx(
          "text-[32px] font-black uppercase leading-10 lg:text-6xl lg:leading-15",
          "drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]"
        )}
      >
        {bannerContent.title[0]}
        <br />
        <span className={clsx("text-app-brand-teal")}>{bannerContent.title[1]}</span>
      </h1>

      <p className={clsx("max-w-xl text-lg leading-[29.25px] text-gray-200")}>
        {bannerContent.description[0]}
        <br />
        {bannerContent.description[1]}
        <br />
        {bannerContent.description[2]}
      </p>

      <div className={clsx("grid grid-cols-2 lg:flex lg:flex-wrap gap-2 pt-2 lg:gap-3")}>
        {bannerContent.tags.map((tag) => (
          <div
            key={tag.label}
            className={clsx(
              "flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.2)]",
              "bg-[rgba(255,255,255,0.1)] px-4.25 py-[8.5px] backdrop-blur-[2px]"
            )}
          >
            <Image src={tag.icon} alt="" width={15} height={12} className={clsx("max-h-3 w-auto")} />
            <span className={clsx("text-sm font-medium leading-5 text-white")}>{tag.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
