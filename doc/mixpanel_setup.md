# Mixpanel setup

## Introduction
This implementation of mixpanel relies on a backend service to send the data to mixpanel. The goal of the frontend lib is to provide a typechecked event to help developers push events the same way.
For the backend Freshheads created a php bundle, [FHMixpanelBundle](https://github.com/freshheads/FHMixpanelBundle) and a node library will also be created in the future.

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

For page view events, you can use the `trackPageView` function.
First create a component that will be used to track page views.
The reason we don't make this part of the essential package is because we don't want to make any assumptions about the router you are using.
Or you might want to send additional data with the page view event.

```tsx
export default function TrackPageView() {
    const { trackPageView } = useMixpanelContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        trackPageView({
            data: {
                title: document.title,
                pathname: pathname,
                route: router.route,
            },
        });
    }, [pathname]);

    return null;
}
```

Then add this component to your app:

```tsx

const App = () => {
    return (
        <MixpanelProvider eventApiClient={sendTrackEvent} defaultEventContext={defaultMixpanelEventContext}>
            <TrackPageView />
            {children}
        </MixpanelProvider>
    );
};
```

### UTM tracking

UTM tags are automatically added to the context of the event if they are present in the URL. 
They will be remembered for the duration of the session. Even if the user navigates to a different page, the UTM tags will be added to new events.

## Mixpanel users

TODO how to handle reset mixpanel user

## Event naming conventions

TODO - how to name events

## Event types

TODO - how to override the event types
