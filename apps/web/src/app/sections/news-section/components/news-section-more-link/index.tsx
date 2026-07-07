import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowRightOutlined from "@/assets/icons/arrow-right-outline.svg";
import { getNewsSectionMoreLink } from "@/app/sections/news-section/data";

export default function NewsSectionMoreLink() {
  const t = useTranslations("HomePage.newsSection");
  const newsSectionMoreLink = getNewsSectionMoreLink(t);

  return (
    <div className="flex justify-center">
      <Link
        href={newsSectionMoreLink.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 text-body-sm-semibold text-app-primary-550"
      >
        {newsSectionMoreLink.label}
        <ArrowRightOutlined />
      </Link>
    </div>
  );
}
