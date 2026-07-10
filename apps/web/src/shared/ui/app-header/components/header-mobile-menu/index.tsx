"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import CloseMenuIcon from "@/assets/icons/close-menu.svg";
import MobileMenuIcon from "@/assets/icons/mobile-menu.svg";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import HeaderActions from "@/shared/ui/app-header/components/header-actions";
import HeaderMenu from "@/shared/ui/app-header/components/header-menu";
import { appColors } from "@/shared/theme";
import type { HeaderMobileMenuProps } from "./types";

export default function HeaderMobileMenu({ isOpen, onClose, onToggle, activeId }: HeaderMobileMenuProps) {
  const [isMounted, setIsMounted] = useState(false);
  const menuId = useId();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousHtmlScrollBehavior = document.documentElement.style.scrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      window.removeEventListener("keydown", handleEscape);
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior;
      });
    };
  }, [isOpen, onClose]);

  const mobileMenuLayer =
    isMounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className={clsx(
              "fixed inset-x-0 bottom-0 top-20 z-60",
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            <button
              type="button"
              aria-label="Đóng"
              className={clsx(
                "absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0"
              )}
              onClick={onClose}
            />

            <div
              id={menuId}
              className={clsx(
                "absolute inset-x-0 top-0 border-t border-[rgba(255,255,255,0.15)] bg-gradient-to-br from-[rgba(15,23,42,0.95)] to-[rgba(30,41,59,0.8)] px-4 pb-6 pt-5",
                "shadow-[0px_8px_32px_0px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out sm:px-6",
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
              )}
            >
              <HeaderMenu mobile activeId={activeId} onNavigate={onClose} />

              <div className={clsx("mt-5 border-t border-[rgba(255,255,255,0.1)] pt-5")}>
                <HeaderActions />
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className={clsx("relative z-80 flex shrink-0 items-center gap-3")}>
        <AppBorderRadius
          cornerRadius={10}
          borderWidth={1}
          borderColor={appColors.appNeutral[300]}
          classNameBorder={clsx("bg-white/10 h-full")}
        >
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Đóng menu" : "Mở menu"}
            className={clsx("flex h-9.5 w-10 shrink-0 items-center justify-center text-white")}
            onClick={onToggle}
          >
            {isOpen ? <CloseMenuIcon /> : <MobileMenuIcon />}
          </button>
        </AppBorderRadius>
      </div>
      {mobileMenuLayer}
    </>
  );
}
