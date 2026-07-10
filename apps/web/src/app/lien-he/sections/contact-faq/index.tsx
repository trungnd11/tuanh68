import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import clsx from "clsx";
import ContactForm from "./contact-form";
import InfoCards from "./info-cards";
import { contactFaqContent } from "./content";

export default function ContactFaqSection() {
  return (
    <section id={contactFaqContent.id} className={clsx("bg-[#f8f9fa] py-14 sm:py-20")}>
      <div className={clsx("mx-auto max-w-7xl px-8")}>
        <div className={clsx("flex flex-col gap-14")}>
          <div className={clsx("flex flex-col items-center gap-4")}>
            <AppScrollReveal variant="fade-in-up">
              <div className={clsx("flex items-center gap-3")}>
                <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
                <span className={clsx("text-sm font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
                  {contactFaqContent.badge}
                </span>
                <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
              </div>
            </AppScrollReveal>
            <AppScrollReveal variant="fade-in-up" delayMs={50}>
              <h2 className={clsx("text-center text-[36px] font-black uppercase leading-10 text-[#333]")}>
                {contactFaqContent.heading}{" "}
                <span className={clsx("text-app-accent-blue")}>{contactFaqContent.headingHighlight}</span>
              </h2>
            </AppScrollReveal>
            <AppScrollReveal variant="fade-in-up" delayMs={100}>
              <p className={clsx("max-w-xl text-center text-base leading-6 text-[#6b7280]")}>
                {contactFaqContent.subtitle[0]}
                <br />
                {contactFaqContent.subtitle[1]}
              </p>
            </AppScrollReveal>
          </div>

          <div className={clsx("grid gap-x-10 gap-y-10 lg:grid-cols-[3fr_2fr]")}>
            <AppScrollReveal variant="fade-in-up" delayMs={150}>
              <ContactForm />
            </AppScrollReveal>

            <div className={clsx("flex flex-col gap-5")}>
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
