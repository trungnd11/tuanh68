import BannerSection from "@/app/sections/banner";
import ProductsSection from "@/app/sections/products";
import PartnersSection from "@/app/sections/partners";
import QuoteFaqSection from "@/app/sections/quote-faq";
import NewsSection from "@/app/sections/news";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";

export default function HomePage() {
  return (
    <>
      <BannerSection />
      <ProductsSection />
      <AppScrollReveal variant="fade-in-up" delayMs={200}>
        <PartnersSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={300}>
        <QuoteFaqSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={400}>
        <NewsSection />
      </AppScrollReveal>
    </>
  );
}
