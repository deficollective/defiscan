"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ExternalLink } from "lucide-react";
import type {
  ContentBlock,
  TableColorScale,
  TableBadgeColumn,
  ExpandableTableRow,
  PermissionedFunction,
} from "@/lib/review-page/types";

function TagBadge({
  variant,
  children,
}: {
  variant: string;
  children: React.ReactNode;
}) {
  const baseClasses = "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium";

  switch (variant) {
    case "immutable":
      return (
        <span className={`${baseClasses} bg-green-200 border-green-500 text-green-800`}>
          {children}
        </span>
      );
    case "upgradeable":
      return (
        <span className={`${baseClasses} bg-orange-200 border-orange-500 text-orange-800`}>
          {children}
        </span>
      );
    case "eoa":
      return (
        <span className={`${baseClasses} bg-red-200 border-red-500 text-red-800`}>
          {children}
        </span>
      );
    case "external":
      return (
        <span className={`${baseClasses} bg-red-200 border-red-500 text-red-800`}>
          {children}
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-gray-200 border-gray-400 text-gray-700`}>
          {children}
        </span>
      );
  }
}

function interpolateMetrics(
  text: string,
  metrics: Record<string, string | number>
): string {
  return text.replace(
    /\{\{(\w+)\}\}/g,
    (_, key) => String(metrics[key] ?? `{{${key}}}`)
  );
}

function formatMetricValue(
  value: string | number,
  format?: "usd" | "percent" | "number" | "string"
): string {
  if (format === "usd" && typeof value === "number") {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  }
  if (format === "percent" && typeof value === "number") {
    return `${value.toFixed(1)}%`;
  }
  return String(value);
}

function getShareColor(
  rowIndex: number,
  colIndex: number,
  colorScale: TableColorScale | undefined,
  metrics: Record<string, string | number>
): string | undefined {
  if (!colorScale) return undefined;
  const colPos = colorScale.columns.indexOf(colIndex);
  if (colPos === -1) return undefined;

  const ref = Number(metrics[colorScale.referenceMetric]);
  const valueKey = colorScale.valueMetrics[rowIndex]?.[colPos];
  if (!valueKey) return undefined;
  const val = Number(metrics[valueKey]);
  if (isNaN(ref) || isNaN(val) || ref === 0) return undefined;

  const share = val / ref;
  if (share < 0.25) return "text-green-600";
  if (share < 0.5) return "text-orange-500";
  return "text-red-600";
}

function getBadgeConfig(
  colIndex: number,
  badgeColumns?: TableBadgeColumn[]
): TableBadgeColumn | undefined {
  return badgeColumns?.find((b) => b.column === colIndex);
}

interface DynamicContentBlockProps {
  block: ContentBlock;
  metrics: Record<string, string | number>;
}

export function DynamicContentBlock({
  block,
  metrics,
}: DynamicContentBlockProps) {
  switch (block.type) {
    case "text":
      return (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {interpolateMetrics(block.content, metrics)}
        </p>
      );

    case "table":
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {block.headers.map((header, i) => (
                <TableHead key={i}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {block.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const colorClass = getShareColor(
                    rowIndex,
                    cellIndex,
                    block.colorScale,
                    metrics
                  );
                  const badgeConfig = getBadgeConfig(
                    cellIndex,
                    block.badgeColumns
                  );
                  const cellText = interpolateMetrics(cell, metrics);

                  if (badgeConfig) {
                    const variant = badgeConfig.colorMap?.[cellText] ?? "default";
                    return (
                      <TableCell key={cellIndex}>
                        <TagBadge variant={variant}>
                          {cellText}
                        </TagBadge>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={cellIndex}>
                      <span className={colorClass ? `font-semibold ${colorClass}` : undefined}>
                        {cellText}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

    case "expandableTable": {
      const externalCallers = block.externalCallers ?? [];
      return (
        <Accordion type="multiple" className="w-full">
          <div className="flex items-center w-full border-b">
            <div className="w-8 shrink-0"></div>
            {block.headers.map((header, i) => (
              <div key={i} className="flex-1 py-3 text-left text-sm font-medium text-muted-foreground">
                {header}
              </div>
            ))}
          </div>
          {block.rows.map((row: ExpandableTableRow, rowIndex: number) => {
            const hasExpandedContent = row.expandedContent?.functions?.length;
            // Check if any caller in this row has an external dependency
            const rowHasExternalCaller = row.expandedContent?.functions?.some(
              (fn) => fn.callers.some((c) => externalCallers.includes(c))
            ) ?? false;
            return (
              <AccordionItem
                key={rowIndex}
                value={`row-${rowIndex}`}
                className="border-b"
              >
                <AccordionTrigger
                  className="hover:no-underline py-0 [&>svg]:hidden [&[data-state=open]>div>svg]:rotate-180"
                  disabled={!hasExpandedContent}
                >
                  <div className="flex items-center w-full">
                    <div className="w-8 shrink-0 flex justify-center">
                      {hasExpandedContent ? (
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      ) : (
                        <span className="w-4" />
                      )}
                    </div>
                    {row.cells.map((cell, cellIndex) => {
                      const badgeConfig = getBadgeConfig(
                        cellIndex,
                        block.badgeColumns
                      );
                      const cellText = interpolateMetrics(cell, metrics);
                      return (
                        <div
                          key={cellIndex}
                          className="flex-1 py-3 text-left text-sm"
                        >
                          {badgeConfig ? (
                            <div className="flex items-center gap-1 flex-wrap">
                              <TagBadge
                                variant={badgeConfig.colorMap?.[cellText] ?? "default"}
                              >
                                {cellText}
                              </TagBadge>
                              {rowHasExternalCaller && (
                                <TagBadge variant="external">
                                  Ext. Dependency
                                </TagBadge>
                              )}
                            </div>
                          ) : (
                            cellText
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionTrigger>
                {hasExpandedContent && (
                  <AccordionContent className="pb-4">
                    <div className="ml-8 pl-4 space-y-3">
                      <div className="text-xs text-gray-500 font-medium">
                        Permissioned entry points:
                      </div>
                      {row.expandedContent!.functions.map(
                        (fn: PermissionedFunction, fnIndex: number) => (
                          <div key={fnIndex} className="space-y-1">
                            <div className="text-sm font-mono text-primary flex items-center gap-2">
                              <span className="text-gray-500">&larr;</span>
                              {fn.name}
                            </div>
                            <div className="ml-6 space-y-0.5">
                              {fn.callers.map((caller, callerIndex) => {
                                const isExternalCaller = externalCallers.includes(caller);
                                return (
                                  <div
                                    key={callerIndex}
                                    className="text-xs text-muted-foreground flex items-center gap-1"
                                  >
                                    <span className="font-mono text-gray-600">
                                      {callerIndex === fn.callers.length - 1
                                        ? "└─"
                                        : "├─"}
                                    </span>
                                    {caller}
                                    {isExternalCaller && (
                                      <TagBadge variant="external">
                                        External Dependency
                                      </TagBadge>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      );
    }

    case "dropdown":
      return (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-0">
            <AccordionTrigger className="text-sm">
              {block.label}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {block.content.map((innerBlock, i) => (
                  <DynamicContentBlock
                    key={i}
                    block={innerBlock}
                    metrics={metrics}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );

    case "link":
      return (
        <a
          href={block.href}
          target={block.external ? "_blank" : undefined}
          rel={block.external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
        >
          {block.text}
          {block.external && <ExternalLink className="h-3 w-3" />}
        </a>
      );

    case "metric": {
      const value = metrics[block.metricKey];
      if (value === undefined) return null;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{block.label}:</span>
          <span className="text-sm font-medium">
            {formatMetricValue(value, block.format)}
          </span>
        </div>
      );
    }

    default:
      return null;
  }
}

interface DynamicContentListProps {
  blocks: ContentBlock[];
  metrics: Record<string, string | number>;
}

export function DynamicContentList({
  blocks,
  metrics,
}: DynamicContentListProps) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <DynamicContentBlock key={i} block={block} metrics={metrics} />
      ))}
    </div>
  );
}
