export interface FontScaleItem {
  size: string;
  lineHeight: string;
}

export type FontScaleName =
  | "Scale 10"
  | "Scale 12"
  | "Scale 14"
  | "Scale 16"
  | "Scale 18"
  | "Scale 20"
  | "Scale 24"
  | "Scale 32"
  | "Scale 36"
  | "Scale 40"
  | "Scale 48"
  | "Scale 60"
  | "Scale 72"
  | "Scale 96"
  | "Scale 128";

export const appFontScales: Record<FontScaleName, FontScaleItem> = {
  "Scale 10": { size: 10 + "px", lineHeight: 14 + "px" },
  "Scale 12": { size: 12 + "px", lineHeight: 16 + "px" },
  "Scale 14": { size: 14 + "px", lineHeight: 20 + "px" },
  "Scale 16": { size: 16 + "px", lineHeight: 24 + "px" },
  "Scale 18": { size: 18 + "px", lineHeight: 28 + "px" },
  "Scale 20": { size: 20 + "px", lineHeight: 28 + "px" },
  "Scale 24": { size: 24 + "px", lineHeight: 32 + "px" },
  "Scale 32": { size: 32 + "px", lineHeight: 36 + "px" },
  "Scale 36": { size: 36 + "px", lineHeight: 40 + "px" },
  "Scale 40": { size: 40 + "px", lineHeight: 44 + "px" },
  "Scale 48": { size: 48 + "px", lineHeight: 48 + "px" },
  "Scale 60": { size: 60 + "px", lineHeight: 60 + "px" },
  "Scale 72": { size: 72 + "px", lineHeight: 72 + "px" },
  "Scale 96": { size: 96 + "px", lineHeight: 96 + "px" },
  "Scale 128": { size: 128 + "px", lineHeight: 128 + "px" },
};
