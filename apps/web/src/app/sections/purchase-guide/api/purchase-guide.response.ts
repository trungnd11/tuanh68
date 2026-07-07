import { CreatePurchaseGuideRequest } from "@/app/sections/purchase-guide/api/purchase-guide.request";

export interface CreatePurchaseGuideResponse extends CreatePurchaseGuideRequest {
  Id: number;
  CreatedAt: string;
}
