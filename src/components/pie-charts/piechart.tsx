"use client";

import React, { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { defiLlama } from "@/services/defillama";
import { protocols } from "#site/content";
import { Project } from "@/lib/types";

interface VisualisedData {
  key: string;
  value: number;
  fill: string;
}

export interface PieChartProps {
  groupByKey: keyof Project;
  operation: "sum" | "count";
  baseColor: string;
  chartTitle: string;
  labelValueDescription: string;
  className?: string;
  customLabelFormatter?: (data: VisualisedData[]) => {
    value: string | number;
    description: string;
  };
}

// Helper functions
const groupBy = (
  array: Project[],
  key: keyof Project
): Record<string, Project[]> => {
  return array.reduce(
    (result, currentValue) => {
      const groupKey = String(currentValue[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    },
    {} as Record<string, Project[]>
  );
};

const aggregateByKey = (
  groupedData: Record<string, Project[]>,
  operation: "sum" | "count"
): { key: string; value: number }[] => {
  return Object.entries(groupedData).map(([key, projects]) => {
    if (operation === "sum") {
      const totalTvl = projects.reduce((sum, project) => sum + project.tvl, 0);
      return { key, value: totalTvl };
    } else {
      return { key, value: projects.length };
    }
  });
};

const generateColorPalette = (
  baseColor: string,
  numColors: number
): string[] => {
  const colors = [];
  const shadeColor = (color: string, percent: number): string => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  };

  for (let i = 0; i < numColors; i++) {
    const percent = (i / numColors) * 50 - 25;
    colors.push(shadeColor(baseColor, percent));
  }

  return colors;
};

const extendWithColor = (
  aggregatedData: { key: string; value: number }[],
  baseColor: string
): VisualisedData[] => {
  const colorPalette = generateColorPalette(baseColor, aggregatedData.length);
  return aggregatedData.map((data, index) => ({
    ...data,
    fill: colorPalette[index % colorPalette.length],
  }));
};

// ... (previous imports and interfaces remain the same)

const defaultLabelFormatters = {
  count: (data: VisualisedData[]) => ({
    value: data.find((el) => el.key === "2")?.value.toString() || "0",
    description: "Stage-2",
  }),
  tvl: (data: VisualisedData[]) => ({
    value: `${(data.reduce((sum, el) => sum + el.value, 0) / 1e9).toFixed(2)}B`,
    description: "Total TVL",
  }),
  chain: (data: VisualisedData[]) => ({
    value: data.reduce(
      (max, current) => (current.value > max.value ? current : max),
      data[0]
    ).key,
    description: "Most Covered",
  }),
  chainTvl: (data: VisualisedData[]) => ({
    value: data.reduce(
      (max, current) => (current.value > max.value ? current : max),
      data[0]
    ).key,
    description: "Most TVL",
  }),
};

type FormatterKey = keyof typeof defaultLabelFormatters;

const getDefaultFormatter = (
  operation: "sum" | "count",
  groupByKey: keyof Project
): FormatterKey => {
  // Create a mapping of conditions to formatter keys
  const formatterMapping = {
    stage: {
      count: "count" as const,
      sum: "tvl" as const,
    },
    chain: {
      count: "chain" as const,
      sum: "chainTvl" as const,
    },
    // Add more mappings for other groupByKey values as needed
    default: {
      count: "count" as const,
      sum: "tvl" as const,
    },
  };

  // Get the appropriate mapping based on groupByKey or use default
  const mapping =
    (formatterMapping as any)[groupByKey] || formatterMapping.default;
  return mapping[operation];
};

export const PieChartComponent: React.FC<PieChartProps> = ({
  groupByKey,
  operation,
  baseColor,
  chartTitle,
  className,
  customLabelFormatter,
}) => {
  const [data, setData] = useState<VisualisedData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const merged = await mergeDefiLlamaWithMd();
      const groupedBy = groupBy(merged, groupByKey);
      const aggregated = aggregateByKey(groupedBy, operation);
      const coloredResults = extendWithColor(aggregated, baseColor);
      setData(coloredResults);
    };
    fetchData();
  }, [groupByKey, operation, baseColor]);

  const chartConfig = {} satisfies ChartConfig;

  if (!data) return null;

  return (
    <div className={className}>
      <Card className="flex flex-col">
        <CardHeader className="items-center p-2 -mb-2">
          <CardTitle className="text-sm md:text-md">{chartTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[120px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent hideLabel className="min-w-[8rem]" />
                }
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="key"
                innerRadius={35}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                      return null;

                    const formatterKey = getDefaultFormatter(
                      operation,
                      groupByKey
                    );
                    const formatter =
                      customLabelFormatter ||
                      defaultLabelFormatters[formatterKey];
                    const { value, description } = formatter(data);

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="-mb-8"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 2}
                          className="fill-foreground text-md font-bold"
                        >
                          {value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 10}
                          className="fill-muted-foreground text-xxs"
                        >
                          {description}
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
export async function mergeDefiLlamaWithMd() {
  const apiData = await defiLlama.getProtocolsWithCache();
  const filtered = protocols
    .map((frontmatterProtocol) => {
      var tvl = 0;
      var logo = "";
      var type = "";
      for (var slug of frontmatterProtocol.defillama_slug) {
        const res = apiData.find(
          (defiLlamaProtocolData) => slug == defiLlamaProtocolData.slug
        );
        type = res?.category || "";
        logo = res?.logo || "";
        tvl += res?.tvl || 0;
      }
      return {
        logo: logo,
        protocol: frontmatterProtocol.protocol,
        slug: frontmatterProtocol.slug,
        tvl: tvl,
        chain: frontmatterProtocol.chain,
        stage: frontmatterProtocol.stage,
        type: type,
        risks: frontmatterProtocol.risks,
      } as Project;
    })
    .filter((el): el is Project => el !== null);
  return filtered;
}
