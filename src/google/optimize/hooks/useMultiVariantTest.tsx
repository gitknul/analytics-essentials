import { ReactElement } from "react";
import { useExperimentContext } from "../context/ExperimentContext";
import { MVTDetails } from "../types/experiments";

/*
    This hook is used for multivariant tests. It returns a variant based on the section index.
    A section contains several variants. In a multivariant test we show variants from multiple sections at the same time and check which combination of variants performs best.
*/

export const useMultiVariantTest = (
  experiment: MVTDetails,
  variants: (ReactElement | undefined)[],
  sectionIndex: number
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

  const experimentSections = getExperiment(experiment);

  if (!experimentSections) {
    return {
      isLoading: false,
      result: variants[0],
    };
  }

  // get the variant of the requested section
  const variantResult = variants[experimentSections[sectionIndex].variant];

  if (!variantResult) {
    // return the first variant as default if there is no component variant for the section variant returned by getExperiment
    return { isLoading: false, result: variants[0] };
  }
  return { isLoading: false, result: variantResult };
};
