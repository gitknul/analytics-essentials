import { TrackEventPropsType } from '../types';
import { isDataLayerAvailable } from './isDataLayerAvailable';

/**
 * @example
 * pushDataLayerEvent(EventTypes.CLICK, undefined, false)
 * pushDataLayerEvent(EventTypes.GENERIC, { label: '', category: '' })
 */
export const pushDataLayerEvent: TrackEventPropsType = (
    name,
    context,
    clear = true
) => {
    if (!isDataLayerAvailable()) return;
    const dataLayer = (window as any).dataLayer;

    dataLayer.push({
        event: name,
        ...context,
        _clear: clear,
    });
};
