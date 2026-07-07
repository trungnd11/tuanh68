import clsx from "clsx";
import AppContent from "@/shared/ui/app-content";
import NewsSectionHeading from "@/app/sections/news-section/components/news-section-heading";
import NewsSectionGrid from "@/app/sections/news-section/components/news-section-grid";
import NewsSectionMoreLink from "@/app/sections/news-section/components/news-section-more-link";
import { appSectionIds } from "@/shared/config/app";

export default function NewsSection() {
  return (
    <section id={appSectionIds.newsSection} className={clsx("py-10 xl:py-18")}>
      <AppContent className="flex flex-col gap-6 xl:gap-10 px-0!">
        <NewsSectionHeading />
        <div className={clsx("flex flex-col gap-5 xl:gap-10")}>
          <NewsSectionGrid />
          <NewsSectionMoreLink />
        </div>
      </AppContent>
    </section>
  );
}
