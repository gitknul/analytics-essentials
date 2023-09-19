import Script from 'next/script';
import { FC } from 'react';

type LoadTagManagerProps = {
    measurementID: string;
};

/**
 * @param {string} props.measurementID - GTM-XXXXXXX
 * @example
 * <LoadTagManager measurementID='GTM-MK12345' />
 */
export const LoadTagManager: FC<LoadTagManagerProps> = ({ measurementID }) => {
    return (
        <>
            <Script id="google-tag-manager" strategy="afterInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${measurementID}');`}
            </Script>
        </>
    );
};
