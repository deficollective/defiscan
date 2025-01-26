export type RiskLevel = "L" | "M" | "H";
export type Stage = "O" | "V" | "R" | 0 | 1 | 2;
export type RiskArray = [RiskLevel, RiskLevel, RiskLevel, RiskLevel, RiskLevel];
export type Reason =
  | "Central Custody"
  | "Missing Docs"
  | "Closed-Source"
  | "Unverified Contracts";
export type Reasons = Array<Reason>;

export type Review = {
  slug: string;
  stage: Stage;
  reasons: Reasons;
  risks: RiskArray;
  chain: string;
  tvl: number;
}

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



