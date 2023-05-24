import { NODE_ENV_DEVELOPMENT } from './constants';
import { PushDataLayerPropsType } from './types';

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

/**
 * @example
 * pushDataLayer({type: EventTypes.CLICK, name: '', context: {param: ''}, clear: false})
 */
export const pushDataLayer = (props: PushDataLayerPropsType) => {
  if (!isAvailable()) return;
  const dataLayer = (window as any).dataLayer;

  const { type, name, context, clear = true } = props;

  dataLayer.push({
    event: type,
    action: name,
    context,
    _clear: clear,
  });
};
