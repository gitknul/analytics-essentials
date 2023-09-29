import { TrackEventPropsType } from '../types';
import { isGtagAvailable } from './isGtagAvailable';

/**
 * @example
 * pushGaEvent(EventTypes.CLICK, undefined)
 * pushGaEvent(EventTypes.GENERIC, { label: '', category: '' })
 */
export const pushGaEvent: TrackEventPropsType = (name, context) => {
    if (!isGtagAvailable()) return;
    const gtag = window.gtag;

    gtag('event', name, { context });
};
