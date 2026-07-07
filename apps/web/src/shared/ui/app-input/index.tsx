import clsx from "clsx";
import type { AppInputProps } from "./types";

export default function AppInput({
  label,
  containerClassName,
  error,
  errorClassName,
  inputRef,
  labelClassName,
  inputClassName,
  className,
  ...rest
}: AppInputProps) {
  return (
    <div className={clsx("flex flex-col gap-1.5", containerClassName)}>
      <label className={clsx("text-xxs font-semibold text-white", labelClassName)}>
        <span
          className={clsx(
            "flex h-17 flex-col gap-1 rounded-2xl border border-white/18 bg-app-primary-700 px-5 py-3.25",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200",
            "hover:border-white/24 focus-within:border-white/30",
            "focus-within:shadow-[0_14px_36px_rgba(2,49,25,0.28),inset_0_1px_0_rgba(255,255,255,0.05)]",
            error && "border-app-red-300/80 focus-within:border-app-red-300 hover:border-app-red-300/90"
          )}
        >
          <span className={clsx("text-xxs font-semibold text-white", labelClassName)}>{label}</span>
          <input
            {...rest}
            ref={inputRef}
            aria-invalid={Boolean(error)}
            className={clsx(
              "bg-transparent text-body-sm-medium text-white placeholder:text-white/60 outline-none",
              className,
              inputClassName
            )}
          />
        </span>
      </label>

      {error ? <p className={clsx("px-2 text-body-xs-medium text-app-red-300", errorClassName)}>{error}</p> : null}
    </div>
  );
}
