import Link from "next/link";
import clsx from "clsx";
import type { AppButtonProps } from "./types";

const variantStyles: Record<string, string> = {
  primary:
    "inline-flex min-h-[60px] items-center justify-center rounded-[4px] bg-white px-8 py-4 text-[16px] leading-[24px] font-bold tracking-[0.4px] text-app-accent-blue uppercase shadow-lg transition-opacity hover:opacity-90",
  secondary:
    "inline-flex min-h-[60px] items-center justify-center rounded-[4px] border-2 border-white px-[34px] py-[18px] text-[16px] leading-[24px] font-bold tracking-[0.4px] text-white uppercase shadow-lg transition-colors hover:bg-white hover:text-app-accent-blue",
  outline:
    "inline-flex items-center justify-center rounded-full border-2 border-app-accent-blue px-[26px] py-[10px] text-[14px] leading-[20px] font-semibold text-app-accent-blue uppercase transition-colors hover:bg-app-accent-blue hover:text-white",
  ghost: "inline-flex items-center gap-2 text-[16px] leading-[24px] font-medium text-white",
};

export default function AppButton({
  withProvider,
  className,
  style,
  children,
  type = "button",
  disabledAnimation,
  disabled,
  href,
  variant,
  target,
  rel,
  onClick,
  ...rest
}: AppButtonProps) {
  const isDisabled = disabled && !href;
  const baseClassName = clsx(
    variant ? variantStyles[variant] : "cursor-pointer",
    !disabledAnimation && !isDisabled && "transition-transform duration-200 hover:-translate-y-px",
    isDisabled && "pointer-events-none opacity-50",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        className={baseClassName}
        style={style}
      >
        {children}
      </Link>
    );
  }

  const buttonComponent = (
    <button type={type} disabled={isDisabled} onClick={onClick} className={baseClassName} style={style} {...rest}>
      {children}
    </button>
  );

  return withProvider?.(buttonComponent) ?? buttonComponent;
}
