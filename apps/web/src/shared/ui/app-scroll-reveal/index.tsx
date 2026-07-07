"use client";

import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import type { AppScrollRevealProps, RevealVariant } from "./types";

const hiddenTransformByVariant: Record<RevealVariant, string> = {
  "fade-in": "translate3d(0, 0, 0)",
  "fade-in-up": "translate3d(0, 24px, 0)",
  "fade-in-down": "translate3d(0, -18px, 0)",
  "fade-in-soft": "translate3d(0, 10px, 0) scale(0.985)",
};

export default function AppScrollReveal({
  children,
  className,
  delayMs = 0,
  durationMs = 600,
  variant = "fade-in",
}: AppScrollRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.12,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    <div
      ref={ref}
      className={clsx(
        "w-full overflow-x-clip will-change-transform motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0, 0, 0) scale(1)" : hiddenTransformByVariant[variant],
        transition:
          inView || delayMs > 0
            ? `opacity ${durationMs}ms ease-out ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`
            : undefined,
      }}
    >
      {children}
    </div>
  );
}
