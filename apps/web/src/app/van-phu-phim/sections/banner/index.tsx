import clsx from "clsx";
import PageHeroBanner from "@/shared/ui/page-hero-banner";
import { bannerContent } from "./content";
import BannerContent from "./banner-content";
import BannerStatCards from "./banner-stat-cards";
import BannerScrollDown from "./banner-scroll-down";
import BannerActions from "@/app/van-phu-phim/sections/banner/banner-actions";

export default function BannerSection() {
  return (
    <PageHeroBanner
      id={bannerContent.id}
      backgroundImage={bannerContent.backgroundImage}
      imageAlt="Ván ép phủ phim trong kho xưởng công nghiệp"
      breadcrumb={bannerContent.breadcrumb}
      contentClassName={clsx("pb-8 lg:pb-0")}
      backgroundChildren={
        <div
          className={clsx("absolute inset-0")}
          style={{
            background:
              "linear-gradient(135deg, rgba(10,20,40,0.92) 0%, rgba(41,115,178,0.55) 60%, rgba(72,166,167,0.3) 100%)",
          }}
        />
      }
    >
      <div className={clsx("relative grid w-full max-w-7xl gap-5 lg:gap-10 lg:grid-cols-2 lg:px-8")}>
        <div className={clsx("flex flex-col gap-5")}>
          <BannerContent />
          <BannerActions className={clsx("hidden lg:flex")} />
        </div>
        <BannerStatCards />
        <BannerActions className={clsx("flex lg:hidden pt-0!")} />
      </div>

      <BannerScrollDown />
    </PageHeroBanner>
  );
}
