import clsx from "clsx";
import PageHeroBanner from "@/shared/ui/page-hero-banner";
import { newsBannerContent } from "./content";
import NewsBannerOverlay from "./banner-overlay";
import NewsBannerTitleSection from "./banner-title-section";

export default function NewsBannerSection() {
  return (
    <PageHeroBanner
      backgroundImage={newsBannerContent.backgroundImage}
      imageAlt="Tin tức và sự kiện Tu Anh 68"
      breadcrumb={newsBannerContent.breadcrumb}
      className={clsx("min-h-[450px] lg:min-h-175")}
      contentClassName={clsx("min-h-[calc(450px-80px)] grid-rows-[auto_1fr] lg:min-h-[calc(700px-80px)]")}
      backgroundChildren={<NewsBannerOverlay />}
    >
      <div className={clsx("relative flex w-full max-w-7xl flex-1 items-center justify-center pb-10 lg:px-8")}>
        <NewsBannerTitleSection />
      </div>
    </PageHeroBanner>
  );
}
