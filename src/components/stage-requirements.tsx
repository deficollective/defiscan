import * as React from "react";
import { Stage } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface StageRequirementsProps {
  stage: Stage;
  stage_requirements?: [string[], string[], string[]];
  className?: string;
}

const StageRequirementSection = ({ 
  stageNumber, 
  currentStage, 
  requirements,
  isInfrastructure 
}: { 
  stageNumber: number; 
  currentStage: Stage; 
  requirements: string[];
  isInfrastructure: boolean;
}) => {
  const hasRequirements = requirements.length > 0;
  const issueCount = requirements.length;

  // Get numeric stage for infrastructure reviews
  const numericCurrentStage = isInfrastructure && typeof currentStage === 'string' 
    ? parseInt(currentStage.slice(1)) 
    : currentStage;

  // Get stage label
  const getStageLabel = (stageNum: number) => {
    if (isInfrastructure) {
      switch (stageNum) {
        case 0: return 'High';
        case 1: return 'Medium';
        case 2: return 'Low';
        default: return `Stage ${stageNum}`;
      }
    }
    return `Stage ${stageNum}`;
  };

  // Determine colors and status
  let statusColor, statusIcon, statusText;
  if (typeof numericCurrentStage === 'number' && numericCurrentStage >= stageNumber) {
    // Stage is completed (current stage >= this stage number)
    statusColor = 'text-green-500';
    statusIcon = '✅';
    statusText = '';
  } else if (typeof numericCurrentStage === 'number' && (
    numericCurrentStage === stageNumber - 1 || 
    (numericCurrentStage === 0 && stageNumber > 0)
  )) {
    // This is the next stage that needs to be achieved OR when at Stage 0, show Stage 1 and 2 as incomplete
    statusColor = 'text-red-500';
    statusIcon = '❌';
    statusText = hasRequirements ? `: ${issueCount} issue${issueCount !== 1 ? 's' : ''} need${issueCount === 1 ? 's' : ''} fixing` : '';
  } else {
    // Future stages beyond next
    statusColor = 'text-gray-500';
    statusIcon = '⚪';
    statusText = '';
  }

  return (
    <AccordionItem 
      value={`stage-${stageNumber}`} 
      className="border-none" 
      style={{ marginTop: stageNumber > 0 ? '-16px' : '0', paddingTop: '0' }}
    >
      <AccordionTrigger className={`text-sm font-semibold pb-1 hover:no-underline hover:opacity-80 ${statusColor}`}>
        {statusIcon} {getStageLabel(stageNumber)}{statusText}
      </AccordionTrigger>
      {hasRequirements && (
        <AccordionContent className="pb-2 pt-0 -mt-2">
          <ul className="text-sm text-muted-foreground space-y-2 ml-6">
            {requirements.map((requirement, index) => (
              <li key={index} className="flex items-start leading-6">
                <span className={`mr-2 flex-shrink-0 ${statusColor}`}>
                  {statusIcon}
                </span>
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

export function StageRequirements({ stage, stage_requirements, className }: StageRequirementsProps) {
  // Check if it's an infrastructure review
  const isInfrastructure = typeof stage === 'string' && stage.startsWith('I');
  
  // Get numeric stage for infrastructure reviews
  const numericStage = isInfrastructure ? parseInt(stage.slice(1)) : stage;
  
  // Show for stages 0, 1, or 2 (including I0, I1, I2)
  if (numericStage !== 0 && numericStage !== 1 && numericStage !== 2) {
    return null;
  }

  const stage0Requirements = stage_requirements?.[0] || [];
  const stage1Requirements = stage_requirements?.[1] || [];
  const stage2Requirements = stage_requirements?.[2] || [];

  // Determine which stage should be open by default (the next stage to achieve)
  const getDefaultOpenStage = (currentStage: number): string[] => {
    if (currentStage === 0) return ["stage-1"]; // Stage 0 achieved, show Stage 1 next
    if (currentStage === 1) return ["stage-2"]; // Stage 1 achieved, show Stage 2 next
    if (currentStage === 2) return []; // All stages achieved, nothing to show
    return []; // For other stages
  };

  const defaultOpenStage = getDefaultOpenStage(numericStage);

  return (
    <div className={className}>
      <Accordion type="multiple" defaultValue={defaultOpenStage}>
        <StageRequirementSection 
          stageNumber={0} 
          currentStage={stage} 
          requirements={stage0Requirements}
          isInfrastructure={isInfrastructure}
        />
        
        <div className="border-t border-border my-1"></div>
        
        <StageRequirementSection 
          stageNumber={1} 
          currentStage={stage} 
          requirements={stage1Requirements}
          isInfrastructure={isInfrastructure}
        />
        
        <div className="border-t border-border my-1"></div>
        
        <StageRequirementSection 
          stageNumber={2} 
          currentStage={stage} 
          requirements={stage2Requirements}
          isInfrastructure={isInfrastructure}
        />
      </Accordion>
    </div>
  );
}