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
  EventTypes,
  pushGaEvent,
} from '@freshheads/analytics-essentials';

pushGaEvent({ 
    type: EventTypes.CLICK,
    name: 'hero_button_click' 
});
```

### With Tag Manager

```js
import {
    EventTypes,
    pushDataLayerEvent,
} from '@freshheads/analytics-essentials';

pushDataLayerEvent({
    type: EventTypes.CLICK,
    name: 'hero_button_click',
});
```

## Optional params

```js
pushDataLayerEvent({
    type: EventTypes.CLICK,
    name: 'hero_button_click',
    context: {
      // context is typed based on type
      // you can always extend context with your custom properties
    }
}),

```
