"use client"
import { MaturitySummary } from "@/components/maturity-summary"
import { ResultsActions } from "@/components/results-actions"
import { BenchmarkComparison } from "@/components/benchmark-comparison"
import { DomainRadarChart } from "@/components/domain-radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { MaturityRecommendations } from "@/components/maturity-recommendations"

export default function ResultsClientPage({
  assessmentResults,
  benchmarkData,
}: {
  assessmentResults: any
  benchmarkData: any
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Maturity Assessment Results</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <MaturitySummary results={assessmentResults} />
        </div>
        <div>
          <DomainRadarChart results={assessmentResults} />
        </div>
      </div>

      <div className="mb-8">
        <SummaryTable results={assessmentResults} />
      </div>

      {benchmarkData && (
        <div className="mb-8">
          <BenchmarkComparison results={assessmentResults} benchmarkData={benchmarkData} />
        </div>
      )}

      <div className="mb-8">
        <MaturityRecommendations results={assessmentResults} />
      </div>

      <ResultsActions />
    </div>
  )
}
