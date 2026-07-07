import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppContent from "@/shared/ui/app-content";
import TextDescription from "@/app/sections/f88-overview/components/text-description";
import ImageDescription from "@/app/sections/f88-overview/components/image-description";
import { appSectionIds } from "@/shared/config/app";
import AppPageTitle from "@/shared/ui/app-page-title";

export default function F88OverviewSection() {
  const t = useTranslations("HomePage.f88Overview");

  return (
    <section id={appSectionIds.f88Overview} className={clsx("scroll-mt-27.5! pt-11 xl:pt-16 xl:scroll-mt-37.5!")}>
      <AppContent className={clsx("grid gap-6")}>
        <AppPageTitle className={clsx("text-start xl:hidden")}>{t("title")}</AppPageTitle>
        <div className={clsx("grid grid-cols-1 gap-6 xl:grid-cols-[675px_1fr] xl:gap-15")}>
          <TextDescription />
          <ImageDescription />
        </div>
      </AppContent>
    </section>
  );
}
