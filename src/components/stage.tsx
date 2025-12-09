import * as React from "react";
import { Badge as BadgeRaw } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Reason, STAGE, Stage } from "@/lib/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

const risks = {
  "Central Custody":
    "All or some assets are in custody by a centralized entity.",
  "Missing Docs":
    "All or some protocol components and expected performance is not publicly documented.",
  "Closed-Source":
    "All or some smart contracts are not published with available source code.",
  "Unverified Contracts":
    "All or some smart contracts are not verified with a public blockchain explorer.",
  "Incorrect Docs":
    "All or some contract addresses in the docs are incorrect.",
};

const requisites: { [K in Stage]: (reasons?: Reason[]) => React.JSX.Element } =
  {
    O: (reasons?: Reason[]) => (
      <div>
        <p>Project does currently not meet following Stage 0 requirements:</p>
        {reasons!.map((r: Reason) => (
          <p key={r}>
            <b>{r}:</b> {risks[r]}
          </p>
        ))}
      </div>
    ),
    R: () => <p>Currently in review</p>,
    V: () => <p>Varies based on chain, expand row for more info</p>,
    "0": () => (
      <p>
        ✅ The financial app is blockchain-based. <br />
        ✅ All assets are not in custody by a centralized entity.
        <br />
        ✅ All protocol components and the expected performance is publicly
        documented.
        <br />
        ✅ All smart contracts are published with available source code.
        <br />
      </p>
    ),
    "1": () => (
      <div>
        <p>
          Risks from critical permissions and dependencies are significantly
          reduced by:
        </p>
        <ul className="list-disc">
          <li>
            <i>either</i> revoking critical permissions{" "}
          </li>
          <li>
            <i>or</i> establishing a Security Council to control such
            permissions
          </li>
          <li>
            <i>or</i> enforcing an exit window of at least 7 days so users can
            withdraw funds in case of an unwanted protocol update.
          </li>
        </ul>
        <p>
          Critical risks from external dependencies are mitigated by the
          implementation of appropriate fallback mechanisms.
        </p>
        <p className="mt-4">
          Furthermore, the underlying chain cannot censor users’ transactions
          and a backup user interface exists guaranteeing access to user funds.
        </p>
      </div>
    ),
    "2": () => (
      <div>
        <p>
          Critical permissions have either been revoked or delegated to an
          on-chain governance system with ample time for users to exit in case
          of an unwanted protocol update. Risks from external dependencies have
          been further reduced such that users’ funds and unclaimed yield remain
          unaffected by a failure.
        </p>
        <p>
          In addition, different independent user interfaces and a fully
          decentralized underlying chain guarantee access to users’ funds at any
          time.
        </p>
      </div>
    ),
    "I0": () => <p>High centralization. Equivalent to a Stage 0 as a dependency.</p>,
    "I1": () => <p>Medium centralization. Equivalent to a Stage 1 as a dependency.</p>,
    "I2": () => <p>Low centralization. Equivalent to a Stage 2 as a dependency.</p>,
  };

const buildStageInfo = (stage: Stage, reasons?: Reason[]) =>
  requisites[stage](reasons);

interface SubStage {
  chain: string;
  stage: Stage;
  reasons?: Reason[];
}

export interface BadgeProps {
  className?: string;
  stage: Stage;
  reasons?: Reason[];
  subStages?: SubStage[];
  highestStage?: Stage;
  hasUnscoredChain?: boolean;
}

const stage_text = {
  [STAGE.STAGE_0]: "Stage 0",
  [STAGE.STAGE_1]: "Stage 1",
  [STAGE.STAGE_2]: "Stage 2",
  [STAGE.UNDER_REVIEW]: "Review",
  [STAGE.UNQUALIFIED]: "Unqualified",
  [STAGE.VARIABLE]: "Variable",
  "I0": "High",
  "I1": "Medium", 
  "I2": "Low",
};


const Badge = ({ 
  stage, 
  className, 
  displayText 
}: { 
  stage: Stage; 
  className?: string;
  displayText?: string;
}) => {
  return (
    <BadgeRaw
      variant="outline"
      className={cn(
        "border-none text-white rounded mx-auto bg-gray-500 hover:bg-gray-600 flex justify-center whitespace-nowrap",
        stage === "O" && "bg-red-300 hover:bg-red-400",
        stage === 0 && "bg-red-500 hover:bg-red-primary",
        stage === 1 && "bg-yellow-500 hover:bg-yellow-primary",
        stage === 2 && "bg-green-500 hover:bg-green-primary",
        stage === "I0" && "bg-red-500 hover:bg-red-primary",
        stage === "I1" && "bg-yellow-500 hover:bg-yellow-primary",
        stage === "I2" && "bg-green-500 hover:bg-green-primary",
        className
      )}
    >
      {displayText || stage_text[stage]}
    </BadgeRaw>
  );
};

const SubStagesTable = ({ items }: { items: SubStage[] }) => {
  if (items.length == 0) return;

  return (
    <table className="mt-8">
      <thead>
        <tr>
          <th>Chain</th>
          <th>Stage</th>
          <th>Reasons</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ stage, chain, reasons }, index) => (
          <tr key={`substage-${stage}-${chain}-${index}`}>
            <td>{chain}</td>
            <td>
              <Badge stage={stage} />
            </td>
            <td>{reasons?.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function StageBadge({
  className,
  stage,
  reasons,
  subStages = [],
  highestStage,
  hasUnscoredChain,
}: BadgeProps) {
  // For variable stages, show the highest stage label but keep variable color
  const displayStage = stage === "V" && highestStage ? highestStage : stage;
  const shouldUseVariableColor = stage === "V" && highestStage;

  return (
    <HoverCard>
      <HoverCardTrigger className={className}>
        <div className="relative">
          <Badge
            stage={shouldUseVariableColor ? "V" : displayStage}
            displayText={shouldUseVariableColor ? stage_text[highestStage] : undefined}
          />
          {hasUnscoredChain && (
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold leading-none">
              !
            </span>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="z-50 p-4 rounded-md bg-white"
        side="top"
        sideOffset={4}
      >
        <div className="prose-sm max-w-md">
          <h3 className="mr-2">Stage of Decentralisation</h3>

          {buildStageInfo(stage, reasons)}

          {hasUnscoredChain && (
            <p className="mt-2 text-red-600 font-medium text-sm">
              ⚠️ This stage does not take into account the chain risk, which is unscored for this deployment.
            </p>
          )}

          <SubStagesTable items={subStages} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function StackedStageBadge({
  className,
  stages,
  reasons,
  subStages = [],
}: {
  className?: string;
  stages: Stage[];
  reasons?: Reason[];
  subStages?: SubStage[];
}) {
  // Filter out "Unqualified" stages and sort by priority (highest first)
  const stagePriority: Record<Stage, number> = { 
    "2": 5, "1": 4, "0": 3, "R": 2, "O": 1, "V": 0, "I0": 0, "I1": 0, "I2": 0 
  };
  
  const filteredStages = stages.filter(stage => stage !== "O");
  const sortedStages = [...filteredStages].sort((a, b) => 
    (stagePriority[b] || 0) - (stagePriority[a] || 0)
  );
  
  const highestStage = sortedStages[0];
  const backgroundStages = sortedStages.slice(1);

  return (
    <HoverCard>
      <HoverCardTrigger className={className}>
        <div className="relative flex items-center">
          {/* Main badge in front */}
          <Badge 
            stage={highestStage} 
            className="relative z-30"
          />
          
          {/* Background badges - shifted to the left */}
          {backgroundStages.map((stage, index) => {
            const offsetClasses = [
              "absolute -left-2 scale-90 opacity-80 z-20",
              "absolute -left-4 scale-90 opacity-70 z-10", 
              "absolute -left-6 scale-90 opacity-60 z-5"
            ];
            return (
              <Badge
                key={`bg-${stage}-${index}`}
                stage={stage}
                className={cn(
                  offsetClasses[index] || "absolute -left-2 scale-90 opacity-80 z-20",
                  className
                )}
              />
            );
          })}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="z-50 p-4 rounded-md bg-white"
        side="top"
        sideOffset={4}
      >
        <div className="prose-sm max-w-md">
          <h3 className="mr-2">Stage of Decentralisation</h3>
          <p>This protocol has multiple implementations with different stages:</p>
          
          <SubStagesTable items={subStages} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
