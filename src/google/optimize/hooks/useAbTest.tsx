import { ReactElement } from "react";
import { useExperimentContext } from "../context/ExperimentContext";
import { ABDetails } from "../types/experiments";

export const useAbTest = (
  experiment: ABDetails,
  variants: (ReactElement | undefined)[]
): { isLoading: boolean; result: ReactElement | undefined } => {
  const { getExperiment, status } = useExperimentContext();

  // while loading we want to see no defaut variant since it will be replaced by the experiment variant
  if (status === "loading") {
    return {
      isLoading: true,
      result: undefined,
    };
  }

  // if the experiment is blocked or timed out we want to see the default variant since it will never be replaced by the experiment variant
  if (status === "timedOutOrBlocked") {
    return {
      isLoading: false,
      result: variants[0],
    };
  }

  const experimentResult = getExperiment(experiment);
  if (!experimentResult) {
    return {
      isLoading: false,
      result: variants[0],
    };
  }

  // With AB tests getExperiments returns a single 'section' so we use 0 as index
  return { isLoading: false, result: variants[experimentResult[0].variant] };
};
