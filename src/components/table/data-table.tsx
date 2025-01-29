"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Table as TableType,
  getFacetedRowModel,
  getPaginationRowModel,
  VisibilityState,
  getExpandedRowModel,
  ExpandedState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TableToolbar } from "./toolbar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const openProtocolReview = (slug: string) => (window.location.href = slug);

const renderTableBody = <TData, TValue>(
  table: TableType<TData>,
  columns: ColumnDef<TData, TValue>[]
) => {
  if (table.getRowModel().rows?.length) {
    return table.getRowModel().rows.map((row) => {
      const handleClick = () => {
        // Expand the row if it is expandable.
        if (row.getCanExpand()) {
          row.getToggleExpandedHandler()();
          return;
        }

        // Go to protocol review page if not.
        openProtocolReview((row as any).original.slug);
      };

      const expanded = row.getIsExpanded();

      return (
        <TableRow
          key={row.id}
          onClick={handleClick}
          className={cn(
            "hover:bg-accent cursor-pointer transition",
            expanded && "bg-accent/80 hover:bg-accent/80",
            row.depth > 0 && "bg-accent/20 hover:bg-accent py-4"
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={cn("first:pl-1", cell.column.id)}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  }

  // TODO: add loading state?.

  // No Rows found.
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "tvl",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    // @ts-expect-error
    getSubRows: (row) => row.children,
    // @ts-expect-error
    getRowCanExpand: (row) => row?.children,
    onExpandedChange: setExpanded,
    manualPagination: true,

    initialState: {
      sorting: [
        {
          id: "tvl",
          desc: true,
        },
      ],
    },
  });

  useResponsiveColumns(table);

  return (
    <div className="w-full">
      <TableToolbar table={table} />
      <ScrollArea className="w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-accent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{renderTableBody(table, columns)}</TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
