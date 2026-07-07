import { appConfig } from "@/shared/config/app";
import { CreatePurchaseGuideRequest } from "@/app/sections/purchase-guide/api/purchase-guide.request";
import { CreatePurchaseGuideResponse } from "@/app/sections/purchase-guide/api/purchase-guide.response";

export async function POST(request: Request) {
  const body: CreatePurchaseGuideRequest = await request.json();

  const response = await fetch(`${appConfig.ipoUrl}/Customer/Create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: CreatePurchaseGuideResponse = await response.json();

  return Response.json(data, { status: response.status });
}
