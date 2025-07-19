"use client";

import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Project } from "@/lib/types";
import { loadReviews, loadReviewsWithTvl } from "@/lib/data/utils";
import { getProtocolDisplayName } from "@/lib/utils";

export const getData = (): Project[] => {
  const data_new = loadReviews();
  return data_new as Project[];
};

export default function Table() {
  // Initialize with cached data immediately - no "No results" flash!
  const [data, setData] = useState<Project[]>(() => getData());
  const [isRefreshingTvl, setIsRefreshingTvl] = useState(false);

  const fetchLiveData = async () => {
    // Only fetch live TVL data in background
    setIsRefreshingTvl(true);
    try {
      const liveData = await loadReviewsWithTvl();
      setData(liveData);
    } catch (error) {
      console.warn('Failed to fetch live TVL data, using cached data:', error);
      // Keep cached data if live fetch fails
    } finally {
      setIsRefreshingTvl(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  // Use the original transformation logic that worked before
  const projects = data?.map((project) => {
    const { protocol: key, reviews, isLoading, ...protocol } = project;
    // Override isLoading based on TVL refresh state - show as loading only for TVL refresh
    const tvlLoading = isRefreshingTvl && !isLoading;

    const children = reviews.map((review) => ({
      protocol: getProtocolDisplayName(key, review.instance),
      baseProtocol: key,
      isLoading: tvlLoading,
      ...protocol,
      ...review,
    }));

    // There is only 1 review. No need to create a collapsible table row.
    if (children.length === 1) {
      const review = children[0];
      return { ...protocol, ...review, isLoading: tvlLoading };
    }

    // Return protocol with children.
    return { protocol: key, children, isLoading: tvlLoading, ...protocol };
  }) as Project[];

  // Flatten all reviews for counting purposes only
  const allReviews = data?.flatMap(project => 
    project.reviews.map(review => ({
      ...project,
      ...review,
      protocol: getProtocolDisplayName(project.protocol, review.instance),
      baseProtocol: project.protocol
    }))
  ) || [];

  let othersCount = 0;
  let defiCount = 0;
  let infrastructureCount = 0;
  
  allReviews.forEach((review) => {
    if (review.stage === "O") othersCount++;
    else if (review.stage === "I0" || review.stage === "I1" || review.stage === "I2")
      infrastructureCount++;
    else defiCount++;
  });

  const getProtocolLogo = (baseProtocolName: string): string => {
    const protocolData = data?.find((p) => p.protocol === baseProtocolName);
    return protocolData?.logo || "/images/placeholder.png";
  };

  const tableColumns = createColumns(getProtocolLogo);

  return (
    <div className="mx-auto w-auto">
      {isRefreshingTvl && (
        <div className="mb-2 text-sm text-muted-foreground flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
          Refreshing TVL data...
        </div>
      )}
      <DataTable
        columns={tableColumns}
        data={projects || []}
        othersCount={othersCount}
        defiCount={defiCount}
        infrastructureCount={infrastructureCount}
      />
    </div>
  );
}