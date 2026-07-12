import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import CtaBackground from "./cta-background";
import CtaHeader from "./cta-header";
import CtaActions from "./cta-actions";
import CtaContacts from "./cta-contacts";

export default function AppCtaSection() {
  return (
    <section className={clsx("relative overflow-clip bg-[#2973b2] px-4 py-6 lg:px-[272px] lg:py-[96px]")}>
      <CtaBackground />

      <div className={clsx("relative z-10 mx-auto flex max-w-[896px] flex-col items-center gap-6 lg:gap-8")}>
        <AppScrollReveal variant="fade-in-up">
          <CtaHeader />
        </AppScrollReveal>

        <AppScrollReveal variant="fade-in-up" delayMs={150}>
          <CtaActions />
        </AppScrollReveal>

        <CtaContacts />
      </div>
    </section>
  );
}
