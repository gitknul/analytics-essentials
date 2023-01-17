import { ABDetails } from "./abDetails";
import { MVTDetails } from "./mvtdetails";

export type GetExperiment = (
  experiment: MVTDetails | ABDetails
) => undefined | { variant: number }[];
