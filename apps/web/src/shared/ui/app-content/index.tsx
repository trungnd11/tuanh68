import clsx from "clsx";
import type { ReactNode } from "react";

type ContentProps = {
  children: ReactNode;
  className?: string;
};

export default function AppContent({ children, className = "" }: ContentProps) {
  return <div className={clsx(`mx-auto w-full max-w-7xl px-4 xl:px-0 ${className}`.trim())}>{children}</div>;
}
