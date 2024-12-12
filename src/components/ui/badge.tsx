import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../rosette/tooltip/tooltip";
import { stageToRequisites } from "@/app/protocols/stageToRequisites";
import { Stage } from "@/lib/types";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  stage: Stage;
}

// Badge component
function Badge({ className, variant, stage, ...props }: BadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger className="flex size-4/5 lg:size-full items-center justify-start">
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
      </TooltipTrigger>
      <TooltipContent fitContent>
        <BadgeTooltip stage={stage} />
      </TooltipContent>
    </Tooltip>
  );
}

// BadgeTooltip component
export function BadgeTooltip({ stage }: { stage: Stage }) {
  return (
    <div className="flex flex-col">
      <span className="text-base font-bold">
        <span className="mr-2">Stage of Decentralisation</span>
      </span>
      <div className="flex items-center gap-6">
        <div className="relative flex flex-col justify-center p-4 shadow-md max-w-md">
          {stage === "Review"
            ? stageToRequisites[0].map((item, index) => (
                <div key={index} className="mt-1">
                  {item}
                </div>
              ))
            : stageToRequisites[stage].map((item, index) => (
                <div key={index} className="mt-1">
                  {item}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export { Badge, badgeVariants };
