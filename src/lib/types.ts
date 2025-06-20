export type RiskLevel = "L" | "M" | "H";
export type Stage = "O" | "V" | "R" | 0 | 1 | 2 | "I0" | "I1" | "I2";

export enum STAGE {
  UNQUALIFIED = "O",
  VARIABLE = "V",
  UNDER_REVIEW = "R",
  STAGE_0 = 0,
  STAGE_1 = 1,
  STAGE_2 = 2,
}
export type RiskArray = [RiskLevel, RiskLevel, RiskLevel, RiskLevel, RiskLevel];
export type Reason =
  | "Central Custody"
  | "Missing Docs"
  | "Closed-Source"
  | "Unverified Contracts"
  | "Incorrect Docs";

export type Reasons = Array<Reason>;

export type Review = {
  slug: string;
  stage: Stage;
  reasons: Reasons;
  risks: RiskArray;
  protocols: string[];
  type: string;
  chain: string;
  instance?: string;
  tvl: number | "n/a";
  stage_requirements?: [string[], string[], string[]];
};

export interface Project {
  logo: string;
  type: string;
  protocol: string;
  website: string;
  tvl: number;
  socials: {
    x: string;
  };
  reviews: Review[];
  children?: Review[];
  reasons?: Reasons;
}
