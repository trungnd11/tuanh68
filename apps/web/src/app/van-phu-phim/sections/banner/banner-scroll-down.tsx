import clsx from "clsx";
import Image from "next/image";
import { bannerContent } from "./content";

export default function BannerScrollDown() {
  return (
    <div className={clsx("relative mx-auto hidden flex-col items-center gap-2 lg:flex")}>
      <span className={clsx("text-xs font-normal uppercase tracking-[1.2px]", "text-[rgba(255,255,255,0.4)]")}>
        {bannerContent.scrollDown}
      </span>
      <Image src="/assets/products/hero/chevron-down.png" alt="" width={12} height={12} className={clsx("size-3")} />
    </div>
  );
}
