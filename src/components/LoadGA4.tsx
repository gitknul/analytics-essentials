import Script from 'next/script';
import { FC } from 'react';

type ConsentCookieOption = 'granted' | 'denied';

type LoadGA4Props = {
  measurementID: string;
  debug?: boolean;
  defaultConsent?: {
    ad_storage?: ConsentCookieOption;
    analytics_storage?: ConsentCookieOption;
  };
};

const defaultConsentSettings = {
  ['ad_storage']: 'denied',
  ['analytics_storage']: 'denied',
};

/**
 * @param {string} props.measurementID - G-XXXXXXXXXX
 * @param {Object} props.defaultConsent - {analytics_storage: 'granted' | 'denied'}
 * @param {boolean} props.debug - true | false
 * @example
 * <LoadGA4 measurementID='G-M123456789' debug={true} />
 */
export const LoadGA4: FC<LoadGA4Props> = ({
  measurementID,
  defaultConsent,
  debug = false,
}: LoadGA4Props) => {
  const consentOptions = JSON.stringify({
    ...defaultConsentSettings,
    ...defaultConsent,
  });

  return (
    <>
      <Script
        id="gtm"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementID}`}
      />
      <Script id="gtag" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', ${consentOptions});
        gtag('config', '${measurementID}', { 'debug_mode': ${debug} });
        `}
      </Script>
    </>
  );
};
