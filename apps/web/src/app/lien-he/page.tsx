import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import BannerSection from "./sections/banner";
import ContactFaqSection from "./sections/contact-faq";
import WhyContactUsSection from "./sections/why-contact-us";
import MapSection from "./sections/map-section";
import AppCtaSection from "@/shared/sections/app-cta-section";

export default function ContactPage() {
  return (
    <>
      <BannerSection />
      <AppScrollReveal variant="fade-in-up" delayMs={100}>
        <ContactFaqSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={200}>
        <WhyContactUsSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={300}>
        <MapSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={400}>
        <AppCtaSection />
      </AppScrollReveal>
    </>
  );
}
