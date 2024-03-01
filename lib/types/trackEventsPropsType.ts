import { EventType } from './events';

type ContextType = {
    [index: string]: string | number | object;
};

interface PurchaseEvent {
    type: EventType.PURCHASE;
    context: {
        currency: string;
        transaction_id: string;
        value: number;
        coupon?: string;
        shipping?: number;
        tax?: number;
        items: [
            {
                item_id: string;
                item_name: string;
                affiliation?: string;
                price?: number;
                quantity?: number;
            },
            ...{
                item_id: string;
                item_name: string;
                affiliation?: string;
                price?: number;
                quantity?: number;
            }[]
        ];
    } & ContextType;
}

interface Clickevent {
    type: EventType.CLICK;
    name: string;
    context?: ContextType;
}

interface SubmitEvent {
    type: EventType.SUBMIT;
    name: string;
    context?: ContextType;
}

interface CookieSettingsChangedEvent {
    type: EventType.COOKIE_SETTINGS_CHANGED;
    name: string;
    context?: ContextType;
}

interface CustomEvent {
    type: EventType.CUSTOM;
    name: string;
    context?: ContextType;
}

interface GenericEventType {
    type: EventType.GENERIC;
    context: {
        label: string; // display name instead of custom_event e.g. funnel
        category: string; // e.g. productPage
        action?: string; // viewedStep
        value?: string | number; // e.g. step-1
    };
}

export type Event =
    | PurchaseEvent
    | Clickevent
    | CustomEvent
    | SubmitEvent
    | CookieSettingsChangedEvent
    | GenericEventType;

/**
 * @description
 * Mixpanel event we will pass this event to our own backend that is used as a proxy for Mixpanel. Almost everything is optional. The only required field is `event`.
 * the other properties are suggestions for a "normal" event.
 * @example
 *  const event: MixpanelEvent = {
 *      event: 'Contact', // e.g. "Update profile", "Add to cart", "Purchase", "Page view"
 *      properties: { // All the properties that can be used by Mixpanel. Everything is optional. These are suggestions for a "normal" event
 *          context: { // Give some context to the event. Where is it triggered and by who
 *              page_title: 'Product Page', // What page is the event triggered on
 *              page_path: '/product/123', // Make sure there aren't any PII in the path
 *              page_route: '/product/:id',
 *              page_href: 'https://www.example.com/product/123', // Make sure there aren't any PII in the href
 *              audience: 'Freelancer', // Who is triggering this event e.g. a role or "new user"
 *              section: 'footer', // What section is the event triggered in
 *          },
 *      groups: { // To what group does the person triggering the event belong 
 *          'company': ['tesco', 'sainsburys'],
 *          'plan': ['paid', 'premium']
 *      },
 * }
 */
export type MixpanelEvent = {
    /** e.g. "Update profile", "Add to cart", "Purchase", "Page view" */
    event: string;
    /** All the properties that can be used by Mixpanel. Everything is optional. These are suggestions for a "normal" event */
    properties: {
        /** Give some context to the event. Where is it triggered and by who */
        context: {
            /** What page is the event triggered on e.g. Product Page */
            page_title?: string;
            /** What is the path of the page e.g. /product/123 <- Make sure there aren't any PII in the path */
            page_path?: string;
            /** What is the route of the page e.g. /product/:id  */
            page_route?: string;
            /** What is the href of the page e.g. https://www.example.com/product/123 <- Make sure there aren't any PII in the href */
            page_href?: string;
            /** Who is triggering this event e.g. a role or "new user" */
            audience?: string;
            /** What section is the event triggered in e.g. footer or main menu */
            section?: string;
        };
        /** To what group does the person triggering the event belong e.g. { 'company': ['tesco', 'sainsburys'], 'plan': ['paid', 'premium'] } */
        groups?: { [key: string]: (string | number)[] };
        /** Any other properties that you want to add to the event */
        [key: string]: string | number | object | undefined;
    };
};
