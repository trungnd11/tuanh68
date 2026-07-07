import type { CSSProperties, ReactNode } from "react";
import type { AppBorderRadiusProps } from "@/shared/ui/app-border-radius/types";

export interface AppModalProps {
  children: ReactNode;
  customLayout?: boolean;
  open: boolean;
  title: string;
  onClose: () => void;
  container?: {
    style?: CSSProperties;
    className?: string;
  };
  body?: {
    appBorderRadiusProps?: Partial<AppBorderRadiusProps>;
    className?: string;
    style?: CSSProperties;
  };
}
