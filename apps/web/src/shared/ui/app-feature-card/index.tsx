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
      className={`flex items-start gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-[25px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ${className}`}
    >
      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl" style={{ background: iconBg }}>
        <div className="flex items-center justify-center">{icon}</div>
      </div>
      <div className="flex flex-col gap-[4.875px]">
        <h4 className="text-base font-bold leading-6 text-[#333]">{title}</h4>
        <p className="text-sm font-normal leading-[22.75px] text-gray-500">
          {description[0]}
          <br />
          {description[1]}
        </p>
      </div>
    </div>
  );
}
