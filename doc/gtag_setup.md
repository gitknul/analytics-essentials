# Gtag setup

## For Nextjs

#### **`app.tsx`**

```jsx
import { LoadGA4 } from '@freshheads/analytics-essentials/google';

const App = () => {
  return (
    <>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <LoadGA4
          measurementID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          debug={true} // optional
          defaultConsent={{
            ad_storage: 'denied',
            analytics_storage: 'denied',
          }} // optional
        />
      )}
    </>
  );
};
```

## Usage

```js
import {
  EventType,
  pushGaEvent,
} from '@freshheads/analytics-essentials/google';

pushGaEvent({ 
    type: EventType.CLICK,
    name: 'hero_button_click' 
});
```
