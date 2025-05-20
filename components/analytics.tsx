"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Replace with your actual Measurement ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view locally
    const trackPageView = () => {
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

    trackPageView()
  }, [pathname])

  // Return empty fragment - we'll add Google Analytics later
  return null
}
