import * as React from "react";
import { cn } from "@/lib/utils";
import { Stage } from "@/lib/types";

interface Requirement {
  text: string;
  status: 'fixed' | 'unfixed';
}

type RequirementInput = string | Requirement;

interface StageProgressBarProps {
  stage: Stage;
  stage_requirements?: [RequirementInput[], RequirementInput[], RequirementInput[]];
  className?: string;
}

export function StageProgressBar({ stage, stage_requirements, className }: StageProgressBarProps) {
  // Use stage directly for calculations
  const currentStage = stage;
  
  // Debug: log the stage value
  console.log("StageProgressBar - Current stage:", currentStage, typeof currentStage);
  
  // Check if it's an infrastructure review
  const isInfrastructure = typeof currentStage === 'string' && currentStage.startsWith('I');
  
  // Get the numeric stage for infrastructure reviews
  const numericStage = isInfrastructure ? parseInt(currentStage.slice(1)) : currentStage;
  
  // Calculate progress percentage based on next stage requirements
  const calculateProgress = (): number => {
    if (!stage_requirements) {
      // Fallback to stage-based progress if no requirements data
      if (numericStage === 1) return 50;
      if (numericStage === 2) return 100;
      return 0;
    }
    
    const [, stage1Reqs, stage2Reqs] = stage_requirements;
    
    if (numericStage === 0) {
      // Progress between stage 0 and 1 based on stage 1 requirements
      if (!stage1Reqs || stage1Reqs.length === 0) return 0;
      
      const normalizedReqs = stage1Reqs.map(req => 
        typeof req === 'string' ? { text: req, status: 'unfixed' as const } : req
      );
      const fixedCount = normalizedReqs.filter(req => req.status === 'fixed').length;
      const progressPercent = (fixedCount / normalizedReqs.length) * 50; // 0-50% range
      return progressPercent;
    } else if (numericStage === 1) {
      // Progress between stage 1 and 2 based on stage 2 requirements
      if (!stage2Reqs || stage2Reqs.length === 0) return 50;
      
      const normalizedReqs = stage2Reqs.map(req => 
        typeof req === 'string' ? { text: req, status: 'unfixed' as const } : req
      );
      const fixedCount = normalizedReqs.filter(req => req.status === 'fixed').length;
      const progressPercent = 50 + (fixedCount / normalizedReqs.length) * 50; // 50-100% range
      return progressPercent;
    } else if (numericStage === 2) {
      return 100;
    }
    
    return 0;
  };
  
  const progressPercentage = calculateProgress();
  
  return (
    <div className={cn("w-full max-w-full mx-auto px-8", className)}>
      
      {/* Continuous progress bar */}
      <div className="relative">
        {/* Background bar */}
        <div className="w-full h-3 rounded-full relative bg-gray-200">
          {/* Colored progress fill based on fixed issues */}
          {progressPercentage > 0 && (
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                progressPercentage >= 100 ? 'bg-green-500' : 
                progressPercentage >= 50 ? 'bg-yellow-500' : 
                'bg-yellow-500'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          )}
        </div>
        
        {/* Stage markers */}
        <div className="flex justify-between items-center absolute inset-0">
          <div className="flex flex-col items-center -translate-x-8">
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
          
          <div className="flex flex-col items-center translate-x-8">
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