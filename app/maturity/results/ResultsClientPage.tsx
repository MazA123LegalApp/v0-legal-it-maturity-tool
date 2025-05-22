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

export default function ResultsClientPage() {
  const router = useRouter()
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load assessment results from localStorage
    const assessmentResults = getAssessmentResults()

    if (!assessmentResults) {
      // Redirect to assessment page if no results are found
      router.push("/maturity/assessment")
      return
    }

    setResults(assessmentResults)
    setLoading(false)
  }, [router])

  // Show loading state or empty state during SSR/build
  if (loading || !results) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>
        <p>Loading results or no assessment data available...</p>
      </div>
    )
  }

  const { overallScore, domainScores, recommendations } = results

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MaturitySummary score={overallScore} />
        <DomainRadarChart domainScores={domainScores} />
      </div>

      <div className="mb-8">
        <SummaryTable domainScores={domainScores} />
      </div>

      <div className="mb-8">
        <MaturityRecommendations recommendations={recommendations} />
      </div>

      <div className="mb-8">
        <BenchmarkComparison domainScores={domainScores} />
      </div>

      <ResultsActions />
    </div>
  )
}
