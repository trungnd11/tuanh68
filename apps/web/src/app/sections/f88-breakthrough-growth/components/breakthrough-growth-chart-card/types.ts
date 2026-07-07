export type TickProps = {
  x?: number;
  y?: number;
  payload?: { value: string | number };
};

export type ChartTooltipEntry = {
  color?: string;
  dataKey?: string | number;
  name?: string;
  value?: string | number;
};

type ChartSeries = {
  key: string;
  label: string;
  color: string;
  type: "bar" | "line";
};

export type ChartConfig = {
  data: Array<Record<string, number | string | boolean>>;
  yTicks: number[];
  rightYTicks: number[];
  series: ChartSeries[];
};

export type BreakthroughGrowthChartProps = {
  config: ChartConfig;
  footnote: string | null;
  barSize: number;
  tooltipUnit: string;
};

export type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: ChartTooltipEntry[];
  unit: string;
};
