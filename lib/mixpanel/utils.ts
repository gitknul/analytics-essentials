export const isStandalonePWA = () =>
    typeof window !== 'undefined'
        ? window.matchMedia('(display-mode: standalone)').matches
        : false;

export const extractUtmParams = () => {
    const searchParams = new URLSearchParams(window.location.search);

    return {
        utm_source:
            searchParams.get('utm_source') ||
            sessionStorage.getItem('utm_source') ||
            undefined,
        utm_medium:
            searchParams.get('utm_medium') ||
            sessionStorage.getItem('utm_medium') ||
            undefined,
        utm_campaign:
            searchParams.get('utm_campaign') ||
            sessionStorage.getItem('utm_campaign') ||
            undefined,
        utm_content:
            searchParams.get('utm_content') ||
            sessionStorage.getItem('utm_content') ||
            undefined,
        utm_term:
            searchParams.get('utm_term') ||
            sessionStorage.getItem('utm_term') ||
            undefined,
    };
};

export const writeUtmParamsToSessionStorage = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const utmSourceKeys = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
    ];

    utmSourceKeys.forEach((key) => {
        if (searchParams.has(key)) {
            sessionStorage.setItem(key, <string>searchParams.get(key));
        }
    });
};
