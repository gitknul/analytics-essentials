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

export const sendTrackEvent = async (data: MixpanelEvent | MixpanelPageViewEvent) => {
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

Or by using setEventContext which is exposed by the useMixpanelContext hook. This would make sense if some data is not available in your root component.

```tsx
const { setEventContext } = useMixpanelContext();

useEffect(() => {
    setEventContext({
        audience: 'Consumer',
    });
}, []);
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
        <MixpanelProvider eventApiClient={sendTrackEvent}>
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

Mixpanel events can be attached to a user. This is done in the backend on user login, see [FHMixpanelBundle](https://github.com/freshheads/FHMixpanelBundle) for more information.
When using JWT tokens for authentication the token can become invalid at any time. This means that the user can become anonymous at any time.
When the user becomes anonymous, the frontend should also reset the user in mixpanel.

FHMixpanelBundle has an endpoint to do this reset user action. This library doesn't provide an implementation for it but could look like this:

```tsx
function resetMixpanelUser() {
    executeDeleteRequest('_mixpanel/transaction');
}
```

## Event naming conventions

TODO - how to name events
