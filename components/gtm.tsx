"use client"
import Script from "next/script"

// Use the provided GA4 Measurement ID
const GA_MEASUREMENT_ID = "G-3YXE5YRXVW"

export function GoogleTagManager() {
  return (
    <>
      {/* Google Tag Manager - Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            
            // Setup download tracking function
            window.trackDownload = function(fileType, fileName, isUSBased) {
              gtag('event', 'download', {
                'event_category': 'Downloads',
                'event_label': fileName,
                'file_type': fileType,
                'is_us_based': isUSBased
              });
              console.log('Download tracked in GA:', fileName);
            };
            
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-${GA_MEASUREMENT_ID.replace("G-", "")}');
          `,
        }}
      />
      {/* Google Tag Manager - NoScript */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-${GA_MEASUREMENT_ID.replace("G-", "")}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
    </>
  )
}
