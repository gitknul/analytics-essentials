import { Event } from '../types';
import { isDataLayerAvailable } from './isDataLayerAvailable';

/**
 * @example
 * pushDataLayerEvent({
 *    type: EventTypes.GENERIC,
 *    context: {
 *      label: 'scroll_event', // event name in google analytics
 *      category: 'blog page',
 *      action: 'scroll', // optional
 *      value: '430', // optional
 * });
 *
 * pushDataLayerEvent({
 *    type: EventTypes.ClICK,
 *    name: 'hero_banner_button_click',
 * });
 */

export function pushDataLayerEvent(props: Event, clear: boolean = true): void {
    if (!isDataLayerAvailable()) return;
    const dataLayer = (window as any).dataLayer;

    let name: string = props.type;

    if ('name' in props) {
        name = props.name;
    }

    dataLayer.push({
        event: name,
        context: props.context,
        _clear: clear,
    });
}
