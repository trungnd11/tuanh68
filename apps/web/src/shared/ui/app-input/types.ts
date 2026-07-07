import type { InputHTMLAttributes, Ref } from "react";

export interface AppInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  containerClassName?: string;
  error?: string;
  errorClassName?: string;
  inputRef?: Ref<HTMLInputElement>;
  labelClassName?: string;
  inputClassName?: string;
}
