# Gtag setup

## For Nextjs

#### **`app.tsx`**

```jsx
const App = () => {
  return (
    <>
      {process.env.NEXT_PUBLIC_GTAG_ID && (
        <>
          <Script
            id="gtm"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
          />
          <Script id="gtag" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
                `}
          </Script>
        </>
      )}
    </>
  );
};
```
