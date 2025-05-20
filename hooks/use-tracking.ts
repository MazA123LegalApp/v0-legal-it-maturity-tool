"use client"

import { useEffect, useState } from "react"

export function useTracking() {
  const [isTracked, setIsTracked] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [startTimestamp, setStartTimestamp] = useState<string | null>(null)
  const [location, setLocation] = useState<{
    country: string
    region: string
    city: string
  } | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Generate a simple session ID without making any API calls
    const generateSessionId = () => {
      return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    }

    // Check if we've already tracked this session
    const existingSessionId = sessionStorage.getItem("session_id")
    const existingTimestamp = sessionStorage.getItem("start_timestamp")

    if (existingSessionId && existingTimestamp) {
      setSessionId(existingSessionId)
      setStartTimestamp(existingTimestamp)
      setLocation({ country: "Unknown", region: "Unknown", city: "Unknown" })
      setIsTracked(true)
      return
    }

    // Generate client-side tracking data
    const newSessionId = generateSessionId()
    const newTimestamp = new Date().toISOString()

    setSessionId(newSessionId)
    setStartTimestamp(newTimestamp)
    setLocation({ country: "Unknown", region: "Unknown", city: "Unknown" })

    // Store in session storage
    try {
      sessionStorage.setItem("session_id", newSessionId)
      sessionStorage.setItem("start_timestamp", newTimestamp)
      sessionStorage.setItem("location", JSON.stringify({ country: "Unknown", region: "Unknown", city: "Unknown" }))
      sessionStorage.setItem("usage_tracked", "true")
    } catch (error) {
      console.error("Error storing session data:", error)
    }

    setIsTracked(true)
  }, [])

  const trackCompletion = async () => {
    // Just return success without making any API calls
    return true
  }

  return { isTracked, location, trackCompletion }
}
