import AppPageTitle from "@/shared/ui/app-page-title";
import { getInvestorMaterialsHeading } from "@/app/sections/investor-materials/data";
import { TextUtil } from "@/shared/utils/text-util";

export default function InvestorMaterialsHeading() {
  const investorMaterialsHeading = getInvestorMaterialsHeading();
  const wrappedTitle = investorMaterialsHeading.mobileBreakAfter
    ? TextUtil.wrapAfter(investorMaterialsHeading.title, [investorMaterialsHeading.mobileBreakAfter])
    : investorMaterialsHeading.title;
  const [mobileTitleLine1, mobileTitleLine2] = wrappedTitle.split("\n");

  return (
    <div className="flex flex-col items-start gap-3">
      <AppPageTitle className="text-start text-app-neutral-950 xl:text-center">
        {mobileTitleLine2 ? (
          <>
            {mobileTitleLine1}
            <br className="xl:hidden" />
            <span className="hidden xl:inline"> </span>
            {mobileTitleLine2}
          </>
        ) : (
          wrappedTitle
        )}
      </AppPageTitle>
      <p className="text-body-base-medium text-app-neutral-600">{investorMaterialsHeading.description}</p>
    </div>
  );
}
