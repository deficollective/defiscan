"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import type { CollateralData } from "@/lib/review-page/types";

interface CoinChartProps {
  data: CollateralData;
  className?: string;
}

function formatUsd(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

// Active shape renderer for hover effect
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="#909090"
        strokeWidth={2}
      />
    </g>
  );
};

export function CoinChart({ data, className }: CoinChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const chartConfig = {} satisfies ChartConfig;
  const size = 320;
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const bezelWidth = 20;
  const ridgeWidth = 8;

  const activeAsset = activeIndex !== null ? data.assets[activeIndex] : null;

  return (
    <div className={className}>
      {/* 3D Coin Container */}
      <div
        className="mx-auto relative"
        style={{
          width: size,
          height: size,
        }}
      >
        <div
          className="relative transition-transform duration-300 ease-out hover:scale-[1.02]"
        >
          {/* Main coin body */}
          <div
            className="relative rounded-full"
            style={{
              width: size,
              height: size,
              background: "linear-gradient(145deg, #ffffff 0%, #e8e8e8 50%, #d0d0d0 100%)",
              boxShadow: `
                0 12px 24px -4px rgba(0,0,0,0.25),
                0 4px 8px rgba(0,0,0,0.1),
                inset 0 2px 4px rgba(255,255,255,0.8),
                inset 0 -2px 4px rgba(0,0,0,0.1)
              `,
            }}
          >
            {/* Outer metallic bezel SVG */}
            <svg
              width={size}
              height={size}
              className="absolute inset-0"
              style={{ pointerEvents: "none" }}
            >
              <defs>
                {/* Chrome/Silver gradient for outer bezel */}
                <linearGradient id="chrome-bezel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8f8f8" />
                  <stop offset="25%" stopColor="#c8c8c8" />
                  <stop offset="50%" stopColor="#e8e8e8" />
                  <stop offset="75%" stopColor="#b0b0b0" />
                  <stop offset="100%" stopColor="#d8d8d8" />
                </linearGradient>

                {/* Inner ring gradient */}
                <linearGradient id="chrome-inner" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0e0e0" />
                  <stop offset="50%" stopColor="#a8a8a8" />
                  <stop offset="100%" stopColor="#c8c8c8" />
                </linearGradient>

                {/* Ridged edge pattern */}
                <pattern id="ridges" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect width="2" height="4" fill="#b8b8b8" />
                  <rect x="2" width="2" height="4" fill="#d8d8d8" />
                </pattern>
              </defs>

              {/* Outer bezel ring */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius}
                fill="none"
                stroke="url(#chrome-bezel)"
                strokeWidth={bezelWidth}
              />

              {/* Ridged edge (coin milling) */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius - bezelWidth / 2 - ridgeWidth / 2}
                fill="none"
                stroke="url(#chrome-inner)"
                strokeWidth={ridgeWidth}
                strokeDasharray="3 2"
              />

              {/* Engraved groove - darker on top, lighter on bottom */}
              <defs>
                <linearGradient id="groove-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#606060" />
                  <stop offset="40%" stopColor="#909090" />
                  <stop offset="60%" stopColor="#d0d0d0" />
                  <stop offset="100%" stopColor="#f0f0f0" />
                </linearGradient>
              </defs>
              <circle
                cx={center}
                cy={center}
                r={outerRadius - bezelWidth - ridgeWidth + 2}
                fill="none"
                stroke="url(#groove-shadow)"
                strokeWidth={6}
              />
              {/* Inner border */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius - bezelWidth - ridgeWidth - 2}
                fill="none"
                stroke="#b8b8b8"
                strokeWidth={1}
              />
            </svg>

            {/* Chart area - engraved into the coin */}
            <div
              className="absolute rounded-full"
              style={{
                top: bezelWidth + ridgeWidth + 2,
                left: bezelWidth + ridgeWidth + 2,
                width: size - (bezelWidth + ridgeWidth + 2) * 2,
                height: size - (bezelWidth + ridgeWidth + 2) * 2,
                background: "linear-gradient(180deg, #c8c8c8 0%, #e0e0e0 20%, #f0f0f0 80%, #e8e8e8 100%)",
                boxShadow: `
                  inset 0 4px 8px rgba(0,0,0,0.3),
                  inset 0 -2px 4px rgba(255,255,255,0.5),
                  inset 2px 0 4px rgba(0,0,0,0.1),
                  inset -2px 0 4px rgba(0,0,0,0.1)
                `,
                overflow: "hidden",
              }}
            >
              {/* Metallic gradient definitions */}
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  {/* ETH - Metallic blue-purple */}
                  <linearGradient id="metallic-eth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8BA3F0" />
                    <stop offset="30%" stopColor="#627EEA" />
                    <stop offset="50%" stopColor="#4A66D0" />
                    <stop offset="70%" stopColor="#7B96F0" />
                    <stop offset="100%" stopColor="#5570D8" />
                  </linearGradient>
                  {/* WstETH - Metallic light blue */}
                  <linearGradient id="metallic-wsteth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#66D4FF" />
                    <stop offset="30%" stopColor="#00A3FF" />
                    <stop offset="50%" stopColor="#0085D0" />
                    <stop offset="70%" stopColor="#4DC4FF" />
                    <stop offset="100%" stopColor="#0095E8" />
                  </linearGradient>
                  {/* rETH - Metallic orange */}
                  <linearGradient id="metallic-reth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5A080" />
                    <stop offset="30%" stopColor="#E8663D" />
                    <stop offset="50%" stopColor="#C85028" />
                    <stop offset="70%" stopColor="#F08860" />
                    <stop offset="100%" stopColor="#D85A32" />
                  </linearGradient>
                </defs>
              </svg>
              <ChartContainer
                config={chartConfig}
                className="w-full h-full"
              >
                <PieChart>
                  {/* Full pie chart filling the coin face */}
                  <Pie
                    data={data.assets}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="97%"
                    innerRadius={0}
                    paddingAngle={1}
                    strokeWidth={1}
                    stroke="#909090"
                    isAnimationActive={false}
                    activeIndex={activeIndex ?? undefined}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {data.assets.map((entry, index) => (
                      <Cell
                        key={`asset-${index}`}
                        fill={entry.color}
                        style={{
                          cursor: "pointer",
                          opacity: activeIndex === null || activeIndex === index ? 1 : 0.4,
                          transition: "opacity 0.2s ease",
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Hover info / Total value */}
      <div className="text-center mt-4 h-14">
        {activeAsset ? (
          <>
            <div className="text-2xl font-bold">{formatUsd(activeAsset.value)}</div>
            <div className="text-xs text-muted-foreground">
              {activeAsset.name} ({((activeAsset.value / data.totalValue) * 100).toFixed(1)}%)
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{formatUsd(data.totalValue)}</div>
            <div className="text-xs text-muted-foreground">Total Collateral</div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-3">
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
