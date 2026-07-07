import { useTranslations } from "next-intl";
import AppPageTitle from "@/shared/ui/app-page-title";
import { getNewsSectionHeading } from "@/app/sections/news-section/data";
import AppPageSubTitle from "@/shared/ui/app-page-sub-title";

export default function NewsSectionHeading() {
  const t = useTranslations("HomePage.newsSection");
  const newsSectionHeading = getNewsSectionHeading(t);

  return (
    <div className="mx-auto flex max-w-200 flex-col items-center gap-2 px-4 text-center xl:px-0">
      <AppPageSubTitle>{newsSectionHeading.eyebrow}</AppPageSubTitle>
      <AppPageTitle>{newsSectionHeading.title}</AppPageTitle>
      <p className="text-body-base-medium text-app-neutral-600">{newsSectionHeading.description}</p>
    </div>
  );
}
