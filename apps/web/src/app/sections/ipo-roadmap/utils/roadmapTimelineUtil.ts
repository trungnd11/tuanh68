import { appColors, hexToRgba } from "@/shared/theme";
import { ipoRoadmapItems } from "@/app/sections/ipo-roadmap/data";

export const RoadmapTimelineUtil = {
  ROADMAP_COLORS: {
    default: {
      fill: appColors.white,
      stroke: appColors.gray[200],
    },
    active: {
      fill: appColors.appGreen[500],
      stroke: appColors.appGreen[500],
    },
    success: {
      fill: appColors.appGreen[50],
      stroke: hexToRgba(appColors.appGreen[500], 0.5),
    },
  },

  isItemActive(index: number) {
    return Boolean(ipoRoadmapItems[index]?.isActive);
  },

  getShapeColors(index: number) {
    const activeIndex = ipoRoadmapItems.findIndex((_, itemIndex) => this.isItemActive(itemIndex));
    const successIndex = ipoRoadmapItems.findLastIndex((item) => item.isSuccess);

    if (successIndex !== -1 && index <= successIndex) {
      return this.ROADMAP_COLORS.success;
    }

    if (index === activeIndex) {
      return this.ROADMAP_COLORS.active;
    }

    return this.ROADMAP_COLORS.default;
  },

  renderShape(isFirst: boolean, isLast: boolean, fill: string, stroke: string) {
    if (isFirst) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="180.6" height="72" viewBox="0 0 180.6 72" fill="none" overflow="visible">
        <g transform="translate(0 -1) scale(1.0022927487 1)" filter="url(#shadow_first)">
          <path
            d="M4 1H162.25C163.831 1 165.263 1.93095 165.905 3.37548L180.127 35.375C180.586 36.4093 180.586 37.5907 180.127 38.625L165.905 70.6245C165.263 72.069 163.831 73 162.25 73H4C1.79086 73 0 71.2091 0 69V5C0 2.79086 1.79086 1 4 1Z"
            fill="${fill}"
            stroke="${stroke}"
            stroke-width="1"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </g>
        <defs>
          <filter id="shadow_first" x="-2" y="0" width="184.6" height="74" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#374151" flood-opacity="0.08"/>
          </filter>
        </defs>
      </svg>`;
    }

    if (isLast) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="162" height="72" viewBox="1 1 164 72" fill="none" overflow="visible">
        <g filter="url(#shadow_last)">
          <path
            d="M164.849 69C164.849 71.2091 163.059 73 160.849 73H6.00451C3.10985 73 1.17362 70.0206 2.34928 67.3754L15.1277 38.625C15.5873 37.5908 15.5873 36.4092 15.1277 35.375L2.34928 6.6246C1.17361 3.97944 3.10985 1 6.00451 1H160.849C163.059 1 164.849 2.79086 164.849 5V69Z"
            fill="${fill}"
            stroke="${stroke}"
            stroke-width="1"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </g>
        <defs>
          <filter id="shadow_last" x="-2" y="0" width="169" height="74" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#374151" flood-opacity="0.08"/>
          </filter>
        </defs>
      </svg>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="178.5" height="72" viewBox="0 0 178.5 72" fill="none" overflow="visible">
      <g transform="translate(-1.17362 -1) scale(0.9949148049 1)" filter="url(#shadow_middle)">
        <path
          d="M162.25 1C163.831 1 165.263 1.93095 165.905 3.37548L180.127 35.375C180.586 36.4093 180.586 37.5907 180.127 38.625L165.905 70.6245C165.263 72.069 163.831 73 162.25 73H6.00451C3.10985 73 1.17362 70.0206 2.34928 67.3754L15.1277 38.625C15.5873 37.5908 15.5873 36.4092 15.1277 35.375L2.34928 6.6246C1.17361 3.97944 3.10985 1 6.00451 1H162.25Z"
          fill="${fill}"
          stroke="${stroke}"
          stroke-width="1"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
      <defs>
        <filter id="shadow_middle" x="-2" y="0" width="182.5" height="74" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#374151" flood-opacity="0.08"/>
        </filter>
      </defs>
    </svg>`;
  },
};
