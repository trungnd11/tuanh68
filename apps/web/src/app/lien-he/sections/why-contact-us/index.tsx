import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { whyContactUsContent } from "./content";

function LightningIcon() {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0")}
    >
      <path d="M10.9 0L0 11.5H7.9L5.1 20L16 8H8.1L10.9 0Z" fill="#2973b2" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0")}
    >
      <path
        d="M18.5 2H14V0H4C2.9 0 2 0.9 2 2V12H0V14H2.55C2.22 14.58 2 15.26 2 16C2 17.66 3.34 19 5 19C6.66 19 8 17.66 8 16H15C15 17.66 16.34 19 18 19C19.66 19 21 17.66 21 16C21 15.26 20.78 14.58 20.45 14H22V7L18.5 2ZM5 17C4.45 17 4 16.55 4 16C4 15.45 4.45 15 5 15C5.55 15 6 15.45 6 16C6 16.55 5.55 17 5 17ZM7 12V4H12V12H7ZM18 17C17.45 17 17 16.55 17 16C17 15.45 17.45 15 18 15C18.55 15 19 15.45 19 16C19 16.55 18.55 17 18 17ZM16 12V5.5L19.5 12H16Z"
        fill="#48a6a7"
      />
    </svg>
  );
}

function DiscountIcon() {
  return (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0")}
    >
      <path
        d="M21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.9 2 2 2.9 2 4V11C2 11.55 2.22 12.05 2.59 12.41L11.59 21.41C11.95 21.77 12.45 22 13 22C13.55 22 14.05 21.77 14.41 21.41L21.41 14.41C21.77 14.05 22 13.55 22 13C22 12.45 21.77 11.95 21.41 11.58ZM6.5 8C5.67 8 5 7.33 5 6.5C5 5.67 5.67 5 6.5 5C7.33 5 8 5.67 8 6.5C8 7.33 7.33 8 6.5 8Z"
        fill="#7a9c59"
      />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0")}
    >
      <path d="M18 10H16V6L12 10H14V14L18 10ZM6 6V10H4V14L8 10H6V6ZM14 18H4V20H14V18ZM2 2V20H20V2H2Z" fill="#2973b2" />
    </svg>
  );
}

function CardIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "lightning":
      return <LightningIcon />;
    case "truck":
      return <TruckIcon />;
    case "discount":
      return <DiscountIcon />;
    case "factory":
      return <FactoryIcon />;
    default:
      return null;
  }
}

export default function WhyContactUsSection() {
  return (
    <section
      id={whyContactUsContent.id}
      className={clsx("border-t border-[#f3f4f6] bg-white px-14 pb-16 pt-[65px] max-lg:px-8")}
    >
      <div className={clsx("mx-auto max-w-[1216px]")}>
        <div className={clsx("flex gap-6 max-lg:flex-col")}>
          {whyContactUsContent.cards.map((card, i) => (
            <AppScrollReveal key={card.icon} variant="fade-in-up" delayMs={i * 100} className={clsx("flex flex-1")}>
              <div
                className={clsx(
                  "flex flex-1 flex-col items-center gap-[6.9px]",
                  "rounded-[16px] border border-[#f3f4f6] bg-[#f9fafb]",
                  "p-[25px] pb-[47.75px] pt-[25px]",
                  "shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                )}
              >
                <div
                  className={clsx("flex size-14 items-center justify-center rounded-full")}
                  style={{ background: card.iconBg }}
                >
                  <CardIcon icon={card.icon} />
                </div>
                <h4 className={clsx("pt-[9px] text-center text-base font-bold leading-6 text-[#333]")}>{card.title}</h4>
                <p className={clsx("text-center text-sm leading-[22.75px] text-[#6b7280]")}>
                  {card.description.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < card.description.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </AppScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
