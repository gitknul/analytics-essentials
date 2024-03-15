# Mixpanel setup

## Introduction
This implementation of mixpanel relies on a backend service to send the data to mixpanel. The goal of the frontend lib is to provide a typechecked event to help developers push events the same way.
For the backend Freshheads created a php bundle, [FHMixpanelBundle](https://github.com/freshheads/FHMixpanelBundle) and a node library will also be created in the future.

## Installation

`npm install @freshheads/analytics-essentials`

## Usage

Add the MixpanelProvider to your app:

```tsx
import { MixpanelProvider } from '@freshheads/analytics-essentials';

const App = () => {
  return (
    <MixpanelProvider eventApiClient={sendTrackEvent}>
        <YourApp />
    </MixpanelProvider>
  );
};
```

`sendTrackEvent` is a function that sends the event to the backend. It should have the following signature:

```tsx

import { MixpanelEvent } from '@freshheads/analytics-essentials';
import { executePostRequest } from '@/api/client';

export const sendTrackEvent = async (data: MixpanelEvent) => {
    return executePostRequest('_mixpanel/track', data);
};
```

Then you can use the `useMixpanelContext` hook to send events:

```tsx
import { useMixpanelContext } from '@freshheads/analytics-essentials';

const { trackEvent } = useMixpanelContext();

trackEvent({
  name: 'Add to cart',
  data: {
    product_name: product.title,
  },
});
```

### Context and overrides
By default, each event will have a context property that contains more information about the page it was sent from.
This is resolved from window.location because we have no access to the router state.

```
{
    title: 'Product Page', // What page is the event triggered on
    pathname: '/product/123', // Make sure there aren't any personal info in the path
    href: 'https://www.example.com/product/123', // Make sure there aren't any personal info in the href
}
```

You can override this context by providing a `context` property to the event.

```tsx
trackEvent({
    name: 'Add to cart',
    context: {
        section: 'footer',
    },
});
```

Or by providing a default context to the MixpanelProvider:

```tsx
const router = useRouter();

const defaultMixpanelEventContext = {
    pathname: router.pathname,
    route: router.route,
    audience: 'Freelancer',
};

const App = () => {
  return (
    <MixpanelProvider eventApiClient={sendTrackEvent} defaultEventContext={defaultMixpanelEventContext}>
        <YourApp />
    </MixpanelProvider>
  );
};
```

### Page view events

TODO

### UTM tracking

UTM tags are automatically added to the context of the event if they are present in the URL. 
They will be remembered for the duration of the session. Even if the user navigates to a different page, the UTM tags will be added to new events.

## Mixpanel users

## Event types

TODO - how to override the event types
