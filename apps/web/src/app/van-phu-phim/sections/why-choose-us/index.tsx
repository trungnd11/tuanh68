import clsx from "clsx";
import Image from "next/image";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import AppFeatureCard from "@/shared/ui/app-feature-card";
import IconFactory from "@/assets/icons/icon-factory.svg";
import IconFilmShield from "@/assets/icons/icon-film-shield.svg";
import IconQualityShield from "@/assets/icons/icon-quality-shield.svg";
import IconTruck from "@/assets/icons/icon-truck.svg";
import IconSupport247 from "@/assets/icons/icon-support-247.svg";
import { whyChooseUsContent } from "./content";

const iconMap = {
  factory: IconFactory,
  shield: IconFilmShield,
  reuse: IconQualityShield,
  truck: IconTruck,
  support: IconSupport247,
} as const;

export default function WhyChooseUsSection() {
  return (
    <section className={clsx("flex flex-col items-start bg-white py-20 max-md:py-12")}>
      <div
        className={clsx("mx-auto flex w-full max-w-7xl items-center gap-16 px-[112px]", "max-lg:flex-col max-lg:px-8")}
      >
        <div className={clsx("relative flex min-w-px flex-1 flex-col items-start")}>
          <div
            className={clsx(
              "relative flex h-[520px] w-full flex-col items-start justify-center",
              "overflow-hidden rounded-2xl",
              "shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
            )}
          >
            <Image
              src={whyChooseUsContent.image}
              alt="Công nhân thi công ván phủ phim tại công trình"
              fill
              className={clsx("object-cover")}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div
              className={clsx(
                "absolute inset-0 bg-gradient-to-t from-[rgba(41,115,178,0.8)]",
                "via-[rgba(41,115,178,0)] to-[rgba(41,115,178,0)]"
              )}
            />
            <div className={clsx("absolute bottom-8 left-8 right-8 flex flex-col items-start")}>
              <div className={clsx("flex w-full items-start justify-center gap-3")}>
                {whyChooseUsContent.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={clsx(
                      "flex w-[162px] flex-col items-start gap-1 rounded-xl border",
                      "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.15)] p-[17px]",
                      "backdrop-blur-[2px]"
                    )}
                  >
                    <span className={clsx("w-full text-center text-2xl font-black leading-8 text-white")}>
                      {stat.value}
                    </span>
                    <span className={clsx("w-full text-center text-xs font-medium leading-4 text-[#bfdbfe]")}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={clsx(
              "absolute -right-6 -top-6 flex size-28 flex-col items-center",
              "justify-center rounded-full bg-app-brand-teal",
              "shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
            )}
          >
            <span className={clsx("text-2xl font-black leading-8 text-white")}>
              {whyChooseUsContent.floatingBadge.label}
            </span>
            <span className={clsx("text-xs font-bold leading-4 text-[#dbeafe]")}>
              {whyChooseUsContent.floatingBadge.subLabel}
            </span>
          </div>
        </div>

        <div className={clsx("flex min-w-px flex-1 flex-col gap-5")}>
          <AppSectionBadge>{whyChooseUsContent.badge}</AppSectionBadge>
          <h2
            className={clsx(
              "w-full text-4xl font-black uppercase leading-10 text-[#333]",
              "max-md:text-[28px] max-md:leading-9"
            )}
          >
            {whyChooseUsContent.titleParts[0]}
            <span className={clsx("text-[#2973b2]")}>{whyChooseUsContent.titleParts[1]}</span>
          </h2>
          <div className={clsx("flex w-full flex-col gap-4 pt-3")}>
            {whyChooseUsContent.features.map((feature) => {
              const IconComp = iconMap[feature.icon];
              return (
                <AppFeatureCard
                  key={feature.title}
                  icon={<IconComp className={clsx("text-[#2973b2]")} />}
                  iconBg={feature.iconBg}
                  title={feature.title}
                  description={feature.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
