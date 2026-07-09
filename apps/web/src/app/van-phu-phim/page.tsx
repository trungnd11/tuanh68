import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import BannerSection from "./sections/banner";
import ProductsHeroSection from "./sections/products-hero";
import SpecificationTableSection from "./sections/specification-table";
import WhyChooseUsSection from "./sections/why-choose-us";
import ApplicationSection from "./sections/application";
import UrgentCtaSection from "./sections/urgent-cta";

export default function ProductsPage() {
  return (
    <>
      <BannerSection />
      <AppScrollReveal variant="fade-in-up" delayMs={100}>
        <ProductsHeroSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={200}>
        <SpecificationTableSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={300}>
        <WhyChooseUsSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={400}>
        <ApplicationSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={500}>
        <UrgentCtaSection />
      </AppScrollReveal>
    </>
  );
}
