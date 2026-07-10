"use client";

import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { aboutInfrastructureContent } from "./content";

export default function AboutInfrastructureHeader() {
  return (
    <AppScrollReveal variant="fade-in-up">
      <div className={clsx("flex flex-col items-center gap-6")}>
        <div className={clsx("flex items-center gap-4")}>
          <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
          <span className={clsx("text-sm font-semibold uppercase tracking-[1.4px]", "text-app-brand-teal")}>
            {aboutInfrastructureContent.badge}
          </span>
          <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
        </div>

        <h2
          className={clsx(
            "text-center text-2xl lg:text-4xl font-black",
            "leading-8 lg:leading-10 uppercase text-white"
          )}
        >
          {aboutInfrastructureContent.title[0]}
        </h2>

        <p className={clsx("max-w-200 text-center", "text-sm lg:text-base leading-7 text-app-neutral-400")}>
          {aboutInfrastructureContent.description}
        </p>
      </div>
    </AppScrollReveal>
  );
}
