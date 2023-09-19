import { EventTypes } from './events';

type ContextType = {
    [index: string]: string | number | object;
};

type PurchaseEventType = {
    name: EventTypes.PURCHASE;
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
};

type ClickEventType = {
    name: EventTypes.CLICK;
    context?: ContextType;
};

type SubmitEventType = {
    name: EventTypes.SUBMIT;
    context?: ContextType;
};

type CustomEventType = {
    name: string;
    context?: ContextType;
};

type GenericEventType = {
    name: EventTypes.GENERIC; // A generic event for a catch all in GA4
    context: {
        label: string; // display name instead of custom_event e.g. funnel
        category: string; // e.g. productPage
        action?: string; // viewedStep
        value?: string | number; // e.g. step-1
    };
};

export type TrackEventPropsType = { name: string } & (
    | PurchaseEventType
    | ClickEventType
    | SubmitEventType
    | CustomEventType
    | GenericEventType
);

export type PushDataLayerPropsType = TrackEventPropsType & {
    clear?: boolean;
};
