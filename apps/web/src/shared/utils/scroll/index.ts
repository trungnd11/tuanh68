import { appAnchorIds } from "@/shared/config/app";

type ScrollToElementOptions = {
  behavior?: ScrollBehavior;
  offsetTop?: number;
};

export function scrollToElementById(elementId: string, options: ScrollToElementOptions = {}) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const targetElement = document.getElementById(elementId);

  if (!targetElement) {
    return;
  }

  const { behavior = "smooth", offsetTop = 0 } = options;
  const top = targetElement.getBoundingClientRect().top + window.scrollY - offsetTop;

  window.scrollTo({
    top,
    behavior,
  });
}

export function scrollToPurchaseForm() {
  scrollToElementById(appAnchorIds.purchaseGuideSignupPanel, {
    offsetTop: 120,
  });
}
