"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MaturitySummary } from "@/components/maturity-summary"
import { DomainRadarChart } from "@/components/domain-radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { ResultsActions } from "@/components/results-actions"
import { ComplianceSnapshot } from "@/components/compliance-snapshot"
import { OMBHeatmap } from "@/components/omb-heatmap"
import { NextStepsGenerator } from "@/components/next-steps-generator"
import { getAssessmentResults } from "@/lib/assessment-utils"
import { calculateDomainAverages, calculateOverallAverage, getMaturityLevel, domains } from "@/lib/assessment-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trackEvent } from "@/lib/tracking-utils"
import { AlertTriangle, TrendingUp, Target, BarChart3 } from "lucide-react"

export default function ResultsClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summaryData, setSummaryData] = useState<any>(null)
  const [domainScores, setDomainScores] = useState<Record<string, number>>({})
  const [showControlMatrix, setShowControlMatrix] = useState(false)
  const [controlMatrixFilter, setControlMatrixFilter] = useState<string>("")

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

  const handleViewMatrix = (filter?: string) => {
    setControlMatrixFilter(filter || "")
    setShowControlMatrix(true)
    // Scroll to control matrix section
    setTimeout(() => {
      document.getElementById("control-matrix-section")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
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

  // Get low-scoring domains (< 3.0) for control matrix filtering
  const lowScoreDomains = Object.entries(domainScores)
    .filter(([_, score]) => score > 0 && score < 3.0)
    .map(([id]) => {
      const domain = domains.find((d) => d.id === id)
      return domain ? domain.name : id
    })

  const hasLowScores = lowScoreDomains.length > 0
  const criticalDomainCount = Object.values(domainScores).filter((score) => score > 0 && score < 2.0).length

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>

      {/* Next Steps Banner */}
      {hasLowScores && (
        <Alert
          className={`mb-6 ${criticalDomainCount > 0 ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}
        >
          <AlertTriangle className={`h-4 w-4 ${criticalDomainCount > 0 ? "text-red-600" : "text-amber-600"}`} />
          <AlertDescription className={criticalDomainCount > 0 ? "text-red-800" : "text-amber-800"}>
            <div className="flex items-center justify-between">
              <div>
                <strong>Action Required:</strong> You have {lowScoreDomains.length} domains scoring below 3.0.
                {criticalDomainCount > 0 && (
                  <span className="block mt-1">⚠️ {criticalDomainCount} domains are in critical state (below 2.0)</span>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={() => handleViewMatrix("not_started")} className="ml-4">
                View Action Plan →
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Results Tabs */}
      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="next-steps" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Next Steps
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Results */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MaturitySummary classification={summaryData} />
                <DomainRadarChart domainScores={domainScores} />
              </div>

              <SummaryTable domainScores={domainScores} />
            </div>

            {/* Sidebar with Compliance Info */}
            <div className="space-y-6">
              <ComplianceSnapshot onViewMatrix={handleViewMatrix} />

              <OMBHeatmap />

              {hasLowScores && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-700">
                      <TrendingUp className="h-5 w-5" />
                      Priority Actions
                    </CardTitle>
                    <CardDescription>Focus areas based on your assessment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {lowScoreDomains.slice(0, 3).map((domain, index) => {
                      const domainId = domains.find((d) => d.name === domain)?.id
                      const score = domainId ? domainScores[domainId] : 0
                      return (
                        <div key={domain} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{domain}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={score < 2.0 ? "destructive" : "secondary"} className="text-xs">
                                {score.toFixed(1)}/5.0
                              </Badge>
                              {score < 2.0 && <span className="text-xs text-red-600">Critical</span>}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleViewMatrix("not_started")}>
                            Fix
                          </Button>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="next-steps">
          <NextStepsGenerator domainScores={domainScores} onViewControlMatrix={handleViewMatrix} />
        </TabsContent>

        <TabsContent value="compliance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComplianceSnapshot onViewMatrix={handleViewMatrix} />
            <OMBHeatmap />
          </div>
        </TabsContent>

        <TabsContent value="export">
          <ResultsActions />
        </TabsContent>
      </Tabs>
    </div>
  )
}
