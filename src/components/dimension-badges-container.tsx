import * as React from "react";
import { DimensionBadge } from "./dimension-badge";
import { type RosetteValue } from "./rosette/types";

interface DimensionBadgesContainerProps {
  values: RosetteValue[];
  className?: string;
}

export function DimensionBadgesContainer({ 
  values,
  className = "" 
}: DimensionBadgesContainerProps) {
  return (
    <div className={`flex flex-col w-full ${className}`} style={{ gap: '2px' }}>
      {values.map((value) => (
        <DimensionBadge
          key={value.name}
          dimension={value.name as any}
          sentiment={value.sentiment}
          description={value.description || value.value}
        />
      ))}
    </div>
  );
}