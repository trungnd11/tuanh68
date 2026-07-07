import type { ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type Breakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'wide';

export type SpacingToken =
  | 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20
  | 24 | 32 | 40 | 48 | 56 | 64 | 80 | 96 | 120 | 160;

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}
