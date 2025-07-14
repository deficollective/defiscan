import { FilterOption } from "@/components/table/toolbar/multi-select-filter";
import { STAGE } from "./types";



// Premade filters
export const unqualified_stages = [STAGE.UNQUALIFIED];

export const defi_stages = [
  STAGE.STAGE_0,
  STAGE.STAGE_1,
  STAGE.STAGE_2,
  STAGE.UNDER_REVIEW,
];


// Stage Filter Options
export const stage_filter_options: FilterOption[] = [
  {
    value: STAGE.STAGE_0,
    label: "Stage 0",
  },
  {
    value: STAGE.STAGE_1,
    label: "Stage 1",
  },
  {
    value: STAGE.STAGE_2,
    label: "Stage 2",
  },
  {
    value: STAGE.UNQUALIFIED,
    label: "Unqualified",
  },
  // {
  //   value: STAGE.VARIABLE,
  //   label: "Variable",
  // },
  {
    value: STAGE.UNDER_REVIEW,
    label: "Under Review",
  },
];