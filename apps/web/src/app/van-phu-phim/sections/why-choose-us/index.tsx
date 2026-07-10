import clsx from "clsx";
import AppContainer from "@/shared/ui/app-container";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import { whyChooseUsContent } from "./content";
import WhyChooseUsFeatureList from "./why-choose-us-feature-list";
import WhyChooseUsImagePanel from "./why-choose-us-image-panel";

export default function WhyChooseUsSection() {
  return (
    <section className={clsx("bg-white py-6 lg:py-20")}>
      <AppContainer className={clsx("grid items-center gap-8 lg:grid-cols-2 lg:gap-16 lg:px-8")}>
        <WhyChooseUsImagePanel />

        <div className={clsx("flex min-w-0 flex-col gap-4 lg:gap-5")}>
          <AppSectionBadge>{whyChooseUsContent.badge}</AppSectionBadge>
          <h2
            className={clsx(
              "w-full text-2xl font-black uppercase leading-8 text-[#333]",
              "sm:text-[28px] sm:leading-9 lg:text-4xl lg:leading-10"
            )}
          >
            {whyChooseUsContent.titleParts[0]}
            <span className={clsx("text-[#2973b2]")}>{whyChooseUsContent.titleParts[1]}</span>
          </h2>
          <WhyChooseUsFeatureList />
        </div>
      </AppContainer>
    </section>
  );
}
