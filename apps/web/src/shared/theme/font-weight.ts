export const appFontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export type FontWeightKey = keyof typeof appFontWeight;
export type FontWeightValue = (typeof appFontWeight)[FontWeightKey];
