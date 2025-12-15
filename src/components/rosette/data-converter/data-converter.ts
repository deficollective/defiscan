// Define the risk matrix lookup

import { RiskArray, RiskLevel } from "@/lib/types";
import { Sentiment } from "../types";

const riskMatrix = {
  Chain: {
    L: "Chain is sufficiently decentralized.",
    M: "Chain is on the journey to become sufficiently decentralized.",
    H: "Chain is not sufficiently decentralized.",
    "-": "Chain criteria is not scored for this deployment.",
  },
  Upgradeability: {
    L: "Possible updates do not materially change the system (or result in the theft or loss of user funds and unclaimed yield)",
    M: "Possible updates may result in the theft or loss of unclaimed yield or may otherwise materially change the system (but user funds remain unaffected)",
    H: "Possible updates may result in the theft or loss of user funds",
  },
  Autonomy: {
    L: "Failure of a dependency does not materially change the performance of the system (or result in the theft or loss of user funds and unclaimed yield)",
    M: "Failure of a dependency may result in the theft or loss of unclaimed yield or may otherwise materially change the performance of the system (but user funds remain unaffected)",
    H: "Failure of a dependency may result in the theft or loss of user funds",
  },
  ExitWindow: {
    L: "Control of the permissioned functions is fully revoked OR delegated to a robust on-chain governance system AND an exit window of at least 30 days is enforced",
    M: "Control of the permissioned functions is delegated to a Security Council OR an exit window of at least 7 days is enforced",
    H: "Centralized operators are in control of the permissioned functions with an exit window of less than 7 days",
  },
  Accessibility: {
    L: "Multiple independent user interfaces exist, e.g. websites, in-wallet access, etc., guaranteeing access to user funds even if one interface is shutdown",
    M: "A single user interface exists with public access to a backup solution such as a self-hosting app",
    H: "A single user interface exists without a backup solutio",
  },
};

// Parse the risks string into an array

type Level = "H" | "M" | "L" | "-";

// Define a mapping from Level to Sentiment
const levelToSentimentMap: Record<Level, Sentiment> = {
  H: "high",
  M: "medium",
  L: "low",
  "-": "neutral",
};

type Category =
  | "Chain"
  | "Upgradeability"
  | "Autonomy"
  | "ExitWindow"
  | "Accessibility";

const categories = Object.keys(riskMatrix) as Category[];

// Create a function to get risk descriptions
export function getRiskDescriptions(risks: RiskArray | undefined): {
  name: string;
  sentiment: Sentiment;
  description: string;
}[] {
  // const parsedRisks = JSON.parse(risks.replace(/'/g, '"'));
  if (!risks) return [];
  return risks.map((level: RiskLevel, index: number) => {
    const category = categories[index];
    const categoryMatrix = riskMatrix[category] as Record<string, string>;
    return {
      name: category,
      sentiment: levelToSentimentMap[level],
      description: categoryMatrix[level] ?? "Under review",
    };
  });
}
