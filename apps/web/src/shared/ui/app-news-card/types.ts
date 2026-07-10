import type { ReactNode } from "react";

export type AppNewsCardProps = {
  src: string;
  alt: string;
  category: string;
  categoryBg: string;
  title: ReactNode;
  description: string;
  href?: string;
  className?: string;
};
