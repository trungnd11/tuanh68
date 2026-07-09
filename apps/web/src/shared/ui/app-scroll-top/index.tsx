"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5" aria-hidden="true">
      <path
        d="M12 18V6M12 6L7 11M12 6L17 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AppScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 320);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleScrollTop}
      className={clsx(
        "fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full",
        "bg-app-brand-teal text-white shadow-[0_12px_30px_rgba(72,166,167,0.24)] cursor-pointer",
        "transition-all duration-200 hover:-translate-y-0.5 hover:bg-app-brand-teal/90",
        "border-4 border-white",
        isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <ArrowUpIcon />
    </button>
  );
}
