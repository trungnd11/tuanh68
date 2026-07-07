'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from '../../hooks';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ end, suffix = '', duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
