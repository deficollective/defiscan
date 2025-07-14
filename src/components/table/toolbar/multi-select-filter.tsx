"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronsUpDown, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface FilterOption {
  label: string;
  value: number | string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableMultiSelectFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  className?: string;
  options: FilterOption[];
}

const ClearButton = ({ onSelect }: { onSelect: () => void }) => (
  <>
    <CommandSeparator />
    <CommandGroup>
      <CommandItem onSelect={onSelect} className="justify-center text-center">
        Clear filters
      </CommandItem>
    </CommandGroup>
  </>
);

interface OptionProps {
  option: FilterOption;
  selected: boolean;
  onSelect: () => void;
  count?: number;
}

const Option = ({ option, selected, onSelect, count }: OptionProps) => {
  return (
    <CommandItem key={option.value} onSelect={onSelect}>
      <div
        className={cn(
          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
          selected && "bg-primary text-primary-foreground",
          !selected && "opacity-50 [&_svg]:invisible"
        )}
      >
        <Check />
      </div>

      {option.icon && (
        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
      )}

      <span>{option.label}</span>

      {count && (
        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
          {count}
        </span>
      )}
    </CommandItem>
  );
};

export function MultiSelectFilter<TData, TValue>({
  column,
  title,
  options,
  className,
}: DataTableMultiSelectFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(
    column?.getFilterValue() as (string | number)[]
  );

  const handleOptionSelect = (option: FilterOption) => {
    const selected = selectedValues.has(option.value);

    if (selected) {
      selectedValues.delete(option.value);
    } else {
      selectedValues.add(option.value);
    }

    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "uppercase text-xs font-bold font-mono border-dashed border-border",
            className
          )}
        >
          <span>{title}</span>
          <ChevronDown className="w-4 h-4 ml-1" />
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <Option
                  key={`option-${option.label}`}
                  option={option}
                  selected={selectedValues.has(option.value)}
                  onSelect={() => handleOptionSelect(option)}
                  count={facets?.get(option.value)}
                />
              ))}
            </CommandGroup>

            {selectedValues.size > 0 && (
              <ClearButton onSelect={() => column?.setFilterValue(undefined)} />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
