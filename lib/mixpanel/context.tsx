'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { MixpanelEvent } from './types';
import {
    extractUtmParams,
    isStandalonePWA,
    writeUtmParamsToSessionStorage,
} from './utils.ts';

interface MixpanelContextProps<DTO extends MixpanelEvent> {
    trackEvent: (event: DTO) => void;
}

interface MixpanelProviderProps<DTO extends MixpanelEvent> {
    children: React.ReactNode;
    eventApiClient: (args: DTO) => Promise<unknown>;
    defaultEventContext?: DTO['context'];
}

const MixpanelContext =
    createContext<MixpanelContextProps<MixpanelEvent> | null>(null);

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
    defaultEventContext,
}: MixpanelProviderProps<MixpanelEvent>) {
    const trackEvent = (event: MixpanelEvent) => {
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
                pathname: window.location.pathname,
                pwa: isStandalonePWA(),
                ...defaultEventContext,
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
