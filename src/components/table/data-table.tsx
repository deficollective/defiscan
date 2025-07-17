"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableToolbar } from "./toolbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";

type TableType<T> = ReturnType<typeof useReactTable<T>>;

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
          {row.getVisibleCells().map((cell, index) => (
            <TableCell
              key={cell.id}
              className={cn("md:first:pl-1", cell.column.id)}
            >
              {index === 0 ? (
                <div className="flex items-center">
                  <div className="w-6 flex justify-center mr-2">
                    {row.getCanExpand() && (
                      row.getIsExpanded() ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )
                    )}
                  </div>
                  <div className={cn(row.depth > 0 && "pl-4")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  }

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
  othersCount: number;
  defiCount: number;
  infrastructureCount: number;
  getProtocolLogo?: (name: string) => string;
}

type ExtendedColumnMeta = {
  responsiveHidden?: boolean;
};

type ViewType = "defi" | "infrastructure" | "others";

const getInitialVisibility = (
  columns: ColumnDef<any, any>[],
  activeView: ViewType
) => {
  const initialState: Record<string, boolean> = {
    logo: true,
    protocol: true,
    stage: activeView === "defi" || activeView === "infrastructure",
    reasons: activeView === "others",
    risks: true,
    type: true,
    chain: activeView === "defi" || activeView === "others",
    tvl: activeView === "defi" || activeView === "others",
    infrastructure: activeView === "infrastructure",
    centralization: activeView === "infrastructure",
  };
  
  return initialState;
};

const useResponsiveColumns = (
  table: TableType<any>,
  activeView: ViewType,
  mobileBreakpoint = 800
) => {
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < mobileBreakpoint;
      
      table.getAllColumns().forEach((column) => {
        const meta = column.columnDef.meta as ExtendedColumnMeta;
        if (meta?.responsiveHidden) {
          // Special case: show risks column on mobile for DeFi tab
          if (column.id === "risks" && activeView === "defi") {
            column.toggleVisibility(true);
          } else {
            column.toggleVisibility(!isMobile);
          }
        }
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [table, activeView, mobileBreakpoint]);
};

export function DataTable<TData, TValue>({
  columns,
  data,
  othersCount,
  defiCount,
  infrastructureCount,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "stage", value: [0, 1, 2, "R"] } // Initial filter for "defi" view
  ]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "tvl",
      desc: true,
    },
  ]);

  const [activeView, setActiveView] = useState<ViewType>("defi");

  const initialVisibility = useMemo(
    () => getInitialVisibility(columns, activeView),
    [columns, activeView]
  );

  const [columnVisibility, setColumnVisibility] = useState(initialVisibility);

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
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // @ts-expect-error
    getSubRows: (row) => row.children,
    // @ts-expect-error
    getRowCanExpand: (row) => row?.children,
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
      stage: activeView === "defi",
      centralization: activeView === "infrastructure",
      protocols: activeView === "infrastructure",
      reasons: activeView === "others",
      tvl: activeView !== "infrastructure",
      risks: activeView !== "infrastructure",
      chain: activeView !== "infrastructure",
    }));

    table.resetColumnFilters();

    if (activeView === "others") {
      table.getColumn("stage")?.setFilterValue(["O"]);
    } else if (activeView === "infrastructure") {
      table.getColumn("stage")?.setFilterValue(["I0", "I1", "I2"]);
    } else {
      table.getColumn("stage")?.setFilterValue([0, 1, 2, "R"]);
    }
  }, [activeView, table]);

  useResponsiveColumns(table, activeView);

  const handleRowClick = (slug: string) => {
    window.location.href = slug;
  };

  return (
    <div className="w-full">
      <div className="pb-4">
        <ToggleGroup type="single" value={activeView} onValueChange={(value) => value && setActiveView(value as ViewType)}>
          <ToggleGroupItem
            value="defi"
            aria-label="Toggle DeFi"
            className="hover:bg-accent/50 hover:text-accent-foreground"
          >
            DeFi
            <Badge className="px-2 text-xs text-center ml-2">{defiCount}</Badge>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="infrastructure"
            aria-label="Toggle Infrastructure"
            className="hover:bg-accent/50 hover:text-accent-foreground"
          >
            Infrastructure
            <Badge className="px-2 text-xs text-center ml-2">{infrastructureCount}</Badge>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="others"
            aria-label="Toggle Others"
            className="hover:bg-accent/50 hover:text-accent-foreground"
          >
            Others
            <Badge className="px-2 text-xs text-center ml-2">{othersCount}</Badge>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="overflow-hidden">
        <TableToolbar table={table} />
        
        {/* Desktop: Use ScrollArea for styled scrollbars */}
        <div className="hidden md:block">
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
          </ScrollArea>
        </div>

        {/* Mobile: Use native horizontal scrolling */}
        <div 
          className="block md:hidden overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" 
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin'
          }}
        >
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
        </div>
      </div>
    </div>
  );
}