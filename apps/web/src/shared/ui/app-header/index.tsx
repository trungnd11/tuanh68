"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import AppContent from "@/shared/ui/app-content";
import HeaderMenu, { navigationItems } from "@/shared/ui/app-header/components/header-menu";
import HeaderLogo from "@/shared/ui/app-header/components/header-logo";
import HeaderActions from "@/shared/ui/app-header/components/header-actions";
import HeaderMobileMenu from "@/shared/ui/app-header/components/header-mobile-menu";
import { useActiveSection } from "@/shared/hooks/useActiveSection";
import { AppHeaderContainerStyle } from "./components/styles/AppHeaderContainerStyle";

const navigationSectionIds = navigationItems.map((item) => item.id);

const SCROLL_THRESHOLD = 50;

export default function AppHeader() {
  const activeId = useActiveSection(navigationSectionIds);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const [cacheActiveId, setCacheActiveId] = useState<string | null>();

  useEffect(() => {
    if (!isMobileMenuOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCacheActiveId(activeId);
    }
  }, [isMobileMenuOpen, activeId]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < SCROLL_THRESHOLD) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppHeaderContainerStyle
      className={clsx(
        "app-header",
        isMobileMenuOpen && "shadow-none",
        "transition-transform duration-300",
        "xl:shadow-[0_10px_30px_rgba(15,23,42,0.08),0_2px_10px_rgba(15,23,42,0.04)]",
        !isHeaderVisible && !isMobileMenuOpen && "-translate-y-full"
      )}
    >
      <AppContent className="hidden h-full items-center justify-between gap-4 px-4 sm:px-6 xl:flex xl:px-0">
        <HeaderLogo />
        <HeaderMenu activeId={activeId} />
        <HeaderActions />
      </AppContent>

      <div
        className={clsx(
          "bg-white flex h-full w-full items-center justify-between",
          "gap-3 overflow-x-clip px-5 xl:hidden"
        )}
      >
        <HeaderLogo className={clsx("w-20! h-8.25!")} />
        <HeaderMobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onToggle={() => setIsMobileMenuOpen((value) => !value)}
          activeId={cacheActiveId}
        />
      </div>
    </AppHeaderContainerStyle>
  );
}
