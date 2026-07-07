"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frameId = 0;
    const menuSectionIds = new Set(sectionIds);

    function updateActiveSection() {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        if (window.scrollY <= 8) {
          setActiveId(null);
          return;
        }

        const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
        let currentSectionId: string | null = null;

        for (const element of sections) {
          const rect = element.getBoundingClientRect();
          const scrollMarginTop = Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0;
          const activeLine = scrollMarginTop + 1;

          if (rect.top <= activeLine) {
            currentSectionId = element.id;
          } else {
            break;
          }
        }

        setActiveId(currentSectionId && menuSectionIds.has(currentSectionId) ? currentSectionId : null);
      });
    }

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  return activeId;
}
