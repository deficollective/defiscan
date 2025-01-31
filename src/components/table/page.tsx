"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Project } from "@/lib/types";
import { loadReviews } from "@/lib/data/utils";

export const getData = async (): Promise<Project[]> => {
  const data_new = await loadReviews();

  return data_new;
};

export default function Table() {
  const [data, setData] = useState<Project[] | undefined>(undefined);

  const fetchData = async () => {
    const data = await getData();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const projects = data?.map((project) => {
    const { protocol: key, reviews, ...protocol } = project;

    // const chains = reviews.map((r) => r.chain);
    const children = reviews.map((review) => ({
      protocol: key,
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

  return (
    <div className="mx-auto w-full">
      <DataTable columns={columns} data={projects || []} />
    </div>
  );
}
