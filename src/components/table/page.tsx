"use client";

import { Project, columns } from "./columns";
import { DataTable } from "./data-table";
import { protocols } from "#site/content";
import { useEffect, useState } from "react";
import { defiLlama } from "@/services/defillama";

export const getData = async (): Promise<Project[]> => {
  // fetch
  const data = await defiLlama.getProtocolsWithCache();

  const merged = protocols.map((frontmatterProtocol) => {
    var tvl = 0;
    var logo = "";
    var type = "";
    for (var slug of frontmatterProtocol.defillama_slug) {
      const res = data.find(
        (defiLlamaProtocolData) => slug == defiLlamaProtocolData.slug
      );
      logo = res?.logo || "";
      type = res?.category || "";
      tvl += res?.tvl || 0;
    }
    return {
      logo: logo,
      protocol: frontmatterProtocol.protocol,
      slug: frontmatterProtocol.slug,
      tvl: tvl,
      chain: frontmatterProtocol.chain,
      stage: frontmatterProtocol.stage,
      type: type,
      risks: frontmatterProtocol.risks,
    } as Project;
  });

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

  return (
    <div className="mx-auto w-full">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
