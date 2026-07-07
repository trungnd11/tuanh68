"use client";

import { useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import PlayIcon from "@/assets/icons/play.svg";
import AppContent from "@/shared/ui/app-content";
import AppButton from "@/shared/ui/app-button";
import PurchaseGuideHeading from "@/app/sections/purchase-guide/components/purchase-guide-heading";
import PurchaseGuideSteps from "@/app/sections/purchase-guide/components/purchase-guide-steps";
import PurchaseGuideSignupPanel from "@/app/sections/purchase-guide/components/purchase-guide-signup-panel";
import PurchaseGuideContactCards from "@/app/sections/purchase-guide/components/purchase-guide-contact-cards";
import PurchaseGuideGuideModal from "@/app/sections/purchase-guide/components/purchase-guide-guide-modal";
import { appSectionIds } from "@/shared/config/app";
import { isCurrentDateInRange } from "@/shared/utils/date-util";
import { getPurchaseGuideGuideButton } from "@/app/sections/purchase-guide/data";

export default function PurchaseGuideSection() {
  const tCountdown = useTranslations("HomePage.banner.countdown");
  const t = useTranslations("HomePage.purchaseGuide");
  const dateRangeLabel = tCountdown("dateRangeLabel");
  const isInRange = isCurrentDateInRange(dateRangeLabel);

  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const guideLabel = getPurchaseGuideGuideButton(t);

  if (!isInRange) return null;

  return (
    <section id={appSectionIds.purchaseGuide} className={clsx("bg-white py-10 xl:py-18")}>
      <AppContent className="flex flex-col gap-8 xl:gap-10 px-0!">
        <PurchaseGuideHeading />
        <PurchaseGuideSteps />
        <div className="flex flex-col -mt-6 xl:mt-0 gap-5 xl:gap-13 px-4 xl:px-0">
          <AppButton
            disabled={!isInRange}
            onClick={() => setGuideModalOpen(true)}
            cornerRadius={12}
            borderRadiusProps={{
              classNameContainer: clsx("drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]"),
            }}
            className={clsx(
              "bg-main-app-red flex h-12 items-center justify-center gap-3 px-10",
              "font-bold text-white xl:mx-auto w-full xl:w-max"
            )}
          >
            <PlayIcon />
            <span className="hidden xl:inline">{guideLabel}</span>
            <span className="xl:hidden">{t("heading.title")}</span>
          </AppButton>
          <div className="flex flex-col gap-4 xl:gap-6">
            <PurchaseGuideSignupPanel />
            <PurchaseGuideContactCards />
          </div>
        </div>
      </AppContent>
      <PurchaseGuideGuideModal open={guideModalOpen} onClose={() => setGuideModalOpen(false)} />
    </section>
  );
}
