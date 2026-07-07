import { ConsentActionConstant } from "@/app/sections/purchase-guide/constants/consent-action.constant";
import { ConsentChanelConstant } from "@/app/sections/purchase-guide/constants/consent-chanel.constant";
import { ConsentInteractionTypeConstant } from "@/app/sections/purchase-guide/constants/consent-interaction-type.constant";
import { ConsentPurposeConstant } from "@/app/sections/purchase-guide/constants/consent-purpose-constant";
import { ScreenCodeConstant } from "@/app/sections/purchase-guide/constants/screen-code.constant";
import type { CreatePurchaseGuideRequest } from "@/app/sections/purchase-guide/api/purchase-guide.request";
import { appConfig } from "@/shared/config/app";
import { executeRecaptcha, purchaseGuideRecaptchaAction } from "@/shared/utils/recaptcha";
import { getPurchaseGuideClientMetadata } from "./purchase-guide-client-metadata";
import type { CreatePurchaseGuideForm } from "./types";

export async function buildCreatePurchaseGuidePayload(
  value: CreatePurchaseGuideForm
): Promise<CreatePurchaseGuideRequest> {
  const captchaToken = appConfig.disableRecaptchaForPentest ? "" : await executeRecaptcha(purchaseGuideRecaptchaAction);

  return {
    ...value,
    CaptchaToken: captchaToken,
    PurposeCode: ConsentPurposeConstant.Marketing,
    Action: ConsentActionConstant.Granted,
    Channel: ConsentChanelConstant.Web,
    InteractionType: ConsentInteractionTypeConstant.CheckboxSubmit,
    ScreenCode: ScreenCodeConstant.IPORegister,
    SessionId: crypto.randomUUID(),
    ...getPurchaseGuideClientMetadata(),
  };
}
