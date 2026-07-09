import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from "react";
import Link from "next/link";

import type { AppBorderRadiusProps } from "@/shared/ui/app-border-radius/types";

export type AppButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type AppButtonSize = "sm" | "md" | "lg";

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  withProvider?: (button: ReactElement) => ReactElement;
  borderRadiusProps?: Omit<AppBorderRadiusProps, "cornerRadius">;
  children?: ReactNode;
  cornerRadius?: number;
  disabledAnimation?: boolean;
  href?: string;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  target?: string;
  rel?: string;
}
