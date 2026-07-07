import BannerSection from "@/app/sections/banner";
import F88BreakthroughGrowthSection from "@/app/sections/f88-breakthrough-growth";
import F88JourneySection from "@/app/sections/f88-journey";
import F88MarketLeaderSection from "@/app/sections/f88-market-leader";
import F88OverviewSection from "@/app/sections/f88-overview";
import F88StrategicDirectionSection from "@/app/sections/f88-strategic-direction";
import InvestorFaqSection from "@/app/sections/investor-faq";
import InvestorMaterialsSection from "@/app/sections/investor-materials";
import IpoRoadmapSection from "@/app/sections/ipo-roadmap";
import NewsSection from "@/app/sections/news-section";
import OfferingInfoSection from "@/app/sections/offering-info";
import PurchaseGuideSection from "@/app/sections/purchase-guide";
import AppSectionNavigator from "@/shared/ui/app-section-navigator";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";

export default function HomePage() {
  return (
    <>
      <AppSectionNavigator />
      <AppScrollReveal variant="fade-in-up">
        <BannerSection />
        <OfferingInfoSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <IpoRoadmapSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <F88OverviewSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <F88JourneySection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <F88StrategicDirectionSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <F88MarketLeaderSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <F88BreakthroughGrowthSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <InvestorMaterialsSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <InvestorFaqSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <NewsSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up">
        <PurchaseGuideSection />
      </AppScrollReveal>
    </>
  );
}
