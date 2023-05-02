export declare enum EventTypes {
  CLICK = 'click',
}
export declare const pushTrackingEvent: (
  type: EventTypes | string,
  context?: {}
) => void;
