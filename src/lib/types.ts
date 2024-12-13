export type RiskLevel = "L" | "M" | "H";
export type Stage = "R" | 0 | 1 | 2;
export type RiskArray = [RiskLevel, RiskLevel, RiskLevel, RiskLevel, RiskLevel];

export type Project = {
  logo: string;
  protocol: string;
  slug: string;
  stage: Stage;
  risks: RiskArray;
  type: string;
  chain: string;
  tvl: number;
};
