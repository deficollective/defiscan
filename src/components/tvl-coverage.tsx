"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { loadReviews } from "@/lib/data/utils";
import { formatUsd } from "@/lib/utils";
import { reviews as allReviews } from "#site/content";
import { defiLlama } from "@/services/defillama";
import Link from "next/link";
import Image from "next/image";

interface CoverageData {
  reviewedTvl: number;
  totalTvl: number;
  coveragePercentage: number;
  protocolCount: number;
}

interface RecentAddition {
  protocol: string;
  logo: string;
  chain: string;
  slug: string;
  publish_date: string;
}

export const TVLCoverageComponent: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<CoverageData | null>(null);
  const [recentAdditions, setRecentAdditions] = useState<RecentAddition[]>([]);

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

      // Get recent additions - exclude infrastructure reviews and sort by publish_date
      const recentReviews = allReviews
        .filter(review => !review.stage?.toString().startsWith("I")) // Exclude infrastructure
        .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
        .slice(0, 5); // Get top 5 most recent

      // Map to recent additions with project data
      const additions: RecentAddition[] = recentReviews.map(review => {
        const project = projects.find(p => p.reviews.some(r => r.slug === review.slug));
        return {
          protocol: project?.protocol || review.slug.split('/')[1] || 'Unknown',
          logo: project?.logo || '/images/default-logo.png',
          chain: review.chain,
          slug: review.slug,
          publish_date: review.publish_date,
        };
      });

      setRecentAdditions(additions);
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

            <p className="text-xs text-center text-muted-foreground">
              Covering major DeFi protocols across multiple chains
            </p>

            {/* Recent Additions */}
            {recentAdditions.length > 0 && (
              <div className="border-t pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Recent Additions:</span>
                  <div className="flex gap-2">
                    {recentAdditions.map((addition, index) => (
                      <Link
                        key={index}
                        href={`/protocols/${addition.slug}`}
                        className="relative w-8 h-8 hover:scale-110 transition-transform"
                      >
                        <Image
                          src={addition.logo}
                          alt={`${addition.protocol} logo`}
                          fill
                          className="rounded-full object-cover"
                          sizes="32px"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};