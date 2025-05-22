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
  const [error, setError] = useState<string | null>(null)
  const [summaryData, setSummaryData] = useState<any>(null)
  const [domainScores, setDomainScores] = useState<any>({})

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const assessmentResults = getAssessmentResults()

        if (
          !assessmentResults ||
          typeof assessmentResults !== "object" ||
          Object.keys(assessmentResults).length === 0
        ) {
          setError("No assessment results found. Please complete the assessment first.")
          setLoading(false)
          return
        }

        let classification = null
        let calculatedDomainScores = null

        try {
          classification = classifyMaturity(assessmentResults)
          calculatedDomainScores = calculateDomainAverages(assessmentResults)
        } catch (processingError) {
          console.error("Error classifying maturity or calculating scores:", processingError)
          setError("Saved results are invalid or incomplete. Please retake the assessment.")
          setLoading(false)
          return
        }

        setSummaryData(classification)
        setDomainScores(calculatedDomainScores)

        try {
          trackEvent("view_results", {
            event_category: "Assessment",
            event_label: "Results Page",
            overall_score: classification.overallScore,
            maturity_level: classification.overallBand,
          })
        } catch (trackingError) {
          console.warn("Tracking failed:", trackingError)
        }
      }

      setLoading(false)
    } catch (error) {
      console.error("Unexpected error loading assessment results:", error)
      setError("An unexpected error occurred while loading your results.")
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>
        <p>Loading your results...</p>
      </div>
    )
  }

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
