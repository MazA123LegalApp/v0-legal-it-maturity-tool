"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

// Use the provided Measurement ID
const GA_MEASUREMENT_ID = "G-3YXE5YRXVW"

// Define window.dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [analyticsError, setAnalyticsError] = useState(false)

  // Handle analytics script errors
  const handleScriptError = () => {
    console.warn("Google Analytics script failed to load. Tracking disabled.")
    setAnalyticsError(true)
  }

  useEffect(() => {
    // Skip if we're on the server, window is not defined, or there was an error
    if (typeof window === "undefined" || analyticsError) return

    try {
      // Initialize dataLayer if it doesn't exist
      window.dataLayer = window.dataLayer || []

      // Define gtag function if it doesn't exist
      if (typeof window.gtag !== "function") {
        window.gtag = () => {
          window.dataLayer.push(arguments)
        }
      }

      // Track page view
      if (pathname) {
        try {
          // Push page view event to dataLayer for GTM
          window.dataLayer.push({
            event: "page_view",
            page_path: pathname,
            page_title: document.title,
          })

          // Also track directly with gtag if available
          if (window.gtag) {
            window.gtag("event", "page_view", {
              page_path: pathname,
              page_title: document.title,
              send_to: GA_MEASUREMENT_ID,
            })
          }

          // Also track page view locally for admin dashboard to access
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
            console.error("Error tracking page view in localStorage:", error)
          }
        } catch (error) {
          console.error("Error tracking page view:", error)
          setAnalyticsError(true)
        }
      }
    } catch (error) {
      console.error("Error initializing analytics:", error)
      setAnalyticsError(true)
    }
  }, [pathname, searchParams, analyticsError])

  // If there was an error, don't render the scripts
  if (analyticsError) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script Tags */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onError={handleScriptError}
      />
      <Script id="google-analytics" strategy="afterInteractive" onError={handleScriptError}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false, // We'll handle this manually
            anonymize_ip: false,   // Don't anonymize IPs so we can track location
            allow_google_signals: true,
            allow_ad_personalization_signals: true
          });
        `}
      </Script>
    </>
  )
}
