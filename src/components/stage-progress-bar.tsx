import * as React from "react";
import { cn } from "@/lib/utils";
import { Stage } from "@/lib/types";

interface StageProgressBarProps {
  stage: Stage;
  className?: string;
}

export function StageProgressBar({ stage, className }: StageProgressBarProps) {
  // Use stage directly for calculations
  const currentStage = stage;
  
  // Debug: log the stage value
  console.log("StageProgressBar - Current stage:", currentStage, typeof currentStage);
  
  // Check if it's an infrastructure review
  const isInfrastructure = typeof currentStage === 'string' && currentStage.startsWith('I');
  
  // Get the numeric stage for infrastructure reviews
  const numericStage = isInfrastructure ? parseInt(currentStage.slice(1)) : currentStage;
  
  return (
    <div className={cn("w-full mx-auto", className)}>
      
      {/* Continuous progress bar */}
      <div className="relative">
        {/* Background bar */}
        <div 
          className="w-full h-3 rounded-full relative"
          style={{ backgroundColor: '#e5e7eb' }}
        >
          {/* Colored progress fill - only render when there's progress */}
          {(numericStage === 1 || numericStage === 2) && (
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
              style={{
                width: numericStage === 1 ? '50%' : 
                       numericStage === 2 ? '100%' : '0%',
                backgroundColor: numericStage === 1 ? '#eab308' : 
                                numericStage === 2 ? '#22c55e' : 'transparent'
              }}
            />
          )}
        </div>
        
        {/* Stage markers */}
        <div className="flex justify-between items-center absolute inset-0 px-0">
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-6 rounded-md border-2 flex items-center justify-center text-xs font-semibold transition-colors bg-white -translate-x-10 px-2"
              style={{
                borderColor: numericStage === 0 ? '#ef4444' :
                           numericStage === 1 ? '#eab308' :
                           numericStage === 2 ? '#22c55e' : '#d1d5db',
                borderWidth: '2px',
                borderStyle: 'solid',
                color: numericStage === 0 ? '#ef4444' :
                       numericStage === 1 ? '#eab308' :
                       numericStage === 2 ? '#22c55e' : '#9ca3af'
              }}
            >
              {isInfrastructure ? 'High' : 'Stage 0'}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-6 rounded-md border-2 flex items-center justify-center text-xs font-semibold transition-colors bg-white px-2"
              style={{
                borderColor: numericStage === 1 ? '#eab308' :
                           numericStage === 2 ? '#22c55e' : '#d1d5db',
                borderWidth: '2px',
                borderStyle: 'solid',
                color: numericStage === 1 ? '#eab308' :
                       numericStage === 2 ? '#22c55e' : '#9ca3af'
              }}
            >
              {isInfrastructure ? 'Medium' : 'Stage 1'}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-6 rounded-md border-2 flex items-center justify-center text-xs font-semibold transition-colors bg-white translate-x-10 px-2"
              style={{
                borderColor: numericStage === 2 ? '#22c55e' : '#d1d5db',
                borderWidth: '2px',
                borderStyle: 'solid',
                color: numericStage === 2 ? '#22c55e' : '#9ca3af'
              }}
            >
              {isInfrastructure ? 'Low' : 'Stage 2'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}