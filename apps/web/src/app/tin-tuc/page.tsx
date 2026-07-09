import NewsBannerSection from "./sections/banner";
import FeaturedArticleSection from "./sections/featured-article";
import NewsGridSidebarSection from "./sections/news-grid-sidebar";
import NewsletterSection from "./sections/newsletter";
import AppCtaSection from "@/shared/sections/app-cta-section";

export default function NewsPage() {
  return (
    <>
      <NewsBannerSection />
      <FeaturedArticleSection />
      <NewsGridSidebarSection />
      <NewsletterSection />
      <AppCtaSection />
    </>
  );
}
