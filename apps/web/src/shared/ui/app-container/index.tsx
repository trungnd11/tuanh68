import type { ReactNode } from "react";

type AppContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function AppContainer({ children, className = "" }: AppContainerProps) {
  return <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 xl:px-8 ${className}`.trim()}>{children}</div>;
}
