import clsx from "clsx";
import { useTranslations } from "next-intl";
import { twc } from "react-twc";
import PlayIcon from "@/assets/icons/play.svg";
import { f88OverviewParagraphKeys } from "@/app/sections/f88-overview/content";
import AppButton from "@/shared/ui/app-button";
import AppPageTitle from "@/shared/ui/app-page-title";
import { isCurrentDateInRange } from "@/shared/utils/date-util";

const ParagraphStyle = twc.p`text-main-app-text-body`;

export default function TextDescription() {
  const t = useTranslations("HomePage.f88Overview");
  const tCountdown = useTranslations("HomePage.banner.countdown");
  const dateRangeLabel = tCountdown("dateRangeLabel");
  const isInRange = isCurrentDateInRange(dateRangeLabel);

  return (
    <div className={clsx("order-2 flex flex-col gap-6 xl:order-1 xl:gap-8")}>
      <AppPageTitle className={clsx("hidden text-start xl:block")}>{t("title")}</AppPageTitle>
      <div className={clsx("flex flex-col gap-5")}>
        {f88OverviewParagraphKeys.map((paragraphKey) => (
          <ParagraphStyle key={paragraphKey}>{t(paragraphKey)}</ParagraphStyle>
        ))}
      </div>
      <AppButton
        disabled={!isInRange}
        borderRadiusProps={{
          classNameContainer: clsx("xl:flex-1 drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]"),
        }}
        className={clsx(
          "bg-main-app-red flex h-13 w-full items-center justify-center gap-3 text-white xl:min-w-55 xl:w-max",
          "font-bold"
        )}
      >
        <PlayIcon />
        <span>{t("roadshow")}</span>
      </AppButton>
    </div>
  );
}
