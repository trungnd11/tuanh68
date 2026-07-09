export const appBreakpoint = {
  xxs: { min: "320px", max: "375px" },
  xs: { min: "376px", max: "575px" },
  sm: { min: "576px" },
  md: { min: "768px" },
  lg: { min: "992px" },
  xl: { min: "1200px" },
  xxl: { min: "1600px" },
} as const;

export const appBreakpointValue = {
  xxs: 320,
  xs: 376,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;
