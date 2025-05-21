"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export function WorkingExportButton() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)

      // Get assessment data from localStorage
      const resultsJson = localStorage.getItem("assessmentResults")
      if (!resultsJson) {
        alert("No assessment results found. Please complete the assessment first.")
        setIsExporting(false)
        return
      }

      const results = JSON.parse(resultsJson)
      const orgName = localStorage.getItem("organizationName") || "Your Organization"
      const orgSize = localStorage.getItem("organizationSize") || "Unknown"

      // Create PDF document
      const doc = new jsPDF()

      // Add title
      doc.setFontSize(20)
      doc.setTextColor(0, 51, 102)
      doc.text("Legal IT Maturity Assessment Report", 20, 20)

      // Add organization info
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text(`Organization: ${orgName}`, 20, 30)
      doc.text(
        `Size: ${
          orgSize === "small"
            ? "Small (1-50 employees)"
            : orgSize === "mid-size"
              ? "Mid-size (51-500 employees)"
              : "Large (500+ employees)"
        }`,
        20,
        37,
      )
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 44)

      // Add summary heading
      doc.setFontSize(16)
      doc.setTextColor(0, 51, 102)
      doc.text("Domain Maturity Summary", 20, 55)

      // Create table data
      const tableData = []

      // Calculate domain averages
      Object.entries(results).forEach(([domain, dimensions]) => {
        const scores = Object.values(dimensions)
        const sum = scores.reduce((acc, score) => acc + Number(score), 0)
        const average = sum / scores.length

        tableData.push([domain, average.toFixed(2), getMaturityBand(average)])
      })

      // Add table
      autoTable(doc, {
        startY: 60,
        head: [["Domain", "Score", "Maturity Band"]],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [0, 51, 102],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
      })

      // Add recommendations section
      const finalY = (doc as any).lastAutoTable.finalY + 10
      doc.setFontSize(16)
      doc.setTextColor(0, 51, 102)
      doc.text("Next Steps", 20, finalY)

      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text("1. Review your domain scores and identify priority areas for improvement", 20, finalY + 10)
      doc.text("2. Explore the implementation guides for each domain", 20, finalY + 17)
      doc.text("3. Develop an action plan based on the recommendations", 20, finalY + 24)
      doc.text("4. Schedule regular reassessments to track your progress", 20, finalY + 31)

      // Add footer
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100)
        doc.text(
          `Legal IT Maturity Assessment - Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" },
        )
      }

      // Save the PDF
      doc.save(`${orgName.replace(/\s+/g, "-")}-IT-Maturity-Assessment.pdf`)
    } catch (error) {
      console.error("Export error:", error)
      alert("An error occurred while exporting. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  // Helper function to determine maturity band from score
  function getMaturityBand(score: number): string {
    if (score < 2.0) return "Initial (1.0-1.9)"
    if (score < 3.0) return "Developing (2.0-2.9)"
    if (score < 4.0) return "Established (3.0-3.9)"
    if (score < 4.5) return "Managed (4.0-4.4)"
    return "Optimized (4.5-5.0)"
  }

  return (
    <Button variant="outline" className="gap-2" onClick={handleExport} disabled={isExporting}>
      <Download className="h-4 w-4" />
      {isExporting ? "Exporting..." : "Export Results"}
    </Button>
  )
}
