import { type RosetteValue } from "./types";
import { PizzaRosetteIcon } from "./rosette-icon";
import { PizzaRosetteTooltip } from "./rosette-tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

export interface PizzaRosetteCellProps {
  values: RosetteValue[];
  isUnderReview?: boolean;
}

export function PizzaRosetteCell(props: PizzaRosetteCellProps) {
  const isUnderReview =
    !!props.isUnderReview ||
    props.values.some((value) => value.sentiment === "UnderReview");

  return (
    <HoverCard>
      <HoverCardTrigger>
        <PizzaRosetteIcon
          values={props.values}
          className="size-8 md:size-10"
          isUnderReview={isUnderReview}
          background={false}
        />
      </HoverCardTrigger>

      <HoverCardContent
        className="z-50 p-4 rounded-md bg-white"
        side="top"
        sideOffset={4}
      >
        <PizzaRosetteTooltip
          values={props.values}
          isUnderReview={isUnderReview}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
