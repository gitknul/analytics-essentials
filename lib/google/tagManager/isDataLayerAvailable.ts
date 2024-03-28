import { NODE_ENV_DEVELOPMENT } from '../constants';

export const isDataLayerAvailable = (): boolean => {
    // check for SSR
    if (typeof window === 'undefined') {
        return false;
    }

    const dataLayer = (window as any).dataLayer;

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
