import { NODE_ENV_DEVELOPMENT } from './constants';
import { TrackEventPropsType } from './types';

const isAvailable = (): boolean => {
  // check for SSR
  if (typeof window === 'undefined') {
    return false;
  }

  const gtag = window.gtag;
  if (!gtag) {
    if (process.env.NODE_ENV === NODE_ENV_DEVELOPMENT) {
      console.warn(
        'It looks like GTAG is not (properly) installed... https://support.google.com/analytics/answer/9304153?hl=en#zippy=%2Cweb%2Cadd-the-google-tag-directly-to-your-web-pages'
      );
    }
    return false;
  }

  return true; // gtag available
};

/**
 * @example
 * pushTrackingEvent({type: EventTypes.CLICK, name: '', context: {param: ''}})
 */
export const pushTrackingEvent = (props: TrackEventPropsType) => {
  if (!isAvailable()) return;
  const gtag = window.gtag;

  const { name, context } = props;

  gtag('event', name, { context });
};
