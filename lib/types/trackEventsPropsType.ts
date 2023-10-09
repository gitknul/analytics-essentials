import { EventTypes } from './events';

type ContextType = {
    [index: string]: string | number | object;
};

interface PurchaseEvent {
    type: EventTypes.PURCHASE;
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
    type: EventTypes.CLICK;
    name: string;
    context?: ContextType;
}

interface SubmitEvent {
    type: EventTypes.SUBMIT;
    name: string;
    context?: ContextType;
}

interface CustomEvent {
    type: EventTypes.CUSTOM;
    name: string;
    context?: ContextType;
}

interface GenericEventType {
    type: EventTypes.GENERIC;
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
    | GenericEventType;
