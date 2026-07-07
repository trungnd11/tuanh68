import clsx from "clsx";
import { useTranslations } from "next-intl";
import TrendUpIcon from "@/assets/icons/trend-up.svg";

export default function BannerBadge() {
  const t = useTranslations("HomePage.banner.badge");

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 text-body-sm-semibold text-main-app-yellow",
        "xl:h-10.5 xl:rounded-full xl:border xl:border-main-app-yellow/30",
        "xl:bg-main-app-yellow/20 xl:px-4 xl:py-2"
      )}
    >
      <TrendUpIcon className="size-4" />
      <span className={clsx("tracking-[0.5px]")}>{t("label")}</span>
    </div>
  );
}
