import { Table as TableType } from "@tanstack/react-table";
import { MultiSelectFilter } from "./multi-select-filter";
import { stage_filter_options } from "@/lib/consts";

interface TableToolbarProps {
  table: TableType<any>;
}

const stage_filter_enabled = false;

export function TableToolbar({ table }: TableToolbarProps) {
  return (
    <div className="flex items-center gap-2 justify-start pb-4">
      {stage_filter_enabled && table.getColumn("stage") && (
        <MultiSelectFilter
          column={table.getColumn("stage")}
          title="Stages"
          options={stage_filter_options}
        />
      )}
    </div>
  );
}
