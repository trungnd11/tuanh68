import type { AxiosError } from "axios";

type PurchaseGuideSignupTranslations = {
  (key: "signup.submitError"): string;
  (key: "signup.submitError400"): string;
  (key: "signup.submitError500"): string;
};

export function getPurchaseGuideSignupErrorMessage(error: unknown, t: PurchaseGuideSignupTranslations): string {
  const status = (error as { status?: number })?.status ?? (error as AxiosError)?.response?.status;

  if (status === 400) return t("signup.submitError400");
  if (status === 500) return t("signup.submitError500");

  return t("signup.submitError");
}
