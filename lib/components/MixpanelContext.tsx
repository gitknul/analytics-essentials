import React, { createContext } from 'react';
import { MixpanelEvent } from '../types';

interface MixpanelContextProps<DTO> {
    pushEvent: (event: DTO) => void;
}

interface MixpanelProviderProps<DTO> {
    children: React.ReactNode;
    eventApiClient: (args: DTO) => Promise<void>;
}

export const MixpanelProvider = <DTO extends unknown | MixpanelEvent>({
    children,
    eventApiClient,
}: MixpanelProviderProps<DTO>) => {
    const MixpanelContext = createContext<MixpanelContextProps<DTO>>({
        pushEvent: (event: DTO) => {
            throw new Error(
                `${event} not fired - MixpanelContext not provided`
            );
        },
    });

    const pushEvent = (event: DTO) => {
        eventApiClient(event);
    };

    return (
        <MixpanelContext.Provider
            value={{
                pushEvent,
            }}
        >
            {children}
        </MixpanelContext.Provider>
    );
};
