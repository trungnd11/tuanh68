import { useTranslations } from "next-intl";
import { getNewsSectionItems } from "@/app/sections/news-section/data";
import NewsSectionCard from "@/app/sections/news-section/components/news-section-card";
import clsx from "clsx";

export default function NewsSectionGrid() {
  const t = useTranslations("HomePage.newsSection");
  const newsSectionItems = getNewsSectionItems(t);

  return (
    <>
      <div
        className={
          "flex overflow-x-auto scroll-smooth snap-x snap-mandatory md:hidden " +
          "scroll-px-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        }
      >
        {newsSectionItems.map((item, index) => (
          <div
            key={`${item.date}-${item.imageAlt}`}
            className={clsx(
              index === 0 ? "ml-4" : "ml-0",
              index !== 0 ? index !== newsSectionItems.length - 1 && "w-80.25 px-3" : "w-74.25",
              "shrink-0 snap-center last:w-78.25 last:pr-4"
            )}
          >
            <NewsSectionCard item={item} />
          </div>
        ))}
      </div>

      <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
        {newsSectionItems.map((item) => (
          <NewsSectionCard key={`${item.date}-${item.imageAlt}`} item={item} />
        ))}
      </div>
    </>
  );
}
