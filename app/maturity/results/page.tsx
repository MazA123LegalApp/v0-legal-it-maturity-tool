"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit3, BarChart4, Home } from "lucide-react"

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
  calculateOverallAverage,
  getEmptyResults,
  getMaturityBgColor,
  getMaturityColor,
  getMaturityLevel,
} from "@/lib/assessment-data"
import { BenchmarkComparison } from "@/components/benchmark-comparison"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
          <Link href="/maturity">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Maturity Home
            </Button>
          </Link>
          <Link href="/maturity/assessment">
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
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium">Maturity Level Thresholds:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Level 1 (Initial): &lt; 1.5</li>
                <li>Level 2 (Managed): 1.5 - 2.49</li>
                <li>Level 3 (Defined): 2.5 - 3.49</li>
                <li>Level 4 (Quantitatively Managed): 3.5 - 4.49</li>
                <li>Level 5 (Optimizing): ≥ 4.5</li>
              </ul>
            </div>
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/maturity/domain-results?size=${organizationSize}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-orange-100 border-orange-300 hover:bg-orange-200 text-orange-800"
                  >
                    <BarChart4 className="h-4 w-4" />
                    View Detailed Domain Analysis
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  See in-depth analysis of each domain with spider charts, dimension breakdowns, and specific
                  recommendations for improvement.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
        <Link href="/maturity">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Maturity Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
