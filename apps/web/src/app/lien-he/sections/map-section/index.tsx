import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { mapSectionContent } from "./content";
import MapSectionHeader from "./map-section-header";
import MapSectionInfoCards from "./map-section-info-cards";

export default function MapSection() {
  return (
    <section id={mapSectionContent.id} className={clsx("bg-[#111827] py-6 lg:py-20")}>
      <div className={clsx("mx-auto flex max-w-7xl flex-col gap-10 px-4 lg:px-8")}>
        <AppScrollReveal variant="fade-in-up">
          <MapSectionHeader />
        </AppScrollReveal>

        <AppScrollReveal variant="fade-in-up" delayMs={150}>
          <MapSectionInfoCards cards={mapSectionContent.cards} />
        </AppScrollReveal>
      </div>

      <div className={clsx("relative mt-10 h-[300px] w-full overflow-clip lg:h-[420px]")}>
        <iframe
          src={mapSectionContent.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ Khu chế biến Lâm sản Liên Trung"
        />
        <a
          href={mapSectionContent.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-[2px]",
            "bg-white px-3 pb-[9.3px] pt-2 text-sm text-[#1a73e8]",
            "shadow-[0px_1px_4px_-1px_rgba(0,0,0,0.3)] transition-opacity",
            "hover:opacity-90"
          )}
        >
          Mở trong Maps
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("shrink-0")}
          >
            <path
              d="M14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14ZM19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19Z"
              fill="#1a73e8"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
