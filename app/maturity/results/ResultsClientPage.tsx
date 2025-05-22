"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { calculateDomainAverages, calculateOverallAverage, type AssessmentResult } from "@/lib/assessment-data"

export default function ResultsClientPage() {
  const router = useRouter()
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load assessment results from localStorage
    try {
      if (typeof window !== "undefined") {
        const storedResults = localStorage.getItem("assessment_results")

        if (!storedResults) {
          setError("No assessment results found. Please complete the assessment first.")
          setLoading(false)
          return
        }

        const parsedResults = JSON.parse(storedResults) as AssessmentResult
        setResults(parsedResults)

        // Track view in Google Analytics
        if (window.gtag) {
          window.gtag("event", "view_results", {
            event_category: "Assessment",
            event_label: "Results Page",
          })
        }
      }

      setLoading(false)
    } catch (error) {
      console.error("Error loading assessment results:", error)
      setError("An error occurred while loading your assessment results.")
      setLoading(false)
    }
  }, [])

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

  // Calculate domain averages and overall average
  const domainAverages = calculateDomainAverages(results)
  const overallAverage = calculateOverallAverage(results)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Maturity Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{overallAverage.toFixed(1)}</div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Domain Scores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Object.entries(domainAverages).map(([domain, score]) => (
          <Card key={domain}>
            <CardHeader>
              <CardTitle>{domain}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{score.toFixed(1)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleRetakeAssessment}>
          Retake Assessment
        </Button>
        <Button onClick={() => router.push("/maturity")}>Back to Maturity Dashboard</Button>
      </div>
    </div>
  )
}
