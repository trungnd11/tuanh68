import type { ReactNode } from "react";
import clsx from "clsx";

type AppSectionHeadingProps = {
  children: ReactNode;
  className?: string;
  showDivider?: boolean;
};

export default function AppSectionHeading({ children, className = "", showDivider = true }: AppSectionHeadingProps) {
  return (
    <div className={clsx(`flex flex-col items-center gap-1 lg:gap-4 ${className}`.trim())}>
      <h2
        className={clsx(
          "text-center text-xl font-bold text-app-accent-blue uppercase",
          "leading-8 sm:text-[26px] lg:text-[36px] lg:leading-10"
        )}
      >
        {children}
      </h2>
      {showDivider && <div className={clsx("h-0.5 lg:h-1 w-20 rounded-full bg-app-brand-teal sm:w-24")} />}
    </div>
  );
}
