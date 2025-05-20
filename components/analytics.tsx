"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

// Use the provided Measurement ID
const GA_MEASUREMENT_ID = "G-3YXE5YRXVW"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && window.gtag) {
      // Track page view in Google Analytics
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      })

      // Also track page view locally for admin dashboard
      try {
        const pageData = {
          path: pathname,
          timestamp: new Date().toISOString(),
        }

        // Store in localStorage for admin dashboard to access
        const pageViews = JSON.parse(localStorage.getItem("tracked_pageviews") || "[]")
        pageViews.push(pageData)
        localStorage.setItem("tracked_pageviews", JSON.stringify(pageViews))

        console.log("Page view tracked:", pageData)
      } catch (error) {
        console.error("Error tracking page view:", error)
      }
    }
  }, [pathname, searchParams])

  return (
    <>
      {/* Google Analytics Script Tags */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
