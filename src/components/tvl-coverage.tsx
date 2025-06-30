"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { loadReviews } from "@/lib/data/utils";
import { formatUsd } from "@/lib/utils";
import { defiLlama } from "@/services/defillama";
import { ProtocolCarousel } from "@/components/protocol-carousel";

interface CoverageData {
  reviewedTvl: number;
  totalTvl: number;
  coveragePercentage: number;
  protocolCount: number;
}


export const TVLCoverageComponent: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<CoverageData | null>(null);

  const scrollToReviews = () => {
    // Look for the tabs (DeFi, Infrastructure, Others) - ToggleGroup component
    const tabsElement = document.querySelector('[data-state]') || // ToggleGroup items have data-state
                       document.querySelector('button[aria-label="Toggle DeFi"]') || // Specific DeFi button
                       document.querySelector('[role="radiogroup"]') || // ToggleGroup has radiogroup role
                       document.querySelector('button[value="defi"]'); // Button with defi value
    
    if (tabsElement) {
      // If we found a toggle item, scroll to its parent container
      const container = tabsElement.closest('div') || tabsElement;
      container.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

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

      // Get today's total DeFi TVL
      const totalTvl = await defiLlama.getCurrentTotalTvl();
      
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
          <div className="space-y-8">
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

            {/* <p className="text-xs text-center text-muted-foreground">
              Covering major DeFi protocols across multiple chains
            </p> */}

            {/* Protocols Carousel */}
            <ProtocolCarousel onSeeAllClick={scrollToReviews} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};