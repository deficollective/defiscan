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
import { Input } from "@/components/ui/input";

import { useEffect, useMemo, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Define the extended ColumnMeta type
type ExtendedColumnMeta = {
  responsiveHidden?: boolean;
};

const getInitialVisibility = (columns: ColumnDef<any, any>[]) => {
  const initialState: Record<string, boolean> = {};

  columns.forEach((column) => {
    // Assuming you add a `responsiveHidden` property to columns you want hidden on mobile
    if (typeof column.id === "string") {
      initialState[column.id] = !(column.meta as ExtendedColumnMeta)
        ?.responsiveHidden;
    }
  });

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
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "tvl",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const initialVisibility = useMemo(
    () => getInitialVisibility(columns),
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

  useResponsiveColumns(table);

  // Navigate to the protocol's page when the row is clicked
  const handleRowClick = (slug: string) => {
    window.location.href = slug;
  };

  return (
    <div className="rounded-md w-full">
      <div className="flex flex-row items-center py-2">
        <Input
          placeholder="Search protocol"
          value={
            (table.getColumn("protocol")?.getFilterValue() as string) ?? ""
          }
          onChange={(event: any) =>
            table.getColumn("protocol")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border border-grey"
        />
      </div>
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-background">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="border-b px-4 py-2">
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
        <TableBody>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
