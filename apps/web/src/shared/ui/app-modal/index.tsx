"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import AppButton from "@/shared/ui/app-button";
import type { AppModalProps } from "./types";

export default function AppModal({
  children,
  customLayout = false,
  open,
  onClose,
  title,
  container,
  body,
}: AppModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-71 flex items-center justify-center bg-black/60 backdrop-blur-[2px]",
        "animate-[fadeIn_200ms_ease-out]"
      )}
      onClick={onClose}
      role="presentation"
    >
      <div
        aria-modal="true"
        className={clsx(
          "flex h-full w-full items-center justify-center",
          "animate-[modalIn_250ms_cubic-bezier(0.16,1,0.3,1)]",
          container?.className
        )}
        style={container?.style}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <AppBorderRadius cornerRadius={16} {...body?.appBorderRadiusProps}>
          <div
            className={clsx("bg-app-primary-700", "text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]", body?.className)}
            style={body?.style}
          >
            {customLayout ? (
              children
            ) : (
              <div className="relative flex flex-col items-center gap-3 text-center">
                <AppButton
                  aria-label="Dong"
                  className={clsx(
                    "absolute right-0 top-0 flex h-9 w-9 items-center justify-center",
                    "rounded-full border border-white/12 bg-white/6 text-white"
                  )}
                  disabledAnimation
                  onClick={onClose}
                >
                  x
                </AppButton>

                <h3 className="text-heading-base-bold">{title}</h3>
                <div className="text-body-sm-medium text-white/78">{children}</div>
              </div>
            )}
          </div>
        </AppBorderRadius>
      </div>
    </div>,
    document.body
  );
}
