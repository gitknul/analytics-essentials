import { TrackEventPropsType } from '../types';
import { isGtagAvailable } from './isGtagAvailable';

/**
 * @example
 * pushTrackingEvent({type: EventTypes.CLICK, name: '', context: {param: ''}})
 */
export const pushGaEvent = (props: TrackEventPropsType) => {
    if (!isGtagAvailable()) return;
    const gtag = window.gtag;

    const { name, context } = props;

    gtag('event', name, { context });
};
