"use client";

import clsx from "clsx";
import AboutInfrastructureHeader from "./about-infrastructure-header";
import AboutInfrastructureTimeline from "./about-infrastructure-timeline";

export default function AboutInfrastructureSection() {
  return (
    <section className={clsx("bg-app-neutral-900 py-6 lg:py-20")}>
      <div className={clsx("mx-auto flex max-w-7xl flex-col items-center gap-5 lg:gap-16", "px-4 lg:px-8")}>
        <AboutInfrastructureHeader />
        <AboutInfrastructureTimeline />
      </div>
    </section>
  );
}
