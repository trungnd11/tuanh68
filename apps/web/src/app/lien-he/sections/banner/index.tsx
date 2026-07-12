import clsx from "clsx";
import PageHeroBanner from "@/shared/ui/page-hero-banner";
import { bannerContent } from "./content";
import BannerOverlay from "./banner-overlay";
import BannerContent from "./banner-content";
import BannerStatsBar from "./banner-stats-bar";

export default function BannerSection() {
  return (
    <PageHeroBanner
      id={bannerContent.id}
      backgroundImage={bannerContent.backgroundImage}
      imageAlt="Nhà máy sản xuất ván ép Tu Anh 68"
      breadcrumb={bannerContent.breadcrumb}
      className={clsx("min-h-[500px] lg:min-h-175")}
      contentClassName={clsx("pb-6")}
      backgroundChildren={<BannerOverlay />}
    >
      <div className={clsx("relative flex w-full max-w-7xl lg:px-8")}>
        <BannerContent />
      </div>

      <BannerStatsBar />
    </PageHeroBanner>
  );
}
