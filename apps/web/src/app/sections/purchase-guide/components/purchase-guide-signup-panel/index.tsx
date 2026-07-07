import clsx from "clsx";
import { useTranslations } from "next-intl";
import Recaptcha from "./recaptcha";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import PurchaseGuideSignupForm from "./purchase-guide-signup-form";
import CheckedCircleIcon from "@/assets/icons/checked-circle.svg";
import { appAnchorIds, appConfig } from "@/shared/config/app";
import { getPurchaseGuideSignup } from "@/app/sections/purchase-guide/data";

export default function PurchaseGuideSignupPanel() {
  const t = useTranslations("HomePage.purchaseGuide");
  const purchaseGuideSignup = getPurchaseGuideSignup(t);
  const recaptchaSiteKey = appConfig.reCaptchaSiteKey;
  const disableRecaptchaForPentest = appConfig.disableRecaptchaForPentest;

  return (
    <div id={appAnchorIds.purchaseGuideSignupPanel}>
      {disableRecaptchaForPentest ? null : <Recaptcha siteKey={recaptchaSiteKey} />}
      <AppBorderRadius cornerRadius={16}>
        <div className={clsx("bg-app-primary-500", "px-4 pt-7 pb-5 md:px-12 md:py-15 xl:px-12 xl:py-15")}>
          <div className="grid gap-6 xl:grid-cols-2 xl:justify-between xl:gap-10">
            <div className="min-w-0 flex flex-col gap-4 text-white xl:gap-5 xl:pt-3">
              <h3 className="text-heading-base-bold leading-7 xl:text-titlepage-sm-bold xl:leading-11">
                {purchaseGuideSignup.title}
              </h3>
              <p className="text-body-base-medium">{purchaseGuideSignup.description}</p>

              <div className="flex max-w-114 min-w-0 flex-col gap-1 xl:gap-2 xl:pt-4">
                {purchaseGuideSignup.highlights.map((highlight) => (
                  <div key={highlight} className="flex min-w-0 items-center gap-3">
                    <CheckedCircleIcon className="h-6 w-6 shrink-0 xl:h-8 xl:w-8" />
                    <span className="min-w-0 text-body-base-medium text-white xl:text-body-lg-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <PurchaseGuideSignupForm />
          </div>
        </div>
      </AppBorderRadius>
    </div>
  );
}
