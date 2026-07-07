"use client";

import { useEffect, type RefObject } from "react";

type AutofilledInputSyncEntry = {
  currentValue: string;
  inputRef: RefObject<HTMLInputElement | null>;
  setValue: (value: string) => void;
};

const WEBKIT_AUTOFILL_EVENT = "app-input-autofill";

export function useSyncAutofilledInputs(entries: readonly AutofilledInputSyncEntry[]) {
  useEffect(() => {
    const seenValues = new WeakMap<HTMLInputElement, string>();
    const intervalIds = new Set<number>();
    const timeoutIds = new Set<number>();

    const syncAutofilledValues = () => {
      entries.forEach(({ currentValue, inputRef, setValue }) => {
        const input = inputRef.current;

        if (!input) {
          return;
        }

        const previousValue = seenValues.get(input) ?? currentValue;
        const nextValue = input.value.trim();

        if (!nextValue || nextValue === previousValue) {
          return;
        }

        seenValues.set(input, nextValue);
        setValue(nextValue);
      });
    };

    const runBurstSync = () => {
      requestAnimationFrame(syncAutofilledValues);

      const intervalId = window.setInterval(syncAutofilledValues, 120);
      intervalIds.add(intervalId);

      const timeoutId = window.setTimeout(() => {
        window.clearInterval(intervalId);
        intervalIds.delete(intervalId);
        timeoutIds.delete(timeoutId);
      }, 1200);

      timeoutIds.add(timeoutId);
    };

    runBurstSync();
    window.addEventListener("pageshow", runBurstSync);
    window.addEventListener("focus", runBurstSync);

    const cleanups = entries
      .map(({ currentValue, inputRef, setValue }) => {
        const input = inputRef.current;

        if (!input) {
          return null;
        }

        seenValues.set(input, currentValue);

        const syncCurrentInput = () => {
          const previousValue = seenValues.get(input) ?? currentValue;
          const nextValue = input.value.trim();

          if (!nextValue || nextValue === previousValue) {
            return;
          }

          seenValues.set(input, nextValue);
          setValue(nextValue);
        };

        input.addEventListener("input", syncCurrentInput);
        input.addEventListener("change", syncCurrentInput);
        const handleAnimationStart = (event: Event) => {
          if ((event as AnimationEvent).animationName === WEBKIT_AUTOFILL_EVENT) {
            runBurstSync();
          }
        };

        input.addEventListener("animationstart", handleAnimationStart);

        return () => {
          input.removeEventListener("input", syncCurrentInput);
          input.removeEventListener("change", syncCurrentInput);
          input.removeEventListener("animationstart", handleAnimationStart);
        };
      })
      .filter((cleanup): cleanup is () => void => Boolean(cleanup));

    return () => {
      intervalIds.forEach((intervalId) => window.clearInterval(intervalId));
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.removeEventListener("pageshow", runBurstSync);
      window.removeEventListener("focus", runBurstSync);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [entries]);
}
