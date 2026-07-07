import clsx from "clsx";
import type { AppPageTitleProps } from "@/shared/ui/app-page-title/types";

export default function AppPageTitle({ children, style, className }: AppPageTitleProps) {
  return (
    <h2
      className={clsx(
        "text-center text-[32px] xl:text-[40px] text-titlepage-sm-bold text-app-neutral-950",
        "leading-8 xl:leading-11",
        className
      )}
      style={style}
    >
      {children}
    </h2>
  );
}
