import clsx from "clsx";

function NavigateIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0")}
    >
      <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="#48a6a7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="15"
      height="24"
      viewBox="0 0 15 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0")}
    >
      <path
        d="M7.5 0C3.36 0 0 3.36 0 7.5C0 13.13 7.5 24 7.5 24C7.5 24 15 13.13 15 7.5C15 3.36 11.64 0 7.5 0ZM7.5 10.5C5.84 10.5 4.5 9.16 4.5 7.5C4.5 5.84 5.84 4.5 7.5 4.5C9.16 4.5 10.5 5.84 10.5 7.5C10.5 9.16 9.16 10.5 7.5 10.5Z"
        fill="#48a6a7"
      />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0")}
    >
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

type Props = {
  cards: readonly { label: string; value: string }[];
};

export default function MapSectionInfoCards({ cards }: Props) {
  const icons = ["navigate", "pin", "factory"];

  return (
    <div className={clsx("flex justify-center gap-4 max-lg:flex-col")}>
      {cards.map((card, i) => (
        <div
          key={card.label}
          className={clsx(
            "flex items-center gap-4 rounded-[12px] border border-[#374151]",
            "bg-[#1f2937] px-[25px] py-[17px]"
          )}
        >
          <InfoIcon icon={icons[i]} />
          <div className={clsx("flex flex-col gap-[2px]")}>
            <div className={clsx("text-xs font-normal uppercase tracking-[0.3px] text-[#9ca3af]")}>{card.label}</div>
            <div className={clsx("text-sm font-bold leading-5 text-white")}>{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
