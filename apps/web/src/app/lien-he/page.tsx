import BannerSection from "./sections/banner";
import ContactFaqSection from "./sections/contact-faq";
import WhyContactUsSection from "./sections/why-contact-us";
import MapSection from "./sections/map-section";
import AppCtaSection from "@/shared/sections/app-cta-section";

export default function ContactPage() {
  return (
    <>
      <BannerSection />
      <ContactFaqSection />
      <WhyContactUsSection />
      <MapSection />
      <AppCtaSection />
    </>
  );
}
