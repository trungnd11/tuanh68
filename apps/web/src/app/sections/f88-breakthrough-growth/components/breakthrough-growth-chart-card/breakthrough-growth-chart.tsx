"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import clsx from "clsx";
import type { BreakthroughGrowthChartProps, ChartTooltipProps, TickProps } from "./types";

export default function BreakthroughGrowthChart({
  config,
  footnote,
  barSize,
  tooltipUnit,
}: BreakthroughGrowthChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-70 w-full md:h-93.75" />;
  }

  return (
    <>
      <div className="h-70 w-full md:h-93.75">
        <ResponsiveContainer width="100%" height="100%" minHeight={280}>
          <ComposedChart data={config.data} margin={{ top: 16, right: 8, left: 4, bottom: 8 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00844A" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#00844A" stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#eef2f6" strokeDasharray="2 4" vertical horizontal />

            <ReferenceArea x1="2026F" x2="2030F" fill="#90a1b9" fillOpacity={0.12} />

            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={<AxisYearTick />} interval={0} />

            <YAxis
              yAxisId="left"
              domain={[0, 18000]}
              ticks={config.yTicks}
              tickLine={false}
              axisLine={false}
              width={56}
              tick={<AxisLeftValueTick />}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 33000]}
              ticks={config.rightYTicks}
              tickLine={false}
              axisLine={false}
              width={52}
              tick={<AxisRightValueTick />}
            />

            <Tooltip
              content={(props: any) => <ChartTooltip {...props} unit={tooltipUnit} />}
              cursor={{ fill: "#f0f0f0" }}
            />

            <Bar
              yAxisId="left"
              dataKey="revenue"
              name={config.series[0].label}
              fill="url(#revenueGradient)"
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />

            <Bar
              yAxisId="left"
              dataKey="profit"
              name={config.series[1].label}
              fill="url(#profitGradient)"
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="loanBook"
              name={config.series[2].label}
              stroke="#7c3aed"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#7c3aed", stroke: "#7c3aed" }}
              activeDot={{ r: 5.5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {footnote && (
        <p className="px-2.75 pt-4 pb-2 text-center text-xs text-body-sm-medium text-app-neutral-400">{footnote}</p>
      )}
    </>
  );
}

function ChartTooltip({ active, label, payload, unit }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl bg-[#1A1828] p-3 text-white shadow-[0_10px_30px_rgba(3,7,18,0.08)]">
      <p className="text-body-base-semibold">{label}</p>
      <div className="mt-2 flex flex-col gap-2">
        {payload.map((entry) => (
          <div
            key={String(entry.dataKey ?? entry.name)}
            className="flex items-center gap-2.5 text-xs font-semibold leading-4"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.color ?? "#9ca3af" }} />
            <span className="text-app-neutral-300">{entry.name}:</span>
            <span>
              {entry.value} {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AxisYearTick({ x = 0, y = 0, payload }: TickProps) {
  const isForecast = String(payload?.value).endsWith("F");
  return (
    <text
      x={x}
      y={y + 16}
      textAnchor="middle"
      className={clsx(
        "text-[12px]",
        isForecast ? "fill-[#7c3aed] font-semibold" : "fill-app-neutral-950 font-semibold"
      )}
    >
      {payload?.value}
    </text>
  );
}

function AxisLeftValueTick({ x = 0, y = 0, payload }: TickProps) {
  return (
    <text x={x - 8} y={y + 4} textAnchor="end" className="fill-app-neutral-950 text-[12px] font-medium">
      {Number(payload?.value ?? 0).toLocaleString()}
    </text>
  );
}

function AxisRightValueTick({ x = 0, y = 0, payload }: TickProps) {
  return (
    <text x={x + 8} y={y + 4} textAnchor="start" className="fill-[#7c3aed] text-[12px] font-medium">
      {Number(payload?.value ?? 0).toLocaleString()}
    </text>
  );
}
