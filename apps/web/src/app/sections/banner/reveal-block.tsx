"use client";

import { type ReactNode, useEffect, useState } from "react";
import clsx from "clsx";

type RevealBlockProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function RevealBlock({ children, delay = 0, className = "" }: RevealBlockProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={clsx(className)}>
      <div
        className={clsx("transition-all duration-700 ease-out")}
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(24px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
