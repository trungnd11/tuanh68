import { useMutation } from "@tanstack/react-query";
import { PurchaseGuideApi } from "@/app/sections/purchase-guide/api/purchase-guide.api";
import { CreatePurchaseGuideRequest } from "@/app/sections/purchase-guide/api/purchase-guide.request";

export function usePurchaseGuideSignup() {
  return useMutation({
    mutationKey: ["usePurchaseGuideSignup"],
    mutationFn: (payload: CreatePurchaseGuideRequest) => PurchaseGuideApi.create(payload),
  });
}
