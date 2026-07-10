"use client";

import clsx from "clsx";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export type AppResponsiveTimelineRenderState = {
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleTrackScroll: () => void;
  isDesktop: boolean;
  totalItems: number;
  trackRef: RefObject<HTMLDivElement | null>;
};

type AppResponsiveTimelineProps = {
  initialIndex?: number;
  mobileClassName?: string;
  navPosition?: "top" | "bottom" | "none";
  onIndexChange?: (index: number) => void;
  renderDesktop: (state: AppResponsiveTimelineRenderState) => ReactNode;
  renderNav?: (state: AppResponsiveTimelineRenderState) => ReactNode;
  renderTrack: (state: AppResponsiveTimelineRenderState) => ReactNode;
  totalItems: number;
};

export default function AppResponsiveTimeline({
  initialIndex = 0,
  mobileClassName = "flex flex-col",
  navPosition = "bottom",
  onIndexChange,
  renderDesktop,
  renderNav,
  renderTrack,
  totalItems,
}: AppResponsiveTimelineProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    function syncViewportMode(event?: MediaQueryListEvent) {
      setIsDesktop(event ? event.matches : mediaQuery.matches);
    }

    syncViewportMode();
    mediaQuery.addEventListener("change", syncViewportMode);

    return () => {
      mediaQuery.removeEventListener("change", syncViewportMode);

      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  function scrollToIndex(index: number) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const slides = Array.from(track.children) as HTMLDivElement[];
    const target = slides[index];

    if (!target) {
      return;
    }

    const nextScrollLeft = target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2;

    track.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      scrollToIndex(initialIndex);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [initialIndex]);

  function getNearestIndexFromScroll() {
    const track = trackRef.current;

    if (!track) {
      return currentIndex;
    }

    const slides = Array.from(track.children) as HTMLDivElement[];
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(itemCenter - trackCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  function syncCurrentIndexFromScroll() {
    const nearestIndex = getNearestIndexFromScroll();

    setCurrentIndex((value) => {
      if (value !== nearestIndex) {
        onIndexChange?.(nearestIndex);
        return nearestIndex;
      }
      return value;
    });
  }

  function handleTrackScroll() {
    if (scrollRafRef.current !== null) {
      cancelAnimationFrame(scrollRafRef.current);
    }

    scrollRafRef.current = requestAnimationFrame(syncCurrentIndexFromScroll);
  }

  function handlePrev() {
    const prevIndex = Math.max(getNearestIndexFromScroll() - 1, 0);

    setCurrentIndex(prevIndex);
    onIndexChange?.(prevIndex);
    scrollToIndex(prevIndex);
  }

  function handleNext() {
    const nextIndex = Math.min(getNearestIndexFromScroll() + 1, totalItems - 1);

    setCurrentIndex(nextIndex);
    onIndexChange?.(nextIndex);
    scrollToIndex(nextIndex);
  }

  const state: AppResponsiveTimelineRenderState = {
    currentIndex,
    handleNext,
    handlePrev,
    handleTrackScroll,
    isDesktop,
    totalItems,
    trackRef,
  };

  if (isDesktop) {
    return <>{renderDesktop(state)}</>;
  }

  // eslint-disable-next-line react-hooks/refs
  const nav = renderNav ? renderNav(state) : null;

  return (
    <div className={clsx(mobileClassName)}>
      {navPosition === "top" ? nav : null}
      {renderTrack(state)}
      {navPosition === "bottom" ? nav : null}
    </div>
  );
}
