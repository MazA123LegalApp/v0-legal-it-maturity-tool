"use client"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-3YXE5YRXVW"

export function GTM() {
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
      />
      <Script
        id="ga-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  )
}
