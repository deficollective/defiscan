"use client";

import { cn, formatUsd } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { PizzaRosetteCell } from "../rosette/rosette-cell";
import { getRiskDescriptions } from "../rosette/data-converter/data-converter";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronDown, ChevronRight, Minus } from "lucide-react";
import { Project, Reason, RiskArray, Stage } from "@/lib/types";
import { Chain, ChainNames } from "../chain";
import { Avatar, AvatarImage } from "../ui/avatar";
import { StageBadge } from "../stage";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "protocol",
    header: ({ column }) => {
      return (
        <Button
          className="text-left justify-start text-xs h-8 pl-6"
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Protocol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { logo, protocol, children } = row.original;
      const collapsible = children && children.length > 1;

      return (
        <div className="flex items-center">
          <div className="w-6">
            {collapsible &&
              (row.getIsExpanded() ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              ))}
          </div>
          <Avatar className={cn("border", row.depth > 0 && "w-8 h-8 ml-4")}>
            <AvatarImage src={logo} alt={protocol || ""} />
          </Avatar>
          <span className="ml-2">{protocol}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric", // use built-in sorting function by name
  },
  {
    id: "chain",
    accessorKey: "chain",
    header: ({ column }) => {
      return (
        <Button
          // Remove hidden class to prevent layout shift
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chain
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const chain = row.getValue("chain");

      // No chain means the current row is expandable,
      // i.e. a wrapper for reviews on multiple chains.
      if (!chain) {
        const chains = row.original.children!.map((c) => c.chain);

        return (
          <div className="flex items-center justify-center">
            {chains.map((c, i) => (
              <Chain
                key={`chain-${i}`}
                name={c as ChainNames}
                className={cn(i > 0 && "-ml-3")}
              />
            ))}
          </div>
        );
      }

      return (
        <div className="flex items-center justify-center">
          <Chain name={chain as ChainNames} />
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      // responsiveHidden: true, // This column will hide on mobile
    },
  },
  {
    id: "stage",
    accessorKey: "stage",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs md:text-sm w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      // Handle filtering by staged for grouped.
      if (row.depth === 0 && row.original.children) {
        const stages = row.original.children.map((r) => r.stage);

        return filterValue.some((v: Stage) => stages.includes(v));
      }

      return filterValue.includes(row.getValue(columnId));
    },
    cell: ({ row }) => {
      let stage = row.getValue("stage") as Stage;
      const reasons = row.original.reasons as Reason[];

      // Provides us with more information about the stages on different chains.
      const subStages =
        row.original.children?.map((c) => ({
          chain: c.chain,
          stage: c.stage,
          reasons: c.reasons,
        })) || [];

      // No stage means its a wrapper for different chains.
      // Therefore we assign the stage to variable.
      if (stage === undefined) stage = "V";

      return (
        <div className="w-full flex justify-center">
          <StageBadge stage={stage} reasons={reasons} subStages={subStages} />
        </div>
      );
    },
    sortingFn: "alphanumeric", // use built-in sorting function by name
  },
  {
    accessorKey: "risks",
    header: ({ column }) => {
      return <p className="text-xs md:text-sm text-center">Risks</p>;
    },
    cell: ({ row }) => {
      const risks = row.getValue("risks") as RiskArray;

      if (!risks) {
        return (
          <div className="w-full flex justify-center">
            <Minus className="w-4 h-4" />
          </div>
        );
      }

      return (
        <div className="flex w-full justify-center">
          <PizzaRosetteCell
            values={getRiskDescriptions(risks)}
            isUnderReview={false}
          />
        </div>
      );
    },
    meta: {
      responsiveHidden: true, // This column will hide on mobile
    },
  },
  {
    id: "type",
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          // Remove hidden class to prevent layout shift
          className="md:flex hidden w-0 md:w-auto overflow-hidden p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:inline">Type</span>
          <ArrowUpDown className="ml-2 h-4 w-4 hidden md:inline" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-0 md:w-auto overflow-hidden whitespace-nowrap">
          <span className="hidden md:inline">{row.getValue("type")}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: true, // This column will hide on mobile
    },
  },

  {
    id: "tvl",
    accessorKey: "tvl",
    header: ({ column }) => {
      return (
        <Button
          // Remove hidden class to prevent layout shift
          className="md:flex hidden w-0 md:w-auto overflow-hidden p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:inline">TVL</span>
          <ArrowUpDown className="ml-2 h-4 w-4 hidden md:inline" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-0 md:w-auto overflow-hidden whitespace-nowrap">
          <span className="hidden md:inline">
            {formatUsd(row.getValue("tvl"))}
          </span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: true, // This column will hide on mobile
    },
  },
];
// {
//   id: "reasons",
//   accessorKey: "reasons",
//   header: ({ column }) => {
//     return (
//       <Button
//         className="p-0 text-xs md:text-sm"
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Reason
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     );
//   },
//   cell: ({ row }) => {
//     const reasons = (row.getValue("reasons") || []) as Reasons;

//     return (
//       <div>
//         {reasons.map((el) => (
//           <TooltipProvider>
//             <Badge
//               className="my-1 bg-red-500"
//               stage={"O"}
//               reason={el}
//               title="Reason"
//             >
//               {el}
//             </Badge>
//           </TooltipProvider>
//         ))}
//       </div>
//     );
//   },
//   sortingFn: "alphanumeric", // use built-in sorting function by name
// },
