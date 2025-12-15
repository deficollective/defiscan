"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { HoverCard } from "./ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { type Sentiment } from "./rosette/types";

// Define the dimension types
type Dimension = "Chain" | "Upgradeability" | "Autonomy" | "ExitWindow" | "Accessibility";

export interface DimensionBadgeProps {
  className?: string;
  dimension: Dimension;
  sentiment: Sentiment;
  description?: string;
}

// Dimension display names
const dimensionLabels: Record<Dimension, string> = {
  Chain: "Chain",
  Upgradeability: "Upgrades", 
  Autonomy: "Autonomy",
  ExitWindow: "Exit Window",
  Accessibility: "Access",
};

// Risk descriptions
const riskDescriptions: Record<Dimension, Record<string, string>> = {
  Chain: {
    low: "Chain is sufficiently decentralized.",
    medium: "Chain is on the journey to become sufficiently decentralized.",
    high: "Chain is not sufficiently decentralized.",
    neutral: "Chain criteria is not scored for this deployment.",
  },
  Upgradeability: {
    low: "Possible updates do not materially change the system (or result in the theft or loss of user funds and unclaimed yield)",
    medium: "Possible updates may result in the theft or loss of unclaimed yield or may otherwise materially change the system (but user funds remain unaffected)",
    high: "Possible updates may result in the theft or loss of user funds",
  },
  Autonomy: {
    low: "Failure of a dependency does not materially change the performance of the system (or result in the theft or loss of user funds and unclaimed yield)",
    medium: "Failure of a dependency may result in the theft or loss of unclaimed yield or may otherwise materially change the performance of the system (but user funds remain unaffected)",
    high: "Failure of a dependency may result in the theft or loss of user funds",
  },
  ExitWindow: {
    low: "Control of the permissioned functions is fully revoked OR delegated to a robust on-chain governance system AND an exit window of at least 30 days is enforced",
    medium: "Control of the permissioned functions is delegated to a Security Council OR an exit window of at least 7 days is enforced",
    high: "Centralized operators are in control of the permissioned functions with an exit window of less than 7 days",
  },
  Accessibility: {
    low: "Multiple independent user interfaces exist, e.g. websites, in-wallet access, etc., guaranteeing access to user funds even if one interface is shutdown",
    medium: "A single user interface exists with public access to a backup solution such as a self-hosting app",
    high: "A single user interface exists without a backup solution",
  },
};

const DimensionBadgeInner = ({ 
  dimension, 
  sentiment,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave
}: { 
  dimension: Dimension; 
  sentiment: Sentiment;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  // Get pie chart inspired colors
  const getBgColor = () => {
    switch (sentiment) {
      case "low": return "#4ade80"; // green-400 (between green-300 and green-500)
      case "medium": return "#facc15"; // yellow-400 (between yellow-200 and yellow-500)  
      case "high": return "#ea580ce6"; // orange-600 at 90% opacity
      case "neutral":
      case "UnderReview":
      default: return "#9ca3af"; // gray-400
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ backgroundColor: getBgColor() }}
      className={cn(
        "border-none text-white rounded mx-auto flex justify-center w-full h-8 cursor-pointer items-center text-xs font-semibold",
        className
      )}
    >
      {dimensionLabels[dimension]}
    </div>
  );
};

export function DimensionBadge({
  className,
  dimension,
  sentiment,
  description,
}: DimensionBadgeProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const scrollToSection = (sectionName: string) => {
    // Handle specific case mapping (same as in rosette)
    const sectionMap: { [key: string]: string } = {
      'Chain': 'chain',
      'Upgradeability': 'upgradeability', 
      'Autonomy': 'autonomy',
      'ExitWindow': 'exit-window',
      'Accessibility': 'accessibility'
    };
    
    const sectionId = sectionMap[sectionName] || sectionName.toLowerCase();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <DimensionBadgeInner 
            dimension={dimension}
            sentiment={sentiment}
            className={cn(className, isHovered && "opacity-70", "transition-all")}
            onClick={() => scrollToSection(dimension)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        sideOffset={4}
        className="z-50 p-4 rounded-md bg-white shadow-lg border max-w-sm"
      >
        <div className="prose-sm">
          <h4 className="font-semibold mb-2">{dimensionLabels[dimension]}</h4>
          <p className="text-sm">
            {description || riskDescriptions[dimension][sentiment] || "Under review"}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}