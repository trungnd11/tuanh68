import clsx from "clsx";
import Image from "next/image";
import { applicationContent } from "./content";
import { applicationIconMap } from "./application-icons";

type ApplicationCardData = (typeof applicationContent.cards)[number];

export default function ApplicationCard({ card }: { card: ApplicationCardData }) {
  return (
    <div
      className={clsx(
        "relative flex h-56 min-w-0 flex-col items-start justify-center overflow-hidden rounded-2xl",
        "sm:h-64"
      )}
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        className={clsx("object-cover")}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)]",
          "via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0)]"
        )}
      />
      <div className={clsx("absolute bottom-0 left-0 right-0 flex flex-col gap-1 p-4 sm:p-5")}>
        <div
          className={clsx("flex size-8 shrink-0 items-center justify-center rounded-lg")}
          style={{ background: card.iconBg }}
        >
          {applicationIconMap[card.icon]}
        </div>
        <h4 className={clsx("w-full pt-1 text-sm font-bold leading-5 text-white")}>{card.title}</h4>
        <p className={clsx("w-full text-xs font-normal leading-4 text-gray-400")}>{card.subtitle}</p>
      </div>
    </div>
  );
}
