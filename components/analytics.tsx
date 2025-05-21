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
    trackDownload?: (fileType: string, fileName: string, isUSBased: boolean) => void
    trackAssessmentInteraction?: (action: string, domainId: string, isUSBased: boolean) => void
    trackEvent?: (eventName: string, eventParams: Record<string, any>) => void
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
  const trackDownload = (fileType: string, fileName: string, isUSBased = false) => {
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
        send_to: GA_MEASUREMENT_ID,
      })
    }

    console.log(`Download tracked: ${fileName} (${fileType})`)
  }

  // Function to track assessment interactions
  const trackAssessmentInteraction = (action: string, domainId: string, isUSBased = false) => {
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
        send_to: GA_MEASUREMENT_ID,
      })
    }

    console.log(`Assessment interaction tracked: ${action} for domain ${domainId}`)
  }

  // Generic function to track any event
  const trackEvent = (eventName: string, eventParams: Record<string, any>) => {
    // Push event to dataLayer for GTM
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    })

    // Also track directly with gtag if available
    if (window.gtag) {
      window.gtag("event", eventName, {
        ...eventParams,
        send_to: GA_MEASUREMENT_ID,
      })
    }

    console.log(`Event tracked: ${eventName}`, eventParams)
  }

  // Attach tracking functions to window for global access
  useEffect(() => {
    // @ts-ignore - Adding custom functions to window
    window.trackDownload = trackDownload
    // @ts-ignore - Adding custom functions to window
    window.trackAssessmentInteraction = trackAssessmentInteraction
    // @ts-ignore - Adding custom functions to window
    window.trackEvent = trackEvent
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

// Export the tracking functions for direct import
export const trackDownload = (fileType: string, fileName: string, isUSBased = false) => {
  if (typeof window !== "undefined" && window.trackDownload) {
    window.trackDownload(fileType, fileName, isUSBased)
  } else {
    console.log(`Download tracked: ${fileName} (${fileType})`)
  }
}

export const trackAssessmentInteraction = (action: string, domainId: string, isUSBased = false) => {
  if (typeof window !== "undefined" && window.trackAssessmentInteraction) {
    window.trackAssessmentInteraction(action, domainId, isUSBased)
  } else {
    console.log(`Assessment interaction tracked: ${action} for domain ${domainId}`)
  }
}

export const trackEvent = (eventName: string, eventParams: Record<string, any>) => {
  if (typeof window !== "undefined" && window.trackEvent) {
    window.trackEvent(eventName, eventParams)
  } else {
    console.log(`Event tracked: ${eventName}`, eventParams)
  }
}
