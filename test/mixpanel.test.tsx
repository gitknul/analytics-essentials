import { afterEach, describe, expect, test, vi } from 'vitest';
import {
    extractUtmParams,
    writeUtmParamsToSessionStorage,
} from '../lib/mixpanel/utils';
import { MixpanelProvider, useMixpanelContext } from '../lib/mixpanel/context';
import { fireEvent, render, renderHook } from '@testing-library/react';

const urlContainingUTMParams = new URL(
    'https://example.com?utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_term=term'
);

// @ts-expect-error web api types not available in test environment
declare const sessionStorage: Storage;

describe('UTM tags', () => {
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

function TrackEventTestingComponent() {
    const { trackEvent } = useMixpanelContext();
    return (
        <button
            onClick={() =>
                trackEvent({
                    name: 'test',
                    context: { title: 'test' },
                    data: { test: 'test' },
                })
            }
        >
            button
        </button>
    );
}

describe('MixpanelContext', () => {
    test('provides expected context with trackEvent function', () => {
        const wrapper = ({ children }) => (
            <MixpanelProvider eventApiClient={(data) => Promise.resolve(data)}>
                {children}
            </MixpanelProvider>
        );

        const { result } = renderHook(() => useMixpanelContext(), { wrapper });

        expect(result.current).toHaveProperty('trackEvent');
        expect(typeof result.current.trackEvent).toBe('function');
    });
});
