"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MaturitySummary } from "@/components/maturity-summary"
import { DomainRadarChart } from "@/components/domain-radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { ResultsActions } from "@/components/results-actions"
import { getAssessmentResults } from "@/lib/assessment-utils"
import { calculateDomainAverages, calculateOverallAverage, getMaturityLevel, domains } from "@/lib/assessment-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/tracking-utils"

export default function ResultsClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summaryData, setSummaryData] = useState<any>(null)
  const [domainScores, setDomainScores] = useState<Record<string, number>>({})

  useEffect(() => {
    // Load assessment results from localStorage
    try {
      if (typeof window !== "undefined") {
        const assessmentResults = getAssessmentResults()

        if (!assessmentResults) {
          setError("No assessment results found. Please complete the assessment first.")
          setLoading(false)
          return
        }

        console.log("Assessment results loaded:", assessmentResults) // Debug log

        // Calculate domain averages
        const calculatedDomainScores = calculateDomainAverages(assessmentResults)
        console.log("Calculated domain scores:", calculatedDomainScores) // Debug log
        setDomainScores(calculatedDomainScores)

        // Calculate overall score
        const overallScore = calculateOverallAverage(assessmentResults)

        // Get maturity band
        const overallBand = getMaturityLevel(overallScore)

        // Find weakest and strongest domains
        const domainEntries = Object.entries(calculatedDomainScores)
          .filter(([_, score]) => score > 0)
          .sort((a, b) => a[1] - b[1])

        const weakestDomains = domainEntries.slice(0, 3).map(([id]) => {
          const domain = domains.find((d) => d.id === id)
          return domain ? domain.name : id
        })

        const strongestDomains = domainEntries
          .slice(-3)
          .reverse()
          .map(([id]) => {
            const domain = domains.find((d) => d.id === id)
            return domain ? domain.name : id
          })

        // Create summary data object
        const summary = {
          overallScore,
          overallBand,
          weakestDomains,
          strongestDomains,
          domainScores: calculatedDomainScores,
        }

        setSummaryData(summary)

        // Track view safely
        try {
          trackEvent("view_results", {
            event_category: "Assessment",
            event_label: "Results Page",
            overall_score: overallScore,
            maturity_level: overallBand,
          })
        } catch (trackingError) {
          console.error("Error tracking results view:", trackingError)
        }
      }

      setLoading(false)
    } catch (error) {
      console.error("Error loading assessment results:", error)
      setError("An error occurred while loading your assessment results.")
      setLoading(false)
    }
  }, [router])

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>
        <p>Loading your results...</p>
      </div>
    )
  }

  // Show error state
  if (error || !summaryData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "No assessment results found."}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push("/maturity/assessment")}>Take Assessment</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MaturitySummary classification={summaryData} />
        <DomainRadarChart domainScores={domainScores} />
      </div>

      <div className="mb-8">
        <SummaryTable domainScores={domainScores} />
      </div>

      <ResultsActions />
    </div>
  )
}
