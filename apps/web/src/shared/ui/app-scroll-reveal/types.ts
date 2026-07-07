import type { ReactNode } from "react";

export type RevealVariant = "fade-in" | "fade-in-up" | "fade-in-down" | "fade-in-soft";

export type AppScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  variant?: RevealVariant;
};

export type AnimationFrames = Record<string, Record<string, number | string>>;
