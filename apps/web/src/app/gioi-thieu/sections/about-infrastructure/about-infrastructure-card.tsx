import clsx from "clsx";
import Image from "next/image";
import { aboutInfrastructureContent } from "./content";

function FactoryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 22V10L8 13V10L14 14V10L22 14V22H2Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 7V4C18 3.45 17.55 3 17 3H15C14.45 3 14 3.45 14 4V6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 14V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 15V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 15V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 15V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 22V19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 22H22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 6L10 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 6L11 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29L4.27 4.23C4.50054 3.99946 4.65519 3.70012 4.714 3.37572C4.77282 3.05133 4.73312 2.71676 4.6 2.41514C4.48572 2.1044 4.28059 1.83525 4.0113 1.64264C3.742 1.45003 3.42099 1.34281 3.09 1.33514H3C2.46957 1.33514 1.96086 1.12443 1.58579 0.749354C1.21071 0.374281 1 0.13443 1 0.33514"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 0.335144C0.999999 0.335144 0.999999 0.335144 1 0.335144C1 0.335144 1 0.335144 1 0.335144V0.335144Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarehouseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 22V8L12 3L22 8V22H2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 22V12H18V22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10 22V18C10 17.45 10.45 17 11 17H13C13.55 17 14 17.45 14 18V22"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 12H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 12H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 15H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 15H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 18H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 18H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 22H22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const iconComponents = [FactoryIcon, GearIcon, WarehouseIcon];

type InfrastructureCardProps = {
  card: (typeof aboutInfrastructureContent)["cards"][number];
  i: number;
};

export default function AboutInfrastructureCard({ card, i }: InfrastructureCardProps) {
  const IconComponent = iconComponents[i];
  return (
    <div className={clsx("group relative flex min-h-115 flex-col overflow-hidden rounded-xl")}>
      <Image
        src={card.image}
        alt={card.title}
        fill
        className={clsx("object-cover transition-transform duration-700 group-hover:scale-105")}
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      <div className={clsx("absolute inset-0 bg-linear-to-b from-black/90 via-black/40 to-black/10")} />

      <div className={clsx("relative z-10 flex flex-1 flex-col justify-between p-6")}>
        <div
          className={clsx("flex size-12 items-center justify-center rounded-full")}
          style={{ backgroundColor: card.iconBg }}
        >
          <IconComponent />
        </div>

        <div className={clsx("flex flex-col gap-4")}>
          <span className={clsx("text-xs font-semibold uppercase tracking-[1.2px]", "text-app-brand-teal")}>
            {card.number} / {card.label}
          </span>

          <h3 className={clsx("text-xl lg:text-2xl font-black leading-7 text-white")}>{card.title}</h3>

          <p className={clsx("text-sm leading-5.5 text-app-neutral-300")}>{card.description}</p>

          <div className={clsx("flex gap-3")}>
            {card.stats.map((stat) => (
              <div
                key={stat.label}
                className={clsx("flex flex-1 flex-col gap-1 rounded-lg", "bg-white/10 px-4 py-3 backdrop-blur-sm")}
              >
                <span className={clsx("text-xl font-black leading-6 text-white")}>
                  {stat.value}
                  {stat.unit && <span className={clsx("text-xs font-medium text-app-brand-teal")}> {stat.unit}</span>}
                </span>
                <span className={clsx("text-[11px] font-medium uppercase tracking-[0.55px]", "text-app-neutral-400")}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
