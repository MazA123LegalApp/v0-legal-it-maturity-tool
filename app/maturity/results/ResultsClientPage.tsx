"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MaturitySummary } from "@/components/maturity-summary"
import { DomainRadarChart } from "@/components/domain-radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { ResultsActions } from "@/components/results-actions"
import { calculateDomainAverages } from "@/lib/assessment-data"
import { classifyMaturity } from "@/lib/maturity-engine"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { AssessmentResult } from "@/lib/assessment-data"

const STORAGE_KEY = "assessment_results"

export default function ResultsClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summaryData, setSummaryData] = useState<any>(null)
  const [domainScores, setDomainScores] = useState<Record<string, number>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        setError("No assessment results found. Please complete the assessment first.")
        return
      }

      const results: AssessmentResult = JSON.parse(raw)
      const classification = classifyMaturity(results)
      const domainAverages = calculateDomainAverages(results)

      setSummaryData(classification)
      setDomainScores(domainAverages)
    } catch (err) {
      console.error("Error loading results:", err)
      setError("An error occurred while loading your results.")
    } finally {
      setLoading(false)
    }
  }, [])

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
          <AlertDescription>{error}</AlertDescription>
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
