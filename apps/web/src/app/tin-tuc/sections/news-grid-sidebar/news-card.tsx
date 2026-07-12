import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { newsGridContent } from "./content";

type CardData = (typeof newsGridContent.cards)[number];

function DateBadge({ day, month }: { day: string; month: string }) {
  return (
    <div
      className={clsx(
        "absolute right-4 top-4 z-10 flex flex-col items-center rounded-[8px]",
        "bg-app-accent-blue px-3 py-1.5",
        "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className={clsx("text-[18px] font-black leading-[18px] text-white")}>{day}</div>
      <div className={clsx("text-[12px] font-semibold text-[#bfdbfe]")}>{month}</div>
    </div>
  );
}

function CategoryTag({ label, bgColor }: { label: string; bgColor: string }) {
  return (
    <div
      className={clsx(
        "inline-block rounded-[6px] px-2.5 py-1 text-[12px] font-bold uppercase",
        "tracking-[0.6px] text-white"
      )}
      style={{ backgroundColor: bgColor }}
    >
      {label}
    </div>
  );
}

export default function NewsCard(props: CardData) {
  const { image, alt, day, month, category, categoryBg, title, description, views } = props;

  return (
    <article
      className={clsx(
        "flex flex-col overflow-clip rounded-[16px] border border-[#f3f4f6]",
        "bg-white",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className={clsx("relative h-[192px] w-full shrink-0 overflow-clip")}>
        <Image
          src={image}
          alt={alt}
          fill
          className={clsx("object-cover")}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={clsx("absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent")} />
        <DateBadge day={day} month={month} />
        <div className={clsx("absolute bottom-[15px] left-4 z-10")}>
          <CategoryTag label={category} bgColor={categoryBg} />
        </div>
      </div>
      <div className={clsx("flex flex-1 flex-col p-6")}>
        <h3 className={clsx("pb-3 text-[16px] font-black uppercase leading-[22px] text-[#333]")}>{title.join(" ")}</h3>
        <p className={clsx("flex-1 text-[14px] leading-[22.75px] text-[#6b7280] line-clamp-3")}>
          {description.join(" ")}
        </p>
        <div className={clsx("mt-auto flex items-center justify-between border-t border-[#f3f4f6] pt-4")}>
          <Link
            href="#"
            className={clsx(
              "flex items-center gap-1.5 text-[12px] font-bold uppercase",
              "tracking-[0.3px] text-app-accent-blue"
            )}
          >
            XEM THÊM
            <svg width="10.5" height="12" viewBox="0 0 10.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.2797 6.52969C10.5727 6.23672 10.5727 5.76094 10.2797 5.46797L6.52969 1.71797C6.23672 1.425 5.76094 1.425 5.46797 1.71797C5.175 2.01094 5.175 2.48672 5.46797 2.77969L7.94063 5.25H0.75C0.335156 5.25 0 5.58516 0 6C0 6.41484 0.335156 6.75 0.75 6.75H7.93828L5.47031 9.22031C5.17734 9.51328 5.17734 9.98906 5.47031 10.282C5.76328 10.575 6.23906 10.575 6.53203 10.282L10.282 6.53203L10.2797 6.52969"
                fill="#2973B2"
              />
            </svg>
          </Link>
          <div className={clsx("flex items-center gap-1")}>
            <svg width="13.5" height="12" viewBox="0 0 13.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.75 0.75C4.85625 0.75 3.33984 1.6125 2.23594 2.63906C1.13906 3.65625 0.405469 4.875 0.0585938 5.71172C-0.01875 5.89687 -0.01875 6.10313 0.0585938 6.28828C0.405469 7.125 1.13906 8.34375 2.23594 9.36094C3.33984 10.3875 4.85625 11.25 6.75 11.25C8.64375 11.25 10.1602 10.3875 11.2641 9.36094C12.3609 8.34141 13.0945 7.125 13.4437 6.28828C13.5211 6.10313 13.5211 5.89687 13.4437 5.71172C13.0945 4.875 12.3609 3.65625 11.2641 2.63906C10.1602 1.6125 8.64375 0.75 6.75 0.75ZM3.375 6C3.375 4.13729 4.88729 2.625 6.75 2.625C8.61271 2.625 10.125 4.13729 10.125 6C10.125 7.86271 8.61271 9.375 6.75 9.375C4.88729 9.375 3.375 7.86271 3.375 6ZM6.75 4.5C6.75 5.32734 6.07734 6 5.25 6C5.08359 6 4.92422 5.97187 4.77422 5.92266C4.64531 5.88047 4.49531 5.96016 4.5 6.09609C4.50703 6.25781 4.53047 6.41953 4.575 6.58125C4.89609 7.78125 6.13125 8.49375 7.33125 8.17266C8.53125 7.85156 9.24375 6.61641 8.92266 5.41641C8.6625 4.44375 7.80234 3.78984 6.84609 3.75C6.71016 3.74531 6.63047 3.89297 6.67266 4.02422C6.72188 4.17422 6.75 4.33359 6.75 4.5Z"
                fill="#48A6A7"
              />
            </svg>
            <div className={clsx("text-[12px] text-[#9ca3af]")}>{views}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
