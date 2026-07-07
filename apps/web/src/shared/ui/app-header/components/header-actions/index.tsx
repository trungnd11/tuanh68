"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import GlobalIcon from "@/assets/icons/global.svg";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getNextLocale, type AppLocale } from "@/i18n/routing";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import AppButton from "@/shared/ui/app-button";
import { scrollToPurchaseForm } from "@/shared/utils/scroll";
import { isCurrentDateInRange } from "@/shared/utils/date-util";

type HeaderActionsProps = {
  mobile?: boolean;
  onPurchaseClick?: () => void;
};

function HeaderLanguageButton({ mobile = false }: HeaderActionsProps) {
  const t = useTranslations("HomePage.header.actions");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  function handleSwitchLocale() {
    const nextLocale = getNextLocale(locale);
    const hash = typeof window === "undefined" ? "" : window.location.hash;

    router.replace(`${pathname}${hash}`, {
      locale: nextLocale,
      scroll: false,
    });
  }

  return (
    <AppButton
      aria-label={t("switchLocale")}
      disabledAnimation
      withProvider={(button) => (
        <AppBorderRadius cornerRadius={10} classNameBorder={clsx("inline-flex shrink-0 bg-app-neutral-900/15 p-px")}>
          {button}
        </AppBorderRadius>
      )}
      cornerRadius={10}
      className={clsx(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-app-neutral-800",
        mobile ? "h-9.5 px-2.25 text-body-base-medium" : "h-11.5 px-4 text-body-base-medium"
      )}
      borderRadiusProps={{
        asChild: true,
        classNameBorder: clsx("inline-flex shrink-0 bg-white"),
      }}
      onClick={handleSwitchLocale}
    >
      <GlobalIcon className="size-4" />
      <span className={clsx("inline-block xl:pl-0.75 xl:pr-[2.06px]")}>{locale.toUpperCase()}</span>
    </AppButton>
  );
}

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

  return (
    <div className="flex items-center gap-4">
      <HeaderLanguageButton />
      <HeaderPurchaseButton />
    </div>
  );
}

export { HeaderLanguageButton, HeaderPurchaseButton };
