"use client";

import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Project } from "@/lib/types";
import { loadReviews } from "@/lib/data/utils";
import { getProtocolDisplayName } from "@/lib/utils";

export const getData = async (): Promise<Project[]> => {
  const data_new = await loadReviews();
  return data_new as Project[];
};

export default function Table() {
  const [data, setData] = useState<Project[]>();

  const fetchData = async () => {
    const data = await getData();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Use the original transformation logic that worked before
  const projects = data?.map((project) => {
    const { protocol: key, reviews, ...protocol } = project;

    const children = reviews.map((review) => ({
      protocol: getProtocolDisplayName(key, review.instance),
      baseProtocol: key,
      ...protocol,
      ...review,
    }));

    // There is only 1 review. No need to create a collapsible table row.
    if (children.length === 1) {
      const review = children[0];
      return { ...protocol, ...review };
    }

    // Return protocol with children.
    return { protocol: key, children, ...protocol };
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