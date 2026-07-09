export { appDarkTheme, appLightTheme, getAppTheme } from "./appTheme";
export { appColors, appHexColors } from "./color";
export { appDropShadow } from "./drop-shadow";
export { appBreakpoint, appBreakpointValue } from "./breakpoint";
export { appBlur } from "./blur";
export { appBorderRadius } from "./border-radius";
export { appBorderWidth } from "./border-width";
export { appFontFamily } from "./font-family";
export { appFontWeight } from "./font-weight";
export { default as appTailwindConfig } from "./tailwind.config";
export type { AppThemeConfig } from "./appTheme";

export function hexToRgba(hex: string, opacity: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
