import { createContext, FC, useContext, useEffect, useState } from "react";
import { ABDetails } from "../types/abDetails";
import { ExperimentContext as ExperimentContextType } from "../types/experimentContext";
import { ExperimentStatus } from "../types/experimentStatus";
import { MVTDetails } from "../types/mvtdetails";

/*

    In order to centrally control the initialization of Optimize we use this context provider.
    Since it is a 3rd party script that is being loadded via google tag manager we need to set an interval and check if the script was loaded.
    To prevent running multiple instances of the interval we use a central context provider.

    The context can be used to:
        - Check the status of the loading of the script
        - Get the variant of the experiment by the experimentID from Optimize
    
*/

export const ExperimentContext = createContext<ExperimentContextType>({
  getExperiment: (experiment: MVTDetails | ABDetails) => undefined,
  status: "loading",
});

type ProviderProps = {
  isBlocked?: boolean; // if for any reason it is certain that under the current circumstances optimize won't load. e.g. cookies not accepted
  children: React.ReactNode;
};

export const ExperimentContextProvider: FC<ProviderProps> = ({
  children,
  isBlocked,
}) => {
  const maxAttempts = 30; // x 100ms
  const [status, setStatus] = useState<ExperimentStatus>(
    isBlocked ? "timedOutOrBlocked" : "loading"
  );

  const getExperiment = (experiment: MVTDetails | ABDetails) => {
    if (!window.google_optimize || isBlocked) return undefined;

    // activate the experiment
    if (experiment.activationEvent) {
      window.dataLayer = window.dataLayer || [];
      // if the activation event has not yet been pushed to the dataLayer push it
      if (
        !window.dataLayer.find(
          (event: { event?: string }) =>
            event.event === experiment.activationEvent
        )
      ) {
        window.dataLayer.push({
          event: experiment.activationEvent,
        });
      }
    }
    // get the variant and return variants in an array for AB(always length 1) and MVT experiments
    const variant = window.google_optimize.get(experiment.id);
    if (!variant) return undefined;
    return variant.split("-").map((v: string) => {
      return {
        variant: parseInt(v),
      };
    });
  };

  useEffect(() => {
    let attempts = 0;
    let intervalId: NodeJS.Timer;
    if (!isBlocked) {
      intervalId = setInterval(() => {
        // Wait for optimize to load for x attempts
        if (attempts < maxAttempts) {
          attempts++;
          // If optimize is not loaded return
          if (!window.google_optimize) {
            return;
          }
          // If optimize is loaded set the context status and clear the interval
          setStatus("success");
          clearInterval(intervalId);
        } else {
          // set default variant and clear the interval if max attempts is reached
          setStatus("timedOutOrBlocked");
          clearInterval(intervalId);
        }
      }, 100);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isBlocked]);

  return (
    <ExperimentContext.Provider value={{ status, getExperiment }}>
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperimentContext = () => {
  return useContext(ExperimentContext);
};
