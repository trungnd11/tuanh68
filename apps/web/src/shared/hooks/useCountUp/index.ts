"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type UseCountUpOptions = {
  duration?: number;
  startOnView?: boolean;
  triggerOnce?: boolean;
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(
  end: number,
  { duration = 2000, startOnView = true, triggerOnce = true }: UseCountUpOptions = {}
) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const rafRef = useRef(0);

  const { ref, inView } = useInView({
    triggerOnce,
    threshold: 0.3,
    rootMargin: "0px 0px -10% 0px",
  });

  const animate = useCallback(() => {
    const startTime = performance.now();

    function frame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }

    rafRef.current = requestAnimationFrame(frame);
  }, [end, duration]);

  useEffect(() => {
    if (startOnView && !inView) return;
    if (!startOnView && startedRef.current) return;

    if (triggerOnce && startedRef.current) return;

    startedRef.current = true;
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, startOnView, triggerOnce, animate]);

  return { count, ref };
}
