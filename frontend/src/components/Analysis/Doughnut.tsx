"use client";

import * as React from "react";
import { Label, Legend, Pie, PieChart } from "recharts";
import { capitalizeFirstLetter } from "./Utils";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the base data structure type
interface ChartDataItem {
  [key: string]: string | number;
  fill: string;
}

interface DoughnutProps {
  data: Omit<ChartDataItem, "fill">[];
}

export function Doughnut({ data }: DoughnutProps) {
  const total = React.useMemo(() => {
    if (data.length === 0) return 0;

    const [, valueKey] = Object.keys(data[0]); // Extract value key inside useMemo

    return data.reduce((acc, curr) => acc + Number(curr[valueKey]), 0);
  }, [data]);

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  // Get the keys from the first data object
  const [labelKey, valueKey] = Object.keys(data[0]);

  // Add fill colors to the data
  const chartData: ChartDataItem[] = data.map((item, idx) => ({
    ...item,
    fill: `var(--chart-${(idx % 10) + 1})`,
  }));

  // Get unique labels from the data
  const chartHeaders: string[] = chartData.map((item) =>
    String(item[labelKey])
  );

  // Create dynamic chart config
  const chartConfig = {
    [valueKey]: { label: capitalizeFirstLetter(valueKey) },
    ...Object.fromEntries(
      chartHeaders.map((header, idx) => [
        header,
        {
          label: capitalizeFirstLetter(header),
          color: `var(--chart-${(idx % 10) + 1})`,
        },
      ])
    ),
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px] text-white"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Legend 
          verticalAlign="bottom"
          align="left"
          layout="horizontal"
        />
        <Pie
          data={chartData}
          dataKey={valueKey}
          nameKey={labelKey}
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
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      KSh
                    </tspan>
                  
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-background text-3xl font-bold"
                    >
                      {total.toLocaleString()}
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
