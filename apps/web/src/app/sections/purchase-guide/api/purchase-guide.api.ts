import type { CreatePurchaseGuideResponse } from "@/app/sections/purchase-guide/api/purchase-guide.response";
import type { CreatePurchaseGuideRequest } from "@/app/sections/purchase-guide/api/purchase-guide.request";

export class PurchaseGuideApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "PurchaseGuideApiError";
    this.status = status;
    this.body = body;
  }
}

export const PurchaseGuideApi = {
  async create(payload: CreatePurchaseGuideRequest) {
    const response = await fetch("/api/customer-create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as CreatePurchaseGuideResponse;

    if (!response.ok) {
      throw new PurchaseGuideApiError("Failed to create purchase guide signup", response.status, data);
    }

    return data;
  },
};
