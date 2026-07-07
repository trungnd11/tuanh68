import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppPageTitle from "@/shared/ui/app-page-title";

export default function OfferingInfoHeading() {
  const t = useTranslations("HomePage.offeringInfo.heading");

  return (
    <div className={clsx("text-center")}>
      <div className={clsx("mx-auto flex max-w-200 flex-col justify-center gap-4")}>
        <AppPageTitle>{t("title")}</AppPageTitle>

        <p className={clsx("text-app-neutral-600")}>{t("description")}</p>
      </div>
    </div>
  );
}
