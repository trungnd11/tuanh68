import plugin from "tailwindcss/plugin";
import { appColors } from "./color";
import { appBreakpoint } from "./breakpoint";
import { appBorderRadius } from "./border-radius";
import { appBorderWidth } from "./border-width";
import { appBlur } from "./blur";
import { appDropShadow } from "./drop-shadow";
import { appShadow } from "./shadow";
import { appFontWeight } from "./font-weight";
import { combinedUtils } from "./typography";
import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "main-app-red": appColors.mainAppRed,
        "main-app-text-red": appColors.mainAppTextRed,
        "main-app-yellow": appColors.mainAppYellow,
        "main-app-gray": appColors.mainAppGray,
        "main-app-green": appColors.mainAppGreen,
        "main-app-text-body": appColors.mainAppTextBody,
        "main-app-bg-content": appColors.mainAppBgContent,
        "main-app-bg-footer": appColors.mainAppBgFooter,
        "app-neutral": appColors.appNeutral,
        "app-primary": appColors.appGreen,
        "app-info": appColors.appBlue,
        "app-success": appColors.appGreen,
        "app-warning": appColors.appYellow,
        "app-danger": appColors.appRed,
        "app-slate": appColors.appSlate,
        "app-gray": appColors.appGray,
        "app-zinc": appColors.appZinc,
        "app-stone": appColors.appStone,
        "app-red": appColors.appRed,
        "app-orange": appColors.appOrange,
        "app-amber": appColors.appAmber,
        "app-yellow": appColors.appYellow,
        "app-lime": appColors.appLime,
        "app-emerald": appColors.appEmerald,
        "app-teal": appColors.appTeal,
        "app-brand-teal": appColors.appBrandTeal,
        "app-cyan": appColors.appCyan,
        "app-sky": appColors.appSky,
        "app-blue": appColors.appBlue,
        "app-indigo": appColors.appIndigo,
        "app-violet": appColors.appViolet,
        "app-purple": appColors.appPurple,
        "app-fuchsia": appColors.appFuchsia,
        "app-pink": appColors.appPink,
        "app-rose": appColors.appRose,
        "app-dark": appColors.appDark,
        "app-accent-blue": appColors.appAccentBlue,
        "app-hero-overlay": appColors.appHeroOverlay,
      },
      fontWeight: appFontWeight,
      borderRadius: appBorderRadius,
      borderWidth: appBorderWidth,
      boxShadow: appShadow,
      dropShadow: appDropShadow,
      blur: appBlur,
      fontSize: {
        xxs: ["10px", "14px"],
      },
    },
    screens: appBreakpoint,
    letterSpacing: {
      "px-01": "0.1px",
      "px-05": "0.5px",
      "px-1": "1px",
      "px-2": "2px",
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(combinedUtils, ["responsive", "hover"]);
    }),
  ],
};

export default tailwindConfig;
