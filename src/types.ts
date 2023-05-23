export enum EventTypes {
  CLICK = 'click',
  PURCHASE = 'purchase',
  SUBMIT = 'submit',
}

type ContextType = {
  [index: string]: string | number | object;
};

type PurchaseEventType = {
  type: EventTypes.PURCHASE;
  context: {
    currency: string;
    transaction_id: string;
    value: number;
    coupon?: string;
    shipping?: number;
    tax?: number;
    items: {
      item_id: string;
      item_name: string;
      affiliation?: string;
      price?: number;
      quantity?: number;
    }[];
  } & ContextType;
};

type ClickEventType = {
  type: EventTypes.CLICK;
  context?: ContextType;
};

type SubmitEventType = {
  type: EventTypes.CLICK;
  context?: ContextType;
};

export type TrackEventPropsType =
  | PurchaseEventType
  | ClickEventType
  | SubmitEventType;

export type TagManagerTrackEventPropsType = TrackEventPropsType & {
  clear?: boolean;
};
