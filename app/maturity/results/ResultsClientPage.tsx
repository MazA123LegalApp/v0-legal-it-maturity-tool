"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MaturitySummary } from "@/components/maturity-summary"
import { DomainRadarChart } from "@/components/domain-radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { ResultsActions } from "@/components/results-actions"
import { calculateDomainAverages } from "@/lib/assessment-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { classifyMaturity } from "@/lib/maturity-engine"
import { trackEvent } from "@/lib/tracking-utils"
import type { AssessmentResult } from "@/lib/assessment-data"

export default function ResultsClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summaryData, setSummaryData] = useState<any>(null)
  const [domainScores, setDomainScores] = useState<Record<string, number>>({})

  useEffect(() => {
    async function loadResults() {
      try {
        const sessionId = localStorage.getItem("session_id")
        if (!sessionId) {
          setError("No session found. Please complete the assessment first.")
          setLoading(false)
          return
        }

        const res = await fetch("/api/load-assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        })

        const { results } = await res.json()

        if (!results) {
          setError("No assessment results found. Please complete the assessment first.")
          setLoading(false)
          return
        }

        const classification = classifyMaturity(results as AssessmentResult)
        setSummaryData(classification)

        const calculatedDomainScores = calculateDomainAverages(results)
        setDomainScores(calculatedDomainScores)

        trackEvent("view_results", {
          event_category: "Assessment",
          event_label: "Results Page",
          overall_score: classification.overallScore,
          maturity_level: classification.overallBand,
        })
      } catch (err) {
        console.error("Error loading assessment results:", err)
        setError("An error occurred while loading your assessment results.")
      } finally {
        setLoading(false)
      }
    }

    loadResults()
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
        <SummaryTable results={summaryData.domainScores} />
      </div>

      <ResultsActions />
    </div>
  )
}
