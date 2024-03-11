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
