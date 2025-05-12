"use client";

import { formatUsd } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { TooltipProvider } from "../rosette/tooltip/tooltip";
import { PizzaRosetteCell } from "../rosette/rosette-cell";
import { getRiskDescriptions } from "../rosette/data-converter/data-converter";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Project, Reason, Reasons, RiskArray, Stage } from "@/lib/types";
import { infraScoreToText } from "@/app/protocols/stageToRequisites";

export const createColumns = (
  getProtocolLogo: (name: string) => string
): ColumnDef<Project>[] => [
  {
    id: "logo",
    accessorKey: "logo",
    header: "",
    cell: ({ row }) => {
      const logo = row.getValue("logo") as string;
      const protocol = row.getValue("protocol") as string;
      if (!logo)
        return (
          <img
            src={"/images/placeholder.png"}
            alt={protocol || ""}
            className="min-w-8 min-h-8 max-w-10 max-h-10 md:max-w-12 md:max-h-12 object-cover"
          />
        );

      return (
        <img
          src={logo}
          alt={protocol || ""}
          className="min-w-8 min-h-8 max-w-10 max-h-10 md:max-w-12 md:max-h-12 object-cover"
        />
      );
    },
  },
  {
    id: "protocol",
    accessorKey: "protocol",
    header: ({ column }) => {
      return (
        <Button
          className="text-left justify-start p-0 text-xs md:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Protocol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="text-xs md:text-sm">{row.getValue("protocol")}</p>;
    },
    sortingFn: "alphanumeric", // use built-in sorting function by name
  },
  {
    id: "centralization",
    accessorKey: "stage", // Still uses stage as data source
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs md:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Centralization
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stage = row.getValue("stage") as Stage;
      // Only show for infrastructure items
      if (!stage?.toString().startsWith("I")) {
        return null;
      }

      return (
        <TooltipProvider>
          <Badge
            stage={stage}
            title="Level of Centralization"
            className={`${
              stage === "I0"
                ? "bg-red-500"
                : stage === "I1"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            } text-white py-1 rounded "text-lg"`}
          >
            {infraScoreToText[stage!.toString()]}
          </Badge>
        </TooltipProvider>
      );
    },
    sortingFn: "alphanumeric",
  },
  {
    id: "stage",
    accessorKey: "stage",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs md:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      // Check if the row's stage value is in the filterValue array
      return filterValue.includes(row.getValue(columnId));
    },
    cell: ({ row }) => {
      const stage = row.getValue("stage") as Stage;

      // Don't render infrastructure scores in this column
      if (stage?.toString().startsWith("I")) {
        return null;
      }

      return (
        <TooltipProvider>
          <Badge
            stage={stage}
            title="Stage of Decentralisation"
            className={`${
              stage === "R"
                ? "bg-gray-500"
                : stage === 0
                  ? "bg-red-500"
                  : stage === 1
                    ? "bg-yellow-500"
                    : "bg-green-500"
            } text-white py-1 rounded "text-lg"`}
          >
            {stage === "R" ? "Review" : "Stage " + stage!}
          </Badge>
        </TooltipProvider>
      );
    },
    sortingFn: "alphanumeric",
  },
  {
    id: "reasons",
    accessorKey: "reasons",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs md:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reason
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const reasons = row.getValue("reasons") as Reasons;
      return (
        <div>
          {reasons.map((el) => (
            <TooltipProvider>
              <Badge
                className="my-1 bg-red-500"
                stage={"O"}
                reason={el}
                title="Reason"
              >
                {el}
              </Badge>
            </TooltipProvider>
          ))}
        </div>
      );
    },
    sortingFn: "alphanumeric", // use built-in sorting function by name
  },
  {
    accessorKey: "risks",
    header: ({ column }) => {
      return <p className="text-xs md:text-sm">Risks</p>;
    },
    cell: ({ row }) => {
      const risks = row.getValue("risks") as RiskArray;

      return (
        <TooltipProvider>
          <PizzaRosetteCell
            values={getRiskDescriptions(risks)}
            isUnderReview={false}
          />
        </TooltipProvider>
      );
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
    id: "chain",
    accessorKey: "chain",
    header: ({ column }) => {
      return (
        <Button
          // Remove hidden class to prevent layout shift
          className="md:flex hidden w-0 md:w-auto overflow-hidden p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:inline">Chain</span>
          <ArrowUpDown className="ml-2 h-4 w-4 hidden md:inline" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-0 md:w-auto overflow-hidden whitespace-nowrap">
          <span className="hidden md:inline">{row.getValue("chain")}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: true, // This column will hide on mobile
    },
  },
  {
    id: "protocols",
    accessorKey: "protocols",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs md:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Protocols
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const protocols = row.getValue("protocols") as string[];

      if (!protocols || protocols.length === 0) {
        return null;
      }

      return (
        <div className="flex flex-wrap gap-1 max-w-48">
          {protocols.map((protocolName, index) => (
            <img
              key={index}
              src={getProtocolLogo(protocolName)}
              alt={protocolName}
              title={protocolName}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image doesn't exist
                (e.target as HTMLImageElement).src = "/images/placeholder.png";
              }}
            />
          ))}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const protocolsA = (rowA.getValue("protocols") as string[]) || [];
      const protocolsB = (rowB.getValue("protocols") as string[]) || [];
      return protocolsA.length - protocolsB.length;
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
