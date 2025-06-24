"use client";

import { cn, formatUsd } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { PizzaRosetteCell } from "../rosette/rosette-cell";
import { getRiskDescriptions } from "../rosette/data-converter/data-converter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, ChevronRight, Minus } from "lucide-react";
import { Project, Reason, Reasons, RiskArray, Stage } from "@/lib/types";
import { Chain, ChainNames } from "../chain";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { StageBadge } from "../stage";
import { infraScoreToText } from "@/app/protocols/stageToRequisites";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const createColumns = (
  getProtocolLogo: (name: string) => string
): ColumnDef<Project>[] => [
  {
    accessorKey: "protocol",
    header: ({ column }) => {
      return (
        <Button
          className="text-left justify-start h-8 pl-6"
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
      const protocol = row.getValue("protocol");
      const baseProtocol = (row.original as any).baseProtocol || protocol;
      return (
        <div className="flex items-center max-w-36 md:max-w-48">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage
              src={getProtocolLogo(baseProtocol as string)}
              alt={protocol as string}
            />
          </Avatar>
          <span className="ml-2 truncate">{protocol as string}</span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
  },
  {
    id: "chain",
    accessorKey: "chain",
    header: ({ column }) => {
      return (
        <Button
          className="justify-start md:justify-center"
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
          <div className="flex items-center justify-center md:justify-center">
            {chains.map((c, i) => (
              <Chain
                key={`chain-${i}`}
                name={c as ChainNames}
                className={cn(i > 0 && "-ml-3", "scale-75 md:scale-100")}
              />
            ))}
          </div>
        );
      }

      return (
        <div className="flex items-center justify-center md:justify-center">
          <Chain name={chain as ChainNames} className="scale-75 md:scale-100" />
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: false,
    },
  },
  {
    id: "centralization",
    accessorKey: "stage",
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
      
      if (!stage?.toString().startsWith("I")) {
        return null;
      }

      return (
        <div className="w-full flex justify-center">
          <div className="scale-75 md:scale-100">
            <StageBadge 
              stage={stage} 
              reasons={[]} 
              subStages={[]}
            />
          </div>
        </div>
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
          className="p-0 text-xs md:text-sm justify-start md:w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (row.depth === 0 && row.original.children) {
        const stages = row.original.children.map((r) => r.stage);
        return filterValue.some((v: Stage) => stages.includes(v));
      }
      return filterValue.includes(row.getValue(columnId));
    },
    cell: ({ row }) => {
      let stage = row.getValue("stage") as Stage;
      const reasons = row.original.reasons as Reason[];

      // Don't render infrastructure scores in this column
      if (stage?.toString().startsWith("I")) {
        return null;
      }

      const subStages =
        row.original.children?.map((c) => ({
          chain: c.chain,
          stage: c.stage,
          reasons: c.reasons,
        })) || [];

      if (stage === undefined) {
        const getHighestStage = (subStages: Array<{stage: Stage}>): Stage => {
          if (subStages.length === 0) return "V";
          
          const stagePriority: Record<Stage, number> = { "2": 5, "1": 4, "0": 3, "R": 2, "O": 1, "V": 0, "I0": 0, "I1": 0, "I2": 0 };
          
          return subStages.reduce((highest, current) => {
            return (stagePriority[current.stage] || 0) > (stagePriority[highest] || 0) ? current.stage : highest;
          }, subStages[0]?.stage || ("V" as Stage));
        };
        
        const highestStage = getHighestStage(subStages);
        const uniqueStages = Array.from(new Set(subStages.map(s => s.stage)));
        stage = uniqueStages.length === 1 ? highestStage : "V";
        
        return (
          <div className="flex justify-start md:justify-center">
            <div className="scale-75 md:scale-100">
              <StageBadge 
                stage={stage} 
                reasons={reasons} 
                subStages={subStages}
                highestStage={highestStage}
              />
            </div>
          </div>
        );
      }

      return (
        <div className="flex justify-start md:justify-center">
          <div className="scale-75 md:scale-100">
            <StageBadge stage={stage} reasons={reasons} subStages={subStages} />
          </div>
        </div>
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
      let reasons = row.getValue("reasons") as Reasons;
      
      // For aggregated rows (parent rows with children), collect reasons from all children
      if (row.original.children && row.original.children.length > 0) {
        const childReasons = row.original.children
          .flatMap((child: any) => child.reasons || [])
          .filter((reason: string, index: number, arr: string[]) => 
            arr.indexOf(reason) === index // Remove duplicates
          );
        reasons = [...(reasons || []), ...childReasons];
      }
      
      if (!reasons || reasons.length === 0) return null;
      
      return (
        <div>
          {reasons.map((el, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger>
                <div className="scale-75 md:scale-100">
                  <Badge className="my-1 bg-red-500 text-white">
                    {el}
                  </Badge>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                Reason for unqualified status
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      );
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "risks",
    header: () => {
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
      responsiveHidden: true,
    },
  },
  {
    id: "type",
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs md:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type");
      return <div className="text-center">{type as string}</div>;
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: true,
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
          Used by
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
        <div className="flex flex-wrap gap-1 max-w-32">
          {protocols.map((protocolName, index) => (
            <img
              key={index}
              src={getProtocolLogo(protocolName)}
              alt={protocolName}
              title={protocolName}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
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
          className="w-0 w-auto overflow-hidden p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>TVL</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, table }) => {
      let tvl = row.getValue("tvl");
      
      // For aggregated rows (parent rows with children), calculate TVL only from children 
      // that match the current tab's stage filter
      if (row.original.children && row.original.children.length > 0) {
        // Get the current stage filter from the table's column filters
        const stageFilter = table.getColumn("stage")?.getFilterValue() as string[];
        
        if (stageFilter && stageFilter.length > 0) {
          // Sum TVL only from children that match the stage filter
          const filteredTvl = row.original.children
            .filter((child: any) => stageFilter.includes(child.stage))
            .reduce((sum: number, child: any) => {
              const childTvl = child.tvl;
              if (childTvl === "n/a" || childTvl === null || childTvl === undefined) return sum;
              return sum + (typeof childTvl === "number" ? childTvl : 0);
            }, 0);
          
          tvl = filteredTvl > 0 ? filteredTvl : "n/a";
        }
      }
      
      return (
        <div className="w-0 md:w-auto overflow-hidden whitespace-nowrap">
          <span className="hidden md:inline">
            {tvl === "n/a" ? "n/a" : formatUsd(tvl as number)}
          </span>
        </div>
      );
    },
    sortingFn: "alphanumeric",
    meta: {
      responsiveHidden: true,
    },
  },
];