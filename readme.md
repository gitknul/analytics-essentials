# FH Analytics Essentials

## Getting started

### Install via NPM

```bash
npm i @freshheads/analytics-essentials
```

### Setup Google Tag or Google Tagmanager

- [Gtag Setup](doc/gtag_setup.md)
- [Tagmanager Setup](doc/tagmanager_setup.md)

## Usage

### With gtag

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

### With Tagmanager

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
