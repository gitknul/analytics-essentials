import { NODE_ENV_DEVELOPMENT } from '../constants';

declare const window: Window & { dataLayer: Record<string, unknown>[] };

export const isDataLayerAvailable = (): boolean => {
    // check for SSR
    if (typeof window === 'undefined') {
        return false;
    }

    const dataLayer = window.dataLayer;

    if (!dataLayer) {
        if (process.env.NODE_ENV === NODE_ENV_DEVELOPMENT) {
            console.warn(
                'It looks like TagManager is not (properly) installed...'
            );
        }
        return false;
    }

    return true; // TagManager available
};
