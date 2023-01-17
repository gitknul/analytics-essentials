import { ExperimentStatus } from "./experimentStatus";
import { GetExperiment } from "./getExperiment";

export type ExperimentContext = {
  getExperiment: GetExperiment;
  status: ExperimentStatus;
};
