"use client"

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
    try {
      const savedResults = localStorage.getItem("maturityResults")
      if (savedResults) {
        const parsedResults = JSON.parse(savedResults)
        setResults(parsedResults)
        setOverallScore(calculateOverallAverage(parsedResults))
      }

      const savedOrgName = localStorage.getItem("organizationName")
      if (savedOrgName) setOrganizationName(savedOrgName)

      const savedOrgSize = localStorage.getItem("organizationSize")
      if (savedOrgSize) setOrganizationSize(savedOrgSize)
    } catch (loadError) {
      console.error("Error loading saved data:", loadError)
      setError("There was an error loading your saved assessment data.")
    }
  }, [])

  const handleOrganizationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setOrganizationName(newName)
    localStorage.setItem("organizationName", newName)
  }

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
          <p className="text-muted-foreground">Review your IT maturity assessment results and export them</p>
        </div>
        <div className="flex gap-2">
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
            <CardTitle>Organization</CardTitle>
            <CardDescription>For export and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="organization">Organization Name</Label>
            <Input
              id="organization"
              value={organizationName}
              onChange={handleOrganizationNameChange}
              placeholder="Enter name"
            />
            <Label htmlFor="organizationSize" className="mt-4 block">Organization Size</Label>
            <Select
              value={organizationSize}
              onValueChange={(value) => {
                setOrganizationSize(value)
                localStorage.setItem("organizationSize", value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (1-50)</SelectItem>
                <SelectItem value="mid-size">Mid-size (51-500)</SelectItem>
                <SelectItem value="large">Large (500+)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className={getMaturityBgColor(overallScore)}>
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-4xl font-bold ${getMaturityColor(overallScore)}`}>{overallScore.toFixed(1)} / 5.0</p>
            <p className={`mt-2 text-lg ${getMaturityColor(overallScore)}`}>{getMaturityLevel(overallScore)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{new Date().toLocaleDateString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Stored privately in your browser</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart" className="mb-8">
        <TabsList>
          <TabsTrigger value="chart">Radar Chart</TabsTrigger>
          <TabsTrigger value="table">Summary Table</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maturity Radar Chart</CardTitle>
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
            </CardHeader>
            <CardContent>
              <SummaryTable results={results} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href={`/domain-results?size=${organizationSize}`}>
          <Button variant="default" className="gap-2">
            <BarChart4 className="h-4 w-4" />
            View Domain Analysis
          </Button>
        </Link>
      </div>
    </div>
  )
}
