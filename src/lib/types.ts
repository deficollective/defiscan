export type RiskLevel = "L" | "M" | "H";
export type RiskArray = [RiskLevel, RiskLevel, RiskLevel, RiskLevel, RiskLevel];

export type Project = {
  logo: string;
  protocol: string;
  slug: string;
  stage: number;
  risks: RiskArray;
  type: string;
  chain: string;
  tvl: number;
};
