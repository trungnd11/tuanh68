import { ReactNode } from "react";
import { AppLocale } from "@/i18n/routing";

export interface AppSectionNavigatorProps {
  locale: AppLocale;
  headerOffset?: number;
  logo?: ReactNode;
  className?: string;
}
