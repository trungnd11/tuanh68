import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { aboutQualityContent } from "./content";

export default function AboutQualitySection() {
  return (
    <section className={clsx("bg-white py-[80px]")}>
      <div className={clsx("mx-auto flex max-w-[1280px] flex-col items-start gap-[24px] px-[32px]")}>
        <div className={clsx("flex w-full flex-col items-center gap-[16px]")}>
          <AppScrollReveal variant="fade-in-up">
            <div className={clsx("flex items-center gap-[12px]")}>
              <div className={clsx("h-[2px] w-[40px] bg-app-brand-teal")} />
              <span className={clsx("text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
                {aboutQualityContent.badge}
              </span>
              <div className={clsx("h-[2px] w-[40px] bg-app-brand-teal")} />
            </div>
          </AppScrollReveal>

          <AppScrollReveal variant="fade-in-up" delayMs={50}>
            <h2 className={clsx("text-center text-[36px] font-black uppercase text-[#333]")}>
              {aboutQualityContent.title.split(aboutQualityContent.titleHighlight)[0]}
              <span className={clsx("text-app-accent-blue")}>{aboutQualityContent.titleHighlight}</span>
            </h2>
          </AppScrollReveal>

          <AppScrollReveal variant="fade-in-up" delayMs={100}>
            <p className={clsx("max-w-[576px] text-center text-[16px] leading-[24px] text-[#6b7280]")}>
              {aboutQualityContent.description}
            </p>
          </AppScrollReveal>
        </div>

        <div className={clsx("flex w-full flex-wrap gap-[24px] pt-[40px] max-lg:flex-col")}>
          {aboutQualityContent.mainCards.map((card, i) => (
            <AppScrollReveal key={card.title} variant="fade-in-up" delayMs={i * 100} className={clsx("flex flex-1")}>
              <div
                className={clsx(
                  "flex flex-1 flex-col items-center gap-[11.1px] rounded-[16px] border",
                  "border-[#f3f4f6] bg-white px-[33px] py-[33px]"
                )}
                style={{
                  boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className={clsx("flex size-[64px] items-center justify-center rounded-full")}
                  style={{ backgroundColor: card.iconBg }}
                >
                  <img src={card.icon} alt="" className={clsx("size-[24px]")} />
                </div>
                <h3 className={clsx("pt-[12.9px] text-center text-[18px] font-bold leading-[28px] text-[#333]")}>
                  {card.title}
                </h3>
                <div className={clsx("pb-[0.875px] text-center text-[14px] leading-[22.75px] text-[#6b7280]")}>
                  {card.description.map((line, j) => (
                    <p key={j} className={clsx("m-0")}>
                      {line}
                    </p>
                  ))}
                </div>
                <p
                  className={clsx("pt-[4.9px] text-center text-[14px] font-bold leading-[20px]")}
                  style={{ color: card.tagColor }}
                >
                  {card.tag}
                </p>
              </div>
            </AppScrollReveal>
          ))}
        </div>

        <div className={clsx("flex w-full flex-wrap gap-[24px] max-lg:flex-col")}>
          {aboutQualityContent.extraCards.map((card, i) => (
            <AppScrollReveal
              key={card.title}
              variant="fade-in-up"
              delayMs={400 + i * 100}
              className={clsx("flex flex-1")}
            >
              <div
                className={clsx(
                  "flex h-full items-center gap-[20px] rounded-[16px] border",
                  "border-[#f3f4f6] bg-[#f9fafb] px-[25px] py-[35px]",
                  "drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                )}
              >
                <div
                  className={clsx("flex size-[48px] shrink-0 items-center justify-center rounded-full")}
                  style={{ backgroundColor: card.iconBg }}
                >
                  <img src={card.icon} alt="" className={clsx("size-[20px]")} />
                </div>
                <div className={clsx("flex flex-col gap-[4px]")}>
                  <h4 className={clsx("text-[16px] font-bold leading-[24px] text-[#333]")}>{card.title}</h4>
                  <p className={clsx("m-0 text-[14px] leading-[20px] text-[#6b7280]")}>{card.description}</p>
                </div>
              </div>
            </AppScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
