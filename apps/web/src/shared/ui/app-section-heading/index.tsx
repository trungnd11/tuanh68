import type { ReactNode } from "react";

type AppSectionHeadingProps = {
  children: ReactNode;
  className?: string;
  showDivider?: boolean;
};

export default function AppSectionHeading({ children, className = "", showDivider = true }: AppSectionHeadingProps) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`.trim()}>
      <h2 className="text-center text-[26px] leading-[32px] font-bold text-app-accent-blue uppercase sm:text-[36px] sm:leading-[40px]">
        {children}
      </h2>
      {showDivider && <div className="h-1 w-20 rounded-full bg-app-brand-teal sm:w-24" />}
    </div>
  );
}
