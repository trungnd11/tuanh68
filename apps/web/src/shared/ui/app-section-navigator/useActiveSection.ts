"use client";

import { useEffect, useState } from "react";

function buildThresholds() {
  return Array.from({ length: 21 }, (_, index) => index / 20);
}

function getVisibilityScore(entry: IntersectionObserverEntry) {
  return entry.intersectionRect.height;
}

export function useActiveSection(sectionIds: readonly string[], headerOffset: number) {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    if (!sectionIds.length) {
      setActiveId(null);
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (!elements.length) {
      setActiveId(sectionIds[0] ?? null);
      return;
    }

    const scores = new Map<string, number>();
    const thresholds = buildThresholds();

    function getFallbackActiveId() {
      const viewportCenter = headerOffset + (window.innerHeight - headerOffset) / 2;
      let fallbackId = elements[0]?.id ?? null;
      let smallestDistance = Number.POSITIVE_INFINITY;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          fallbackId = element.id;
        }
      }

      return fallbackId;
    }

    function updateActiveId() {
      let bestId: string | null = null;
      let bestScore = 0;

      for (const id of sectionIds) {
        const score = scores.get(id) ?? 0;

        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      }

      setActiveId(bestId ?? getFallbackActiveId());
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          scores.set(entry.target.id, entry.isIntersecting ? getVisibilityScore(entry) : 0);
        }

        updateActiveId();
      },
      {
        threshold: thresholds,
        rootMargin: `${-headerOffset}px 0px -15% 0px`,
      }
    );

    for (const element of elements) {
      scores.set(element.id, 0);
      observer.observe(element);
    }

    updateActiveId();

    return () => {
      observer.disconnect();
      scores.clear();
    };
  }, [headerOffset, sectionIds]);

  return activeId;
}
