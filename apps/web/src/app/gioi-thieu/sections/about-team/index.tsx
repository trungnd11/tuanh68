import Image from "next/image";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { aboutTeamContent } from "./content";

export default function AboutTeamSection() {
  return (
    <section className="border-t border-[#e5e7eb] bg-[#f8f9fa] pb-[80px] pt-[81px]">
      <div className="mx-auto max-w-[1280px] px-[32px]">
        <div className="flex flex-col gap-[64px]">
          <div className="flex w-full flex-col items-center gap-[16px]">
            <AppScrollReveal variant="fade-in-up">
              <div className="flex items-center gap-[12px]">
                <div className="h-[2px] w-[40px] bg-app-brand-teal" />
                <span className="text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal">
                  {aboutTeamContent.badge}
                </span>
                <div className="h-[2px] w-[40px] bg-app-brand-teal" />
              </div>
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={50}>
              <h2 className="text-center text-[36px] font-black uppercase text-[#333]">
                {aboutTeamContent.title.split(aboutTeamContent.titleHighlight)[0]}
                <span className="text-app-accent-blue">{aboutTeamContent.titleHighlight}</span>
              </h2>
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={100}>
              <div className="max-w-[576px] text-center text-[16px] leading-[24px] text-[#6b7280]">
                {aboutTeamContent.description.map((line, i) => (
                  <p key={i} className="m-0">
                    {line}
                  </p>
                ))}
              </div>
            </AppScrollReveal>
          </div>

          <div className="flex gap-[32px] max-lg:flex-col">
            {aboutTeamContent.cards.map((card, i) => (
              <AppScrollReveal key={card.badge} variant="fade-in-up" delayMs={i * 100} className="flex flex-1">
                <div className="relative flex h-[380px] flex-1 overflow-clip rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[4px] p-[24px]">
                    <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-app-brand-teal">
                      {card.badge}
                    </span>
                    <div className="pt-[4px]">
                      <h3 className="text-[20px] font-bold leading-[28px] text-white">{card.title}</h3>
                    </div>
                    <p className="m-0 text-[14px] leading-[20px] text-[#d1d5db]">{card.description[0]}</p>
                  </div>
                </div>
              </AppScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
