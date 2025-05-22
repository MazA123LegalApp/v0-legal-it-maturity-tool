"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MaturitySummary } from "@/components/maturity-summary"
import { DomainRadarChart } from "@/components/domain-radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { ResultsActions } from "@/components/results-actions"
import { getAssessmentResults } from "@/lib/assessment-utils"
import { calculateDomainAverages } from "@/lib/assessment-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { classifyMaturity } from "@/lib/maturity-engine"
import { trackEvent } from "@/lib/tracking-utils"

export default function ResultsClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [summaryData, setSummaryData] = useState(null)
  const [domainScores, setDomainScores] = useState({})

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

        // Use the proper maturity classification function
        const classification = classifyMaturity(assessmentResults)
        setSummaryData(classification)

        // Calculate domain averages for the radar chart and summary table
        const calculatedDomainScores = calculateDomainAverages(assessmentResults)
        setDomainScores(calculatedDomainScores)

        // Track view using our safer tracking utility
        trackEvent("view_results", {
          event_category: "Assessment",
          event_label: "Results Page",
          overall_score: classification.overallScore,
          maturity_level: classification.overallBand,
        })
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
