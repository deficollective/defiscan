"use client";

import { createColumns } from "./columns";
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
  let infrastructureCount = 0;
  data?.forEach((el) => {
    if (el.stage === "O") othersCount++;
    else if (el.stage === "I0" || el.stage === "I1" || el.stage === "I2")
      infrastructureCount++;
    else defiCount++;
  });

  // Define the getProtocolLogo function
  const getProtocolLogo = (protocolName: string): string => {
    const protocolData = data?.find((p) => p.protocol === protocolName);
    return protocolData?.logo || "/images/placeholder.png";
  };

  const tableColumns = createColumns(getProtocolLogo);

  return (
    <div className="mx-auto w-full">
      <DataTable
        columns={tableColumns}
        data={data || []}
        othersCount={othersCount}
        defiCount={defiCount}
        infrastructureCount={infrastructureCount}
      />
    </div>
  );
}
