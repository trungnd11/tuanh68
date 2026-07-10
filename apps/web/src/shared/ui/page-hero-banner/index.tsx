import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import Image from "next/image";
import AppBreadcrumb from "@/shared/ui/app-breadcrumb";
import AppContent from "@/shared/ui/app-content";

type PageHeroBreadcrumb = {
  home: string;
  homeHref: string;
  current: string;
};

type PageHeroBannerProps = {
  id?: string;
  backgroundImage: string;
  imageAlt: string;
  breadcrumb: PageHeroBreadcrumb;
  children: ReactNode;
  backgroundChildren?: ReactNode;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
  style?: CSSProperties;
};

export default function PageHeroBanner({
  id,
  backgroundImage,
  imageAlt,
  breadcrumb,
  children,
  backgroundChildren,
  className,
  contentClassName,
  imageClassName,
  style,
}: PageHeroBannerProps) {
  return (
    <section
      id={id}
      className={clsx("relative -mt-20.5 min-h-170 overflow-hidden pt-20 text-white", className)}
      style={style}
    >
      <div className={clsx("absolute inset-0 overflow-clip")}>
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          className={clsx("object-cover", imageClassName)}
          sizes="100vw"
        />
        {backgroundChildren}
      </div>

      <AppContent className={clsx("pt-3.75 grid gap-7", contentClassName)}>
        <AppBreadcrumb
          items={[
            { href: breadcrumb.homeHref, label: breadcrumb.home },
            { href: "#", label: breadcrumb.current },
          ]}
          className={clsx("relative h-fit self-start")}
        />

        {children}
      </AppContent>
    </section>
  );
}
