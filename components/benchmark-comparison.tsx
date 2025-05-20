"use client"

import { useEffect, useState } from "react"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, BarChart3 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type AssessmentResult, calculateDomainAverages, domains } from "@/lib/assessment-data"

interface BenchmarkComparisonProps {
  results: AssessmentResult
  organizationSize?: string
}

export function BenchmarkComparison({ results, organizationSize = "all" }: BenchmarkComparisonProps) {
  const [comparisons, setComparisons] = useState<
    Record<
      string,
      {
        difference: number
        status: "above" | "below" | "average"
        text: string
      }
    >
  >({})

  useEffect(() => {
    // Calculate user's domain averages
    const userDomainAverages = calculateDomainAverages(results)

    // Hardcoded benchmark data - 3.2 for all domains
    const BENCHMARK_SCORE = 3.2
    const newComparisons = {}

    // Generate comparisons directly without any API calls
    domains.forEach((domain) => {
      const userScore = userDomainAverages[domain.id] || 0

      if (userScore === 0) return // Skip domains with no score

      const difference = Number.parseFloat((userScore - BENCHMARK_SCORE).toFixed(1))
      let status = "average"
      let text = ""

      if (difference >= 0.5) {
        status = "above"
        text = `Compared to industry average, your maturity in ${domain.name} is above average.`
      } else if (difference <= -0.5) {
        status = "below"
        text = `Compared to industry average, your maturity in ${domain.name} is below average.`
      } else {
        status = "average"
        text = `Compared to industry average, your maturity in ${domain.name} is about average.`
      }

      newComparisons[domain.id] = { difference, status, text }
    })

    setComparisons(newComparisons)
  }, [results])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Sector Benchmarking
        </CardTitle>
        <CardDescription>Comparing your scores against industry average of 3.2</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(comparisons).map(([domainId, comparison]) => {
            const domain = domains.find((d) => d.id === domainId)
            if (!domain) return null

            return (
              <div key={domainId} className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">{domain.name}</h3>
                  <div className="flex items-center gap-1">
                    {comparison.status === "above" && (
                      <span className="text-green-600 flex items-center">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />+{comparison.difference}
                      </span>
                    )}
                    {comparison.status === "below" && (
                      <span className="text-red-600 flex items-center">
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                        {comparison.difference}
                      </span>
                    )}
                    {comparison.status === "average" && (
                      <span className="text-amber-600 flex items-center">
                        <ArrowRightIcon className="h-4 w-4 mr-1" />
                        {comparison.difference > 0 ? `+${comparison.difference}` : comparison.difference}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{comparison.text}</p>
              </div>
            )
          })}

          <div className="text-xs text-muted-foreground mt-4">Last updated: {new Date().toLocaleDateString()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
