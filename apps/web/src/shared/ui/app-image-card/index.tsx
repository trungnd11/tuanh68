import Image from "next/image";
import type { ReactNode } from "react";
import clsx from "clsx";
import AppBorderRadius from "@/shared/ui/app-border-radius";

type AppImageCardProps = {
  src: string;
  alt: string;
  badge?: string;
  badgeClassName?: string;
  children?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  sizes?: string;
};

export default function AppImageCard({
  src,
  alt,
  badge,
  badgeClassName,
  children,
  title,
  description,
  className = "",
  titleClassName = clsx("text-lg leading-6 font-bold lg:text-xl lg:leading-7"),
  sizes = "(min-width: 1024px) 25vw, 100vw",
}: AppImageCardProps) {
  return (
    <AppBorderRadius cornerRadius={12} classNameContainer={clsx("h-full")} classNameBorder={clsx("h-full")}>
      <article className={clsx("group relative min-h-55 h-full overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className={clsx("object-cover transition-transform duration-500", "group-hover:scale-105")}
          sizes={sizes}
        />
        <div className={clsx("absolute inset-0", "bg-linear-to-t from-black/80 to-transparent")} />

        {badge && (
          <span
            className={clsx(
              "absolute left-3 top-3 z-10 rounded-sm bg-app-brand-teal px-3 py-1",
              "text-[12px] leading-4 font-bold text-white",
              badgeClassName
            )}
          >
            {badge}
          </span>
        )}

        {(children || title || description) && (
          <div className={clsx("absolute inset-x-0 bottom-0", "flex flex-col gap-1 p-4.5 sm:p-6")}>
            {title && <h3 className={clsx("text-white ", titleClassName)}>{title}</h3>}
            {description && <p className={clsx("text-sm leading-5 text-app-neutral-300")}>{description}</p>}
            {children}
          </div>
        )}
      </article>
    </AppBorderRadius>
  );
}
