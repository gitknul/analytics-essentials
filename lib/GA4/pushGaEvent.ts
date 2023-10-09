import { Event } from '../types';
import { isGtagAvailable } from './isGtagAvailable';

/**
 * @example
 * pushGaEvent({ type: EventTypes.CLICK, name: 'hero_button'})
 * pushGaEvent({
 *      type: EventTypes.GENERIC,
 *      context: {
 *          label: 'share_event',
 *          category: 'Job detail page',
 *          action: '', // optional
 *          value: '' // optional
 *      },
 * })
 */
export const pushGaEvent = (props: Event) => {
    if (!isGtagAvailable()) return;
    const gtag = window.gtag;

    let name: string = props.type;
    if ('name' in props) {
        name = props.name;
    }

    gtag('event', name, { ...props.context });
};
