import clsx from "clsx";
import { Squircle } from "@squircle-js/react";
import type { AppBorderRadiusProps } from "./types";

export default function AppBorderRadius({
  asChild,
  borderColor,
  borderWidth = 0,
  children,
  cornerRadius,
  cornerSmoothing,
  classNameBorder,
  classNameBorderOuter,
  classNameContainer,
  styleContainer,
  styleBorder,
  ...restProps
}: AppBorderRadiusProps) {
  const resolvedCornerSmoothing = cornerSmoothing ?? 1;

  const content = (
    <Squircle
      {...restProps}
      asChild={asChild}
      cornerRadius={cornerRadius}
      cornerSmoothing={resolvedCornerSmoothing}
      className={clsx(classNameBorder)}
      style={styleBorder}
    >
      {children}
    </Squircle>
  );

  const hasBorder = Boolean(borderColor && borderWidth && borderWidth > 0);

  if (hasBorder) {
    const innerCornerRadius = typeof cornerRadius === "number" ? Math.max(cornerRadius - borderWidth, 0) : cornerRadius;

    return (
      <span className={clsx(classNameContainer)} style={styleContainer}>
        <Squircle
          cornerRadius={cornerRadius}
          cornerSmoothing={resolvedCornerSmoothing}
          style={{
            backgroundColor: borderColor,
            padding: borderWidth,
          }}
          className={clsx("h-full w-full", classNameBorderOuter)}
        >
          <AppBorderRadius
            {...restProps}
            asChild={asChild}
            cornerRadius={innerCornerRadius}
            cornerSmoothing={resolvedCornerSmoothing}
            classNameBorder={classNameBorder}
            styleBorder={styleBorder}
            classNameContainer="flex w-full"
          >
            {children}
          </AppBorderRadius>
        </Squircle>
      </span>
    );
  }

  return (
    <span className={clsx(classNameContainer)} style={styleContainer}>
      {content}
    </span>
  );
}
