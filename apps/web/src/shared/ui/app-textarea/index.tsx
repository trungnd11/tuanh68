import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

export interface AppTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function AppTextarea({ label, error, className, ...rest }: AppTextareaProps) {
  return (
    <div className={clsx("flex flex-col gap-1")}>
      {label && <label className={clsx("text-[14px] leading-[20px] font-medium text-[#374151]")}>{label}</label>}
      <textarea
        {...rest}
        className={clsx(
          "min-h-[120px] rounded-[6px] border border-[#d1d5db] bg-white px-[17px]",
          "py-[9px] text-[16px] text-[#1f2937] outline-none transition-colors",
          "placeholder:text-[#9ca3af] focus:border-app-accent-blue",
          className ?? ""
        )}
      />
      {error && <p className={clsx("text-[12px] text-red-500")}>{error}</p>}
    </div>
  );
}
