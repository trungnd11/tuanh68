"use client";

import { useEffect } from "react";
import { consumeInitialScrollReset, type ScrollResetWindowState } from "./initial-scroll-reset";

export default function AppScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { history } = window;
    const previousScrollRestoration = history.scrollRestoration;
    const shouldResetScroll = consumeInitialScrollReset(window as Window & ScrollResetWindowState);

    history.scrollRestoration = "manual";

    if (shouldResetScroll) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return () => {
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return null;
}
