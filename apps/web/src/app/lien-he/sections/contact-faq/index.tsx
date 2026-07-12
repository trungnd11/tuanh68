import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import clsx from "clsx";
import ContactForm from "./contact-form";
import InfoCards from "./info-cards";
import ContactFaqHeader from "./contact-faq-header";
import { contactFaqContent } from "./content";

export default function ContactFaqSection() {
  return (
    <section id={contactFaqContent.id} className={clsx("bg-[#f8f9fa] py-6 lg:py-20")}>
      <div className={clsx("mx-auto max-w-7xl px-4 lg:px-8")}>
        <div className={clsx("flex flex-col gap-10 lg:gap-14")}>
          <AppScrollReveal variant="fade-in-up">
            <ContactFaqHeader />
          </AppScrollReveal>

          <div className={clsx("flex flex-col gap-10 lg:grid lg:grid-cols-[3fr_2fr] lg:gap-x-10")}>
            <div className={clsx("min-w-0")}>
              <AppScrollReveal variant="fade-in-up" delayMs={150}>
                <ContactForm />
              </AppScrollReveal>
            </div>

            <div className={clsx("min-w-0 flex flex-col gap-5")}>
              <AppScrollReveal variant="fade-in-up" delayMs={200}>
                <InfoCards />
              </AppScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
