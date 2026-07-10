import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import type { AppNewsCardProps } from "./types";

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
    <AppBorderRadius
      cornerRadius={12}
      classNameContainer={clsx(
        "flex",
        "drop-shadow-[0px_4px_6px_rgba(0,0,0,0.1)]",
        "drop-shadow-[0px_2px_4px_rgba(0,0,0,0.1)]"
      )}
    >
      <article className={clsx("h-full flex flex-1 flex-col overflow-clip", "bg-white", className)}>
        <div className={clsx("relative h-48 w-full shrink-0 overflow-clip")}>
          <Image src={src} alt={alt} fill className={clsx("object-cover")} />
          <span
            className={clsx(
              "absolute left-4 top-4 z-10",
              "rounded-[4px] px-3 py-1",
              "text-[12px] font-bold leading-4 text-white"
            )}
            style={{ backgroundColor: categoryBg }}
          >
            {category}
          </span>
        </div>
        <div className={clsx("flex min-h-0 flex-1 flex-col p-6")}>
          <h3 className={clsx("pb-2 text-lg font-bold leading-7 text-app-neutral-900")}>{title}</h3>
          <p className={clsx("mb-4 text-sm leading-5 text-app-neutral-600 line-clamp-3 max-h-[60px]")}>{description}</p>
          <Link
            href={href}
            className={clsx(
              "mt-auto inline-flex items-center gap-1 text-sm font-semibold",
              "leading-5 text-app-accent-blue transition-colors hover:opacity-80"
            )}
          >
            Xem Thêm
            <span className={clsx("flex shrink-0 flex-col pb-[2.5px] pt-[1.5px]")}>
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
    </AppBorderRadius>
  );
}
