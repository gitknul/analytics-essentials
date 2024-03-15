// @ts-nocheck test file contains web api's that are not availalbe in node environment for typescript
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
    extractUtmParams,
    writeUtmParamsToSessionStorage,
} from '../lib/mixpanel/utils';
import { MixpanelProvider, useMixpanelContext } from '../lib/mixpanel/context';
import {
    fireEvent,
    render,
    renderHook,
    RenderOptions,
} from '@testing-library/react';
import React from 'react';
import { MixpanelEvent } from '../lib/mixpanel';

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

    const ContextWrapper = ({
        children,
        defaultEventContext,
    }: {
        children: React.ReactNode;
        defaultEventContext: MixpanelEvent;
    }) => (
        <MixpanelProvider
            eventApiClient={eventApiClient}
            defaultEventContext={defaultEventContext}
        >
            {children}
        </MixpanelProvider>
    );

    const renderWithMixpanelProvider = (
        ui: React.ReactElement,
        options?: Omit<RenderOptions, 'wrapper'>
    ) => {
        return render(ui, {
            wrapper: (props: any) => (
                <ContextWrapper {...props} {...options?.contextWrapperProps} />
            ),
            ...options?.testingLibraryOptions,
        });
    };

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

        expect(result.current).toHaveProperty('trackPageView');
        expect(typeof result.current.trackPageView).toBe('function');
    });

    test('trackEvent sends correct data to api client', () => {
        const { getByText } = renderWithMixpanelProvider(
            <TrackEventTestingComponent />
        );

        fireEvent.click(getByText('button'));

        expect(eventApiClient).toHaveBeenCalledWith({
            name: 'event name',
            context: {
                title: 'Page title',
                pathname: '/',
                pwa: false,
            },
            data: {
                productId: '123',
            },
        });
    });

    test('provider can extend the default context for event tracking', () => {
        const defaultEventContext = {
            href: 'https://example.com',
            pathname: '/example',
            audience: 'Consumer',
        };

        const { getByText } = renderWithMixpanelProvider(
            <TrackEventTestingComponent />,
            {
                contextWrapperProps: { defaultEventContext },
            }
        );

        fireEvent.click(getByText('button'));

        expect(eventApiClient).toHaveBeenCalledWith({
            name: 'event name',
            context: {
                title: 'Page title',
                href: 'https://example.com',
                pathname: '/example',
                pwa: false,
                audience: 'Consumer',
            },
            data: {
                productId: '123',
            },
        });
    });
});
