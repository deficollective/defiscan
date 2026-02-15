"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import type { VaultData } from "@/lib/review-page/types";

interface VaultChartProps {
  data: VaultData;
  className?: string;
}

function formatUsd(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

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
        stroke="#b0b0b0"
        strokeWidth={2}
      />
    </g>
  );
};

export function VaultChart({ data, className }: VaultChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const chartConfig = {} satisfies ChartConfig;
  const size = 320;
  const center = size / 2;
  const bezelWidth = 22;
  const outerRadius = size / 2 - bezelWidth / 2 - 2;
  const boltRadius = 5;
  const boltCount = 12;

  // Filter out zero-allocation markets for the chart
  const chartMarkets = data.markets.filter((m) => m.allocation > 0);
  const activeMarket = activeIndex !== null ? chartMarkets[activeIndex] : null;

  // Bolt positions around the bezel
  const boltPositions = Array.from({ length: boltCount }, (_, i) => {
    const angle = (i * 2 * Math.PI) / boltCount - Math.PI / 2;
    const r = outerRadius - 1;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  return (
    <div className={className} onClick={() => setActiveIndex(null)}>
      {/* Vault Door Container */}
      <div
        className="mx-auto relative isolate"
        style={{ width: size, height: size }}
      >
        <div className="relative transition-transform duration-300 ease-out hover:scale-[1.02]">
          {/* Main vault body */}
          <div
            className="relative rounded-full"
            style={{
              width: size,
              height: size,
              background: "linear-gradient(145deg, #c8c8c8 0%, #b0b0b0 30%, #a0a0a0 70%, #909090 100%)",
              boxShadow: `
                0 12px 24px -4px rgba(0,0,0,0.3),
                0 4px 8px rgba(0,0,0,0.15),
                inset 0 2px 4px rgba(255,255,255,0.4),
                inset 0 -2px 4px rgba(0,0,0,0.15)
              `,
            }}
          >
            {/* Outer vault bezel SVG */}
            <svg
              width={size}
              height={size}
              className="absolute inset-0"
              style={{ pointerEvents: "none" }}
            >
              <defs>
                {/* Dark steel gradient for vault bezel */}
                <linearGradient id="vault-bezel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d0d0d0" />
                  <stop offset="25%" stopColor="#a8a8a8" />
                  <stop offset="50%" stopColor="#c0c0c0" />
                  <stop offset="75%" stopColor="#989898" />
                  <stop offset="100%" stopColor="#b8b8b8" />
                </linearGradient>

                {/* Bolt gradient */}
                <radialGradient id="bolt-gradient" cx="35%" cy="35%">
                  <stop offset="0%" stopColor="#c8c8c8" />
                  <stop offset="50%" stopColor="#989898" />
                  <stop offset="100%" stopColor="#787878" />
                </radialGradient>

                {/* Groove shadow */}
                <linearGradient id="vault-groove" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#808080" />
                  <stop offset="40%" stopColor="#a0a0a0" />
                  <stop offset="60%" stopColor="#c0c0c0" />
                  <stop offset="100%" stopColor="#d0d0d0" />
                </linearGradient>
              </defs>

              {/* Outer bezel ring */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius}
                fill="none"
                stroke="url(#vault-bezel)"
                strokeWidth={bezelWidth}
              />

              {/* Bolts/rivets around the bezel */}
              {boltPositions.map((pos, i) => (
                <g key={i}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={boltRadius}
                    fill="url(#bolt-gradient)"
                    stroke="#888"
                    strokeWidth={0.5}
                  />
                  {/* Bolt slot */}
                  <line
                    x1={pos.x - 2.5}
                    y1={pos.y}
                    x2={pos.x + 2.5}
                    y2={pos.y}
                    stroke="#888"
                    strokeWidth={1}
                  />
                </g>
              ))}

              {/* Engraved groove */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius - bezelWidth / 2 - 8}
                fill="none"
                stroke="url(#vault-groove)"
                strokeWidth={4}
              />

              {/* Inner border */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius - bezelWidth - 4}
                fill="none"
                stroke="#a0a0a0"
                strokeWidth={1}
              />
            </svg>

            {/* Chart area */}
            <div
              className="absolute rounded-full"
              style={{
                top: bezelWidth + 6,
                left: bezelWidth + 6,
                width: size - (bezelWidth + 6) * 2,
                height: size - (bezelWidth + 6) * 2,
                background: "linear-gradient(180deg, #a0a0a0 0%, #b0b0b0 20%, #b8b8b8 80%, #a8a8a8 100%)",
                boxShadow: `
                  inset 0 4px 8px rgba(0,0,0,0.25),
                  inset 0 -2px 4px rgba(255,255,255,0.2),
                  inset 2px 0 4px rgba(0,0,0,0.1),
                  inset -2px 0 4px rgba(0,0,0,0.1)
                `,
                overflow: "hidden",
              }}
            >
              {/* Cross handle overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center animate-[spin_20s_linear_infinite]"
                style={{ pointerEvents: "none", zIndex: 10 }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 260 260"
                >
                  <defs>
                    <linearGradient id="handle-bar-h" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#b8b8b8" />
                      <stop offset="30%" stopColor="#888888" />
                      <stop offset="70%" stopColor="#787878" />
                      <stop offset="100%" stopColor="#a0a0a0" />
                    </linearGradient>
                    <linearGradient id="handle-bar-v" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#b8b8b8" />
                      <stop offset="30%" stopColor="#888888" />
                      <stop offset="70%" stopColor="#787878" />
                      <stop offset="100%" stopColor="#a0a0a0" />
                    </linearGradient>
                    <radialGradient id="handle-hub" cx="40%" cy="40%">
                      <stop offset="0%" stopColor="#a8a8a8" />
                      <stop offset="50%" stopColor="#787878" />
                      <stop offset="100%" stopColor="#585858" />
                    </radialGradient>
                    <filter id="handle-shadow">
                      <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.2" />
                    </filter>
                  </defs>

                  {/* Horizontal bar shadow + bar */}
                  <rect
                    x={40}
                    y={124}
                    width={180}
                    height={12}
                    rx={6}
                    fill="url(#handle-bar-h)"
                    filter="url(#handle-shadow)"
                  />
                  <rect
                    x={42}
                    y={125}
                    width={176}
                    height={1}
                    rx={0.5}
                    fill="rgba(255,255,255,0.15)"
                  />

                  {/* Vertical bar shadow + bar */}
                  <rect
                    x={124}
                    y={40}
                    width={12}
                    height={180}
                    rx={6}
                    fill="url(#handle-bar-v)"
                    filter="url(#handle-shadow)"
                  />
                  <rect
                    x={125}
                    y={42}
                    width={1}
                    height={176}
                    rx={0.5}
                    fill="rgba(255,255,255,0.15)"
                  />

                  {/* Center hub - outer ring */}
                  <circle
                    cx={130}
                    cy={130}
                    r={24}
                    fill="url(#handle-hub)"
                    stroke="#909090"
                    strokeWidth={2}
                    filter="url(#handle-shadow)"
                  />
                  {/* Hub highlight */}
                  <circle
                    cx={130}
                    cy={130}
                    r={16}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={1}
                  />
                  {/* Hub inner ring */}
                  <circle
                    cx={130}
                    cy={130}
                    r={8}
                    fill="#606060"
                    stroke="#909090"
                    strokeWidth={1.5}
                  />
                  {/* Hub center dot */}
                  <circle
                    cx={130}
                    cy={130}
                    r={3}
                    fill="#909090"
                  />
                </svg>
              </div>

              {/* Metallic gradient definitions */}
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  {/* cbBTC - Metallic blue */}
                  <linearGradient id="metallic-cbbtc" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6C9CF0" />
                    <stop offset="30%" stopColor="#3B6FE0" />
                    <stop offset="50%" stopColor="#2A58C0" />
                    <stop offset="70%" stopColor="#5B8AF0" />
                    <stop offset="100%" stopColor="#3568D8" />
                  </linearGradient>
                  {/* WBTC - Metallic gold/orange */}
                  <linearGradient id="metallic-wbtc" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD08A" />
                    <stop offset="30%" stopColor="#F7931A" />
                    <stop offset="50%" stopColor="#D07810" />
                    <stop offset="70%" stopColor="#FFB84D" />
                    <stop offset="100%" stopColor="#E88A15" />
                  </linearGradient>
                  {/* wstETH - Metallic light blue */}
                  <linearGradient id="metallic-wsteth-vault" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#66D4FF" />
                    <stop offset="30%" stopColor="#00A3FF" />
                    <stop offset="50%" stopColor="#0085D0" />
                    <stop offset="70%" stopColor="#4DC4FF" />
                    <stop offset="100%" stopColor="#0095E8" />
                  </linearGradient>
                  {/* WETH - Metallic purple */}
                  <linearGradient id="metallic-weth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B8A3F0" />
                    <stop offset="30%" stopColor="#8B6CEA" />
                    <stop offset="50%" stopColor="#6A4ED0" />
                    <stop offset="70%" stopColor="#A090F0" />
                    <stop offset="100%" stopColor="#7B60D8" />
                  </linearGradient>
                </defs>
              </svg>

              <ChartContainer
                config={chartConfig}
                className="w-full h-full"
              >
                <PieChart>
                  <Pie
                    data={chartMarkets}
                    dataKey="allocation"
                    nameKey="name"
                    outerRadius="97%"
                    innerRadius="30%"
                    paddingAngle={1}
                    strokeWidth={1}
                    stroke="#909090"
                    isAnimationActive={false}
                    activeIndex={activeIndex ?? undefined}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={(_, index, e) => {
                      e.stopPropagation();
                      setActiveIndex((prev) => (prev === index ? null : index));
                    }}
                  >
                    {chartMarkets.map((entry, index) => (
                      <Cell
                        key={`market-${index}`}
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
        {activeMarket ? (
          <>
            <div className="text-2xl font-bold">{formatUsd(activeMarket.allocation)}</div>
            <div className="text-xs text-muted-foreground">
              {activeMarket.name} ({((activeMarket.allocation / data.totalAllocation) * 100).toFixed(1)}%) &middot; {activeMarket.apy}% APY
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{formatUsd(data.totalAllocation)}</div>
            <div className="text-xs text-muted-foreground">Total Allocation</div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-3">
        {chartMarkets.map((market, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="h-2.5 w-2.5 rounded-sm"
              style={{
                backgroundColor:
                  market.name.includes("cbBTC") ? "#3B6FE0" :
                  market.name.includes("WBTC") ? "#F7931A" :
                  market.name.includes("wstETH") ? "#00A3FF" :
                  "#8B6CEA",
              }}
            />
            <span className="text-xs text-muted-foreground">
              {market.name} ({formatUsd(market.allocation)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
