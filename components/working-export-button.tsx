"use client"

import type React from "react"
import { useEffect } from "react"

interface ExportButtonProps {
  onExport: () => void
}

// Extend the Window interface to include the trackDownload function
interface CustomWindow extends Window {
  trackDownload?: (fileType: string, fileName: string, isUSBased: boolean) => void
  dataLayer?: any[]
}

// Cast window to CustomWindow
declare const window: CustomWindow

const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => {
  useEffect(() => {
    // Make sure the tracking function is available
    if (typeof window !== "undefined" && !window.trackDownload) {
      window.trackDownload = (fileType: string, fileName: string, isUSBased: boolean) => {
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

  const handleExport = () => {
    onExport()
    if (window.trackDownload) {
      window.trackDownload("PDF", "Assessment_Report", false)
    }
  }

  return <button onClick={handleExport}>Export</button>
}

export default ExportButton
