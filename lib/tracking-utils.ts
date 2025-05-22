// Utility functions for tracking user interactions

/**
 * Safely tracks an event to Google Analytics
 * @param eventName The name of the event to track
 * @param eventParams Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>): void {
  try {
    // Skip if we're on the server or window is not defined
    if (typeof window === "undefined") return

    // Skip if gtag is not defined
    if (typeof window.gtag !== "function") {
      console.warn("Google Analytics not initialized, skipping event tracking")
      return
    }

    // Track the event
    window.gtag("event", eventName, {
      ...eventParams,
      event_category: eventParams?.event_category || "User Interaction",
      send_to: "G-3YXE5YRXVW",
    })

    console.log(`Event tracked: ${eventName}`, eventParams)
  } catch (error) {
    console.error(`Error tracking event ${eventName}:`, error)
  }
}

/**
 * Safely tracks a page view to Google Analytics
 * @param pagePath The path of the page to track
 * @param pageTitle The title of the page to track
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  try {
    // Skip if we're on the server or window is not defined
    if (typeof window === "undefined") return

    // Skip if gtag is not defined
    if (typeof window.gtag !== "function") {
      console.warn("Google Analytics not initialized, skipping page view tracking")
      return
    }

    // Track the page view
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      send_to: "G-3YXE5YRXVW",
    })

    console.log(`Page view tracked: ${pagePath}`)
  } catch (error) {
    console.error(`Error tracking page view for ${pagePath}:`, error)
  }
}

/**
 * Tracks a download event in Google Analytics
 * @param fileType The type of file being downloaded (PDF, Excel, etc.)
 * @param fileName The name of the file being downloaded
 * @param module The module or section the download is from (Assessment, Playbook, etc.)
 * @param isUSBased Whether the user is based in the US
 */
export function trackDownloadEvent(fileType: string, fileName: string, module = "Assessment", isUSBased = false) {
  try {
    // Track with GA4
    if (typeof window !== "undefined") {
      // Direct GA4 tracking
      trackEvent("download", {
        event_category: module,
        event_label: fileType,
        file_name: fileName,
        file_type: fileType,
        is_us_based: isUSBased,
      })

      // Also track locally for admin dashboard
      const downloadData = {
        type: fileType,
        module,
        fileName,
        date: new Date().toISOString(),
        isUSBased,
      }

      // Store in localStorage for admin dashboard to access
      try {
        const downloads = JSON.parse(localStorage.getItem("tracked_downloads") || "[]")
        downloads.push(downloadData)
        localStorage.setItem("tracked_downloads", JSON.stringify(downloads))
        console.log(`${module} download tracked locally:`, downloadData)
      } catch (storageError) {
        console.error(`Error storing download in localStorage:`, storageError)
      }
    }
  } catch (error) {
    console.error(`Error tracking ${module} download:`, error)
  }
}

/**
 * Tracks a playbook download event
 * @param fileType The type of file being downloaded (PDF, Word, etc.)
 * @param domainId The domain ID the playbook is for
 * @param maturityLevel The maturity level the playbook is for
 * @param isUSBased Whether the user is based in the US
 */
export function trackPlaybookDownload(fileType: string, domainId: string, maturityLevel: string, isUSBased = false) {
  const fileName = `${domainId}_${maturityLevel}_playbook.${fileType.toLowerCase()}`
  trackDownloadEvent(fileType, fileName, "Playbook", isUSBased)
}

/**
 * Tracks an assessment download event
 * @param fileType The type of file being downloaded (PDF, Excel, etc.)
 * @param organizationName The organization name for the assessment
 * @param isUSBased Whether the user is based in the US
 */
export function trackAssessmentDownload(fileType: string, organizationName: string, isUSBased = false) {
  const fileName = `${organizationName.replace(/\s+/g, "_")}_IT_Maturity_Assessment.${fileType.toLowerCase()}`
  trackDownloadEvent(fileType, fileName, "Assessment", isUSBased)
}
