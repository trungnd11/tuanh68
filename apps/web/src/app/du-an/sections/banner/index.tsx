import clsx from "clsx";
import PageHeroBanner from "@/shared/ui/page-hero-banner";
import { projectsBannerContent } from "./content";
import BannerOverlay from "./banner-overlay";
import BannerTitleSection from "./banner-title-section";

export default function ProjectsBannerSection() {
  return (
    <PageHeroBanner
      backgroundImage={projectsBannerContent.backgroundImage}
      imageAlt="Công trình xây dựng cao tầng sử dụng ván phủ phim"
      breadcrumb={projectsBannerContent.breadcrumb}
      className={clsx("min-h-[450px] lg:min-h-175")}
      contentClassName={clsx("min-h-[calc(450px-80px)] grid-rows-[auto_1fr] lg:min-h-[calc(700px-80px)]")}
      backgroundChildren={<BannerOverlay />}
    >
      <div className={clsx("relative flex w-full max-w-7xl flex-1 items-center justify-center pb-10 lg:px-8")}>
        <BannerTitleSection />
      </div>
    </PageHeroBanner>
  );
}
