"use client";

import { PieChart, Pie, Cell, Label } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { CollateralData } from "@/lib/review-page/types";

interface ConcentricDonutChartProps {
  data: CollateralData;
  className?: string;
}

function formatUsd(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

export function ConcentricDonutChart({
  data,
  className,
}: ConcentricDonutChartProps) {
  const chartConfig = {} satisfies ChartConfig;

  return (
    <div className={className}>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-[280px] md:h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel className="min-w-[8rem]" />}
          />

          {/* Outer ring: categories */}
          <Pie
            data={data.categories}
            dataKey="value"
            nameKey="name"
            outerRadius="90%"
            innerRadius="70%"
            paddingAngle={2}
            cornerRadius={4}
            strokeWidth={0}
          >
            {data.categories.map((entry, index) => (
              <Cell key={`cat-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Inner ring: individual assets */}
          <Pie
            data={data.assets}
            dataKey="value"
            nameKey="name"
            outerRadius="65%"
            innerRadius="40%"
            paddingAngle={2}
            cornerRadius={3}
            strokeWidth={0}
          >
            {data.assets.map((entry, index) => (
              <Cell
                key={`asset-${index}`}
                fill={entry.color}
                fillOpacity={0.7}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                  return null;
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 8}
                      className="fill-foreground text-xl font-bold"
                    >
                      {formatUsd(data.totalValue)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 12}
                      className="fill-muted-foreground text-xs"
                    >
                      Total Collateral
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {data.categories.map((cat, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-xs text-muted-foreground">
              {cat.name} ({formatUsd(cat.value)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
