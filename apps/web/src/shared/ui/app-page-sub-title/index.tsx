import clsx from "clsx";
import type { AppPageSubTitleProps } from "@/shared/ui/app-page-sub-title/types";

export default function AppPageSubTitle({ children, style, className }: AppPageSubTitleProps) {
  return (
    <h2 className={clsx("text-body-base-bold uppercase text-app-primary-550", "leading-5", className)} style={style}>
      {children}
    </h2>
  );
}
