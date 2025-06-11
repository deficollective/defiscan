export type RiskLevel = "L" | "M" | "H";
export type Stage = "O" | "R" | 0 | 1 | 2 | "I0" | "I1" | "I2";
export type RiskArray = [RiskLevel, RiskLevel, RiskLevel, RiskLevel, RiskLevel];
export type Reason =
  | "Central Custody"
  | "Missing Docs"
  | "Closed-Source"
  | "Unverified Contracts"
  | "Incorrect Docs";

export type Reasons = Array<Reason>;

export type Project = {
  logo: string;
  protocol: string;
  slug: string;
  stage: Stage;
  reasons: Reasons;
  risks: RiskArray;
  protocols: string[];
  type: string;
  chain: string;
  tvl: number | "n/a";
};
