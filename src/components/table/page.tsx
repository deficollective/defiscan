"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import {useContext} from "react";
import LlamaContext from "@/context/llamaContext";

export default function Table() {
  const { projects, loading } = useContext(LlamaContext);

  let othersCount = 0;
  let defiCount = 0;
  projects?.forEach((el) => {
    if (el.stage === "O") othersCount++;
    else defiCount++;
  });

  return (
    <div className="mx-auto w-full">
      <DataTable
        columns={columns}
        data={projects || []}
        loading={loading}
        othersCount={othersCount}
        defiCount={defiCount}
      />
    </div>
  );
}
