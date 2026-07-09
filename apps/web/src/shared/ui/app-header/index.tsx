"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
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
        !isHeaderVisible && !isMobileMenuOpen && "-translate-y-full"
      )}
    >
      <div className="mx-auto hidden h-full w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 xl:flex xl:px-8">
        <HeaderLogo />
        <div className="hidden items-center gap-8 xl:flex">
          <HeaderMenu activeId={activeId} />
          <HeaderActions />
        </div>
      </div>

      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between gap-3 px-5 xl:hidden">
        <HeaderLogo />
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
