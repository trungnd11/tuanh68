import type { CSSProperties, ReactNode } from "react";
import type { SquircleProps } from "@squircle-js/react";

export interface AppBorderRadiusProps extends SquircleProps {
  borderColor?: string;
  borderWidth?: number;
  children?: ReactNode;
  classNameContainer?: string;
  classNameBorder?: string;
  styleContainer?: CSSProperties;
  styleBorder?: CSSProperties;
}
