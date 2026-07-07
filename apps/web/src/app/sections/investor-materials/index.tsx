import clsx from "clsx";
import { getLocale, getTranslations } from "next-intl/server";
import AppContent from "@/shared/ui/app-content";
import InvestorMaterialsHeading from "@/app/sections/investor-materials/components/investor-materials-heading";
import InvestorMaterialsDocumentGrid from "@/app/sections/investor-materials/components/investor-materials-document-grid";
import { buildInvestorDocumentGroups } from "@/app/sections/investor-materials/data";
import { getInvestorServedDocuments } from "@/app/sections/investor-materials/server/documents";
import { appSectionIds } from "@/shared/config/app";

export default async function InvestorMaterialsSection() {
  const [t, locale, documents] = await Promise.all([
    getTranslations("HomePage.investorMaterials"),
    getLocale(),
    getInvestorServedDocuments(),
  ]);
  const investorDocumentGroups = buildInvestorDocumentGroups(t, documents, locale);

  return (
    <section id={appSectionIds.investorMaterials} className={clsx("bg-app-neutral-50 py-10 xl:py-16")}>
      <AppContent className="flex flex-col gap-6 xl:gap-13 px-4 md:px-6 xl:px-0">
        <InvestorMaterialsHeading />
        <InvestorMaterialsDocumentGrid investorDocumentGroups={investorDocumentGroups} />
      </AppContent>
    </section>
  );
}
