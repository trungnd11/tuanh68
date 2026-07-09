import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppButton from "@/shared/ui/app-button";
import { partnersContent } from "./content";

export default function PartnersSection() {
  return (
    <section id={partnersContent.id} className="border-t border-[#e5e7eb] bg-[#f9fafb] py-14 sm:py-16">
      <AppContainer>
        <div className="flex flex-col items-center gap-12">
          <AppSectionHeading showDivider={false}>{partnersContent.title}</AppSectionHeading>

          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
            {partnersContent.items.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-2 self-center justify-self-center p-4 opacity-60"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    style={{ width: partner.width, height: partner.height }}
                  />
                </div>
                <span className="text-center text-[14px] leading-[20px] font-bold text-[#333]">{partner.name}</span>
              </div>
            ))}
          </div>

          <AppButton href={partnersContent.ctaHref} variant="outline">
            {partnersContent.cta}
          </AppButton>
        </div>
      </AppContainer>
    </section>
  );
}
