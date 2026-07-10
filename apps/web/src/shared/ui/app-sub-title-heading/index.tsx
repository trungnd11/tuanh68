import clsx from "clsx";
import type { ReactNode } from "react";

type AppSubTitleHeadingProps = {
  children: ReactNode;
  className?: string;
};

export default function AppSubTitleHeading({ children, className = "" }: AppSubTitleHeadingProps) {
  return (
    <h3
      className={clsx(`text-xl leading-7 font-bold text-app-accent-blue lg:text-2xl lg:leading-8 ${className}`.trim())}
    >
      {children}
    </h3>
  );
}
