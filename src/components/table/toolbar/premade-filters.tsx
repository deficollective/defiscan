"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { Table as TableType } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  defi_stages,
  stage_filter_options,
  unqualified_stages,
} from "@/lib/consts";
import { MultiSelectFilter } from "./multi-select-filter";

export interface PremadeFilter {
  label: string;
  shortcut: string;
  onClick: (table: TableType<any>) => void;
}

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

interface PremadeFiltersProps {
  table: TableType<any>;
  filters: PremadeFilter[];
}

export function PremadeFilters({
  table,
  filters = premade_filters,
}: PremadeFiltersProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.metaKey || e.ctrlKey) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        const filter = filters.find((f) => f.shortcut === e.key);

        if (!filter) return;

        filter.onClick(table);

        e.preventDefault();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-border w-9 h-9">
          <Filter className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end">
        <DropdownMenuLabel>Premade Filters</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuGroup>
          {filters.map((filter) => (
            <DropdownMenuItem
              key={filter.label}
              onClick={() => filter.onClick(table)}
            >
              {filter.label}
              <DropdownMenuShortcut>⌘{filter.shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
