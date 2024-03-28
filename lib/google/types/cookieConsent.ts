export enum CookieConsentValues {
    GRANTED = 'granted',
    DENIED = 'denied',
}

export type CookieConsentOptions = {
    ad_storage?: CookieConsentValues;
    analytics_storage?: CookieConsentValues;
    functionality_storage?: CookieConsentValues;
    personalization_storage?: CookieConsentValues;
    security_storage?: CookieConsentValues;
};
