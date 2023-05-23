import { NODE_ENV_DEVELOPMENT } from './constants';
import { TagManagerTrackEventPropsType } from './types';

const isAvailable = (): boolean => {
  // check for SSR
  if (typeof window === 'undefined') {
    return false;
  }

  const dataLayer = (window as any).dataLayer;

  if (!dataLayer) {
    if (process.env.NODE_ENV === NODE_ENV_DEVELOPMENT) {
      console.warn('It looks like TagManager is not (properly) installed...');
    }
    return false;
  }

  return true; // TagManager available
};

export const pushTrackingEvent = (props: TagManagerTrackEventPropsType) => {
  if (!isAvailable()) return;
  const dataLayer = (window as any).dataLayer;

  const { type, context, clear = true } = props;

  dataLayer.push({
    event: type,
    action: type,
    context,
    _clear: clear,
  });
};
