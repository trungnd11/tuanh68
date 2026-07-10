import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

export interface AppInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
}

export default function AppInput({ label, error, className, ...rest }: AppInputProps) {
  return (
    <div className={clsx("flex flex-col gap-1")}>
      {label && <label className={clsx("text-[14px] leading-[20px] font-medium text-[#374151]")}>{label}</label>}
      <input
        {...rest}
        className={clsx(
          "rounded-[6px] border border-[#d1d5db] bg-white px-[17px] py-[11px]",
          "text-[16px] text-[#1f2937] outline-none transition-colors",
          "placeholder:text-[#9ca3af] focus:border-app-accent-blue",
          className ?? ""
        )}
      />
      {error && <p className={clsx("text-[12px] text-red-500")}>{error}</p>}
    </div>
  );
}
