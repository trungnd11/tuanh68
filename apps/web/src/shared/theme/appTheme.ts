import { appBorderRadius } from "./border-radius";
import { appHexColors } from "./color";
import { appFontFamily } from "./font-family";
import { appFontWeight } from "./font-weight";
import { appShadow } from "./shadow";
import { appFontScales } from "./font-size";

type ThemeTokenValues = Record<string, unknown>;
type ComponentTokenValues = Record<string, unknown>;
type ComponentTokenMap = Record<string, ComponentTokenValues>;
type ThemeConfig = {
  token?: ThemeTokenValues;
  components?: ComponentTokenMap;
};

export const appSwitchHandleSize = {
  default: {
    width: 24,
    height: 18,
  },
  small: {
    width: 20,
    height: 16,
  },
} as const;

export interface AppThemeComponentTokenMap extends ComponentTokenMap {
  Menu: ComponentTokenMap["Menu"] & {
    subMenuItemSelectedColor?: string;
    darkSubMenuItemSelectedColor?: string;
  };
  Pagination: ComponentTokenMap["Pagination"] & {
    borderRadiusSM?: number;
    borderRadiusLG?: number;
    borderRadiusXL?: number;
    inputHeightSM?: number;
    inputHeightLG?: number;
    inputHeightXL?: number;
  };
  Table: ComponentTokenMap["Table"] & {
    borderRadiusSM?: number;
    borderRadiusMD?: number;
    borderRadiusLD?: number;
    stripedBg?: string;
    footerPaddingBlock?: number;
    footerPaddingBlockMD?: number;
    footerPaddingBlockSM?: number;
    footerPaddingInline?: number;
    footerPaddingInlineMD?: number;
    footerPaddingInlineSM?: number;
  };
  Tabs: ComponentTokenMap["Tabs"] & {
    cardHideBorder?: boolean;
    verticalCardGutter?: number;
    verticalBorderRadius?: number;
    verticalBorderRadiusLG?: number;
    verticalCardBg?: string;
    verticalCardBgActive?: string;
  };
  Upload: ComponentTokenMap["Upload"] & {
    errorBorderColor?: string;
  };
  Switch: ComponentTokenMap["Switch"] & {
    handleWidth?: number;
    handleHeight?: number;
    handleWidthSM?: number;
    handleHeightSM?: number;
  };
  Input: ComponentTokenMap["Input"] & {
    iconsMargin: number;
  };
}

export type AppThemeConfig = Omit<ThemeConfig, "components"> & {
  components?: Partial<AppThemeComponentTokenMap>;
};

function remToPx(value: string): number {
  return Number.parseFloat(value) * 16;
}

function mergeThemeComponents(
  base: Partial<AppThemeComponentTokenMap> = {},
  overrides: Partial<AppThemeComponentTokenMap> = {}
): Partial<AppThemeComponentTokenMap> {
  const mergedEntries = Object.keys({ ...base, ...overrides }).map((key) => {
    const componentKey = key as keyof AppThemeComponentTokenMap;
    return [
      componentKey,
      {
        ...(base[componentKey] ?? {}),
        ...(overrides[componentKey] ?? {}),
      },
    ];
  });

  return Object.fromEntries(mergedEntries) as Partial<AppThemeComponentTokenMap>;
}

function extendTheme(base: AppThemeConfig, overrides: AppThemeConfig): AppThemeConfig {
  return {
    ...base,
    ...overrides,
    token: {
      ...(base.token ?? {}),
      ...(overrides.token ?? {}),
    },
    components: mergeThemeComponents(base.components, overrides.components),
  };
}

const commonTheme: AppThemeConfig = {
  token: {
    borderRadius: remToPx(appBorderRadius.lg),
    fontFamily: appFontFamily.default,
    fontSize: 14,
    controlHeightSM: 36,
    controlHeight: 40,
    controlHeightLG: 44,
  },
  components: {
    Button: {
      primaryShadow: appShadow.sm,
      iconGap: 8,
      fontWeight: appFontWeight.medium,
      contentFontSize: appFontScales["Scale 16"].size,
      contentFontSizeLG: appFontScales["Scale 18"].size,
      contentLineHeightSM: appFontScales["Scale 20"].size,
      contentLineHeight: 24,
      contentLineHeightLG: 28,
      paddingInlineSM: 15,
      paddingInlineLG: 19,
      onlyIconSizeLG: 20,
      colorBgContainerDisabled: appHexColors.appNeutral[200],
    },
    Menu: {
      iconSize: appFontScales["Scale 20"].size,
      collapsedIconSize: appFontScales["Scale 20"].size,
      subMenuItemBg: appHexColors.appNeutral[50],
      itemSelectedBg: appHexColors.appGreen[50],
      itemSelectedColor: appHexColors.appGreen[500],
      subMenuItemSelectedColor: appHexColors.appGreen[500],
      itemHoverBg: appHexColors.appNeutral[200],
      itemColor: appHexColors.appNeutral[950],
      iconMarginInlineEnd: 8,
    },
    Breadcrumb: {
      separatorMargin: 12,
    },
    Divider: {
      textPaddingInline: 8,
    },
    Checkbox: {
      borderRadius: remToPx(appBorderRadius.md),
    },
    Pagination: {
      borderRadiusSM: 6,
      borderRadiusLG: 8,
      borderRadiusXL: 12,
      inputHeightSM: 28,
      inputHeightLG: 32,
      inputHeightXL: 36,
      colorText: appHexColors.appNeutral[700],
      colorPrimary: appHexColors.appGreen[500],
    },
    Form: {
      itemMarginBottom: 0,
    },
    Select: {
      controlItemBgActive: appHexColors.appGreen[50],
      multipleItemBg: appHexColors.appNeutral[100],
    },
    Table: {
      borderRadiusSM: 8,
      borderRadiusMD: 10,
      borderRadiusLD: 12,
      cellPaddingBlock: 15,
      cellPaddingBlockMD: 13,
      cellPaddingBlockSM: 11,
      cellPaddingInline: 18,
      cellPaddingInlineMD: 16,
      cellPaddingInlineSM: 14,
      footerPaddingBlock: 10,
      footerPaddingBlockMD: 8,
      footerPaddingBlockSM: 6,
      footerPaddingInline: 18,
      footerPaddingInlineMD: 16,
      footerPaddingInlineSM: 14,
      colorBgContainer: appHexColors.white,
      colorText: appHexColors.appNeutral[950],
      colorIcon: appHexColors.appNeutral[950],
      borderColor: appHexColors.appNeutral[200],
      stripedBg: appHexColors.appNeutral[50],
      headerSplitColor: appHexColors.appNeutral[300],
      headerBg: appHexColors.appNeutral[100],
      headerColor: appHexColors.appNeutral[950],
      footerBg: appHexColors.white,
      footerColor: appHexColors.appNeutral[950],
    },
    Upload: {
      errorBorderColor: appHexColors.appRed[500],
    },
    DatePicker: {
      cellActiveWithRangeBg: appHexColors.appGreen[100],
    },
    Tabs: {
      cardBg: appHexColors.white,
      cardGutter: 0,
      borderRadius: 0,
      borderRadiusLG: 0,
      verticalCardGutter: 2,
      verticalBorderRadius: 8,
      verticalBorderRadiusLG: 8,
      verticalCardBg: appHexColors.appNeutral[50],
      verticalCardBgActive: appHexColors.white,
      cardHideBorder: true,
      inkBarColor: appHexColors.appGreen[500],
      itemActiveColor: appHexColors.appGreen[500],
    },
    Drawer: {
      colorBgTextActive: appHexColors.white,
    },
    Switch: {
      handleBg: appHexColors.white,
      handleWidth: appSwitchHandleSize.default.width,
      handleHeight: appSwitchHandleSize.default.height,
      handleWidthSM: appSwitchHandleSize.small.width,
      handleHeightSM: appSwitchHandleSize.small.height,
    },
    Input: {
      iconsMargin: 8,
    },
  },
};

const appLightTheme = extendTheme(commonTheme, {
  token: {
    colorPrimary: appHexColors.appGreen[500],
    colorBgElevated: appHexColors.white,
    colorBgContainer: appHexColors.white,
    colorBgContainerDisabled: appHexColors.appNeutral[100],
    colorText: appHexColors.appNeutral[950],
    colorIcon: appHexColors.appNeutral[950],
    colorTextDisabled: appHexColors.appNeutral[400],
    colorBorder: appHexColors.appNeutral[300],
    colorError: appHexColors.appRed[500],
    colorTextPlaceholder: appHexColors.appNeutral[400],
    colorBorderSecondary: appHexColors.appNeutral[300],
  },
});

const appDarkTheme = extendTheme(commonTheme, {
  token: {
    colorPrimary: appHexColors.appGreen[300],
    colorBgElevated: appHexColors.appNeutral[800],
    colorBgContainer: appHexColors.appNeutral[900],
    colorBgContainerDisabled: appHexColors.appNeutral[800],
    colorText: appHexColors.white,
    colorIcon: appHexColors.white,
    colorTextDisabled: appHexColors.appNeutral[600],
    colorBorder: appHexColors.appNeutral[700],
    colorError: appHexColors.appRed[300],
    colorTextPlaceholder: appHexColors.appNeutral[600],
    colorBorderSecondary: appHexColors.appNeutral[700],
  },
  components: {
    Layout: {
      triggerBg: "#001529",
    },
    Breadcrumb: {},
    Menu: {
      darkSubMenuItemBg: appHexColors.appNeutral[950],
      darkItemSelectedBg: appHexColors.appGreen[500],
      darkItemSelectedColor: appHexColors.white,
      darkSubMenuItemSelectedColor: appHexColors.white,
      darkItemHoverBg: appHexColors.appNeutral[800],
      darkItemColor: appHexColors.appNeutral[400],
    },
    Pagination: {
      colorText: appHexColors.appNeutral[300],
      colorPrimary: appHexColors.appGreen[300],
    },
    Select: {
      controlItemBgActive: appHexColors.appGreen[950],
      multipleItemBg: appHexColors.appNeutral[400],
    },
    Table: {
      colorBgContainer: appHexColors.appNeutral[900],
      colorText: appHexColors.white,
      colorIcon: appHexColors.white,
      borderColor: appHexColors.appNeutral[700],
      stripedBg: appHexColors.appNeutral[800],
      headerSplitColor: appHexColors.appNeutral[600],
      headerBg: appHexColors.appNeutral[800],
      headerColor: appHexColors.appNeutral[400],
      footerBg: appHexColors.appNeutral[800],
      footerColor: appHexColors.appNeutral[400],
    },
    Upload: {
      errorBorderColor: appHexColors.appRed[300],
    },
    DatePicker: {
      cellActiveWithRangeBg: appHexColors.appGreen[600],
    },
    Tabs: {
      cardBg: appHexColors.appNeutral[900],
      cardGutter: 0,
      borderRadius: 0,
      borderRadiusLG: 0,
      cardHideBorder: true,
      verticalCardBg: appHexColors.appNeutral[900],
      verticalCardBgActive: appHexColors.appNeutral[900],
      inkBarColor: appHexColors.appGreen[300],
      itemActiveColor: appHexColors.appGreen[300],
    },
    Drawer: {
      colorBgElevated: appHexColors.appNeutral[900],
    },
    Switch: {
      handleBg: appHexColors.appNeutral[950],
    },
  },
});

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function getAppTheme(): Promise<AppThemeConfig> {
  const data = await fetch("http://localhost:8089/antd/config");
  if (!data.ok) {
    throw new Error(`Failed to load theme config: ${data.status}`);
  }

  const json: unknown = await data.json();
  if (!isPlainObject(json)) {
    return {};
  }

  const token = isPlainObject(json.token) ? (json.token as ThemeTokenValues) : {};
  const components = isPlainObject(json.components) ? (json.components as Partial<AppThemeComponentTokenMap>) : {};

  return {
    ...(json as AppThemeConfig),
    token,
    components,
  };
}

export { appLightTheme, appDarkTheme };
