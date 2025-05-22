"use client"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-3YXE5YRXVW"

export function GoogleTagManager() {
  // Render nothing if GA ID is not defined
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
        onError={(e) => {
          console.warn("GTM inline script failed", e)
        }}
      />

      <Script
        id="gtm-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GA_MEASUREMENT_ID}`}
        onError={(e) => {
          console.warn("GTM script failed to load", e)
        }}
      />
    </>
  )
}
