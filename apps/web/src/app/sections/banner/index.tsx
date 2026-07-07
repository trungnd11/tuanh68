import Image from "next/image";
import BannerImage from "@/assets/images/banner-bg.png";
import BannerContent from "@/app/sections/banner/components/banner-content";
import { appSectionIds } from "@/shared/config/app";
import clsx from "clsx";

export default function BannerSection() {
  return (
    <section id={appSectionIds.banner} className="relative isolate text-white">
      <div className="absolute inset-0">
        <Image
          alt="F88 IPO"
          fill
          priority
          sizes="100vw"
          src={BannerImage}
          className="object-cover object-[70%_center]"
        />
      </div>
      <div className={clsx("absolute inset-0 opacity-20")} />

      <BannerContent />
    </section>
  );
}
