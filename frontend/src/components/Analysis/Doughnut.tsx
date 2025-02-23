"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import ChartData from "./ChartDataExample.json";
import { capitalizeFirstLetter } from "./Utils";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = ChartData.map((chartObject, idx) => ({
  ...chartObject,
  fill: `var(--chart-${idx + 1})`,
}));

const chartHeaders: string[] = chartData.map(
  (chartObject) => chartObject.browser
);



const chartConfig = {
  visitors: { label: "Visitors" },
  ...Object.fromEntries(
    chartHeaders.map((chartHeader, idx) => [
      chartHeader,
      {
        label: capitalizeFirstLetter(chartHeader),
        color: `var(--chart-${idx + 1})`,
      },
    ])
  ),
} satisfies ChartConfig;

export function Doughnut() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] text-white"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-background text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
