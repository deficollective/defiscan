"use client";

import { Table as TableType } from "@tanstack/react-table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { defi_stages, unqualified_stages } from "@/lib/consts";
import { Stage } from "@/lib/types";

interface ViewToggleProps {
  table: TableType<any>;
}

enum VIEWS {
  DEFI = "defi",
  UNQUALIFIED = "unqualified",
}

const filters = {
  [VIEWS.DEFI]: defi_stages,
  [VIEWS.UNQUALIFIED]: unqualified_stages,
};

const getReviewCount = (
  stages: Stage[],
  facets: Map<Stage, number> | undefined
) =>
  stages
    .map((s) => facets?.get(s) ?? 0)
    .reduce((acc, curr) => (acc ?? 0) + (curr ?? 0), 0);

export function ViewToggle({ table }: ViewToggleProps) {
  const [view, setView] = useState(VIEWS.DEFI);

  const handleViewChange = (value: string) => {
    const nextView = value as VIEWS;
    table.resetColumnFilters();
    table.getColumn("stage")?.setFilterValue(filters[nextView]);

    setView(nextView);
  };

  // Calculate the count reivews for each filter.
  const facets = table.getColumn("stage")?.getFacetedUniqueValues();
  const unqualified_count = getReviewCount(unqualified_stages, facets);
  const defi_count = getReviewCount(defi_stages, facets);

  return (
    <ToggleGroup type="single" value={view} onValueChange={handleViewChange}>
      <ToggleGroupItem
        value={VIEWS.DEFI}
        aria-label="Toggle DeFi"
        className="hover:bg-accent/50 hover:text-accent-foreground"
      >
        DeFi
        <span>{defi_count}</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value={VIEWS.UNQUALIFIED}
        aria-label="Toggle Unqualified"
        className="hover:bg-accent/50 hover:text-accent-foreground"
      >
        Unaualified
        <span>{unqualified_count}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
