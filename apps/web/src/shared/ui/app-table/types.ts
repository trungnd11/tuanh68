import type { ReactNode } from "react";

export interface AppTableColumn {
  key: string;
  label: string;
  width?: string;
  highlighted?: boolean;
}

export interface AppTableRow {
  icon?: ReactNode;
  label: string;
  values: Record<string, string>;
  isBadge?: boolean;
}

export interface AppTableProps {
  columns: readonly AppTableColumn[];
  rows: readonly AppTableRow[];
  className?: string;
  minWidth?: string;
}
