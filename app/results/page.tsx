"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit3, BarChart4 } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportUtils } from "@/components/export-utils"
import { MaturityRadarChart } from "@/components/radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  type AssessmentResult,
  type Dimension,
  calculateOverallAverage,
  getEmptyResults,
  getMaturityBgColor,
  getMaturityColor,
  getMaturityLevel,
  calculateDomainAverages,
  domains,
  dimensions,
} from "@/lib/assessment-data"
import { BenchmarkComparison } from "@/components/benchmark-comparison"

export default function ResultsPage() {
  const [results, setResults] = useState<AssessmentResult>(getEmptyResults())
  const [organizationName, setOrganizationName] = useState<string>("Your Organization")
  const [organizationSize, setOrganizationSize] = useState<string>("mid-size")
  const [overallScore, setOverallScore] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load results from localStorage
    try {
      if (typeof window !== "undefined") {
        const savedResults = localStorage.getItem("assessmentResults")
        if (savedResults) {
          const parsedResults = JSON.parse(savedResults)
          setResults(parsedResults)
          setOverallScore(calculateOverallAverage(parsedResults))
        }

        const savedOrgName = localStorage.getItem("organizationName")
        if (savedOrgName) {
          setOrganizationName(savedOrgName)
        }

        const savedOrgSize = localStorage.getItem("organizationSize")
        if (savedOrgSize) {
          setOrganizationSize(savedOrgSize)
        }
      }
    } catch (loadError) {
      console.error("Error loading saved data:", loadError)
      setError("There was an error loading your saved assessment data.")
    }
  }, [])

  const handleOrganizationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newName = e.target.value
      setOrganizationName(newName)
      if (typeof window !== "undefined") {
        localStorage.setItem("organizationName", newName)
      }
    } catch (error) {
      console.error("Error saving organization name:", error)
    }
  }

  // Simple function to create domain-specific radar chart data
  const getDomainChartData = (domainId: string) => {
    return Object.keys(dimensions).map((dimension) => {
      const score = results[domainId]?.[dimension as Dimension] || 0
      return {
        dimension: dimensions[dimension as Dimension].name.split(" ")[0],
        fullName: dimensions[dimension as Dimension].name,
        value: score,
      }
    })
  }

  // Calculate domain averages
  const domainAverages = calculateDomainAverages(results)

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Assessment Results</h1>
          <p className="text-muted-foreground">
            Review your IT maturity assessment results and export them for further analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/assessment">
            <Button variant="outline" className="gap-2">
              <Edit3 className="h-4 w-4" />
              Edit Responses
            </Button>
          </Link>
          <ExportUtils results={results} organizationName={organizationName} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Organization</CardTitle>
            <CardDescription>Enter your organization name and size for reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="organization">Organization Name</Label>
                <Input
                  id="organization"
                  value={organizationName}
                  onChange={handleOrganizationNameChange}
                  placeholder="Enter organization name"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="organizationSize">Organization Size</Label>
                <Select
                  value={organizationSize}
                  onValueChange={(value) => {
                    try {
                      setOrganizationSize(value)
                      localStorage.setItem("organizationSize", value)
                    } catch (error) {
                      console.error("Error saving organization size:", error)
                    }
                  }}
                >
                  <SelectTrigger id="organizationSize">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-50 employees)</SelectItem>
                    <SelectItem value="mid-size">Mid-size (51-500 employees)</SelectItem>
                    <SelectItem value="large">Large (500+ employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={getMaturityBgColor(overallScore)}>
          <CardHeader>
            <CardTitle className="text-lg">Overall Maturity Score</CardTitle>
            <CardDescription>Average score across all domains and dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold ${getMaturityColor(overallScore)}`}>{overallScore.toFixed(1)}</span>
              <span className="text-lg">/ 5.0</span>
            </div>
            <p className={`text-lg mt-2 ${getMaturityColor(overallScore)}`}>{getMaturityLevel(overallScore)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assessment Date</CardTitle>
            <CardDescription>When this assessment was completed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{new Date().toLocaleDateString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Results are stored locally in your browser</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart" className="mb-8">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="chart">Radar Chart</TabsTrigger>
          <TabsTrigger value="table">Summary Table</TabsTrigger>
        </TabsList>
        <div className="mt-2 flex justify-end">
          <Link href={`/domain-results?size=${organizationSize}`}>
            <Button variant="outline" size="sm" className="gap-2 border-orange-200 hover:bg-orange-100">
              <BarChart4 className="h-4 w-4" />
              View Detailed Domain Analysis
            </Button>
          </Link>
        </div>
        <TabsContent value="chart" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maturity Radar Chart</CardTitle>
              <CardDescription>Visualize your maturity levels across all domains</CardDescription>
            </CardHeader>
            <CardContent>
              <MaturityRadarChart results={results} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="table" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maturity Summary Table</CardTitle>
              <CardDescription>Detailed view of scores across all domains and dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <SummaryTable results={results} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Benchmark Comparison */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sector Benchmarking</h2>
        <BenchmarkComparison results={results} organizationSize={organizationSize} />
      </div>

      {/* Domain-specific Radar Charts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Domain-Specific Maturity</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => {
            const domainScore = domainAverages[domain.id] || 0
            const chartData = getDomainChartData(domain.id)

            return (
              <Card key={domain.id} className={getMaturityBgColor(domainScore)}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between">
                    <span>{domain.name}</span>
                    <span className={getMaturityColor(domainScore)}>{domainScore.toFixed(1)}</span>
                  </CardTitle>
                  <CardDescription>{getMaturityLevel(domainScore)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="dimension" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                        <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
                        <Radar
                          name={domain.name}
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                        />
                        <Tooltip />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Identify Improvement Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Focus on domains and dimensions with the lowest scores to create targeted improvement plans.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Share Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Export and share these results with stakeholders to align on improvement priorities.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reassess Regularly</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Plan to reassess in 6-12 months to track progress and identify new improvement opportunities.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
