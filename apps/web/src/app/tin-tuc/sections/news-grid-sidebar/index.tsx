"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { newsGridContent, sidebarContent } from "./content";

function DateBadge({ day, month }: { day: string; month: string }) {
  return (
    <div
      className={clsx(
        "absolute right-4 top-4 z-10 flex flex-col items-center rounded-[8px]",
        "bg-app-accent-blue px-3 py-1.5",
        "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
      )}
    >
      <span className={clsx("text-[18px] font-black leading-[18px] text-white")}>{day}</span>
      <span className={clsx("text-[12px] font-semibold text-[#bfdbfe]")}>{month}</span>
    </div>
  );
}

function CategoryTag({ label, bgColor }: { label: string; bgColor: string }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-[6px] px-2.5 py-1 text-[12px] font-bold uppercase",
        "tracking-[0.6px] text-white"
      )}
      style={{ backgroundColor: bgColor }}
    >
      {label}
    </span>
  );
}

function NewsCard({
  image,
  alt,
  day,
  month,
  category,
  categoryBg,
  title,
  description,
  views,
}: (typeof newsGridContent.cards)[number]) {
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
        <h3 className={clsx("pb-3 text-[16px] font-black uppercase leading-[22px] text-[#333]")}>
          {title.map((line, i) => (
            <span key={line}>
              {line}
              {i < title.length - 1 && <br />}
            </span>
          ))}
        </h3>
        <p className={clsx("flex-1 text-[14px] leading-[22.75px] text-[#6b7280]")}>
          {description.map((line, i) => (
            <span key={line}>
              {line}
              {i < description.length - 1 && <br />}
            </span>
          ))}
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
            <span className={clsx("text-[12px] text-[#9ca3af]")}>{views}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function SidebarSearch() {
  return (
    <div
      className={clsx(
        "rounded-[16px] bg-white p-6",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <h4 className={clsx("mb-4 flex items-center gap-2 text-[14px] font-black uppercase", "text-[#333]")}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.375 5.6875C11.375 6.94258 10.9676 8.10195 10.2812 9.04258L13.743 12.507C14.0848 12.8488 14.0848 13.4039 13.743 13.7457C13.4012 14.0875 12.8461 14.0875 12.5043 13.7457L9.04258 10.2812C8.10195 10.9703 6.94258 11.375 5.6875 11.375C2.5457 11.375 0 8.8293 0 5.6875C0 2.5457 2.5457 0 5.6875 0C8.8293 0 11.375 2.5457 11.375 5.6875ZM5.6875 9.625C7.86067 9.625 9.625 7.86067 9.625 5.6875C9.625 3.51433 7.86067 1.75 5.6875 1.75C3.51433 1.75 1.75 3.51433 1.75 5.6875C1.75 7.86067 3.51433 9.625 5.6875 9.625Z"
            fill="#48A6A7"
          />
        </svg>
        {sidebarContent.search.heading}
      </h4>
      <div className={clsx("flex items-center gap-2")}>
        <input
          type="text"
          placeholder={sidebarContent.search.placeholder}
          className={clsx(
            "flex-1 rounded-[8px] border border-[#e5e7eb] px-4 py-2.5 text-[14px]",
            "text-[#6b7280] outline-none transition-colors placeholder:text-[#9ca3af]",
            "focus:border-app-brand-teal"
          )}
        />
        <button
          className={clsx(
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            "bg-app-accent-blue text-white"
          )}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.75 4.875C9.75 5.95078 9.40078 6.94453 8.8125 7.75078L11.7797 10.7203C12.0727 11.0133 12.0727 11.4891 11.7797 11.782C11.4867 12.075 11.0109 12.075 10.718 11.782L7.75078 8.8125C6.94453 9.40312 5.95078 9.75 4.875 9.75C2.18203 9.75 0 7.56797 0 4.875C0 2.18203 2.18203 0 4.875 0C7.56797 0 9.75 2.18203 9.75 4.875ZM4.875 8.25C6.73771 8.25 8.25 6.73771 8.25 4.875C8.25 3.01229 6.73771 1.5 4.875 1.5C3.01229 1.5 1.5 3.01229 1.5 4.875C1.5 6.73771 3.01229 8.25 4.875 8.25Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function CategoryIcon({ icon }: { icon: string }) {
  if (icon === "layers") {
    return (
      <svg width="13.5" height="12" viewBox="0 0 13.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.19922 0.121875C6.54844 -0.0398438 6.95156 -0.0398438 7.30078 0.121875L12.4242 2.48906C12.6234 2.58047 12.75 2.77969 12.75 3C12.75 3.22031 12.6234 3.41953 12.4242 3.51094L7.30078 5.87813C6.95156 6.03984 6.54844 6.03984 6.19922 5.87813L1.07578 3.51094C0.876563 3.41719 0.75 3.21797 0.75 3C0.75 2.78203 0.876563 2.58047 1.07578 2.48906L6.19922 0.121875ZM11.1773 4.9125L12.4242 5.48906C12.6234 5.58047 12.75 5.77969 12.75 6C12.75 6.22031 12.6234 6.41953 12.4242 6.51094L7.30078 8.87812C6.95156 9.03984 6.54844 9.03984 6.19922 8.87812L1.07578 6.51094C0.876563 6.41719 0.75 6.21797 0.75 6C0.75 5.78203 0.876563 5.58047 1.07578 5.48906L2.32266 4.9125L5.88516 6.55781C6.43359 6.81094 7.06641 6.81094 7.61484 6.55781L11.1773 4.9125Z"
          fill="#2973B2"
        />
      </svg>
    );
  }
  if (icon === "trend") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.5 1.5C1.5 1.08516 1.16484 0.75 0.75 0.75C0.335156 0.75 0 1.08516 0 1.5V9.375C0 10.4109 0.839062 11.25 1.875 11.25H11.25C11.6648 11.25 12 10.9148 12 10.5C12 10.0852 11.6648 9.75 11.25 9.75H1.875C1.66875 9.75 1.5 9.58125 1.5 9.375V1.5ZM11.0297 3.52969C11.3227 3.23672 11.3227 2.76094 11.0297 2.46797C10.7367 2.175 10.2609 2.175 9.96797 2.46797L7.5 4.93828L6.15469 3.59297C5.86172 3.3 5.38594 3.3 5.09297 3.59297L2.46797 6.21797C2.175 6.51094 2.175 6.98672 2.46797 7.27969C2.76094 7.57266 3.23672 7.57266 3.52969 7.27969L5.625 5.18672L6.97031 6.53203C7.26328 6.825 7.73906 6.825 8.03203 6.53203L11.032 3.53203L11.0297 3.52969Z"
          fill="#48A6A7"
        />
      </svg>
    );
  }
  if (icon === "tech") {
    return (
      <svg width="12" height="12" viewBox="0 0 12.0007 12.0003" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.84285 0.117469C1.6202 -0.0559683 1.30379 -0.0348745 1.10223 0.164344L0.164727 1.10184C-0.0344921 1.30106 -0.0555858 1.61747 0.115508 1.84247L1.99051 4.27997C2.09598 4.41825 2.26238 4.50028 2.43582 4.50028H3.70379L6.25848 7.05497C5.91395 7.73466 6.0241 8.58778 6.59363 9.15497L9.21863 11.78C9.5116 12.0729 9.98738 12.0729 10.2804 11.78L11.7804 10.28C12.0733 9.987 12.0733 9.51122 11.7804 9.21825L9.15535 6.59325C8.58816 6.02606 7.73504 5.91356 7.05535 6.25809L4.50066 3.70341V2.43778C4.50066 2.262 4.41863 2.09794 4.28035 1.99247L1.84285 0.117469ZM0.46707 9.28388C0.169414 9.58153 0.000664164 9.987 0.000664164 10.4089C0.000664164 11.2878 0.713164 12.0003 1.59207 12.0003C2.01395 12.0003 2.41941 11.8315 2.71707 11.5339L5.47801 8.77294C5.2952 8.28309 5.26707 7.75106 5.39363 7.24716L3.94754 5.80106L0.46707 9.28388ZM12.0007 3.37528C12.0007 3.12919 11.9749 2.89013 11.9257 2.66044C11.8694 2.39794 11.5483 2.32997 11.3585 2.51981L9.86082 4.01747C9.79051 4.08778 9.69441 4.12763 9.59598 4.12763H8.25066C8.04441 4.12763 7.87566 3.95888 7.87566 3.75263V2.40497C7.87566 2.30653 7.91551 2.21044 7.98582 2.14013L9.48348 0.642469C9.67332 0.452625 9.60535 0.131532 9.34285 0.0752817C9.11082 0.026063 8.87176 0.000281745 8.62566 0.000281745C6.76238 0.000281745 5.25066 1.512 5.25066 3.37528V3.39403L7.24988 5.39325C8.09363 5.17997 9.02645 5.40497 9.68738 6.06591L10.0554 6.43388C11.2038 5.89481 12.0007 4.72763 12.0007 3.37528Z"
          fill="#48A6A7"
        />
      </svg>
    );
  }
  if (icon === "calendar") {
    return (
      <svg width="10.5" height="12" viewBox="0 0 10.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 0C3.41484 0 3.75 0.335156 3.75 0.75V1.5H6.75V0.75C6.75 0.335156 7.08516 0 7.5 0C7.91484 0 8.25 0.335156 8.25 0.75V1.5H9.375C9.99609 1.5 10.5 2.00391 10.5 2.625V3.75H0V2.625C0 2.00391 0.503906 1.5 1.125 1.5H2.25V0.75C2.25 0.335156 2.58516 0 3 0ZM0 4.5H10.5V10.875C10.5 11.4961 9.99609 12 9.375 12H1.125C0.503906 12 0 11.4961 0 10.875V4.5Z"
          fill="#48A6A7"
        />
      </svg>
    );
  }
  return null;
}

function SidebarCategories() {
  return (
    <div
      className={clsx(
        "rounded-[16px] bg-white p-6",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <h4 className={clsx("mb-4 flex items-center gap-3 text-[14px] font-black uppercase", "text-[#333]")}>
        <div className={clsx("h-0.5 w-6 bg-app-brand-teal")} />
        {sidebarContent.categories.heading}
      </h4>
      <div className={clsx("flex flex-col gap-2")}>
        {sidebarContent.categories.items.map((item) => (
          <button
            key={item.label}
            className={clsx(
              "flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px]",
              "transition-colors",
              item.highlighted
                ? "bg-app-brand-teal/10 font-bold text-app-accent-blue"
                : "text-[#6b7280] hover:bg-gray-50"
            )}
          >
            <CategoryIcon icon={item.icon} />
            <span className={clsx("flex-1")}>{item.label}</span>
            <span
              className={clsx(
                "rounded-full px-2.5 py-0.5 text-[12px] ",
                item.highlighted ? "bg-app-accent-blue text-white" : "bg-[#f3f4f6] text-[#9ca3af]"
              )}
            >
              {item.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SidebarTrendingItem({
  image,
  alt,
  category,
  categoryBg,
  title,
  date,
}: (typeof sidebarContent.trending.items)[number]) {
  return (
    <Link href="#" className={clsx("group flex gap-3")}>
      <div className={clsx("size-[72px] shrink-0 overflow-clip rounded-[8px]")}>
        <Image
          src={image}
          alt={alt}
          width={72}
          height={72}
          className={clsx("size-full object-cover transition-transform duration-300", "group-hover:scale-105")}
        />
      </div>
      <div className={clsx("flex min-w-0 flex-1 flex-col justify-center gap-1")}>
        <span
          className={clsx(
            "inline-block w-fit rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
            "tracking-[0.5px] text-white"
          )}
          style={{ backgroundColor: categoryBg }}
        >
          {category}
        </span>
        <h5
          className={clsx(
            "text-[13px] font-bold leading-[18px] text-[#333] transition-colors",
            "group-hover:text-app-accent-blue"
          )}
        >
          {title.map((line, i) => (
            <span key={line}>
              {line}
              {i < title.length - 1 && <br />}
            </span>
          ))}
        </h5>
        <span className={clsx("text-[11px] text-[#9ca3af]")}>{date}</span>
      </div>
    </Link>
  );
}

function SidebarTrending() {
  return (
    <div
      className={clsx(
        "rounded-[16px] bg-white p-6",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <h4 className={clsx("mb-5 flex items-center gap-3 text-[14px] font-black uppercase", "text-[#333]")}>
        <div className={clsx("h-0.5 w-6 bg-app-brand-teal")} />
        {sidebarContent.trending.heading}
      </h4>
      <div className={clsx("flex flex-col gap-5")}>
        {sidebarContent.trending.items.map((item, i) => (
          <div key={i}>
            <SidebarTrendingItem {...item} />
            {i < sidebarContent.trending.items.length - 1 && <div className={clsx("mt-5 border-t border-[#f3f4f6]")} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarContactCta() {
  return (
    <div
      className={clsx(
        "relative overflow-clip rounded-[16px] bg-gradient-to-br from-[#2973b2]",
        "to-[#1a4f8a] p-6",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <div
        className={clsx("absolute -right-8 -top-8 size-32 rounded-full opacity-10")}
        style={{ background: "radial-gradient(circle, rgba(72,166,167,1) 0%, rgba(72,166,167,0) 100%)" }}
      />
      <div className={clsx("relative z-10 mb-4 flex size-12 items-center justify-center rounded-full", "bg-white/20")}>
        <svg width="22.5" height="20" viewBox="0 0 22.5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 1.25C1.80859 1.25 1.25 1.80859 1.25 2.5V11.875V13.75V16.875C1.25 17.9102 2.08984 18.75 3.125 18.75H19.375C20.4102 18.75 21.25 17.9102 21.25 16.875V11.875V5.94531C21.25 5.23438 20.4922 4.78516 19.8672 5.12109L13.75 8.41406V5.94531C13.75 5.23438 12.9922 4.78516 12.3672 5.12109L6.25 8.41406V2.5C6.25 1.80859 5.69141 1.25 5 1.25H2.5Z"
            fill="white"
          />
        </svg>
      </div>
      <h4 className={clsx("relative z-10 mb-2 text-[16px] font-black uppercase leading-[22px]", "text-white")}>
        {sidebarContent.contactCta.heading}
      </h4>
      <p className={clsx("relative z-10 mb-5 text-[12px] leading-[18px] text-[#bfdbfe]")}>
        {sidebarContent.contactCta.description[0]}
        <br />
        {sidebarContent.contactCta.description[1]}
      </p>
      <Link
        href="tel:0983570760"
        className={clsx(
          "relative z-10 flex items-center justify-center gap-2 w-full",
          "rounded-[8px] bg-app-brand-teal px-4 py-3 text-[14px] font-bold",
          "text-white transition-opacity hover:opacity-90"
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.65625 0.000616536C11.159 0.000616536 14 2.84163 14 6.34437C14 6.70804 13.7074 7.00062 13.3438 7.00062C12.9801 7.00062 12.6875 6.70804 12.6875 6.34437C12.6875 3.56624 10.4344 1.31312 7.65625 1.31312C7.29258 1.31312 7 1.02054 7 0.656867C7 0.293195 7.29258 0.000616536 7.65625 0.000616536ZM7.875 5.25062C8.35793 5.25062 8.75 5.64269 8.75 6.12562C8.75 6.60854 8.35793 7.00062 7.875 7.00062C7.39207 7.00062 7 6.60854 7 6.12562C7 5.64269 7.39207 5.25062 7.875 5.25062ZM7 3.28187C7 2.91819 7.29258 2.62562 7.65625 2.62562C9.70977 2.62562 11.375 4.29085 11.375 6.34437C11.375 6.70804 11.0824 7.00062 10.7188 7.00062C10.3551 7.00062 10.0625 6.70804 10.0625 6.34437C10.0625 5.01546 8.98516 3.93812 7.65625 3.93812C7.29258 3.93812 7 3.64554 7 3.28187Z"
            fill="white"
          />
        </svg>
        {sidebarContent.contactCta.phone}
      </Link>
    </div>
  );
}

export default function NewsGridSidebarSection() {
  return (
    <section className={clsx("bg-[#f8f9fa] pb-20 pt-10")}>
      <div className={clsx("mx-auto w-full max-w-[1280px] px-4 sm:px-6 xl:px-8")}>
        <div className={clsx("flex flex-col gap-10 lg:flex-row")}>
          <div className={clsx("min-w-px flex-1")}>
            <AppScrollReveal variant="fade-in-up">
              <div className={clsx("mb-8 flex items-center justify-between")}>
                <div className={clsx("flex items-center gap-3")}>
                  <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
                  <span className={clsx("text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
                    {newsGridContent.header.badge}
                  </span>
                </div>
                <span className={clsx("text-[12px] font-medium text-[#9ca3af]")}>{newsGridContent.header.showing}</span>
              </div>
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={50}>
              <div className={clsx("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3")}>
                {newsGridContent.cards.map((card) => (
                  <NewsCard key={card.title[0]} {...card} />
                ))}
              </div>
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={100}>
              <div className={clsx("flex justify-center pt-8")}>
                <button
                  className={clsx(
                    "flex items-center gap-2 rounded-[8px] border-2 border-app-accent-blue",
                    "px-[34px] py-4 text-[14px] font-bold uppercase text-app-accent-blue",
                    "transition-colors hover:bg-app-accent-blue hover:text-white"
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6738 6.125H12.9063C13.2699 6.125 13.5625 5.83242 13.5625 5.46875V1.96875C13.5625 1.70352 13.4039 1.46289 13.1578 1.36172C12.9117 1.26055 12.6301 1.31523 12.4414 1.50391L11.3039 2.64141C8.90859 0.276172 5.05039 0.284375 2.66875 2.66875C0.276172 5.06133 0.276172 8.93867 2.66875 11.3312C5.06133 13.7238 8.93867 13.7238 11.3313 11.3312C11.673 10.9895 11.673 10.4344 11.3313 10.0926C10.9895 9.75078 10.4344 9.75078 10.0926 10.0926C8.38359 11.8016 5.61367 11.8016 3.90469 10.0926C2.1957 8.38359 2.1957 5.61367 3.90469 3.90469C5.60547 2.20391 8.35352 2.1957 10.0652 3.87734L8.94141 5.00391C8.75273 5.19258 8.69805 5.47422 8.79922 5.72031C8.90039 5.96641 9.14102 6.125 9.40625 6.125H12.6738Z"
                      fill="#2973B2"
                    />
                  </svg>
                  {newsGridContent.loadMore}
                </button>
              </div>
            </AppScrollReveal>
          </div>

          <aside className={clsx("flex w-full flex-col gap-8 lg:w-[384px] lg:shrink-0")}>
            <AppScrollReveal variant="fade-in-up" delayMs={50}>
              <SidebarSearch />
            </AppScrollReveal>
            <AppScrollReveal variant="fade-in-up" delayMs={100}>
              <SidebarCategories />
            </AppScrollReveal>
            <AppScrollReveal variant="fade-in-up" delayMs={150}>
              <SidebarTrending />
            </AppScrollReveal>
            <AppScrollReveal variant="fade-in-up" delayMs={200}>
              <SidebarContactCta />
            </AppScrollReveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
