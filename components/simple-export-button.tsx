"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface SimpleExportButtonProps {
  onExport: () => void
  disabled?: boolean
}

const SimpleExportButton: React.FC<SimpleExportButtonProps> = ({ onExport, disabled }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Make sure the tracking function is available
    if (typeof window !== "undefined" && !window.trackDownload) {
      window.trackDownload = (fileType, fileName, isUSBased) => {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: "download",
            fileType,
            fileName,
            isUSBased,
          })
          console.log("Download tracked via dataLayer:", fileName)
        }
      }
    }
  }, [])

  const handleExport = async () => {
    setLoading(true)
    await onExport()
    setLoading(false)

    if (window.trackDownload) {
      window.trackDownload("PDF", "Assessment_Report", false)
    }
  }

  return (
    <button onClick={handleExport} disabled={disabled || loading}>
      {loading ? "Exporting..." : "Export"}
    </button>
  )
}

export default SimpleExportButton
