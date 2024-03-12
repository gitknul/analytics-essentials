'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { MixpanelEvent as DTO } from './types';
import {
    extractUtmParams,
    isStandalonePWA,
    writeUtmParamsToSessionStorage,
} from './utils.ts';

interface MixpanelContextProps<DTO> {
    trackEvent: (event: DTO) => void;
}

interface MixpanelProviderProps<DTO> {
    children: React.ReactNode;
    eventApiClient: (args: DTO) => Promise<unknown>;
}

const MixpanelContext = createContext<MixpanelContextProps<DTO> | null>(null);

export function useMixpanelContext() {
    const context = useContext(MixpanelContext);

    if (!context) {
        throw new Error('<MixpanelProvider /> not found');
    }

    return context;
}

export function MixpanelProvider({
    children,
    eventApiClient,
}: MixpanelProviderProps<DTO>) {
    const trackEvent = (event: DTO) => {
        // only send events on the client
        if (typeof window === 'undefined') {
            return;
        }

        const utmParams = extractUtmParams(window.location.search);

        eventApiClient({
            ...event,
            context: {
                title: document.title,
                href: window.location.href,
                path: window.location.pathname,
                pwa: isStandalonePWA(),
                ...utmParams,
                ...event.context,
            },
        }).catch((e) => console.error(e));
    };

    useEffect(() => {
        writeUtmParamsToSessionStorage(window.location.search);
    }, []);

    return (
        <MixpanelContext.Provider
            value={{
                trackEvent,
            }}
        >
            {children}
        </MixpanelContext.Provider>
    );
}
