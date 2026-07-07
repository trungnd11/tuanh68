import clsx from "clsx";
import AppContent from "@/shared/ui/app-content";
import InvestorFaqHeading from "@/app/sections/investor-faq/components/investor-faq-heading";
import InvestorFaqAccordion from "@/app/sections/investor-faq/components/investor-faq-accordion";
import { appSectionIds } from "@/shared/config/app";

export default function InvestorFaqSection() {
  return (
    <section id={appSectionIds.investorFaq} className={clsx("bg-white py-10 xl:py-18")}>
      <AppContent className="flex flex-col gap-5 xl:gap-13 px-4 md:px-6 xl:px-0">
        <InvestorFaqHeading />
        <InvestorFaqAccordion />
      </AppContent>
    </section>
  );
}
