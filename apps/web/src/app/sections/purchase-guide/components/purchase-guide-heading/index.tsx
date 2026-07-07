import { useTranslations } from "next-intl";
import AppPageTitle from "@/shared/ui/app-page-title";
import { getPurchaseGuideHeading } from "@/app/sections/purchase-guide/data";
import clsx from "clsx";

export default function PurchaseGuideHeading() {
  const t = useTranslations("HomePage.purchaseGuide");
  const purchaseGuideHeading = getPurchaseGuideHeading(t);

  return (
    <div
      className={clsx(
        "mx-auto flex max-w-210 flex-col",
        "items-start gap-3 px-4 xl:items-center xl:px-0 xl:text-center"
      )}
    >
      <AppPageTitle className={clsx("text-start xl:text-center")}>{purchaseGuideHeading.title}</AppPageTitle>
      <p className="text-body-base-medium text-app-neutral-600">{purchaseGuideHeading.description}</p>
    </div>
  );
}
