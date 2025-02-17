import { Event } from '../types';
import { isDataLayerAvailable } from './isDataLayerAvailable';

declare const window: Window & { dataLayer: Record<string, unknown>[] };

/**
 * @example
 * pushDataLayerEvent({
 *    type: EventType.GENERIC,
 *    context: {
 *      label: 'scroll_event', // event name in google analytics
 *      category: 'blog page',
 *      action: 'scroll', // optional
 *      value: '430', // optional
 * });
 *
 * pushDataLayerEvent({
 *    type: EventType.ClICK,
 *    name: 'hero_banner_button_click',
 * });
 */

export function pushDataLayerEvent(props: Event, clear = true): void {
    if (!isDataLayerAvailable()) return;
    const dataLayer = window.dataLayer;

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
