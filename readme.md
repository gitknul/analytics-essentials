# FH Analytics Essentials

## Usage

### With GTag

```js
import {
  pushTrackingEvent,
  EventTypes,
} from '@freshheads/analytics-essentials';

const trackEvents = {
  heroButtonTrackEvent: () =>
    pushTrackingEvent({
      type: EventTypes.CLICK, // EventTypes.SUBMIT | EventTypes.PURCHASE
      name: 'hero_button_click',
    }),
};
```

### With TagManager

```js
import { pushDataLayer, EventTypes } from '@freshheads/analytics-essentials';

const trackEvents = {
  heroButtonTrackEvent: () =>
    pushDataLayer({
      type: EventTypes.CLICK, // EventTypes.SUBMIT | EventTypes.PURCHASE
      name: 'hero_button_click',
    }),
};
```

## Optional params

```js
pushTrackingEvent({
      type: EventTypes.CLICK,
      name: 'event_name',
      context: {
        // context is typed based on type
        // you can always extend context with your custom properties
      }
    }),

```
