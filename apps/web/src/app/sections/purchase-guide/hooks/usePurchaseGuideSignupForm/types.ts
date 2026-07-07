import type { CreatePurchaseGuideRequest } from "@/app/sections/purchase-guide/api/purchase-guide.request";

export type CreatePurchaseGuideForm = Pick<
  CreatePurchaseGuideRequest,
  "FullName" | "Email" | "Phone" | "ShareQuantity" | "ReferralCode"
>;
