import clsx from "clsx";
import Image from "next/image";
import { whyChooseUsContent } from "./content";

export default function WhyChooseUsImagePanel() {
  return (
    <div className={clsx("relative flex min-w-0 flex-col items-start")}>
      <div
        className={clsx(
          "relative flex h-92 w-full flex-col items-start justify-center overflow-hidden rounded-2xl",
          "shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:h-110 lg:h-[520px]"
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
        <div
          className={clsx(
            "absolute inset-x-4 bottom-4 flex flex-col items-start sm:inset-x-6 sm:bottom-6 lg:inset-x-8 lg:bottom-8"
          )}
        >
          <div className={clsx("grid w-full grid-cols-3 gap-2 sm:gap-3")}>
            {whyChooseUsContent.stats.map((stat) => (
              <div
                key={stat.label}
                className={clsx(
                  "flex min-w-0 flex-col items-start gap-1 rounded-xl border",
                  "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.15)] p-3",
                  "backdrop-blur-[2px] sm:p-[17px]"
                )}
              >
                <span
                  className={clsx(
                    "w-full text-center text-lg font-black leading-7 text-white sm:text-2xl sm:leading-8"
                  )}
                >
                  {stat.value}
                </span>
                <span
                  className={clsx("w-full text-center text-[11px] font-medium leading-4 text-[#bfdbfe] sm:text-xs")}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "absolute -right-3 -top-3 flex size-20 flex-col items-center justify-center rounded-full",
          "bg-app-brand-teal shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:-right-5 sm:-top-5 sm:size-24 lg:-right-6 lg:-top-6 lg:size-28"
        )}
      >
        <span className={clsx("text-lg font-black leading-7 text-white sm:text-2xl sm:leading-8")}>
          {whyChooseUsContent.floatingBadge.label}
        </span>
        <span className={clsx("text-[10px] font-bold leading-4 text-[#dbeafe] sm:text-xs")}>
          {whyChooseUsContent.floatingBadge.subLabel}
        </span>
      </div>
    </div>
  );
}
