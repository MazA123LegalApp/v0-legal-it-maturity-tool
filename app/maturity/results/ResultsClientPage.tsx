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
      const assessmentResults = getAssessmentResults()

      if (!assessmentResults) {
        setError("No assessment results found. Please complete the assessment first.")
        setLoading(false)
        return
      }

      // Validate the structure of the results
      if (!validateResults(assessmentResults)) {
        setError("Assessment results are incomplete or invalid. Please retake the assessment.")
        setLoading(false)
        return
      }

      setResults(assessmentResults)
      setLoading(false)
    } catch (error) {
      console.error("Error loading assessment results:", error)
      setError("An error occurred while loading your assessment results. Please try again.")
      setLoading(false)
    }
  }, [router])

  // Validate the structure of the assessment results
  const validateResults = (results: AssessmentResult): boolean => {
    if (!results || typeof results !== "object") return false

    // Check if there are any domains in the results
    if (Object.keys(results).length === 0) return false

    // Check if at least one domain has valid scores
    return Object.values(results).some((domainScores) => {
      if (!domainScores || typeof domainScores !== "object") return false
      return Object.values(domainScores).some((score) => typeof score === "number" && score > 0)
    })
  }

  // Handle retaking the assessment
  const handleRetakeAssessment = () => {
    router.push("/maturity/assessment")
  }

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
        <Button onClick={handleRetakeAssessment}>Take Assessment</Button>
      </div>
    )
  }

  // Calculate overall score and domain scores
  const domainScores = Object.entries(results).reduce(
    (acc, [domain, scores]) => {
      const dimensionValues = Object.values(scores).filter((score) => score > 0)
      if (dimensionValues.length === 0) return acc

      const average = dimensionValues.reduce((sum, score) => sum + score, 0) / dimensionValues.length
      acc[domain] = Number.parseFloat(average.toFixed(1))
      return acc
    },
    {} as Record<string, number>,
  )

  const overallScore =
    Object.values(domainScores).length > 0
      ? Number.parseFloat(
          (
            Object.values(domainScores).reduce((sum, score) => sum + score, 0) / Object.values(domainScores).length
          ).toFixed(1),
        )
      : 0

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
        <MaturityRecommendations domainScores={domainScores} />
      </div>

      <div className="mb-8">
        <BenchmarkComparison domainScores={domainScores} />
      </div>

      <ResultsActions />
    </div>
  )
}
