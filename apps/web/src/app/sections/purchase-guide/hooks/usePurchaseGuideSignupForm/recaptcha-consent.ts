export const purchaseGuideRecaptchaConsentStorageKey = "purchase-guide:recaptcha-consent";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function hasAcceptedPurchaseGuideRecaptchaConsent(storage: StorageLike) {
  return storage.getItem(purchaseGuideRecaptchaConsentStorageKey) === "accepted";
}

export function acceptPurchaseGuideRecaptchaConsent(storage: StorageLike) {
  storage.setItem(purchaseGuideRecaptchaConsentStorageKey, "accepted");
}
