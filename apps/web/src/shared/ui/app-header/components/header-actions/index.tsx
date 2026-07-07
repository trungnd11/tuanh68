"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppButton from "@/shared/ui/app-button";
import { scrollToPurchaseForm } from "@/shared/utils/scroll";
import { isCurrentDateInRange } from "@/shared/utils/date-util";

type HeaderActionsProps = {
  mobile?: boolean;
  onPurchaseClick?: () => void;
};

function HeaderPurchaseButton({ mobile = false, onPurchaseClick }: HeaderActionsProps) {
  const t = useTranslations("HomePage.header.actions");
  const tCountdown = useTranslations("HomePage.banner.countdown");
  const dateRangeLabel = tCountdown("dateRangeLabel");
  const isInRange = isCurrentDateInRange(dateRangeLabel);

  return (
    <AppButton
      disabled={!isInRange}
      cornerRadius={mobile ? 7 : 8}
      className={clsx(
        "tracking-[-0.15px] inline-flex items-center justify-center text-white",
        mobile ? "h-10 w-full px-4 text-body-sm-semibold" : "h-12 px-5.5 text-body-base-semibold"
      )}
      borderRadiusProps={{
        classNameContainer: clsx("inline-flex drop-shadow-[0_1px_0.5px_rgba(2,49,25,1)]"),
        classNameBorder: clsx("inline-flex bg-app-primary-500"),
      }}
      onClick={onPurchaseClick ?? scrollToPurchaseForm}
    >
      {t("purchase")}
    </AppButton>
  );
}

export default function HeaderActions({ mobile = false, onPurchaseClick }: HeaderActionsProps) {
  if (mobile) {
    return <HeaderPurchaseButton mobile onPurchaseClick={onPurchaseClick} />;
  }

  return <HeaderPurchaseButton />;
}

export { HeaderPurchaseButton };
