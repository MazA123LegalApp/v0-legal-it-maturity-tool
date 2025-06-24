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
import { redirect } from "next/navigation"

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
  redirect("/maturity/domain-results")

  const [results, setResults] = useState<AssessmentResult>(getEmptyResults())
  const [organizationName, setOrganizationName] = useState<string>("Your Organization")
  const [overallScore, setOverallScore] = useState<number>(0)
  const [domainAverages, setDomainAverages] = useState<Record<string, number>>({})
  const [dimensionAverages, setDimensionAverages] = useState<Record<string, number>>({})
  const [organizationSize, setOrganizationSize] = useState<string>("mid-size")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load results from localStorage
    try {
      if (typeof window !== "undefined") {
        const savedResults = localStorage.getItem("assessmentResults")
        if (savedResults) {
          const parsedResults = JSON.parse(savedResults)
          setResults(parsedResults)

          // Calculate scores
          const domainAvgs = calculateDomainAverages(parsedResults)
          const dimensionAvgs = calculateDimensionAverages(parsedResults)
          const overall = calculateOverallAverage(parsedResults)

          setDomainAverages(domainAvgs)
          setDimensionAverages(dimensionAvgs)
          setOverallScore(overall)
        }

        const savedOrgName = localStorage.getItem("organizationName")
        if (savedOrgName) {
          setOrganizationName(savedOrgName)
        }

        // Get size from URL parameters or localStorage
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search)
          const size = params.get("size")
          if (size) {
            setOrganizationSize(size)
          } else {
            const savedSize = localStorage.getItem("organizationSize")
            if (savedSize) {
              setOrganizationSize(savedSize)
            }
          }
        }
      }
    } catch (loadError) {
      console.error("Error loading saved data:", loadError)
      setError("There was an error loading your saved assessment data.")
    }
  }, [])

  // Function to create domain-specific radar data
  const getDomainRadarData = (domainId: string) => {
    const dimensionData = Object.keys(dimensions).map((dimension) => ({
      dimension: dimensions[dimension as Dimension].name.split(" ")[0],
      fullName: dimensions[dimension as Dimension].name,
      value: results[domainId][dimension as Dimension] || 0,
    }))
    return dimensionData
  }

  // Function to create overall radar data
  const getOverallRadarData = () => {
    return domains.map((domain) => ({
      domain: domain.name.split(" ")[0],
      fullName: domain.name,
      value: domainAverages[domain.id] || 0,
    }))
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{payload[0].payload.fullName || payload[0].payload.dimension}</p>
          <p className="text-sm">
            Maturity Score: <span className="font-medium">{payload[0].value.toFixed(1)}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Domain-Specific Results</h1>
          <p className="text-muted-foreground">Detailed breakdown of maturity scores by domain and dimension</p>
        </div>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 border-orange-200 hover:bg-orange-100">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/results">
            <Button variant="outline" size="sm" className="gap-2 border-orange-200 hover:bg-orange-100">
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Button>
          </Link>
          <ExportUtils results={results} organizationName={organizationName} />
        </div>
      </div>

      {/* Overall Maturity Card */}
      <Card className={`mb-8 ${getMaturityBgColor(overallScore)}`}>
        <CardHeader>
          <CardTitle>Overall Maturity Assessment</CardTitle>
          <CardDescription>
            Organization: {organizationName} | Assessment Date: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-4xl font-bold ${getMaturityColor(overallScore)}`}>
                  {overallScore.toFixed(1)}
                </span>
                <span className="text-lg">/ 5.0</span>
                <span className={`text-lg ml-2 ${getMaturityColor(overallScore)}`}>
                  {getMaturityLevel(overallScore)}
                </span>
              </div>

              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">People & Organization</span>
                    <span className={`text-sm font-medium ${getMaturityColor(dimensionAverages.people || 0)}`}>
                      {dimensionAverages.people ? dimensionAverages.people.toFixed(1) : "-"}
                    </span>
                  </div>
                  <Progress value={(dimensionAverages.people || 0) * 20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Process</span>
                    <span className={`text-sm font-medium ${getMaturityColor(dimensionAverages.process || 0)}`}>
                      {dimensionAverages.process ? dimensionAverages.process.toFixed(1) : "-"}
                    </span>
                  </div>
                  <Progress value={(dimensionAverages.process || 0) * 20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Tooling</span>
                    <span className={`text-sm font-medium ${getMaturityColor(dimensionAverages.tooling || 0)}`}>
                      {dimensionAverages.tooling ? dimensionAverages.tooling.toFixed(1) : "-"}
                    </span>
                  </div>
                  <Progress value={(dimensionAverages.tooling || 0) * 20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Data</span>
                    <span className={`text-sm font-medium ${getMaturityColor(dimensionAverages.data || 0)}`}>
                      {dimensionAverages.data ? dimensionAverages.data.toFixed(1) : "-"}
                    </span>
                  </div>
                  <Progress value={(dimensionAverages.data || 0) * 20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Continual Improvement</span>
                    <span className={`text-sm font-medium ${getMaturityColor(dimensionAverages.improvement || 0)}`}>
                      {dimensionAverages.improvement ? dimensionAverages.improvement.toFixed(1) : "-"}
                    </span>
                  </div>
                  <Progress value={(dimensionAverages.improvement || 0) * 20} className="h-2" />
                </div>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getOverallRadarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="domain" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
                  <Radar
                    name="Maturity Score"
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
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Comparison */}
      <div className="mb-8">
        <BenchmarkComparison results={results} organizationSize={organizationSize} />
      </div>

      {/* Domain-specific tabs */}
      <Tabs defaultValue={domains[0].id} className="mb-8">
        <TabsList className="flex flex-wrap h-auto">
          {domains.map((domain) => (
            <TabsTrigger
              key={domain.id}
              value={domain.id}
              className={`${getMaturityColor(domainAverages[domain.id] || 0)} data-[state=active]:border-b-2 data-[state=active]:border-orange-500`}
            >
              {domain.name.split(" ")[0]}
              <span className="ml-2 text-xs">
                {domainAverages[domain.id] ? domainAverages[domain.id].toFixed(1) : "-"}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {domains.map((domain) => (
          <TabsContent key={domain.id} value={domain.id} className="mt-6">
            <Card>
              <CardHeader className={getMaturityBgColor(domainAverages[domain.id] || 0)}>
                <CardTitle>{domain.name}</CardTitle>
                <CardDescription>{domain.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className={`text-3xl font-bold ${getMaturityColor(domainAverages[domain.id] || 0)}`}>
                        {domainAverages[domain.id] ? domainAverages[domain.id].toFixed(1) : "-"}
                      </span>
                      <span className="text-lg">/ 5.0</span>
                      <span className={`text-lg ml-2 ${getMaturityColor(domainAverages[domain.id] || 0)}`}>
                        {getMaturityLevel(domainAverages[domain.id] || 0)}
                      </span>
                    </div>

                    <div className="space-y-4 mt-6">
                      {Object.keys(dimensions).map((dimension) => (
                        <div key={dimension}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{dimensions[dimension as Dimension].name}</span>
                            <span
                              className={`text-sm font-medium ${getMaturityColor(results[domain.id][dimension as Dimension] || 0)}`}
                            >
                              {results[domain.id][dimension as Dimension] || "-"}
                            </span>
                          </div>
                          <Progress value={(results[domain.id][dimension as Dimension] || 0) * 20} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium mb-2">Key Findings</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {domainAverages[domain.id] < 2 && (
                          <>
                            <li>This domain is at an initial/ad-hoc stage and requires significant attention</li>
                            <li>Focus on establishing basic processes and defining roles</li>
                          </>
                        )}
                        {domainAverages[domain.id] >= 2 && domainAverages[domain.id] < 3 && (
                          <>
                            <li>This domain has basic processes but lacks consistency</li>
                            <li>Work on standardizing approaches and improving documentation</li>
                          </>
                        )}
                        {domainAverages[domain.id] >= 3 && domainAverages[domain.id] < 4 && (
                          <>
                            <li>This domain has defined processes but lacks measurement</li>
                            <li>Focus on implementing metrics and quantitative management</li>
                          </>
                        )}
                        {domainAverages[domain.id] >= 4 && domainAverages[domain.id] < 4.5 && (
                          <>
                            <li>This domain is well-managed with quantitative objectives</li>
                            <li>Work on continuous improvement and optimization</li>
                          </>
                        )}
                        {domainAverages[domain.id] >= 4.5 && (
                          <>
                            <li>This domain is at an optimized level with continuous improvement</li>
                            <li>Focus on innovation and maintaining excellence</li>
                          </>
                        )}

                        {/* Dimension-specific findings */}
                        {results[domain.id].people < results[domain.id].process &&
                          results[domain.id].people < results[domain.id].tooling && (
                            <li>People & Organization dimension needs attention compared to other dimensions</li>
                          )}
                        {results[domain.id].process < results[domain.id].people &&
                          results[domain.id].process < results[domain.id].tooling && (
                            <li>Process dimension needs attention compared to other dimensions</li>
                          )}
                        {results[domain.id].tooling < results[domain.id].people &&
                          results[domain.id].tooling < results[domain.id].process && (
                            <li>Tooling dimension needs attention compared to other dimensions</li>
                          )}
                        {results[domain.id].data < results[domain.id].people &&
                          results[domain.id].data < results[domain.id].process && (
                            <li>Data dimension needs attention compared to other dimensions</li>
                          )}
                        {results[domain.id].improvement < results[domain.id].people &&
                          results[domain.id].improvement < results[domain.id].process && (
                            <li>Continual Improvement dimension needs attention compared to other dimensions</li>
                          )}
                      </ul>
                    </div>
                  </div>

                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getDomainRadarData(domain.id)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="dimension" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                        <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
                        <Radar
                          name="Dimension Score"
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/results">
          <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-100">
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Button>
        </Link>
      </div>
    </div>
  )
}
