"use client"

import { useRef, useEffect, useState } from "react"
import { Download, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"
import { jsPDF } from "jspdf"
import * as XLSX from "xlsx"
import { trackAssessmentDownload } from "@/lib/tracking-utils"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  type AssessmentResult,
  type Domain,
  calculateDimensionAverages,
  calculateDomainAverages,
  calculateOverallAverage,
  dimensions,
  domains,
  getMaturityLevel,
} from "@/lib/assessment-data"
import { getCountryInfo } from "@/lib/geo-utils"
import { getDomainUrlId } from "@/lib/url-utils"

interface ExportUtilsProps {
  results: AssessmentResult
  organizationName?: string
}

// Define window.trackDownload if it doesn't exist in the type system
declare global {
  interface Window {
    trackDownload?: (fileType: string, fileName: string, isUSBased: boolean) => void
    gtag?: (event: string, action: string, eventParams: any) => void
  }
}

export function ExportUtils({ results, organizationName = "Your Organization" }: ExportUtilsProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  const [isUS, setIsUS] = useState<boolean>(false)

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

  const trackDownload = async (type: string, organizationName: string) => {
    try {
      // Track with GA4
      if (typeof window !== "undefined") {
        // Use our new tracking function
        trackAssessmentDownload(type, organizationName, isUS)
      }
    } catch (error) {
      console.error("Error tracking download:", error)
    }
  }

  const exportToPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Add title and date
      doc.setFontSize(18)
      doc.text("Legal IT Maturity Assessment Report", 15, 15)
      doc.setFontSize(12)
      doc.text(`Organization: ${organizationName}`, 15, 25)
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 32)

      // Add overall score
      const overallAverage = calculateOverallAverage(results)
      doc.setFontSize(14)
      doc.text("Overall Maturity Score", 15, 45)
      doc.setFontSize(24)
      doc.text(`${overallAverage.toFixed(1)} - ${getMaturityLevel(overallAverage)}`, 15, 55)

      // Add domain scores
      doc.setFontSize(14)
      doc.text("Domain Scores", 15, 70)

      const domainAverages = calculateDomainAverages(results)
      let yPos = 80

      domains.forEach((domain: Domain) => {
        const score = domainAverages[domain.id] || 0
        if (score > 0) {
          doc.setFontSize(12)
          doc.text(`${domain.name}: ${score.toFixed(1)} - ${getMaturityLevel(score)}`, 20, yPos)
          yPos += 8
        }
      })

      // Add dimension scores
      yPos += 10
      doc.setFontSize(14)
      doc.text("Dimension Scores", 15, yPos)

      const dimensionAverages = calculateDimensionAverages(results)
      yPos += 10

      Object.entries(dimensions).forEach(([key, value]) => {
        const score = dimensionAverages[key] || 0
        if (score > 0) {
          doc.setFontSize(12)
          doc.text(`${value.name}: ${score.toFixed(1)} - ${getMaturityLevel(score)}`, 20, yPos)
          yPos += 8
        }
      })

      // Add domain-specific sections with recommendations
      domains.forEach((domain: Domain) => {
        const domainScore = domainAverages[domain.id] || 0
        if (domainScore > 0) {
          // Add a new page for each domain
          doc.addPage()

          // Domain header
          doc.setFontSize(16)
          doc.text(`${domain.name} Domain Analysis`, 15, 15)

          // Domain score
          doc.setFontSize(14)
          doc.text(`Maturity Level: ${getMaturityLevel(domainScore)} (${domainScore.toFixed(1)})`, 15, 25)

          // Dimension scores for this domain
          doc.setFontSize(12)
          doc.text("Dimension Scores:", 15, 35)

          let dimYPos = 45
          Object.entries(dimensions).forEach(([key, value]) => {
            const score = results[domain.id]?.[key as keyof (typeof results)[string]] || 0
            if (score > 0) {
              doc.text(`${value.name}: ${score.toFixed(1)} - ${getMaturityLevel(score)}`, 20, dimYPos)
              dimYPos += 8
            }
          })

          // Add recommendations based on maturity level
          doc.setFontSize(14)
          doc.text("Recommendations:", 15, dimYPos + 10)

          const recommendations = getRecommendations(domain.id, domainScore)
          let recYPos = dimYPos + 20

          recommendations.forEach((rec, index) => {
            // Check if we need to add a new page for recommendations
            if (recYPos > 270) {
              doc.addPage()
              recYPos = 20
              doc.setFontSize(14)
              doc.text(`${domain.name} Recommendations (continued)`, 15, recYPos)
              recYPos += 10
            }

            doc.setFontSize(10)

            // Split long recommendations into multiple lines
            const lines = splitTextToFit(rec, 170, doc)
            lines.forEach((line, lineIndex) => {
              const prefix = lineIndex === 0 ? `${index + 1}. ` : "   "
              doc.text(`${prefix}${line}`, 20, recYPos)
              recYPos += 6
            })
          })

          // Add implementation guide information
          doc.setFontSize(14)
          doc.text("Implementation Guide:", 15, recYPos + 10)
          recYPos += 20

          const maturityBand = getMaturityLevel(domainScore)
          const domainUrlId = getDomainUrlId(domain.id)
          const guideUrl = `https://yourdomain.com/playbook/domains/${domainUrlId}/${maturityBand.toLowerCase()}`

          doc.setFontSize(10)
          doc.text(`Access your detailed implementation guide for ${domain.name} at:`, 20, recYPos)
          recYPos += 6
          doc.setTextColor(0, 0, 255)
          doc.text(guideUrl, 20, recYPos)
          doc.setTextColor(0, 0, 0)

          // Add templates section if available
          const templates = getTemplatesForDomain(domain.id, maturityBand)
          if (templates.length > 0) {
            recYPos += 15
            doc.setFontSize(14)
            doc.text("Recommended Templates:", 15, recYPos)
            recYPos += 10

            templates.forEach((template, index) => {
              if (recYPos > 270) {
                doc.addPage()
                recYPos = 20
                doc.setFontSize(14)
                doc.text(`${domain.name} Templates (continued)`, 15, recYPos)
                recYPos += 10
              }

              doc.setFontSize(10)
              doc.text(`${index + 1}. ${template.name}`, 20, recYPos)
              recYPos += 5
              doc.text(`   ${template.description}`, 20, recYPos)
              recYPos += 5
              doc.text(`   Format: ${template.fileType.toUpperCase()}`, 20, recYPos)
              recYPos += 8
            })
          }
        }
      })

      // Add footer
      doc.setFontSize(10)
      doc.text("Generated by Legal IT Maturity Assessment Tool", 15, 280)
      doc.text("Developed by Maz Araghrez, Legal Technologist at Dentons", 15, 285)

      // Track the download
      trackDownload("PDF", organizationName)

      // Save the PDF
      doc.save(`${organizationName.replace(/\s+/g, "_")}_IT_Maturity_Assessment.pdf`)
    } catch (error) {
      console.error("Error exporting to PDF:", error)
    }
  }

  // Helper function to split text to fit within a width
  function splitTextToFit(text: string, maxWidth: number, doc: jsPDF): string[] {
    const words = text.split(" ")
    const lines: string[] = []
    let currentLine = ""

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const testWidth = doc.getTextWidth(testLine)

      if (testWidth > maxWidth) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  }

  const exportToExcel = () => {
    try {
      const domainAverages = calculateDomainAverages(results)
      const dimensionAverages = calculateDimensionAverages(results)
      const overallAverage = calculateOverallAverage(results)

      // Create worksheet for summary
      const summaryData = [
        ["Legal IT Maturity Assessment Report"],
        [`Organization: ${organizationName}`],
        [`Date: ${new Date().toLocaleDateString()}`],
        [],
        ["Overall Maturity Score", overallAverage.toFixed(1), getMaturityLevel(overallAverage)],
        [],
        ["Domain Scores"],
      ]

      domains.forEach((domain: Domain) => {
        const score = domainAverages[domain.id] || 0
        if (score > 0) {
          summaryData.push([domain.name, score.toFixed(1), getMaturityLevel(score)])
        }
      })

      summaryData.push([])
      summaryData.push(["Dimension Scores"])

      Object.entries(dimensions).forEach(([key, value]) => {
        const score = dimensionAverages[key] || 0
        if (score > 0) {
          summaryData.push([value.name, score.toFixed(1), getMaturityLevel(score)])
        }
      })

      // Create worksheet for detailed scores
      const detailedData = [
        ["Domain", "People & Organization", "Process", "Tooling", "Data", "Continual Improvement", "Average"],
      ]

      domains.forEach((domain: Domain) => {
        detailedData.push([
          domain.name,
          results[domain.id]?.people || "-",
          results[domain.id]?.process || "-",
          results[domain.id]?.tooling || "-",
          results[domain.id]?.data || "-",
          results[domain.id]?.improvement || "-",
          domainAverages[domain.id] ? domainAverages[domain.id].toFixed(1) : "-",
        ])
      })

      detailedData.push([
        "Dimension Average",
        dimensionAverages.people ? dimensionAverages.people.toFixed(1) : "-",
        dimensionAverages.process ? dimensionAverages.process.toFixed(1) : "-",
        dimensionAverages.tooling ? dimensionAverages.tooling.toFixed(1) : "-",
        dimensionAverages.data ? dimensionAverages.data.toFixed(1) : "-",
        dimensionAverages.improvement ? dimensionAverages.improvement.toFixed(1) : "-",
        overallAverage.toFixed(1),
      ])

      // Create domain-specific worksheets with recommendations
      const domainSheets = domains
        .map((domain: Domain) => {
          const domainScore = domainAverages[domain.id] || 0
          if (domainScore <= 0) return null

          const sheetData = [
            [`${domain.name} Domain Analysis`],
            [],
            ["Maturity Level", domainScore.toFixed(1), getMaturityLevel(domainScore)],
            [],
            ["Dimension", "Score", "Maturity Level"],
          ]

          Object.entries(dimensions).forEach(([key, value]) => {
            const score = results[domain.id]?.[key as keyof (typeof results)[string]] || 0
            if (score > 0) {
              sheetData.push([value.name, score.toFixed(1), getMaturityLevel(score)])
            }
          })

          sheetData.push([])
          sheetData.push(["Recommendations"])

          const recommendations = getRecommendations(domain.id, domainScore)
          recommendations.forEach((rec, index) => {
            sheetData.push([`${index + 1}. ${rec}`])
          })

          // Add implementation guide information
          const maturityBand = getMaturityLevel(domainScore)
          const domainUrlId = getDomainUrlId(domain.id)
          const guideUrl = `https://yourdomain.com/playbook/domains/${domainUrlId}/${maturityBand.toLowerCase()}`

          sheetData.push([])
          sheetData.push(["Implementation Guide"])
          sheetData.push([`Access your detailed implementation guide at: ${guideUrl}`])

          // Add templates
          const templates = getTemplatesForDomain(domain.id, maturityBand)
          if (templates.length > 0) {
            sheetData.push([])
            sheetData.push(["Recommended Templates"])

            templates.forEach((template, index) => {
              sheetData.push([`${index + 1}. ${template.name}`])
              sheetData.push([`   ${template.description}`])
              sheetData.push([`   Format: ${template.fileType.toUpperCase()}`])
              sheetData.push([])
            })
          }

          return {
            name: domain.name.replace(/\s+/g, "_"),
            data: sheetData,
          }
        })
        .filter(Boolean)

      // Create workbook with all worksheets
      const wb = XLSX.utils.book_new()
      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData)
      const detailedWs = XLSX.utils.aoa_to_sheet(detailedData)

      XLSX.utils.book_append_sheet(wb, summaryWs, "Summary")
      XLSX.utils.book_append_sheet(wb, detailedWs, "Detailed Scores")

      // Add domain-specific sheets
      domainSheets.forEach((sheet) => {
        if (sheet) {
          const ws = XLSX.utils.aoa_to_sheet(sheet.data)
          XLSX.utils.book_append_sheet(wb, ws, sheet.name)
        }
      })

      // Track the download
      trackDownload("Excel", organizationName)

      // Save the Excel file
      XLSX.writeFile(wb, `${organizationName.replace(/\s+/g, "_")}_IT_Maturity_Assessment.xlsx`)
    } catch (error) {
      console.error("Error exporting to Excel:", error)
    }
  }

  // Helper function to get recommendations based on domain and score
  const getRecommendations = (domainId: string, score: number): string[] => {
    // Default recommendations if no specific ones are available
    const defaultRecs = [
      "Establish formal processes and documentation",
      "Implement regular reviews and improvement cycles",
      "Invest in training and skill development",
      "Standardize tools and technologies",
      "Develop metrics to measure effectiveness",
    ]

    // Get the maturity level
    const maturityLevel = getMaturityLevel(score)

    // Fall back to default recommendations
    return defaultRecs
  }

  const getTemplatesForDomain = (domainId: string, maturityBand: string): any[] => {
    // Placeholder for template data retrieval logic
    return []
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Results
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToPDF} className="gap-2 cursor-pointer">
          <FilePdf className="h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="h-4 w-4" />
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
