// ============================================================
// API DATA TYPES (returned by the mock service)
// ============================================================

export interface CollateralSlice {
  name: string;
  value: number;
  color: string;
  category: string;
}

export interface CollateralData {
  totalValue: number;
  categories: {
    name: string;
    value: number;
    color: string;
  }[];
  assets: CollateralSlice[];
}

export interface ReviewApiData {
  protocolSlug: string;
  tokenName: string;
  tokenSymbol: string;
  collaterals: CollateralData;
  metrics: Record<string, string | number>;
}

// ============================================================
// REVIEWER CONFIG TYPES (authored as JSON per protocol)
// ============================================================

export interface TextBlock {
  type: "text";
  /** Supports {{metricKey}} interpolation from API data */
  content: string;
}

export interface TableColorScale {
  /** Column indices (0-based) to apply coloring to */
  columns: number[];
  /** Metric key for the reference value (denominator), must be a number */
  referenceMetric: string;
  /** Per-row metric keys for raw numeric values of the colored columns */
  valueMetrics: string[][];
}

export interface TableBadgeColumn {
  /** Column index (0-based) to render as badges */
  column: number;
  /** Map cell text to a Tailwind color class, e.g. { "Immutable": "bg-green-600" } */
  colorMap?: Record<string, string>;
}

export interface TableBlock {
  type: "table";
  headers: string[];
  /** Each row is an array of strings; supports {{metricKey}} interpolation */
  rows: string[][];
  /** Optional color scale: colors cells green/orange/red based on value share */
  colorScale?: TableColorScale;
  /** Columns to render as styled badges */
  badgeColumns?: TableBadgeColumn[];
}

export interface PermissionedFunction {
  name: string;
  callers: string[];
}

export interface ExpandableTableRow {
  cells: string[];
  expandedContent?: {
    functions: PermissionedFunction[];
  };
}

export interface ExpandableTableBlock {
  type: "expandableTable";
  headers: string[];
  rows: ExpandableTableRow[];
  badgeColumns?: TableBadgeColumn[];
  colorScale?: TableColorScale;
}

export interface DropdownBlock {
  type: "dropdown";
  label: string;
  content: ContentBlock[];
}

export interface LinkBlock {
  type: "link";
  text: string;
  href: string;
  external?: boolean;
}

export interface MetricBlock {
  type: "metric";
  label: string;
  metricKey: string;
  format?: "usd" | "percent" | "number" | "string";
}

export type ContentBlock =
  | TextBlock
  | TableBlock
  | ExpandableTableBlock
  | DropdownBlock
  | LinkBlock
  | MetricBlock;

export interface SubSection {
  title: string;
  content: ContentBlock[];
}

export interface ReviewSectionConfig {
  title: string;
  description?: string;
  subsections: SubSection[];
}

export interface ReviewConfig {
  protocolSlug: string;
  protocolName: string;
  tokenName: string;
  chain: string;
  sections: {
    collaterals: ReviewSectionConfig;
    dependencies: ReviewSectionConfig;
    actors: ReviewSectionConfig;
    codeAndAudits: ReviewSectionConfig;
  };
}
