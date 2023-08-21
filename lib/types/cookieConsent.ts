type ConsentCookieOption = 'granted' | 'denied';

export type CookieConsentOptions = {
    ad_storage?: ConsentCookieOption;
    analytics_storage?: ConsentCookieOption;
};
