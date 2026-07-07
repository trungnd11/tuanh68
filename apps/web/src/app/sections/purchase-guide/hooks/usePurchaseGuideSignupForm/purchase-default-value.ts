import type { PurchaseGuideSignupFormValues } from "./purchase-schema-validation";

export const purchaseDefaultValue = {
  Email: "",
  FullName: "",
  Phone: "",
  ShareQuantity: "",
  ReferralCode: "",
} satisfies PurchaseGuideSignupFormValues;
