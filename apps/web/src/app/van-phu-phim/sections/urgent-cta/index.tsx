import clsx from "clsx";
import AppContainer from "@/shared/ui/app-container";
import UrgentCtaBackground from "./urgent-cta-background";
import UrgentCtaContactList from "./urgent-cta-contact-list";
import UrgentCtaFormCard from "./urgent-cta-form-card";
import UrgentCtaIntro from "./urgent-cta-intro";

export default function UrgentCtaSection() {
  return (
    <section className={clsx("relative overflow-hidden bg-app-brand-teal py-6 lg:py-20")}>
      <UrgentCtaBackground />

      <AppContainer className={clsx("relative z-10 flex max-w-5xl flex-col items-start gap-8 lg:gap-14")}>
        <div className={clsx("grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-12")}>
          <UrgentCtaIntro />
          <UrgentCtaFormCard />
        </div>

        <UrgentCtaContactList />
      </AppContainer>
    </section>
  );
}
