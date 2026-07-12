"use client";

import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { newsGridContent } from "./content";
import NewsCard from "./news-card";
import SidebarSearch from "./sidebar-search";
import SidebarCategories from "./sidebar-categories";
import SidebarTrending from "./sidebar-trending";
import SidebarContactCta from "./sidebar-contact-cta";

export default function NewsGridSidebarSection() {
  return (
    <section className={clsx("bg-[#f8f9fa] py-6 lg:pb-20 lg:pt-10")}>
      <div className={clsx("mx-auto w-full max-w-[1280px] px-4 sm:px-6 xl:px-8")}>
        <div className={clsx("flex flex-col-reverse gap-10 lg:flex-row")}>
          <div className={clsx("min-w-px flex-1")}>
            <AppScrollReveal variant="fade-in-up">
              <div className={clsx("mb-8 flex items-center justify-between")}>
                <div className={clsx("flex items-center gap-3")}>
                  <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
                  <div className={clsx("text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
                    {newsGridContent.header.badge}
                  </div>
                </div>
                <div className={clsx("text-[12px] font-medium text-[#9ca3af]")}>{newsGridContent.header.showing}</div>
              </div>
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={50}>
              <div className={clsx("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3")}>
                {newsGridContent.cards.map((card) => (
                  <NewsCard key={card.title[0]} {...card} />
                ))}
              </div>
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={100}>
              <div className={clsx("flex justify-center pt-8")}>
                <button
                  className={clsx(
                    "flex items-center gap-2 rounded-[8px] border-2 border-app-accent-blue",
                    "px-[34px] py-4 text-[14px] font-bold uppercase text-app-accent-blue",
                    "transition-colors hover:bg-app-accent-blue hover:text-white"
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6738 6.125H12.9063C13.2699 6.125 13.5625 5.83242 13.5625 5.46875V1.96875C13.5625 1.70352 13.4039 1.46289 13.1578 1.36172C12.9117 1.26055 12.6301 1.31523 12.4414 1.50391L11.3039 2.64141C8.90859 0.276172 5.05039 0.284375 2.66875 2.66875C0.276172 5.06133 0.276172 8.93867 2.66875 11.3312C5.06133 13.7238 8.93867 13.7238 11.3313 11.3312C11.673 10.9895 11.673 10.4344 11.3313 10.0926C10.9895 9.75078 10.4344 9.75078 10.0926 10.0926C8.38359 11.8016 5.61367 11.8016 3.90469 10.0926C2.1957 8.38359 2.1957 5.61367 3.90469 3.90469C5.60547 2.20391 8.35352 2.1957 10.0652 3.87734L8.94141 5.00391C8.75273 5.19258 8.69805 5.47422 8.79922 5.72031C8.90039 5.96641 9.14102 6.125 9.40625 6.125H12.6738Z"
                      fill="#2973B2"
                    />
                  </svg>
                  {newsGridContent.loadMore}
                </button>
              </div>
            </AppScrollReveal>
          </div>

          <aside className={clsx("flex w-full flex-col gap-8 lg:w-[384px] lg:shrink-0")}>
            <AppScrollReveal variant="fade-in-up" delayMs={50}>
              <SidebarSearch />
            </AppScrollReveal>
            <AppScrollReveal variant="fade-in-up" delayMs={100}>
              <SidebarCategories />
            </AppScrollReveal>
            <AppScrollReveal variant="fade-in-up" delayMs={150}>
              <SidebarTrending />
            </AppScrollReveal>
            <AppScrollReveal variant="fade-in-up" delayMs={200}>
              <SidebarContactCta />
            </AppScrollReveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
