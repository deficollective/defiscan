import { Table as TableType } from "@tanstack/react-table";
import { MultiSelectFilter } from "./multi-select-filter";
import { PremadeFilter, PremadeFilters } from "./premade-filters";
import {
  defi_stages,
  stage_filter_options,
  unqualified_stages,
} from "@/lib/consts";
import { STAGE } from "@/lib/types";

const premade_filters: PremadeFilter[] = [
  {
    label: "DeFi Projects",
    shortcut: "1",
    onClick: (table) => {
      table.resetColumnFilters();
      table.getColumn("stage")?.setFilterValue(defi_stages);
    },
  },
  {
    label: "Unqualified Projects",
    shortcut: "2",
    onClick: (table) => {
      table.resetColumnFilters();
      table.getColumn("stage")?.setFilterValue(unqualified_stages);
    },
  },
];

interface TableToolbarProps {
  table: TableType<any>;
}

export function TableToolbar({ table }: TableToolbarProps) {
  return (
    <div className="flex items-center gap-2 justify-end pb-4">
      {table.getColumn("stage") && (
        <MultiSelectFilter
          column={table.getColumn("stage")}
          title="Stages"
          options={stage_filter_options}
        />
      )}

      <PremadeFilters filters={premade_filters} table={table} />
    </div>
  );
}
