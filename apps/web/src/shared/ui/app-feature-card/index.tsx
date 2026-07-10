import clsx from "clsx";
import type { ReactNode } from "react";

interface AppFeatureCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: readonly string[];
  className?: string;
}

export default function AppFeatureCard({ icon, iconBg, title, description, className = "" }: AppFeatureCardProps) {
  return (
    <div
      className={clsx(
        "flex items-start gap-5 rounded-2xl border border-gray-100 bg-gray-50",
        "p-[25px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      <div
        className={clsx("flex size-14 shrink-0 items-center justify-center rounded-xl")}
        style={{ background: iconBg }}
      >
        <div className={clsx("flex items-center justify-center")}>{icon}</div>
      </div>
      <div className={clsx("flex flex-col gap-[4.875px]")}>
        <h4 className={clsx("text-base font-bold leading-6 text-[#333]")}>{title}</h4>
        <p className={clsx("text-sm font-normal leading-[22.75px] text-gray-500")}>
          {description[0]}
          <br />
          {description[1]}
        </p>
      </div>
    </div>
  );
}
