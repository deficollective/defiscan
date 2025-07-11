"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadReviews } from "@/lib/data/utils";
import { Chain } from "@/components/chain";
import { ChainNames } from "@/components/chain";

interface ChainData {
  chain: string;
  count: number;
}

export const ChainCoverageComponent: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<ChainData[]>([]);
  const [totalProtocols, setTotalProtocols] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadReviews();
      
      // Get unique chains and their counts
      const chainCounts = projects.reduce((acc, project) => {
        project.reviews.forEach(review => {
          if (review.chain) {
            acc[review.chain] = (acc[review.chain] || 0) + 1;
          }
        });
        return acc;
      }, {} as Record<string, number>);

      const chainData = Object.entries(chainCounts)
        .map(([chain, count]) => ({ chain, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6); // Show top 6 chains

      setData(chainData);
      setTotalProtocols(projects.length);
    };
    
    fetchData();
  }, []);

  const totalChains = data.length;

  return (
    <div className={className}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Chain Coverage</CardTitle>
          <p className="text-xs text-muted-foreground">
            Multi-chain protocol analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chain list */}
            <div className="flex flex-wrap gap-3 justify-center">
              {data.slice(0, 8).map((item, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <Chain 
                    name={item.chain as ChainNames} 
                    className="scale-75"
                  />
                  <span className="text-xs text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>

            {/* Summary stats */}
            <div className="pt-2 border-t">
              <div className="flex flex-wrap gap-2 justify-center text-center">
                <div>
                  <p className="text-lg font-bold text-primary">{totalChains}</p>
                  <p className="text-xs text-muted-foreground">Chains</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-primary">{totalProtocols}</p>
                  <p className="text-xs text-muted-foreground">Protocols</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};