import { PushDataLayerPropsType } from '../types';
import { isDataLayerAvailable } from './isDataLayerAvailable';

/**
 * @example
 * pushDataLayer({type: EventTypes.CLICK, name: '', context: {param: ''}, clear: false})
 */
export const pushDataLayerEvent = (props: PushDataLayerPropsType) => {
    if (!isDataLayerAvailable()) return;
    const dataLayer = (window as any).dataLayer;

    const { type, name, context, clear = true } = props;

    dataLayer.push({
        event: type,
        action: name,
        context,
        _clear: clear,
    });
};
