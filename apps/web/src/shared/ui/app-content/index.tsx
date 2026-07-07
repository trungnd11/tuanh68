import type { ReactNode } from "react";

type ContentProps = {
  children: ReactNode;
  className?: string;
};

export default function AppContent({ children, className = "" }: ContentProps) {
  return <div className={`mx-auto w-full max-w-300 px-4 xl:px-0 ${className}`.trim()}>{children}</div>;
}
