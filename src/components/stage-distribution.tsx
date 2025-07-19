"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { loadReviewsWithTvl } from "@/lib/data/utils";
import { formatUsd } from "@/lib/utils";
import { Stage } from "@/lib/types";

interface StageData {
  stage: string;
  count: number;
  tvl: number;
  colorClass: string;
  color: string; // Hex color for pie charts
  percentage: number;
  tvlPercentage: number;
}

const getStageInfo = (stage: Stage) => {
  // Handle number and string versions of stages
  if (stage === 0 || stage === "I0") return { name: "Stage 0", colorClass: "bg-red-500", color: "#ef4444" };
  if (stage === 1 || stage === "I1") return { name: "Stage 1", colorClass: "bg-yellow-500", color: "#eab308" };
  if (stage === 2 || stage === "I2") return { name: "Stage 2", colorClass: "bg-green-500", color: "#22c55e" };
  if (stage === "R") return { name: "Review", colorClass: "bg-gray-500", color: "#6b7280" };
  if (stage === "O") return { name: "Others", colorClass: "bg-red-300", color: "#f87171" };
  if (stage === "V") return { name: "Variable", colorClass: "bg-gray-400", color: "#9ca3af" };
  return { name: `Stage ${stage}`, colorClass: "bg-gray-500", color: "#6b7280" };
};

export const CombinedStageChart: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<StageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadReviewsWithTvl();
      
      // Flatten all reviews and filter out infrastructure stages
      const allReviews = projects.flatMap(project => 
        project.reviews.map(review => ({
          ...project,
          ...review,
          protocol: project.protocol,
          baseProtocol: project.protocol
        }))
      ).filter(review => !review.stage?.toString().startsWith("I")); // Exclude infrastructure

      // Group by stage
      const stageGroups = allReviews.reduce((acc, review) => {
        const stage = review.stage;
        if (!acc[stage]) {
          acc[stage] = { reviews: [], totalTvl: 0 };
        }
        acc[stage].reviews.push(review);
        acc[stage].totalTvl += review.tvl === "n/a" ? 0 : review.tvl;
        return acc;
      }, {} as Record<string, { reviews: any[], totalTvl: number }>);

      const totalCount = allReviews.length;
      const totalTvl = allReviews.reduce((sum, review) => sum + (review.tvl === "n/a" ? 0 : review.tvl), 0);

      // Create ordered data for Others, Stage 0, Stage 1, Stage 2
      const orderedStages = ["O", 0, 1, 2];
      const stageData: StageData[] = orderedStages.map(stage => {
        const stageInfo = getStageInfo(stage as Stage);
        const data = stageGroups[stage] || { reviews: [], totalTvl: 0 };
        return {
          stage: stageInfo.name,
          count: data.reviews.length,
          tvl: data.totalTvl,
          colorClass: stageInfo.colorClass,
          color: stageInfo.color,
          percentage: (data.reviews.length / totalCount) * 100,
          tvlPercentage: totalTvl > 0 ? (data.totalTvl / totalTvl) * 100 : 0,
        };
      }).filter(item => item.count > 0); // Only show stages with data

      setData(stageData);
    };
    
    fetchData();
  }, []);

  return (
    <div className={className}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Projects & TVL by Stage</CardTitle>
          <p className="text-xs text-muted-foreground">
            Protocol distribution and value by decentralization stage
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart 
              data={data} 
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <XAxis 
                dataKey="stage" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis hide />
              <Tooltip
                cursor={false}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const formattedTvl = data.tvl >= 1e9 ? `$${(data.tvl / 1e9).toFixed(1)}B` : 
                                       data.tvl >= 1e6 ? `$${(data.tvl / 1e6).toFixed(0)}M` : 
                                       formatUsd(data.tvl);
                    return (
                      <div className="bg-white p-2 rounded shadow-lg border text-xs">
                        <p className="font-medium">{label}</p>
                        <p className="text-muted-foreground">{data.count} protocols</p>
                        <p className="text-muted-foreground">{formattedTvl} TVL</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="count" 
                radius={[2, 2, 0, 0]}
                className="cursor-pointer"
                activeBar={{ opacity: 0.8 }}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

