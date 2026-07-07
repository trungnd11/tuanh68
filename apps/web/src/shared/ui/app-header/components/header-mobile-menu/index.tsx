"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import CloseMenuIcon from "@/assets/icons/close-menu.svg";
import MobileMenuIcon from "@/assets/icons/mobile-menu.svg";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import { HeaderPurchaseButton } from "@/shared/ui/app-header/components/header-actions";
import HeaderMenu from "@/shared/ui/app-header/components/header-menu";
import { appColors } from "@/shared/theme";
import { scrollToPurchaseForm } from "@/shared/utils/scroll";
import type { HeaderMobileMenuProps } from "./types";

export default function HeaderMobileMenu({ isOpen, onClose, onToggle, activeId }: HeaderMobileMenuProps) {
  const t = useTranslations("HomePage.header.mobileMenu");
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

  function handlePurchaseClick() {
    onClose();
    requestAnimationFrame(scrollToPurchaseForm);
  }

  const mobileMenuLayer =
    isMounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className={clsx(
              "fixed inset-x-0 bottom-0 top-20.5 z-60 xl:hidden",
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            <button
              type="button"
              aria-label={t("close")}
              className={clsx(
                "absolute inset-0 bg-app-neutral-900/20 backdrop-blur-md transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0"
              )}
              onClick={onClose}
            />

            <div
              id={menuId}
              className={clsx(
                "absolute inset-x-0 top-0 border-t border-app-neutral-900/10 bg-white px-4 pb-6 pt-5",
                "shadow-[0_24px_48px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out sm:px-6",
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
              )}
            >
              <HeaderMenu mobile activeId={activeId} onNavigate={onClose} />

              <div className="mt-5 border-t border-app-neutral-900/10 pt-5">
                <HeaderPurchaseButton mobile onPurchaseClick={handlePurchaseClick} />
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="relative z-80 flex shrink-0 items-center gap-3 xl:hidden">
        <AppBorderRadius
          cornerRadius={10}
          borderWidth={1}
          borderColor={appColors.appNeutral[300]}
          classNameBorder={clsx("bg-white h-full")}
        >
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? t("closeNavigation") : t("openNavigation")}
            className="flex h-9.5 w-10 shrink-0 items-center justify-center text-app-neutral-900"
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
