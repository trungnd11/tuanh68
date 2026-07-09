import Image from "next/image";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import IconColumnBeam from "@/assets/icons/icon-column-beam.svg";
import IconFloorSlab from "@/assets/icons/icon-floor-slab.svg";
import IconHighRise from "@/assets/icons/icon-high-rise.svg";
import IconBridge from "@/assets/icons/icon-bridge.svg";
import { applicationContent } from "./content";

const iconMap = {
  "column-beam": <IconColumnBeam className="text-white" />,
  "floor-slab": <IconFloorSlab className="text-white" />,
  "high-rise": <IconHighRise className="text-white" />,
  bridge: <IconBridge className="text-white" />,
} as const;

export default function ApplicationSection() {
  return (
    <section className="flex flex-col items-start bg-[#111827] py-20 max-md:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-14 px-8 max-md:px-4">
        <div className="flex w-full flex-col items-center gap-4">
          <AppSectionBadge centered>{applicationContent.badge}</AppSectionBadge>
          <h2 className="w-full text-center text-4xl font-black uppercase leading-10 text-white max-md:text-[28px] max-md:leading-9">
            {applicationContent.titleParts[0]}
            <span className="text-app-brand-teal">{applicationContent.titleParts[1]}</span>
          </h2>
          <p className="w-full max-w-[576px] text-center text-sm font-normal leading-5 text-gray-400">
            {applicationContent.description}
          </p>
        </div>

        <div className="flex w-full items-start justify-center gap-4 max-md:flex-wrap">
          {applicationContent.cards.map((card) => (
            <div
              key={card.title}
              className="relative flex h-64 min-w-px flex-1 flex-col items-start justify-center overflow-hidden rounded-2xl"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0)]" />
              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 p-5">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: card.iconBg }}
                >
                  {iconMap[card.icon as keyof typeof iconMap]}
                </div>
                <h4 className="w-full pt-1 text-sm font-bold leading-5 text-white">{card.title}</h4>
                <p className="w-full text-xs font-normal leading-4 text-gray-400">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
