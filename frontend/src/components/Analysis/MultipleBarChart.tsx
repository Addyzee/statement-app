"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Rectangle } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface MonthlyTransaction {
  Month: string | null;
  In: number | null;
  Out: number | null;
}

interface BarChartProps {
  chartData: MonthlyTransaction[];
}

export function MultipleBarChart({ chartData }: BarChartProps) {
  if (chartData.length === 0) {
    return <p>No data available</p>;
  }
  const [labelKey, valueKey1, valueKey2] = Object.keys(chartData[0]);
  const chartConfig = {
    [valueKey1]: {
      label: [valueKey1],
      color: "var(--chart-2)",
    },
    [valueKey2]: {
      label: [valueKey2],
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="w-full border-0 bg-transparent text-white">
      <CardHeader>
        <CardDescription>
          {chartData[0].Month} - {chartData[chartData.length - 1].Month}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full flex justify-start"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={labelKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 8)}
            />
              <YAxis  orientation="left" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="In"  fill={`var(--color-${valueKey1})`} radius={4} activeBar={<Rectangle stroke="white" />}/>
            <Bar dataKey="Out" fill={`var(--color-${valueKey2})`} radius={4} activeBar={<Rectangle stroke="white" />}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
