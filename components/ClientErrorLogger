"use client"

import { useEffect } from "react"

export function ClientErrorLogger() {
  useEffect(() => {
    window.onerror = function (message, source, lineno, colno, error) {
      console.log("🛑 Global Error Caught:", {
        message,
        source,
        lineno,
        colno,
        error,
      })
    }
  }, [])

  return null
}
