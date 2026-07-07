import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function JourneyHeading() {
  const t = useTranslations("HomePage.f88Journey");

  return <h3 className={clsx("text-heading-base-bold px-4 xl:px-0 text-app-primary-500")}>{t("title")}</h3>;
}
