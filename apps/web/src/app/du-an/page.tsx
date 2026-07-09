import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import ProjectsBannerSection from "./sections/banner";
import FilterBarSection from "./sections/filter-bar";
import ProjectGridSection from "./sections/project-grid";
import StatsBarSection from "./sections/stats-bar";
import CtaBandSection from "./sections/cta-band";

export default function ProjectsPage() {
  return (
    <>
      <ProjectsBannerSection />
      <AppScrollReveal variant="fade-in-up" delayMs={100}>
        <FilterBarSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={200}>
        <ProjectGridSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={300}>
        <StatsBarSection />
      </AppScrollReveal>
      <AppScrollReveal variant="fade-in-up" delayMs={400}>
        <CtaBandSection />
      </AppScrollReveal>
    </>
  );
}
