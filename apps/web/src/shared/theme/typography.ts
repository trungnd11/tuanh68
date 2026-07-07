import { appFontScales, FontScaleName } from "./font-size";
import { appFontWeight, FontWeightKey, FontWeightValue } from "./font-weight";
import { appColors } from "./color";

export interface TypographyStyle {
  scale: FontScaleName;
  weights: FontWeightKey[];
}

const typographyMap: Record<string, TypographyStyle> = {
  ".text-code-sm": { scale: "Scale 14", weights: ["regular"] },
  ".text-code-base": { scale: "Scale 18", weights: ["regular"] },
  ".text-code-lg": { scale: "Scale 20", weights: ["regular"] },
  ".text-body-xs": {
    scale: "Scale 12",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-body-sm": {
    scale: "Scale 14",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-body-base": {
    scale: "Scale 16",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-body-lg": {
    scale: "Scale 18",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-body-xl": {
    scale: "Scale 14",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-subheading-sm": { scale: "Scale 16", weights: ["regular"] },
  ".text-subheading-base": { scale: "Scale 20", weights: ["regular"] },
  ".text-subheading-lg": { scale: "Scale 20", weights: ["regular"] },
  ".text-heading-sm": {
    scale: "Scale 20",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-heading-base": {
    scale: "Scale 24",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-heading-lg": {
    scale: "Scale 32",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-subtitle-sm": { scale: "Scale 24", weights: ["regular"] },
  ".text-subtitle-base": {
    scale: "Scale 32",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-subtitle-lg": {
    scale: "Scale 40",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-titlepage-sm": {
    scale: "Scale 40",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-titlepage-base": {
    scale: "Scale 48",
    weights: ["regular", "medium", "semibold", "bold"],
  },
  ".text-titlepage-lg": { scale: "Scale 60", weights: ["regular"] },
  ".text-titlehero": {
    scale: "Scale 72",
    weights: ["regular", "medium", "semibold", "bold"],
  },
};

const textColorMap = {
  default: { dark: "#ffffff", light: appColors.gray["950"] },
};

export const typographyUtils: Record<string, { fontSize: string; lineHeight: string; fontWeight: FontWeightValue }> =
  Object.entries(typographyMap).reduce(
    (acc, [prefix, { scale, weights }]) => {
      weights.forEach((weight) => {
        const className = `${prefix}-${weight}`;
        acc[className] = {
          fontSize: appFontScales[scale].size,
          lineHeight: appFontScales[scale].lineHeight,
          fontWeight: appFontWeight[weight],
        };
      });
      return acc;
    },
    {} as Record<string, { fontSize: string; lineHeight: string; fontWeight: FontWeightValue }>
  );

export const textUtils = Object.entries(textColorMap).reduce(
  (acc, [name, { light, dark }]) => {
    acc[`.text-${name}`] = { color: light };
    acc[`.dark .text-${name}`] = { color: dark };
    return acc;
  },
  {} as Record<string, { color: string }>
);

export const combinedUtils = {
  ...typographyUtils,
  ...textUtils,
};
