"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { loadReviews } from "@/lib/data/utils";
import { formatUsd } from "@/lib/utils";

interface CoverageData {
  reviewedTvl: number;
  totalTvl: number;
  coveragePercentage: number;
  protocolCount: number;
}

export const TVLCoverageComponent: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<CoverageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadReviews();
      
      // Calculate reviewed TVL
      const reviewedTvl = projects.reduce((sum, project) => {
        const projectTvl = project.reviews.reduce((reviewSum, review) => {
          return reviewSum + (review.tvl === "n/a" ? 0 : review.tvl);
        }, 0);
        return sum + projectTvl;
      }, 0);

      // Estimate total DeFi TVL (this could be fetched from DefiLlama API)
      // For now, using a reasonable estimate based on current market
      const totalTvl = 80000000000; // $80B as rough DeFi total
      
      const coveragePercentage = (reviewedTvl / totalTvl) * 100;
      
      // Count total protocols (not reviews)
      const protocolCount = projects.length;

      setData({
        reviewedTvl,
        totalTvl,
        coveragePercentage: Math.min(coveragePercentage, 100), // Cap at 100%
        protocolCount,
      });
    };
    
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className={className}>
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">DeFi TVL Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">DeFi TVL Coverage</CardTitle>
          <p className="text-sm text-muted-foreground">
            How much of DeFi ecosystem we've analyzed
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Coverage Progress</span>
                <span className="font-medium">{data.coveragePercentage.toFixed(1)}%</span>
              </div>
              <Progress 
                value={data.coveragePercentage} 
                className="h-3"
              />
            </div>

            {/* TVL Numbers */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {formatUsd(data.reviewedTvl)}
                </p>
                <p className="text-xs text-muted-foreground">Reviewed TVL</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">
                  {data.protocolCount}
                </p>
                <p className="text-xs text-muted-foreground">Protocols</p>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Covering major DeFi protocols across multiple chains
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};