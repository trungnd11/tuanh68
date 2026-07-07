"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import ArrowRight from "@/assets/icons/arrow-right-ipo.svg";
import QRCode from "@/assets/icons/qr-code.svg";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import AppButton from "@/shared/ui/app-button";
import { scrollToPurchaseForm } from "@/shared/utils/scroll";
import { isCurrentDateInRange } from "@/shared/utils/date-util";

export default function IpoRoadmapCta() {
  const t = useTranslations("HomePage.ipoRoadmap.cta");
  const tCountdown = useTranslations("HomePage.banner.countdown");
  const dateRangeLabel = tCountdown("dateRangeLabel");
  const isInRange = isCurrentDateInRange(dateRangeLabel);

  return (
    <AppBorderRadius
      asChild
      borderColor="rgba(0,132,74,0.50)"
      borderWidth={1}
      cornerRadius={16}
      classNameBorder={clsx(" h-full bg-app-primary-25")}
      classNameContainer={clsx("px-4 xl:px-0")}
    >
      <div className={clsx("flex flex-col gap-4 px-2.75 py-5.75 xl:px-7.75 xl:py-8.75")}>
        <div className={clsx("flex flex-col items-center xl:items-start gap-2")}>
          <h3 className="text-sm font-bold leading-5 text-app-neutral-950">{t("title")}</h3>
          <p className="text-lg font-semibold leading-5.5 text-app-primary-500">{t("description")}</p>
        </div>

        <div className="flex items-center gap-5">
          <AppButton
            cornerRadius={8}
            disabled={!isInRange}
            borderRadiusProps={{
              classNameContainer: clsx("flex-1 xl:flex-none", "drop-shadow-[0_1px_1px_rgba(87,87,87,0.50)]"),
            }}
            className={clsx("h-12 xl:h-13 w-full bg-main-app-yellow font-semibold text-base xl:w-55")}
            onClick={scrollToPurchaseForm}
          >
            {t("purchase")}
          </AppButton>

          {/*<div className="hidden items-center gap-3 text-app-neutral-900 xl:flex">*/}
          {/*  <div className="flex items-start">*/}
          {/*    <div className="flex flex-col text-sm leading-5">*/}
          {/*      <span className="text-app-neutral-500">{t("or")}</span>*/}
          {/*      <span className="font-bold">{t("scanQr")}</span>*/}
          {/*    </div>*/}

          {/*    <ArrowRight className={clsx("-ml-2.5 -mt-1")} />*/}
          {/*  </div>*/}

          {/*  <QRCode />*/}
          {/*</div>*/}
        </div>
      </div>
    </AppBorderRadius>
  );
}
