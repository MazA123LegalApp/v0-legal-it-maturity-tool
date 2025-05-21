"use client"

import { useEffect } from "react"
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

  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || []

    // Track page view
    if (pathname) {
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

  // Function to track downloads
  const trackDownload = (fileType, fileName, isUSBased = false) => {
    // Push download event to dataLayer for GTM
    window.dataLayer.push({
      event: "file_download",
      file_type: fileType,
      file_name: fileName,
      is_us_based: isUSBased,
    })

    // Also track directly with gtag if available
    if (window.gtag) {
      window.gtag("event", "file_download", {
        file_type: fileType,
        file_name: fileName,
        is_us_based: isUSBased,
      })
    }

    console.log(`Download tracked: ${fileName} (${fileType})`)
  }

  // Function to track assessment interactions
  const trackAssessmentInteraction = (action, domainId, isUSBased = false) => {
    // Push assessment interaction event to dataLayer for GTM
    window.dataLayer.push({
      event: "assessment_interaction",
      action: action,
      domain_id: domainId,
      is_us_based: isUSBased,
    })

    // Also track directly with gtag if available
    if (window.gtag) {
      window.gtag("event", "assessment_interaction", {
        action: action,
        domain_id: domainId,
        is_us_based: isUSBased,
      })
    }

    console.log(`Assessment interaction tracked: ${action} for domain ${domainId}`)
  }

  // Attach tracking functions to window for global access
  useEffect(() => {
    // @ts-ignore - Adding custom functions to window
    window.trackDownload = trackDownload
    // @ts-ignore - Adding custom functions to window
    window.trackAssessmentInteraction = trackAssessmentInteraction
  }, [])

  return (
    <>
      {/* Google Analytics Script Tags */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false // We'll handle this manually through GTM
          });
        `}
      </Script>
    </>
  )
}
