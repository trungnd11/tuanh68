import AppBorderRadius from "@/shared/ui/app-border-radius";
import type { AppButtonProps } from "./types";
import clsx from "clsx";

export default function AppButton({
  withProvider,
  className,
  style,
  borderRadiusProps,
  cornerRadius = 8,
  children,
  type = "button",
  disabledAnimation,
  disabled,
  ...rest
}: AppButtonProps) {
  const buttonComponent = (
    <AppBorderRadius
      {...borderRadiusProps}
      classNameContainer={clsx(
        !disabledAnimation && !disabled && "transition-transform duration-200 hover:-translate-y-px",
        disabled && "cursor-not-allowed",
        borderRadiusProps?.classNameContainer
      )}
      asChild
      cornerRadius={cornerRadius}
    >
      <button
        {...rest}
        type={type}
        disabled={disabled}
        className={clsx("cursor-pointer", disabled && "pointer-events-none opacity-50", className)}
        style={style}
      >
        {children}
      </button>
    </AppBorderRadius>
  );

  return withProvider?.(buttonComponent) ?? buttonComponent;
}
