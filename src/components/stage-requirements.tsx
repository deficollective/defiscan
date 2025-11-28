import * as React from "react";
import { Stage } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Requirement {
  text: string;
  status: 'fixed' | 'unfixed';
}

type RequirementInput = string | Requirement;

interface StageRequirementsProps {
  stage: Stage;
  stage_requirements?: [RequirementInput[], RequirementInput[], RequirementInput[]];
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
  requirements: RequirementInput[];
  isInfrastructure: boolean;
}) => {
  // Convert requirements to normalized format
  const normalizedRequirements: Requirement[] = requirements.map(req => 
    typeof req === 'string' ? { text: req, status: 'unfixed' as const } : req
  );
  
  const hasRequirements = normalizedRequirements.length > 0;
  const fixedCount = normalizedRequirements.filter(req => req.status === 'fixed').length;
  const unfixedCount = normalizedRequirements.filter(req => req.status === 'unfixed').length;
  const totalCount = normalizedRequirements.length;

  // Check if current stage is "O" (Others)
  const isCurrentStageO = currentStage === 'O';
  
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
  
  if (isCurrentStageO && stageNumber === 0) {
    // For stage "O", Stage 0 should show as the next target to achieve
    statusColor = 'text-red-500';
    statusIcon = '❌';
    if (hasRequirements) {
      if (unfixedCount > 0 && fixedCount > 0) {
        statusText = `: ${unfixedCount} of ${totalCount} issue${totalCount !== 1 ? 's' : ''} need${unfixedCount === 1 ? 's' : ''} fixing`;
      } else if (unfixedCount > 0) {
        statusText = `: ${unfixedCount} issue${unfixedCount !== 1 ? 's' : ''} need${unfixedCount === 1 ? 's' : ''} fixing`;
      } else {
        statusText = `: ${totalCount} issue${totalCount !== 1 ? 's' : ''} resolved`;
      }
    } else {
      statusText = '';
    }
  } else if (typeof numericCurrentStage === 'number' && numericCurrentStage >= stageNumber) {
    // Stage is completed (current stage >= this stage number)
    statusColor = 'text-green-500';
    statusIcon = '✅';
    statusText = hasRequirements && fixedCount > 0 ? `: ${fixedCount} issue${fixedCount !== 1 ? 's' : ''} resolved` : '';
  } else if (typeof numericCurrentStage === 'number' && (
    numericCurrentStage === stageNumber - 1 || 
    (numericCurrentStage === 0 && stageNumber > 0)
  )) {
    // This is the next stage that needs to be achieved OR when at Stage 0, show Stage 1 and 2 as incomplete
    statusColor = 'text-red-500';
    statusIcon = '❌';
    if (hasRequirements) {
      if (unfixedCount > 0 && fixedCount > 0) {
        statusText = `: ${unfixedCount} of ${totalCount} issue${totalCount !== 1 ? 's' : ''} need${unfixedCount === 1 ? 's' : ''} fixing`;
      } else if (unfixedCount > 0) {
        statusText = `: ${unfixedCount} issue${unfixedCount !== 1 ? 's' : ''} need${unfixedCount === 1 ? 's' : ''} fixing`;
      } else {
        statusText = `: ${totalCount} issue${totalCount !== 1 ? 's' : ''} resolved`;
      }
    } else {
      statusText = '';
    }
  } else {
    // Future stages beyond next
    statusColor = 'text-gray-500';
    statusIcon = '⚪';
    statusText = '';
  }

  return (
    <AccordionItem 
      value={`stage-${stageNumber}`} 
      className={`border-none pt-0 ${stageNumber > 0 ? '-mt-4' : ''}`}
    >
      <AccordionTrigger className="text-sm font-semibold pb-1 hover:no-underline hover:opacity-80 text-black text-left">
        <div className="flex items-center">
          <span className={statusColor}>{statusIcon}</span>
          <span className="ml-1">{getStageLabel(stageNumber)}</span>
          <span className="font-normal ml-0">{statusText}</span>
        </div>
      </AccordionTrigger>
      {hasRequirements && (
        <AccordionContent className="pb-2 pt-1">
          <ul className="text-sm text-muted-foreground space-y-2 ml-6">
            {normalizedRequirements.map((requirement, index) => {
              const isFixed = requirement.status === 'fixed';
              const itemIcon = isFixed ? '✅' : '❌';
              const itemColor = isFixed ? 'text-green-500' : 'text-red-500';
              
              return (
                <li key={index} className="flex items-start leading-6">
                  <span className={`mr-2 flex-shrink-0 ${itemColor}`}>
                    {itemIcon}
                  </span>
                  <span>{requirement.text}</span>
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

export function StageRequirements({ stage, stage_requirements, className }: StageRequirementsProps) {
  // Check if it's an infrastructure review
  const isInfrastructure = typeof stage === 'string' && stage.startsWith('I');
  
  // Check if it's stage "O" (Others)
  const isStageO = stage === 'O';
  
  // Get numeric stage for infrastructure reviews
  const numericStage = isInfrastructure ? parseInt(stage.slice(1)) : stage;
  
  // Show for stages 0, 1, or 2 (including I0, I1, I2) or stage "O"
  if (!isStageO && numericStage !== 0 && numericStage !== 1 && numericStage !== 2) {
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

  const defaultOpenStage = typeof numericStage === 'number' ? getDefaultOpenStage(numericStage) : [];

  // For stage "O", only show Stage 0 requirements
  if (isStageO) {
    return (
      <div className={className}>
        <Accordion type="multiple" defaultValue={["stage-0"]}>
          <StageRequirementSection 
            stageNumber={0} 
            currentStage={stage} 
            requirements={stage0Requirements}
            isInfrastructure={isInfrastructure}
          />
        </Accordion>
      </div>
    );
  }

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