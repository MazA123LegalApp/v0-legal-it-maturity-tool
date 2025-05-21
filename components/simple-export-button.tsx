"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf"

export function SimpleExportButton() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)

      // Get assessment data from localStorage
      const assessmentData = localStorage.getItem("assessmentResults")
      if (!assessmentData) {
        alert("No assessment data found to export.")
        setIsExporting(false)
        return
      }

      // Parse the data
      const results = JSON.parse(assessmentData)

      // Create a simple PDF
      const doc = new jsPDF()

      // Add title
      doc.setFontSize(22)
      doc.text("Legal IT Maturity Assessment Results", 20, 20)

      // Add date
      doc.setFontSize(12)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)

      // Add organization info if available
      const orgName = localStorage.getItem("organizationName") || "Your Organization"
      doc.text(`Organization: ${orgName}`, 20, 40)

      // Add a simple summary
      doc.setFontSize(16)
      doc.text("Domain Scores", 20, 60)

      // List domain scores
      let yPos = 70
      Object.entries(results).forEach(([domain, scores]) => {
        // Calculate average score for this domain
        const domainScores = Object.values(scores)
        const avgScore = domainScores.reduce((sum, score) => sum + Number(score), 0) / domainScores.length

        doc.setFontSize(12)
        doc.text(`${domain}: ${avgScore.toFixed(2)} / 5.0`, 20, yPos)
        yPos += 10
      })

      // Save the PDF
      doc.save("legal-it-maturity-assessment.pdf")

      alert("Export successful! Your assessment results have been downloaded as a PDF.")
    } catch (error) {
      console.error("Export error:", error)
      alert("There was an error exporting your results. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button variant="outline" className="gap-2" onClick={handleExport} disabled={isExporting}>
      <Download className="h-4 w-4" />
      {isExporting ? "Exporting..." : "Export Results"}
    </Button>
  )
}
