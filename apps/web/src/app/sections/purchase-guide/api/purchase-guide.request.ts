export interface CreatePurchaseGuideRequest {
  FullName: string;
  Phone: string;
  Email: string;
  ShareQuantity: string;
  CaptchaToken: string;
  PurposeCode?: string;
  Action?: number;
  Channel?: number;
  InteractionType?: number;
  SessionId?: string;
  ScreenCode?: string;
  ReferralCode?: string;
  BrowserAgent?: string;
  DeviceAgent?: string;
  IPAddress?: string;
}
