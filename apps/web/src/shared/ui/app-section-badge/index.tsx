import clsx from "clsx";
import type { ReactNode } from "react";

interface AppSectionBadgeProps {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}

export default function AppSectionBadge({ children, centered = false, className = "" }: AppSectionBadgeProps) {
  const baseClasses =
    "flex items-center gap-3 text-sm font-semibold uppercase leading-5 tracking-[1.4px] text-app-brand-teal";
  const alignClasses = centered ? "justify-center w-full" : "";
  const dividerClass = `${centered ? "h-0.5 w-10" : "h-0.5 w-12"} shrink-0 bg-app-brand-teal`;

  return (
    <div className={clsx(`${baseClasses} ${alignClasses} ${className}`.trim())}>
      <div className={clsx(dividerClass)} />
      {children}
      {centered && <div className={clsx(dividerClass)} />}
    </div>
  );
}
