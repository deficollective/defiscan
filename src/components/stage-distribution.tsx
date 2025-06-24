"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { loadReviews } from "@/lib/data/utils";
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

export const StageDistributionChart: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<StageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadReviews();
      
      // Flatten all reviews and filter out infrastructure stages for count
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

      const stageData: StageData[] = Object.entries(stageGroups).map(([stage, data]) => {
        const stageInfo = getStageInfo(stage as Stage);
        return {
          stage: stageInfo.name,
          count: data.reviews.length,
          tvl: data.totalTvl,
          colorClass: stageInfo.colorClass,
          color: stageInfo.color,
          percentage: (data.reviews.length / totalCount) * 100,
          tvlPercentage: totalTvl > 0 ? (data.totalTvl / totalTvl) * 100 : 0,
        };
      }).sort((a, b) => b.count - a.count);

      setData(stageData);
    };
    
    fetchData();
  }, []);

  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className={className}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Projects by Stage</CardTitle>
          <p className="text-xs text-muted-foreground">
            Decentralization progress distribution
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium">{item.stage}</span>
                  <span className="text-muted-foreground">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${item.colorClass}`}
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TVLByStageChart: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<StageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadReviews();
      
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

      const totalTvl = allReviews.reduce((sum, review) => sum + (review.tvl === "n/a" ? 0 : review.tvl), 0);

      const stageData: StageData[] = Object.entries(stageGroups).map(([stage, data]) => {
        const stageInfo = getStageInfo(stage as Stage);
        return {
          stage: stageInfo.name,
          count: data.reviews.length,
          tvl: data.totalTvl,
          colorClass: stageInfo.colorClass,
          color: stageInfo.color,
          percentage: (data.reviews.length / allReviews.length) * 100,
          tvlPercentage: totalTvl > 0 ? (data.totalTvl / totalTvl) * 100 : 0,
        };
      }).sort((a, b) => {
        // Put "Others" first, then sort by TVL descending
        if (a.stage === "Others") return -1;
        if (b.stage === "Others") return 1;
        return b.tvl - a.tvl;
      });

      setData(stageData);
    };
    
    fetchData();
  }, []);

  const maxTvl = Math.max(...data.map(d => d.tvl));

  return (
    <div className={className}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">TVL by Stage</CardTitle>
          <p className="text-xs text-muted-foreground">
            Value locked per stage
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={data}
                dataKey="tvl"
                nameKey="stage"
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                strokeWidth={2}
                stroke="white"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const formattedTvl = data.tvl >= 1e9 ? `$${(data.tvl / 1e9).toFixed(1)}B` : 
                                       data.tvl >= 1e6 ? `$${(data.tvl / 1e6).toFixed(0)}M` : 
                                       formatUsd(data.tvl);
                    return (
                      <div className="bg-white p-2 rounded shadow-lg border text-xs">
                        <p className="font-medium">{data.stage}</p>
                        <p className="text-muted-foreground">{formattedTvl}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};