// @ts-nocheck test file contains web api's that are not availalbe in node environment for typescript
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
    extractUtmParams,
    writeUtmParamsToSessionStorage,
} from '../lib/mixpanel/utils';
import { MixpanelProvider, useMixpanelContext } from '../lib/mixpanel/context';
import { fireEvent, render, renderHook } from '@testing-library/react';
import React from 'react';

describe('UTM tags', () => {
    const urlContainingUTMParams = new URL(
        'https://example.com?utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_term=term'
    );

    test('extracting utm tags from url', () => {
        const result = extractUtmParams(urlContainingUTMParams.search);

        expect(result).toEqual({
            utm_source: 'source',
            utm_medium: 'medium',
            utm_campaign: 'campaign',
            utm_content: 'content',
            utm_term: 'term',
        });
    });

    test('utm tags are saved in session storage', () => {
        writeUtmParamsToSessionStorage(urlContainingUTMParams.search);

        expect(sessionStorage.getItem('utm_source')).toBe('source');
        expect(sessionStorage.getItem('utm_medium')).toBe('medium');
        expect(sessionStorage.getItem('utm_campaign')).toBe('campaign');
        expect(sessionStorage.getItem('utm_content')).toBe('content');
        expect(sessionStorage.getItem('utm_term')).toBe('term');
    });

    afterEach(() => {
        sessionStorage.clear();
    });
});

describe('MixpanelContext', () => {
    const eventApiClient = vi.fn(() => Promise.resolve());

    const ContextWrapper = ({ children }: { children: React.ReactNode }) => (
        <MixpanelProvider eventApiClient={eventApiClient}>
            {children}
        </MixpanelProvider>
    );

    function TrackEventTestingComponent() {
        const { trackEvent } = useMixpanelContext();
        return (
            <button
                onClick={() =>
                    trackEvent({
                        name: 'event name',
                        context: { title: 'Page title' },
                        data: { productId: '123' },
                    })
                }
            >
                button
            </button>
        );
    }

    test('provides expected context with trackEvent function', () => {
        const { result } = renderHook(() => useMixpanelContext(), {
            wrapper: ContextWrapper,
        });

        expect(result.current).toHaveProperty('trackEvent');
        expect(typeof result.current.trackEvent).toBe('function');
    });

    test('trackEvent sends correct data to api client', () => {
        const { getByText } = render(<TrackEventTestingComponent />, {
            wrapper: ContextWrapper,
        });

        fireEvent.click(getByText('button'));

        expect(eventApiClient).toHaveBeenCalledWith({
            name: 'event name',
            context: {
                title: 'Page title',
                href: window.location.href,
                path: '/',
                pwa: false,
            },
            data: {
                productId: '123',
            },
        });
    });
});
