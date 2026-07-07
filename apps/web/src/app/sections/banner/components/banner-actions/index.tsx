"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { actions } from "./data";
import AppButton from "@/shared/ui/app-button";
import { scrollToPurchaseForm } from "@/shared/utils/scroll";
import { isCurrentDateInRange } from "@/shared/utils/date-util";

const actionButtonClassName = clsx(
  "inline-flex h-13 w-full items-center justify-center xl:h-16 xl:min-w-70",
  "px-6 text-base text-heading-sm-semibold xl:text-xl",
  "cursor-pointer"
);

export default function BannerActions() {
  const t = useTranslations("HomePage.banner.actions");
  const tCountdown = useTranslations("HomePage.banner.countdown");
  const dateRangeLabel = tCountdown("dateRangeLabel");
  const isInRange = isCurrentDateInRange(dateRangeLabel);

  const handleActionClick = (labelKey: string) => {
    if (labelKey !== "purchase") {
      return;
    }

    scrollToPurchaseForm();
  };

  return (
    <div className={clsx("mt-9 flex flex-col justify-between gap-3 xl:mt-12 xl:flex-row xl:gap-5")}>
      {actions.map((action) => (
        <AppButton
          key={action.labelKey}
          onClick={() => handleActionClick(action.labelKey)}
          disabled={!isInRange}
          cornerRadius={12}
          className={clsx(actionButtonClassName, action.className)}
          borderRadiusProps={{
            classNameContainer: clsx("inline-flex flex-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"),
          }}
        >
          {action.icon}
          <span>{t(action.labelKey)}</span>
        </AppButton>
      ))}
    </div>
  );
}
