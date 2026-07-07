import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import ExternalLink from "@/assets/icons/external-link.svg";
import { appColors } from "@/shared/theme";
import { getNewsSectionCardLabels, type NewsItem } from "@/app/sections/news-section/data";

type NewsSectionCardProps = {
  item: NewsItem;
};

export default function NewsSectionCard({ item }: NewsSectionCardProps) {
  const t = useTranslations("HomePage.newsSection");
  const newsSectionCardLabels = getNewsSectionCardLabels(t);

  return (
    <AppBorderRadius
      cornerRadius={16}
      borderWidth={1}
      borderColor={appColors.appNeutral[300]}
      classNameBorder={clsx("h-full bg-white")}
    >
      <article className="overflow-hidden">
        <div className="relative h-34 w-full xl:h-44">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 382px, (min-width: 768px) 33vw, 100vw"
          />
        </div>

        <div className="flex flex-col gap-5 px-4.75 py-5">
          <div className="flex flex-col gap-1">
            <p className="text-body-sm-medium text-app-neutral-400">{item.date}</p>
            <h3 className="text-body-lg-bold text-app-neutral-950">{item.title}</h3>
            <p className="text-body-sm-medium text-app-neutral-600">{item.description}</p>
          </div>

          <AppBorderRadius cornerRadius={50} classNameBorder={clsx("inline-flex")}>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "inline-flex w-fit items-center gap-2.5 bg-app-primary-25",
                "px-3 py-1 text-body-sm-semibold text-app-primary-550"
              )}
            >
              {newsSectionCardLabels.readMore}
              <ExternalLink />
            </Link>
          </AppBorderRadius>
        </div>
      </article>
    </AppBorderRadius>
  );
}
