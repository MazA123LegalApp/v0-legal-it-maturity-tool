"use client"

import { useEffect, useState } from "react"
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
  getMaturityLevelDescription,
  maturityLevels,
} from "@/lib/assessment-data"
import { getCountryInfo } from "@/lib/geo-utils"

interface ExportUtilsProps {
  results: AssessmentResult
  organizationName?: string
}

declare global {
  interface Window {
    trackDownload?: (fileType: string, fileName: string, isUSBased: boolean) => void
    gtag?: (event: string, action: string, eventParams: any) => void
  }
}

export function ExportUtils({ results, organizationName = "Your Organization" }: ExportUtilsProps) {
  const [isUS, setIsUS] = useState<boolean>(false)

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

  const exportToPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      let yPos = 15
      const pageHeight = 297
      const margin = 15
      const lineHeight = 7

      // Helper function to add new page if needed
      const checkPageBreak = (requiredSpace: number) => {
        if (yPos + requiredSpace > pageHeight - margin) {
          doc.addPage()
          yPos = margin
        }
      }

      // Helper function to add text with word wrapping
      const addWrappedText = (text: string, x: number, fontSize = 12, maxWidth = 180) => {
        doc.setFontSize(fontSize)
        const lines = doc.splitTextToSize(text, maxWidth)
        lines.forEach((line: string) => {
          checkPageBreak(lineHeight)
          doc.text(line, x, yPos)
          yPos += lineHeight
        })
      }

      // Title Page
      doc.setFontSize(24)
      doc.text("Legal IT Maturity Assessment", margin, yPos)
      yPos += 15

      doc.setFontSize(18)
      doc.text("Comprehensive Report", margin, yPos)
      yPos += 15

      doc.setFontSize(14)
      doc.text(`Organization: ${organizationName}`, margin, yPos)
      yPos += 10
      doc.text(`Assessment Date: ${new Date().toLocaleDateString()}`, margin, yPos)
      yPos += 10
      doc.text(`Report Generated: ${new Date().toLocaleString()}`, margin, yPos)
      yPos += 20

      // Executive Summary
      checkPageBreak(30)
      doc.setFontSize(16)
      doc.text("Executive Summary", margin, yPos)
      yPos += 10

      const overallAverage = calculateOverallAverage(results)
      const overallLevel = getMaturityLevel(overallAverage)

      addWrappedText(`Overall Maturity Score: ${overallAverage.toFixed(1)}/5.0 (${overallLevel})`, margin, 12)
      yPos += 5
      addWrappedText(getMaturityLevelDescription(overallAverage), margin, 10)
      yPos += 15

      // Domain Analysis
      checkPageBreak(40)
      doc.setFontSize(16)
      doc.text("Domain Analysis", margin, yPos)
      yPos += 10

      const domainAverages = calculateDomainAverages(results)

      domains.forEach((domain: Domain) => {
        const score = domainAverages[domain.id] || 0
        if (score > 0) {
          checkPageBreak(25)

          doc.setFontSize(14)
          doc.text(domain.name, margin, yPos)
          yPos += 7

          doc.setFontSize(12)
          doc.text(`Score: ${score.toFixed(1)}/5.0 (${getMaturityLevel(score)})`, margin + 5, yPos)
          yPos += 7

          addWrappedText(domain.description, margin + 5, 10)
          yPos += 5
        }
      })

      // Dimension Analysis
      checkPageBreak(40)
      doc.setFontSize(16)
      doc.text("Dimension Analysis", margin, yPos)
      yPos += 10

      const dimensionAverages = calculateDimensionAverages(results)

      Object.entries(dimensions).forEach(([key, value]) => {
        const score = dimensionAverages[key] || 0
        if (score > 0) {
          checkPageBreak(20)

          doc.setFontSize(14)
          doc.text(value.name, margin, yPos)
          yPos += 7

          doc.setFontSize(12)
          doc.text(`Score: ${score.toFixed(1)}/5.0 (${getMaturityLevel(score)})`, margin + 5, yPos)
          yPos += 10
        }
      })

      // Detailed Scores Table
      checkPageBreak(60)
      doc.setFontSize(16)
      doc.text("Detailed Assessment Scores", margin, yPos)
      yPos += 15

      // Table headers
      doc.setFontSize(10)
      const colWidths = [50, 25, 25, 25, 25, 25]
      const colPositions = [margin, margin + 50, margin + 75, margin + 100, margin + 125, margin + 150]

      doc.text("Domain", colPositions[0], yPos)
      doc.text("People", colPositions[1], yPos)
      doc.text("Process", colPositions[2], yPos)
      doc.text("Tooling", colPositions[3], yPos)
      doc.text("Data", colPositions[4], yPos)
      doc.text("Improvement", colPositions[5], yPos)
      yPos += 7

      // Draw line under headers
      doc.line(margin, yPos - 2, margin + 175, yPos - 2)
      yPos += 3

      domains.forEach((domain: Domain) => {
        const domainResult = results[domain.id]
        if (domainResult) {
          checkPageBreak(7)

          doc.text(domain.name.substring(0, 20), colPositions[0], yPos)
          doc.text(domainResult.people.toString(), colPositions[1], yPos)
          doc.text(domainResult.process.toString(), colPositions[2], yPos)
          doc.text(domainResult.tooling.toString(), colPositions[3], yPos)
          doc.text(domainResult.data.toString(), colPositions[4], yPos)
          doc.text(domainResult.improvement.toString(), colPositions[5], yPos)
          yPos += 7
        }
      })

      // Recommendations Section
      checkPageBreak(40)
      doc.setFontSize(16)
      doc.text("Recommendations", margin, yPos)
      yPos += 15

      // Get weakest domains for recommendations
      const sortedDomains = domains
        .map((domain) => ({
          domain,
          score: domainAverages[domain.id] || 0,
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => a.score - b.score)

      const weakestDomains = sortedDomains.slice(0, 3)

      weakestDomains.forEach((item, index) => {
        checkPageBreak(25)

        doc.setFontSize(14)
        doc.text(`${index + 1}. ${item.domain.name}`, margin, yPos)
        yPos += 7

        doc.setFontSize(12)
        doc.text(`Current Score: ${item.score.toFixed(1)}/5.0`, margin + 5, yPos)
        yPos += 7

        addWrappedText(
          `Focus on improving this domain to enhance overall maturity. Consider implementing structured processes and governance frameworks.`,
          margin + 5,
          10,
        )
        yPos += 5
      })

      // Maturity Level Definitions
      checkPageBreak(60)
      doc.setFontSize(16)
      doc.text("Maturity Level Definitions", margin, yPos)
      yPos += 15

      maturityLevels.forEach((level) => {
        checkPageBreak(20)

        doc.setFontSize(12)
        doc.text(`${level.name} (${level.range})`, margin, yPos)
        yPos += 7

        addWrappedText(level.description, margin + 5, 10)
        yPos += 5
      })

      // Footer on each page
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.text(`Generated by Legal IT Maturity Assessment Tool - Page ${i} of ${pageCount}`, margin, pageHeight - 10)
        doc.text("Developed by Maz Araghrez, Legal Technologist at Dentons", margin, pageHeight - 5)
      }

      trackAssessmentDownload("PDF", organizationName, isUS)
      doc.save(`${organizationName.replace(/\s+/g, "_")}_IT_Maturity_Assessment_Detailed.pdf`)
    } catch (error) {
      console.error("Error exporting to PDF:", error)
    }
  }

  const exportToExcel = () => {
    try {
      const domainAverages = calculateDomainAverages(results)
      const dimensionAverages = calculateDimensionAverages(results)
      const overallAverage = calculateOverallAverage(results)

      // Executive Summary Sheet
      const summaryData = [
        ["Legal IT Maturity Assessment - Comprehensive Report"],
        [`Organization: ${organizationName}`],
        [`Assessment Date: ${new Date().toLocaleDateString()}`],
        [`Report Generated: ${new Date().toLocaleString()}`],
        [],
        ["EXECUTIVE SUMMARY"],
        ["Overall Maturity Score", overallAverage.toFixed(1), getMaturityLevel(overallAverage)],
        ["Overall Description", getMaturityLevelDescription(overallAverage)],
        [],
        ["DOMAIN SCORES"],
        ["Domain", "Score", "Level", "Description"],
      ]

      domains.forEach((domain: Domain) => {
        const score = domainAverages[domain.id] || 0
        if (score > 0) {
          summaryData.push([domain.name, score.toFixed(1), getMaturityLevel(score), domain.description])
        }
      })

      summaryData.push([])
      summaryData.push(["DIMENSION SCORES"])
      summaryData.push(["Dimension", "Score", "Level"])

      Object.entries(dimensions).forEach(([key, value]) => {
        const score = dimensionAverages[key] || 0
        if (score > 0) {
          summaryData.push([value.name, score.toFixed(1), getMaturityLevel(score)])
        }
      })

      // Detailed Scores Sheet
      const detailedData = [
        ["DETAILED ASSESSMENT SCORES"],
        [],
        ["Domain", "People & Organization", "Process", "Tooling", "Data", "Continual Improvement", "Domain Average"],
      ]

      domains.forEach((domain: Domain) => {
        const domainResult = results[domain.id]
        if (domainResult) {
          detailedData.push([
            domain.name,
            domainResult.people,
            domainResult.process,
            domainResult.tooling,
            domainResult.data,
            domainResult.improvement,
            domainAverages[domain.id] ? domainAverages[domain.id].toFixed(1) : "-",
          ])
        }
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

      // Recommendations Sheet
      const recommendationsData = [
        ["RECOMMENDATIONS"],
        [],
        ["Priority", "Domain", "Current Score", "Target Level", "Key Actions"],
      ]

      const sortedDomains = domains
        .map((domain) => ({
          domain,
          score: domainAverages[domain.id] || 0,
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => a.score - b.score)

      sortedDomains.slice(0, 5).forEach((item, index) => {
        const currentLevel = getMaturityLevel(item.score)
        const targetScore = Math.min(item.score + 1, 5)
        const targetLevel = getMaturityLevel(targetScore)

        recommendationsData.push([
          `Priority ${index + 1}`,
          item.domain.name,
          `${item.score.toFixed(1)} (${currentLevel})`,
          `${targetScore.toFixed(1)} (${targetLevel})`,
          "Implement structured processes, improve documentation, enhance governance",
        ])
      })

      // Maturity Levels Reference Sheet
      const maturityLevelsData = [["MATURITY LEVEL DEFINITIONS"], [], ["Level", "Range", "Description"]]

      maturityLevels.forEach((level) => {
        maturityLevelsData.push([level.name, level.range, level.description])
      })

      // Create workbook
      const wb = XLSX.utils.book_new()

      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData)
      const detailedWs = XLSX.utils.aoa_to_sheet(detailedData)
      const recommendationsWs = XLSX.utils.aoa_to_sheet(recommendationsData)
      const maturityWs = XLSX.utils.aoa_to_sheet(maturityLevelsData)

      XLSX.utils.book_append_sheet(wb, summaryWs, "Executive Summary")
      XLSX.utils.book_append_sheet(wb, detailedWs, "Detailed Scores")
      XLSX.utils.book_append_sheet(wb, recommendationsWs, "Recommendations")
      XLSX.utils.book_append_sheet(wb, maturityWs, "Maturity Levels")

      trackAssessmentDownload("Excel", organizationName, isUS)
      XLSX.writeFile(wb, `${organizationName.replace(/\s+/g, "_")}_IT_Maturity_Assessment_Comprehensive.xlsx`)
    } catch (error) {
      console.error("Error exporting to Excel:", error)
    }
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
          Export Comprehensive PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="h-4 w-4" />
          Export Detailed Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
