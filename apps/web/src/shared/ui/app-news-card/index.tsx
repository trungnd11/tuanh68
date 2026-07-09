import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AppNewsCardProps = {
  src: string;
  alt: string;
  category: string;
  categoryBg: string;
  title: ReactNode;
  description: string;
  href?: string;
  className?: string;
};

export default function AppNewsCard({
  src,
  alt,
  category,
  categoryBg,
  title,
  description,
  href = "/tin-tuc",
  className = "",
}: AppNewsCardProps) {
  return (
    <article
      className={`flex flex-1 flex-col overflow-clip rounded-[12px] bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] ${className}`.trim()}
    >
      <div className="relative h-[192px] w-full shrink-0 overflow-clip">
        <Image src={src} alt={alt} fill className="object-cover" />
        <span
          className="absolute left-[16px] top-[16px] z-10 rounded-[4px] px-[12px] py-[4px] text-[12px] font-bold leading-[16px] text-white"
          style={{ backgroundColor: categoryBg }}
        >
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-[24px]">
        <h3 className="pb-[8px] text-[18px] font-bold leading-[28px] text-[#111827]">{title}</h3>
        <p className="pb-[16px] text-[14px] leading-[20px] text-[#4b5563]">{description}</p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-[4px] text-[14px] font-semibold leading-[20px] text-[#2973b2] transition-colors hover:opacity-80"
        >
          Xem Thêm
          <span className="flex shrink-0 flex-col pb-[2.5px] pt-[1.5px]">
            <svg width="10.5" height="12" viewBox="0 0 10.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.2797 6.52969C10.5727 6.23672 10.5727 5.76094 10.2797 5.46797L6.52969 1.71797C6.23672 1.425 5.76094 1.425 5.46797 1.71797C5.175 2.01094 5.175 2.48672 5.46797 2.77969L7.94063 5.25H0.75C0.335156 5.25 0 5.58516 0 6C0 6.41484 0.335156 6.75 0.75 6.75H7.93828L5.47031 9.22031C5.17734 9.51328 5.17734 9.98906 5.47031 10.282C5.76328 10.575 6.23906 10.575 6.53203 10.282L10.282 6.53203L10.2797 6.52969"
                fill="currentColor"
              />
            </svg>
          </span>
        </Link>
      </div>
    </article>
  );
}
