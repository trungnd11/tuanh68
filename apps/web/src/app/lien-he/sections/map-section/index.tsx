import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { mapSectionContent } from "./content";

function NavigateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="#48a6a7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        d="M7.5 0C3.36 0 0 3.36 0 7.5C0 13.13 7.5 24 7.5 24C7.5 24 15 13.13 15 7.5C15 3.36 11.64 0 7.5 0ZM7.5 10.5C5.84 10.5 4.5 9.16 4.5 7.5C4.5 5.84 5.84 4.5 7.5 4.5C9.16 4.5 10.5 5.84 10.5 7.5C10.5 9.16 9.16 10.5 7.5 10.5Z"
        fill="#48a6a7"
      />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        d="M22 10V12L18 14V10L22 10ZM2 22V8L10 12V10L18 14V22H2ZM20 22V16L22 14V22H20ZM10 12V22H8V14L10 12ZM4 20H6V14H4V20ZM8 20H10V14L8 12V20ZM14 20H16V16L14 18V20Z"
        fill="#48a6a7"
      />
    </svg>
  );
}

function InfoIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "navigate":
      return <NavigateIcon />;
    case "pin":
      return <PinIcon />;
    case "factory":
      return <FactoryIcon />;
    default:
      return null;
  }
}

export default function MapSection() {
  return (
    <section id={mapSectionContent.id} className="bg-[#111827]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-8 pb-[72px] pt-16">
        <div className="flex flex-col items-center gap-3">
          <AppScrollReveal variant="fade-in-up">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-10 bg-app-brand-teal" />
              <span className="text-sm font-semibold uppercase tracking-[1.4px] text-app-brand-teal">
                {mapSectionContent.badge}
              </span>
              <div className="h-0.5 w-10 bg-app-brand-teal" />
            </div>
          </AppScrollReveal>
          <AppScrollReveal variant="fade-in-up" delayMs={50}>
            <h2 className="pt-1 text-center text-[36px] font-black uppercase leading-10 text-white">
              {mapSectionContent.heading}{" "}
              <span className="text-app-brand-teal">{mapSectionContent.headingHighlight}</span>
            </h2>
          </AppScrollReveal>
          <AppScrollReveal variant="fade-in-up" delayMs={100}>
            <p className="max-w-[512px] text-center text-sm leading-5 text-[#9ca3af]">
              {mapSectionContent.description[0]}
              <br />
              {mapSectionContent.description[1]}
            </p>
          </AppScrollReveal>
        </div>

        <div className="flex justify-center gap-4 max-lg:flex-col">
          {mapSectionContent.cards.map((card, i) => {
            const icons = ["navigate", "pin", "factory"];
            return (
              <AppScrollReveal key={card.label} variant="fade-in-up" delayMs={150 + i * 50}>
                <div className="flex items-center gap-4 rounded-[12px] border border-[#374151] bg-[#1f2937] px-[25px] py-[17px]">
                  <InfoIcon icon={icons[i]} />
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-xs font-normal uppercase tracking-[0.3px] text-[#9ca3af]">{card.label}</span>
                    <span className="text-sm font-bold leading-5 text-white">{card.value}</span>
                  </div>
                </div>
              </AppScrollReveal>
            );
          })}
        </div>
      </div>

      <div className="relative h-[420px] w-full overflow-clip">
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
          className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-[2px] bg-white px-3 pb-[9.3px] pt-2 text-sm text-[#1a73e8] shadow-[0px_1px_4px_-1px_rgba(0,0,0,0.3)] transition-opacity hover:opacity-90"
        >
          <span>Mở trong Maps</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
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
