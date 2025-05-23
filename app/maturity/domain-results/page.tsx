"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportUtils } from "@/components/export-utils"
import {
  type AssessmentResult,
  type Dimension,
  calculateDimensionAverages,
  calculateDomainAverages,
  calculateOverallAverage,
  dimensions,
  domains,
  getEmptyResults,
  getMaturityBgColor,
  getMaturityColor,
  getMaturityLevel,
} from "@/lib/assessment-data"
import { BenchmarkComparison } from "@/components/benchmark-comparison"

export default function DomainResultsPage() {
  const [results, setResults] = useState<AssessmentResult>(getEmptyResults())
  const [organizationName, setOrganizationName] = useState<string>("Your Organization")
  const [overallScore, setOverallScore] = useState<number>(0)
  const [domainAverages, setDomainAverages] = useState<Record<string, number>>({})
  const [dimensionAverages, setDimensionAverages] = useState<Record<string, number>>({})
  const [organizationSize, setOrganizationSize] = useState<string>("mid-size")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedResults = localStorage.getItem("assessmentResults")
        if (savedResults) {
          const parsed = JSON.parse(savedResults)
          setResults(parsed)
          setDomainAverages(calculateDomainAverages(parsed))
          setDimensionAverages(calculateDimensionAverages(parsed))
          setOverallScore(calculateOverallAverage(parsed))
        }

        const name = localStorage.getItem("organizationName")
        if (name) setOrganizationName(name)

        const size = new URLSearchParams(window.location.search).get("size") ||
          localStorage.getItem("organizationSize")
        if (size) setOrganizationSize(size)
      }
    } catch (err) {
      console.error("Error loading domain results:", err)
      setError("Unable to load your assessment results.")
    }
  }, [])

  const getDomainRadarData = (domainId: string) =>
    Object.keys(dimensions).map((dimension) => ({
      dimension: dimensions[dimension as Dimension].name.split(" ")[0],
      fullName: dimensions[dimension as Dimension].name,
      value: results[domainId]?.[dimension as Dimension] || 0,
    }))

  const getOverallRadarData = () =>
    domains.map((domain) => ({
      domain: domain.name.split(" ")[0],
      fullName: domain.name,
      value: domainAverages[domain.id] || 0,
    }))

  const CustomTooltip = ({ active, payload }: any) =>
    active && payload?.length ? (
      <div className="bg-background border rounded-md shadow-md p-3">
        <p className="font-medium">{payload[0].payload.fullName}</p>
        <p className="text-sm">
          Score: <span className="font-medium">{payload[0].value.toFixed(1)}</span>
        </p>
      </div>
    ) : null

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Domain Analysis</h1>
          <p className="text-muted-foreground">
            See a domain-by-domain breakdown of your maturity scores and key insights.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/maturity/results">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Button>
          </Link>
          <ExportUtils results={results} organizationName={organizationName} />
        </div>
      </div>

      <Card className={getMaturityBgColor(overallScore)}>
        <CardHeader>
          <CardTitle>Overall Score</CardTitle>
          <CardDescription>Organization: {organizationName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-3xl font-bold">
            <span className={getMaturityColor(overallScore)}>{overallScore.toFixed(1)}</span>
            <span className="text-lg">/ 5.0</span>
            <span className={getMaturityColor(overallScore)}>{getMaturityLevel(overallScore)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 mb-6">
        <BenchmarkComparison results={results} organizationSize={organizationSize} />
      </div>

      <Tabs defaultValue={domains[0].id}>
        <TabsList className="flex flex-wrap">
          {domains.map((domain) => (
            <TabsTrigger key={domain.id} value={domain.id}>
              {domain.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {domains.map((domain) => {
          const score = domainAverages[domain.id] || 0
          return (
            <TabsContent key={domain.id} value={domain.id}>
              <Card className="mt-6">
                <CardHeader className={getMaturityBgColor(score)}>
                  <CardTitle>{domain.name}</CardTitle>
                  <CardDescription>{domain.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-4 text-2xl font-bold">
                    <span className={getMaturityColor(score)}>{score.toFixed(1)}</span>
                    <span className="text-lg">/ 5.0</span>
                    <span className={getMaturityColor(score)}>{getMaturityLevel(score)}</span>
                  </div>

                  <div className="h-[300px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getDomainRadarData(domain.id)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="dimension" />
                        <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
                        <Radar
                          name={domain.name}
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <Separator />
                  <h3 className="text-lg font-medium mt-6 mb-2">Key Takeaways</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {score < 2 && <li>This domain is in early maturity. Prioritize foundational processes.</li>}
                    {score >= 2 && score < 3 && <li>This domain is developing. Consistency and standardization are needed.</li>}
                    {score >= 3 && score < 4 && <li>This domain is established. Focus on measurement and optimization.</li>}
                    {score >= 4 && <li>This domain is mature. Aim for continuous improvement and innovation.</li>}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
