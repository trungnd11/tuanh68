import { useTranslations } from "next-intl";
import { getInvestorFaqHeading } from "@/app/sections/investor-faq/data";
import AppPageTitle from "@/shared/ui/app-page-title";
import AppPageSubTitle from "@/shared/ui/app-page-sub-title";

export default function InvestorFaqHeading() {
  const t = useTranslations("HomePage.investorFaq");
  const investorFaqHeading = getInvestorFaqHeading(t);

  return (
    <div className="mx-auto max-w-190 xl:text-center flex flex-col gap-2">
      <AppPageSubTitle>{investorFaqHeading.subTitle}</AppPageSubTitle>
      <AppPageTitle className="text-start xl:text-center">{investorFaqHeading.title}</AppPageTitle>
    </div>
  );
}
