"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useMemo, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  othersCount: number;
  defiCount: number;
}

// Define the extended ColumnMeta type
type ExtendedColumnMeta = {
  responsiveHidden?: boolean;
};

const getInitialVisibility = (
  columns: ColumnDef<any, any>[],
  defiView: boolean
) => {
  const initialState: Record<string, boolean> = {
    logo: true,
    protocol: true,
    stage: true,
    reasons: false, // disable with first load
    risks: true,
    type: true,
    chain: true,
    tvl: true,
  };

  return initialState;
};

const useResponsiveColumns = (
  table: TableType<any>,
  mobileBreakpoint = 800
) => {
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < mobileBreakpoint;

      // Get all columns that should be responsive
      const responsiveColumns = table
        .getAllColumns()
        .filter((column: any) => column.columnDef.meta?.responsiveHidden);

      // Toggle visibility for all responsive columns
      responsiveColumns.forEach((column: any) => {
        column.toggleVisibility(!isMobile);
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [table, mobileBreakpoint]);
};

export function DataTable<TData, TValue>({
  columns,
  data,
  othersCount,
  defiCount,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "tvl",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [defiView, setDefiView] = useState(true);

  const initialVisibility = useMemo(
    () => getInitialVisibility(columns, defiView),
    [columns]
  );

  const [columnVisibility, setColumnVisibility] = useState(initialVisibility);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      sorting: [
        {
          id: "tvl",
          desc: true,
        },
      ],
    },
  });

  useEffect(() => {
    setColumnVisibility((prev) => ({
      ...prev,
      stage: defiView,
      reasons: !defiView,
    }));
    if (!defiView) {
      table.resetColumnFilters();
      table.getColumn("stage")?.setFilterValue("O");
    } else {
      table.resetColumnFilters();
      table.getColumn("stage")?.setFilterValue([0, 1, 2, "R"]);
    }
  }, [defiView, table]);

  useResponsiveColumns(table);

  // Navigate to the protocol's page when the row is clicked
  const handleRowClick = (slug: string) => {
    window.location.href = slug;
  };

  return (
    <div className="w-full">
      <div className="flex space-x-2">
        <div
          className={`flex items-center px-4 py-2 rounded-t-lg cursor-pointer transition-colors ${
            defiView
              ? "bg-primary text-white"
              : "bg-background border-t border-l border-r text-white-200 hover:bg-primary"
          }`}
          onClick={() => setDefiView(true)}
        >
          <span className="mr-2">DeFi</span>
          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-purple-500 text-white">
            {defiCount}
          </span>
        </div>

        <div
          className={`flex items-center px-4 py-2 rounded-t-lg cursor-pointer transition-colors ${
            !defiView
              ? "bg-primary text-white"
              : "bg-background border-t border-l border-r text-white-200 hover:bg-primary"
          }`}
          onClick={() => setDefiView(false)}
        >
          <span className="mr-2">Others</span>
          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-purple-500 text-white">
            {othersCount}
          </span>
        </div>
      </div>

      <div className="rounded-b-lg rounded-r-lg border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-accent">
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => {
                    handleRowClick((row as any).original.slug);
                  }}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-accent cursor-pointer transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
