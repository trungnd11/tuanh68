type NavigatorMetadata = Pick<Navigator, "userAgent" | "platform">;

interface PurchaseGuideClientMetadata {
  BrowserAgent: string;
  DeviceAgent: string;
}

export function getPurchaseGuideClientMetadata(navigatorMetadata?: NavigatorMetadata): PurchaseGuideClientMetadata {
  const currentNavigator = navigatorMetadata ?? (typeof navigator !== "undefined" ? navigator : undefined);

  return {
    BrowserAgent: currentNavigator?.userAgent ?? "",
    DeviceAgent: currentNavigator?.platform ?? "",
  };
}
