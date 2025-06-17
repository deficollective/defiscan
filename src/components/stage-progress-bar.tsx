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
    <div className={cn("w-full max-w-full mx-auto px-4", className)}>
      
      {/* Continuous progress bar */}
      <div className="relative">
        {/* Background bar */}
        <div className="w-full h-3 rounded-full relative bg-gray-200">
          {/* Colored progress fill - only render when there's progress */}
          {numericStage === 1 && (
            <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 w-1/2 bg-yellow-500" />
          )}
          {numericStage === 2 && (
            <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 w-full bg-green-500" />
          )}
        </div>
        
        {/* Stage markers */}
        <div className="flex justify-between items-center absolute inset-0 px-4">
          <div className="flex flex-col items-center">
            <div className={`w-16 h-6 rounded-md border-2 flex items-center justify-center text-xs font-semibold transition-colors bg-white px-1 ${
              numericStage === 0 ? 'border-red-500 text-red-500' :
              numericStage === 1 ? 'border-yellow-500 text-yellow-500' :
              numericStage === 2 ? 'border-green-500 text-green-500' : 
              'border-gray-300 text-gray-400'
            }`}>
              {isInfrastructure ? 'High' : 'Stage 0'}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-16 h-6 rounded-md border-2 flex items-center justify-center text-xs font-semibold transition-colors bg-white px-1 ${
              numericStage === 1 ? 'border-yellow-500 text-yellow-500' :
              numericStage === 2 ? 'border-green-500 text-green-500' : 
              'border-gray-300 text-gray-400'
            }`}>
              {isInfrastructure ? 'Medium' : 'Stage 1'}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-16 h-6 rounded-md border-2 flex items-center justify-center text-xs font-semibold transition-colors bg-white px-1 ${
              numericStage === 2 ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-400'
            }`}>
              {isInfrastructure ? 'Low' : 'Stage 2'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}