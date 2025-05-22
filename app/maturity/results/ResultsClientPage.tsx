"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MaturitySummary } from "@/components/maturity-summary"
import { DomainRadarChart } from "@/components/domain-radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { ResultsActions } from "@/components/results-actions"
import { MaturityRecommendations } from "@/components/maturity-recommendations"
import { BenchmarkComparison } from "@/components/benchmark-comparison"
import { getAssessmentResults } from "@/lib/assessment-utils"
import type { AssessmentResult } from "@/lib/assessment-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function ResultsClientPage() {
  const router = useRouter()
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

        setResults(assessmentResults)

        // Track view in Google Analytics
        if (window.gtag) {
          try {
            window.gtag("event", "view_results", {
              event_category: "Assessment",
              event_label: "Results Page",
            })
          } catch (trackingError) {
            console.error("Error tracking results view:", trackingError)
          }
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
  if (error || !results) {
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
        <MaturitySummary score={results.overallScore} />
        <DomainRadarChart domainScores={results.domainScores} />
      </div>

      <div className="mb-8">
        <SummaryTable domainScores={results.domainScores} />
      </div>

      <div className="mb-8">
        <MaturityRecommendations recommendations={results.recommendations} />
      </div>

      <div className="mb-8">
        <BenchmarkComparison domainScores={results.domainScores} />
      </div>

      <ResultsActions />
    </div>
  )
}
