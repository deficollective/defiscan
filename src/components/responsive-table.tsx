"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, ReactElement } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactDOMServer from "react-dom/server";

// Helper function to safely get text content from a React node
function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getTextContent).join(" ");
  if (React.isValidElement(node)) {
    return getTextContent(node.props.children);
  }
  return "";
}

// Helper function to parse table data with proper typing
function parseTableData(children: React.ReactNode): {
  headers: string[];
  rows: string[][];
} {
  const headers: string[] = [];
  const rows: string[][] = [];
  let currentRow: string[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    const childElement = child as ReactElement;

    if (childElement.type === "thead") {
      React.Children.forEach(childElement.props.children, (tr) => {
        if (!React.isValidElement(tr)) return;
        const trElement = tr as ReactElement;

        React.Children.forEach(trElement.props.children, (th) => {
          if (!React.isValidElement(th)) return;
          const thElement = th as ReactElement;
          headers.push(getTextContent(thElement.props.children));
        });
      });
    } else if (childElement.type === "tbody") {
      React.Children.forEach(childElement.props.children, (tr) => {
        if (!React.isValidElement(tr)) return;
        const trElement = tr as ReactElement;
        currentRow = [];

        React.Children.forEach(trElement.props.children, (td) => {
          if (!React.isValidElement(td)) return;
          const tdElement = td as ReactElement;

          // Handle HTML content
          const content = React.isValidElement(tdElement.props.children)
            ? ReactDOMServer.renderToStaticMarkup(tdElement.props.children)
            : getTextContent(tdElement.props.children);

          currentRow.push(content);
        });

        if (currentRow.length) rows.push([...currentRow]);
      });
    }
  });

  return { headers, rows };
}

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  children,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const { headers, rows } = parseTableData(children);
  
  // Check if this is a permissions table
  const isPermissionsTable = headers.includes("Function") && headers.includes("Impact");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    // Count occurrences of first column values
    const firstColumnCounts = rows.reduce(
      (acc, row) => {
        const firstCol = row[0];
        acc[firstCol] = (acc[firstCol] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return (
      <Accordion type="single" collapsible className="w-full">
        {rows.map((row, index) => {
          const firstColumnValue = row[0];
          const hasDuplicates = firstColumnCounts[firstColumnValue] > 1;

          // Create title based on whether first column has duplicates
          const displayTitle = hasDuplicates
            ? `${firstColumnValue} (${row[1]})` // If duplicate, combine first and second columns
            : firstColumnValue; // If unique, just use first column

          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-sm lg:text-lg font-semibold text-left">
                <div dangerouslySetInnerHTML={{ __html: displayTitle }} />
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {/* Skip columns that are already in title */}
                  {row.slice(1).map((cell, cellIndex) => (
                    <div key={cellIndex}>
                      <span className="font-semibold block mb-2">
                        {headers[cellIndex + 1]}
                      </span>
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: cell }}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }

  return (
    <div className={cn(
      isPermissionsTable ? "overflow-x-auto 2xl:overflow-x-visible" : "overflow-x-auto", 
      className
    )}>
      <table className={cn(
        "w-full border-collapse border",
        isPermissionsTable ? "table-fixed permissions-table" : "table-auto"
      )}>
        {children}
      </table>
    </div>
  );
};
