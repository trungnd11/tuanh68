export const appConfig = {
  siteName: process.env.SITE_NAME ?? "",
  siteUrl: process.env.SITE_URL ?? "",
  reCaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
  disableRecaptchaForPentest: process.env.NEXT_PUBLIC_DISABLE_RECAPTCHA_FOR_PENTEST === "true",
  ipoUrl: process.env.NEXT_PUBLIC_IPO_URL ?? "",
  guideUrl: process.env.NEXT_PUBLIC_GUIDE_URL ?? "",
  investorDocumentBaseUrl: process.env.NEXT_PUBLIC_INVESTOR_DOCUMENT_BASE_URL ?? "",
};

export const appAnchorIds = {
  purchaseGuideSignupPanel: "purchase-guide-signup-panel",
} as const;

export { appSectionIds, appSectionNavigatorItems, appSectionTitles } from "./section-config";
