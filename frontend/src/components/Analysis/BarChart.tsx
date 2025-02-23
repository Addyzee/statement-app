"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 186 },
  { month: "February", desktop: 305,  mobile: 280 },
  { month: "March", desktop: 237, mobile: 80 },
  { month: "April", desktop: 73, mobile: 122 },
  { month: "May", desktop: 209, mobile: 222 },
  { month: "June", desktop: 214, mobile: 180 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#34a8eb",
  },
} satisfies ChartConfig;

export function MultipleBarChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-h-full">
      <BarChart layout="horizontal" accessibilityLayer data={chartData}>
      <XAxis
          dataKey="month"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <CartesianGrid horizontal={true} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
