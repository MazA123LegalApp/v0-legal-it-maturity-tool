"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getCountryInfo } from "@/lib/geo-utils"

// Define window.trackAssessmentInteraction if it doesn't exist in the type system
declare global {
  interface Window {
    trackAssessmentInteraction?: (action: string, domainId: string, isUSBased: boolean) => void
  }
}

interface AssessmentTrackerProps {
  action: string
  domainId?: string
  children: React.ReactNode
}

export function AssessmentTracker({ action, domainId = "all", children }: AssessmentTrackerProps) {
  const [isUS, setIsUS] = useState<boolean>(false)
  const [hasTracked, setHasTracked] = useState<boolean>(false)

  // Check if user is from the US
  useEffect(() => {
    const checkLocation = async () => {
      try {
        const countryInfo = await getCountryInfo()
        setIsUS(countryInfo.isUS)
      } catch (error) {
        console.error("Error checking location:", error)
      }
    }

    checkLocation()
  }, [])

  // Track the interaction
  const trackInteraction = () => {
    if (hasTracked) return

    // Track with GTM/GA if available
    if (window.trackAssessmentInteraction) {
      window.trackAssessmentInteraction(action, domainId, isUS)
    }

    // Also track locally for admin dashboard
    try {
      const interactionData = {
        action,
        domainId,
        timestamp: new Date().toISOString(),
        isUS,
      }

      // Store in localStorage for admin dashboard to access
      const interactions = JSON.parse(localStorage.getItem("tracked_interactions") || "[]")
      interactions.push(interactionData)
      localStorage.setItem("tracked_interactions", JSON.stringify(interactions))

      console.log("Assessment interaction tracked:", interactionData)
    } catch (error) {
      console.error("Error tracking assessment interaction:", error)
    }

    setHasTracked(true)
  }

  // Track on component mount
  useEffect(() => {
    trackInteraction()
  }, [isUS]) // Re-track if US status changes

  return <>{children}</>
}
