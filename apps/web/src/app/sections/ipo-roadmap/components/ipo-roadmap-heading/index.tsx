import { useTranslations } from "next-intl";
import AppPageTitle from "@/shared/ui/app-page-title";

export default function IpoRoadmapHeading() {
  const t = useTranslations("HomePage.ipoRoadmap");

  return <AppPageTitle>{t("title")}</AppPageTitle>;
}
