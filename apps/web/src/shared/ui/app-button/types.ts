import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from "react";
import type { AppBorderRadiusProps } from "@/shared/ui/app-border-radius/types";

export interface AppButtonProps extends ButtonHTMLAttributes<never> {
  withProvider?: (button: ReactElement) => ReactElement;
  className?: string;
  style?: CSSProperties;
  borderRadiusProps?: Omit<AppBorderRadiusProps, "cornerRadius">;
  children?: ReactNode;
  cornerRadius?: number;
  disabledAnimation?: boolean;
}
