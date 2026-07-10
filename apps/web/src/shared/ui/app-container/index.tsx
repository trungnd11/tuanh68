import clsx from "clsx";
import type { ReactNode } from "react";

type AppContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function AppContainer({ children, className = "" }: AppContainerProps) {
  return <div className={clsx(`mx-auto w-full max-w-7xl px-4 lg:px-0 ${className}`.trim())}>{children}</div>;
}
