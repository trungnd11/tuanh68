export type ScrollResetWindowState = {
  __APP_SCROLL_RESET_DONE__?: boolean;
};

export function consumeInitialScrollReset(target: ScrollResetWindowState) {
  if (target.__APP_SCROLL_RESET_DONE__) {
    return false;
  }

  target.__APP_SCROLL_RESET_DONE__ = true;
  return true;
}
