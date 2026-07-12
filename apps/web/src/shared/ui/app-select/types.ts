import type { ReactNode } from "react";

export type AppSelectOption = {
  label: string;
  value: string;
  keywords?: string[];
};

export interface AppSelectProps {
  label: string;
  options: AppSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  errorClassName?: string;
  required?: boolean;
  containerClassName?: string;
  rootClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  menuClassName?: string;
  endAdornment?: ReactNode;
  onBlur?: () => void;
  onChange?: (value: string) => void;
}
