"use client";

import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import NewsletterHeader from "./newsletter-header";
import NewsletterForm from "./newsletter-form";

export default function NewsletterSection() {
  return (
    <section className={clsx("border-t border-[#1f2937] bg-[#111827] px-4 py-6 lg:px-28 lg:pb-16 lg:pt-[65px]")}>
      <div className={clsx("mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 lg:flex-row lg:gap-10")}>
        <AppScrollReveal variant="fade-in-up">
          <NewsletterHeader />
        </AppScrollReveal>

        <AppScrollReveal variant="fade-in-up" delayMs={100}>
          <NewsletterForm />
        </AppScrollReveal>
      </div>
    </section>
  );
}
