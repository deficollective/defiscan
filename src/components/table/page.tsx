"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { protocols } from "#site/content";
import { useEffect, useState } from "react";
import { defiLlama } from "@/services/defillama";
import { Project } from "@/lib/types";
import { mergeDefiLlamaWithMd } from "../pie-charts/piechart";

export const getData = async (): Promise<Project[]> => {
  // fetch
  const merged = await mergeDefiLlamaWithMd();

  return merged;
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

  let othersCount = 0;
  let defiCount = 0;
  data?.forEach((el) => {
    if (el.stage === "O") othersCount++;
    else defiCount++;
  });

  return (
    <div className="mx-auto w-full">
      <DataTable
        columns={columns}
        data={data || []}
        othersCount={othersCount}
        defiCount={defiCount}
      />
    </div>
  );
}
