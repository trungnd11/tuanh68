"use client";

import clsx from "clsx";
import Image from "next/image";
import AppContainer from "@/shared/ui/app-container";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import { featuredArticleContent } from "./content";
import ArticleBadges from "./article-badges";
import ArticleMetaRow from "./article-meta-row";
import ArticleFooter from "./article-footer";
import ArticleDateBadge from "./article-date-badge";

export default function FeaturedArticleSection() {
  const { article } = featuredArticleContent;

  return (
    <section className={clsx("bg-white py-6 lg:py-16")}>
      <AppContainer>
        <AppScrollReveal variant="fade-in-up">
          <AppSectionBadge centered className={clsx("pb-6 lg:pb-10")}>
            {featuredArticleContent.badge}
          </AppSectionBadge>
        </AppScrollReveal>

        <AppScrollReveal variant="fade-in-up" delayMs={100}>
          <div
            className={clsx(
              "grid grid-cols-1 overflow-clip rounded-[16px] border border-[#f3f4f6]",
              "bg-white",
              "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
              "lg:grid-cols-5"
            )}
          >
            <div className={clsx("relative lg:col-span-3")}>
              <div className={clsx("relative h-55 overflow-clip sm:h-75 lg:h-full lg:min-h-182")}>
                <Image
                  src={article.backgroundImage}
                  alt={article.imageAlt}
                  fill
                  className={clsx("object-cover")}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className={clsx("absolute inset-0 bg-linear-to-r from-transparent to-[rgba(0,0,0,0.2)]")} />
              </div>

              <ArticleBadges featuredBadge={article.featuredBadge} featuredBadgeSub={article.featuredBadgeSub} />
            </div>

            <div className={clsx("relative flex flex-col justify-between p-6 lg:col-span-2 lg:p-10")}>
              <div className={clsx("flex flex-col gap-4")}>
                <ArticleMetaRow
                  category={article.category}
                  readingTime={article.readingTime}
                  author={article.author}
                  views={article.views}
                  shares={article.shares}
                />

                <h2
                  className={clsx(
                    "text-[22px] font-black uppercase leading-7 text-[#333]",
                    "sm:text-[26px] sm:leading-8 lg:text-[30px] lg:leading-9"
                  )}
                >
                  {article.title.join(" ")}
                </h2>

                <p className={clsx("text-sm leading-5.5 text-[#6b7280] lg:text-[16px] lg:leading-6")}>
                  {article.description.join(" ")}
                </p>
              </div>

              <ArticleFooter authorAvatar={article.authorAvatar} authorName={article.authorName} />

              <ArticleDateBadge day={article.date.day} month={article.date.month} year={article.date.year} />
            </div>
          </div>
        </AppScrollReveal>
      </AppContainer>
    </section>
  );
}
