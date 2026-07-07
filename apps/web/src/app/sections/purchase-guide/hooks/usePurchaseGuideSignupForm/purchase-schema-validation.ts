import { z } from "zod";

const maxShareQuantity = 22_000_000;

type PurchaseGuideValidationMessages = {
  fullName: {
    required: string;
    min: string;
    regex: string;
  };
  phone: {
    required: string;
    invalid: string;
  };
  email: {
    required: string;
    invalid: string;
  };
  shareQuantity: {
    required: string;
    invalid: string;
    max: string;
    step: string;
  };
};

export function createFullNameSchema(messages: PurchaseGuideValidationMessages["fullName"]) {
  return z
    .string()
    .trim()
    .min(1, messages.required)
    .min(2, messages.min)
    .regex(/^[\p{L}\s]+$/u, messages.regex);
}

export function createPhoneSchema(messages: PurchaseGuideValidationMessages["phone"]) {
  return z
    .string()
    .trim()
    .min(1, messages.required)
    .regex(/^(0|\+84)\d{9,10}$/, messages.invalid);
}

export function createEmailSchema(messages: PurchaseGuideValidationMessages["email"]) {
  return z.string().trim().min(1, messages.required).email(messages.invalid);
}

export function createStockQuantitySchema(messages: PurchaseGuideValidationMessages["shareQuantity"]) {
  return z
    .string()
    .trim()
    .min(1, messages.required)
    .refine((value) => /^\d+$/.test(value), messages.invalid)
    .refine((value) => Number(value) <= maxShareQuantity, messages.max)
    .refine((value) => Number(value) % 100 === 0, messages.step);
}

export const referralCodeSchema = z.string();

export function createPurchaseGuideSignupFormSchema(messages: PurchaseGuideValidationMessages) {
  return z.object({
    FullName: createFullNameSchema(messages.fullName),
    Phone: createPhoneSchema(messages.phone),
    Email: createEmailSchema(messages.email),
    ShareQuantity: createStockQuantitySchema(messages.shareQuantity),
    ReferralCode: referralCodeSchema,
  });
}

export type PurchaseGuideSignupFormValues = z.infer<ReturnType<typeof createPurchaseGuideSignupFormSchema>>;
