"use client";

import React, { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { loadHistoricalTvlByStage, TvlByStageData } from "@/lib/data/utils";

const chartConfig = {
  stage0: {
    label: "Stage 0",
    color: "#ef4444", // red-500
  },
  stage1: {
    label: "Stage 1",
    color: "#eab308", // yellow-500
  },
  stage2: {
    label: "Stage 2",
    color: "#22c55e", // green-500
  },
  other: {
    label: "Other",
    color: "#6b7280", // gray-500
  },
} satisfies ChartConfig;

type ChartProps = {
  className?: string;
};

const Chart: React.FC<ChartProps> = ({ className }) => {
  const [data, setData] = useState<TvlByStageData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadHistoricalTvlByStage();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <Card className={"w-2/3" + className}>
      <CardHeader>
        <div className="-mt-4 -mb-">
          <CardDescription>Total Value Locked (TVL) in DeFi</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value * 1000);
                return date.toLocaleDateString("en-US");
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              ticks={[50_000_000_000, 100_000_000_000, 180_000_000_000]}
              tick={{fontSize: 12 }}
              tickFormatter={(value) => {
                return `$${(value / 1_000_000_000).toFixed(0)}B`;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="other"
              stackId="1"
              fill="var(--color-other)"
              stroke="var(--color-other)"
            />
            <Area
              dataKey="stage0"
              stackId="1"
              fill="var(--color-stage0)"
              stroke="var(--color-stage0)"
            />
            <Area
              dataKey="stage1"
              stackId="1"
              fill="var(--color-stage1)"
              stroke="var(--color-stage1)"
            />
            <Area
              dataKey="stage2"
              stackId="1"
              fill="var(--color-stage2)"
              stroke="var(--color-stage2)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
