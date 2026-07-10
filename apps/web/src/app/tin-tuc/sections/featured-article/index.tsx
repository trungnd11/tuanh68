"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import AppContainer from "@/shared/ui/app-container";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import { featuredArticleContent } from "./content";

export default function FeaturedArticleSection() {
  const { article } = featuredArticleContent;

  return (
    <section className={clsx("bg-white px-5 py-16 sm:px-8 lg:px-20")}>
      <AppContainer>
        <AppScrollReveal variant="fade-in-up">
          <AppSectionBadge centered className={clsx("pb-10")}>
            {featuredArticleContent.badge}
          </AppSectionBadge>
        </AppScrollReveal>

        <AppScrollReveal variant="fade-in-up" delayMs={100}>
          <div
            className={clsx(
              "grid grid-cols-1 overflow-clip rounded-[16px] border border-[#f3f4f6]",
              "bg-white",
              "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
              "lg:grid-cols-5"
            )}
          >
            <div className={clsx("relative lg:col-span-3")}>
              <div className={clsx("relative h-[300px] overflow-clip sm:h-[400px] lg:h-full lg:min-h-[728px]")}>
                <Image
                  src={article.backgroundImage}
                  alt={article.imageAlt}
                  fill
                  className={clsx("object-cover")}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className={clsx("absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(0,0,0,0.2)]")} />
              </div>

              <div className={clsx("absolute left-4 top-4 flex gap-2")}>
                <div
                  className={clsx(
                    "flex items-center gap-1 rounded-[6px] bg-app-brand-teal px-3 py-1.5",
                    "text-[12px] font-bold uppercase tracking-[1.2px] text-white",
                    "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  )}
                >
                  <svg width="13.5" height="12" viewBox="0 0 13.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.42734 0.421875C7.30313 0.164062 7.04062 0 6.75234 0C6.46406 0 6.20391 0.164062 6.07734 0.421875L4.57031 3.52266L1.20469 4.01953C0.923437 4.06172 0.689062 4.25859 0.602344 4.52812C0.515625 4.79766 0.585938 5.09531 0.7875 5.29453L3.22969 7.71094L2.65313 11.1258C2.60625 11.407 2.72344 11.693 2.95547 11.8594C3.1875 12.0258 3.49453 12.0469 3.74766 11.9133L6.75469 10.3078L9.76172 11.9133C10.0148 12.0469 10.3219 12.0281 10.5539 11.8594C10.7859 11.6906 10.9031 11.407 10.8562 11.1258L10.2773 7.71094L12.7195 5.29453C12.9211 5.09531 12.9938 4.79766 12.9047 4.52812C12.8156 4.25859 12.5836 4.06172 12.3023 4.01953L8.93437 3.52266L7.42734 0.421875Z"
                      fill="white"
                    />
                  </svg>
                  {article.featuredBadge}
                </div>
                <div
                  className={clsx(
                    "rounded-[6px] bg-app-accent-blue px-3 py-1.5 text-[12px] font-bold",
                    "uppercase tracking-[1.2px] text-white",
                    "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {article.featuredBadgeSub}
                </div>
              </div>
            </div>

            <div className={clsx("relative flex flex-col justify-between p-6 lg:col-span-2 lg:p-10")}>
              <div className={clsx("flex flex-col gap-4")}>
                <div className={clsx("flex items-center gap-3")}>
                  <span className={clsx("text-[12px] font-bold uppercase tracking-[1.2px] text-app-brand-teal")}>
                    {article.category}
                  </span>
                  <div className={clsx("size-1 shrink-0 rounded-full bg-[#d1d5db]")} />
                  <span className={clsx("text-[12px] text-[#9ca3af]")}>{article.readingTime}</span>
                </div>

                <h2
                  className={clsx(
                    "text-[26px] font-black uppercase leading-[32px] text-[#333]",
                    "sm:text-[30px] sm:leading-[36px]"
                  )}
                >
                  {article.title.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < article.title.length - 1 && <br />}
                    </span>
                  ))}
                </h2>

                <p className={clsx("text-[16px] leading-[24px] text-[#6b7280]")}>
                  {article.description.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < article.description.length - 1 && <br />}
                    </span>
                  ))}
                </p>

                <div className={clsx("flex flex-wrap items-center gap-x-4 gap-y-2 pt-1")}>
                  <div className={clsx("flex items-center gap-1.5")}>
                    <svg width="10.5" height="12" viewBox="0 0 10.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.25 6C3.59425 6 2.25 4.65575 2.25 3C2.25 1.34425 3.59425 0 5.25 0C6.90575 0 8.25 1.34425 8.25 3C8.25 4.65575 6.90575 6 5.25 6ZM4.90078 8.41875L4.46484 7.69219C4.31484 7.44141 4.49531 7.125 4.78594 7.125H5.25H5.71172C6.00234 7.125 6.18281 7.44375 6.03281 7.69219L5.59688 8.41875L6.37969 11.3227L7.22344 7.87969C7.27031 7.68984 7.45312 7.56563 7.64297 7.61484C9.28594 8.02734 10.5 9.51328 10.5 11.2805C10.5 11.6789 10.1766 12 9.78047 12H6.69141C6.64219 12 6.59766 11.9906 6.55547 11.9742L6.5625 12H3.9375L3.94453 11.9742C3.90234 11.9906 3.85547 12 3.80859 12H0.719531C0.323437 12 0 11.6766 0 11.2805C0 9.51094 1.21641 8.025 2.85703 7.61484C3.04688 7.56797 3.22969 7.69219 3.27656 7.87969L4.12031 11.3227L4.90312 8.41875H4.90078Z"
                        fill="#48A6A7"
                      />
                    </svg>
                    <span className={clsx("text-[12px] text-[#9ca3af]")}>{article.author}</span>
                  </div>
                  <div className={clsx("flex items-center gap-1.5")}>
                    <svg width="13.5" height="12" viewBox="0 0 13.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.75 0.75C4.85625 0.75 3.33984 1.6125 2.23594 2.63906C1.13906 3.65625 0.405469 4.875 0.0585938 5.71172C-0.01875 5.89687 -0.01875 6.10313 0.0585938 6.28828C0.405469 7.125 1.13906 8.34375 2.23594 9.36094C3.33984 10.3875 4.85625 11.25 6.75 11.25C8.64375 11.25 10.1602 10.3875 11.2641 9.36094C12.3609 8.34141 13.0945 7.125 13.4437 6.28828C13.5211 6.10313 13.5211 5.89687 13.4437 5.71172C13.0945 4.875 12.3609 3.65625 11.2641 2.63906C10.1602 1.6125 8.64375 0.75 6.75 0.75ZM3.375 6C3.375 4.13729 4.88729 2.625 6.75 2.625C8.61271 2.625 10.125 4.13729 10.125 6C10.125 7.86271 8.61271 9.375 6.75 9.375C4.88729 9.375 3.375 7.86271 3.375 6ZM6.75 4.5C6.75 5.32734 6.07734 6 5.25 6C5.08359 6 4.92422 5.97187 4.77422 5.92266C4.64531 5.88047 4.49531 5.96016 4.5 6.09609C4.50703 6.25781 4.53047 6.41953 4.575 6.58125C4.89609 7.78125 6.13125 8.49375 7.33125 8.17266C8.53125 7.85156 9.24375 6.61641 8.92266 5.41641C8.6625 4.44375 7.80234 3.78984 6.84609 3.75C6.71016 3.74531 6.63047 3.89297 6.67266 4.02422C6.72188 4.17422 6.75 4.33359 6.75 4.5Z"
                        fill="#48A6A7"
                      />
                    </svg>
                    <span className={clsx("text-[12px] text-[#9ca3af]")}>{article.views}</span>
                  </div>
                  <div className={clsx("flex items-center gap-1.5")}>
                    <svg width="10.5" height="12" viewBox="0 0 10.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.25 5.25C9.49219 5.25 10.5 4.24219 10.5 3C10.5 1.75781 9.49219 0.75 8.25 0.75C7.00781 0.75 6 1.75781 6 3C6 3.09375 6.00469 3.1875 6.01641 3.27891L3.81094 4.38047C3.40781 3.98906 2.85703 3.75 2.25 3.75C1.00781 3.75 0 4.75781 0 6C0 7.24219 1.00781 8.25 2.25 8.25C2.85703 8.25 3.40781 8.01094 3.81094 7.61953L6.01641 8.72109C6.00469 8.8125 6 8.90391 6 9C6 10.2422 7.00781 11.25 8.25 11.25C9.49219 11.25 10.5 10.2422 10.5 9C10.5 7.75781 9.49219 6.75 8.25 6.75C7.64297 6.75 7.09219 6.98906 6.68906 7.38047L4.48359 6.27891C4.49531 6.1875 4.5 6.09609 4.5 6C4.5 5.90391 4.49531 5.8125 4.48359 5.72109L6.68906 4.61953C7.09219 5.01094 7.64297 5.25 8.25 5.25Z"
                        fill="#48A6A7"
                      />
                    </svg>
                    <span className={clsx("text-[12px] text-[#9ca3af]")}>{article.shares}</span>
                  </div>
                </div>
              </div>

              <div className={clsx("mt-6 flex items-center justify-between border-t border-[#f3f4f6] pt-5")}>
                <Link
                  href="#"
                  className={clsx(
                    "flex items-center gap-2 text-[14px] font-bold uppercase",
                    "tracking-[0.35px] text-app-accent-blue"
                  )}
                >
                  ĐỌC BÀI VIẾT
                  <svg width="10.5" height="12" viewBox="0 0 10.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.2797 6.52969C10.5727 6.23672 10.5727 5.76094 10.2797 5.46797L6.52969 1.71797C6.23672 1.425 5.76094 1.425 5.46797 1.71797C5.175 2.01094 5.175 2.48672 5.46797 2.77969L7.94063 5.25H0.75C0.335156 5.25 0 5.58516 0 6C0 6.41484 0.335156 6.75 0.75 6.75H7.93828L5.47031 9.22031C5.17734 9.51328 5.17734 9.98906 5.47031 10.282C5.76328 10.575 6.23906 10.575 6.53203 10.282L10.282 6.53203L10.2797 6.52969"
                      fill="#2973B2"
                    />
                  </svg>
                </Link>

                <div className={clsx("flex items-center gap-2")}>
                  <div className={clsx("size-8 overflow-clip rounded-full border-2 border-app-brand-teal")}>
                    <Image
                      src={article.authorAvatar}
                      alt={article.authorName}
                      width={32}
                      height={32}
                      className={clsx("size-full object-cover")}
                    />
                  </div>
                  <span className={clsx("text-[12px] text-[#9ca3af]")}>{article.authorName}</span>
                </div>
              </div>

              <div
                className={clsx(
                  "absolute left-[-24px] top-1/2 hidden -translate-y-1/2 flex-col",
                  "items-center gap-0 rounded-[12px] bg-app-accent-blue px-0 pb-3 pt-4",
                  "shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] lg:flex"
                )}
              >
                <span className={clsx("text-[24px] font-black leading-[24px] text-white")}>{article.date.day}</span>
                <span className={clsx("pt-1 text-[12px] font-semibold uppercase tracking-[0.6px] text-[#bfdbfe]")}>
                  {article.date.month}
                </span>
                <span className={clsx("text-[12px] text-[#93c5fd]")}>{article.date.year}</span>
              </div>
            </div>
          </div>
        </AppScrollReveal>
      </AppContainer>
    </section>
  );
}
