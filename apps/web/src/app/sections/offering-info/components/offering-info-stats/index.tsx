"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { offeringInfoItems } from "../../data";
import { formatAnimatedCounterValue, parseAnimatedCounterValue } from "./counter-value";

const COUNTER_DURATION_MS = 1400;

function AnimatedStatValue({ value }: { value: string }) {
  const parsedValue = useMemo(() => parseAnimatedCounterValue(value), [value]);
  const [displayValue, setDisplayValue] = useState(() => formatAnimatedCounterValue(parsedValue, 0));
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.35,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / COUNTER_DURATION_MS, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = parsedValue.value * easedProgress;

      setDisplayValue(formatAnimatedCounterValue(parsedValue, nextValue));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [inView, parsedValue]);

  return (
    <p ref={ref} className="text-xl font-bold leading-7 text-app-primary-500 xl:text-[28px] xl:font-black">
      {displayValue}
    </p>
  );
}

export default function OfferingInfoStats() {
  const tLabels = useTranslations("HomePage.offeringInfo.stats.labels");
  const tValues = useTranslations("HomePage.offeringInfo.stats.values");

  return (
    <div className={clsx("grid auto-rows-fr grid-cols-2 items-stretch gap-1 justify-evenly xl:flex xl:gap-0")}>
      {offeringInfoItems.map((item) => (
        <div
          key={item.labelKey}
          className={clsx(
            "flex h-full flex-col items-center justify-center gap-1 bg-white px-3 py-3.5 text-center xl:gap-3 xl:bg-transparent xl:p-0"
          )}
        >
          <AnimatedStatValue value={tValues(item.valueKey)} />
          <p className="text-sm leading-5 text-app-neutral-900">{tLabels(item.labelKey)}</p>
        </div>
      ))}
    </div>
  );
}
