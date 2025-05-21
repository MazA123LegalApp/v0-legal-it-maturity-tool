"use client"

import { CardFooter } from "@/components/ui/card"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MaturityRadarChart } from "@/components/radar-chart"
import { SummaryTable } from "@/components/summary-table"
import { MaturitySummary } from "@/components/maturity-summary"
import { MaturityRecommendations } from "@/components/maturity-recommendations"
import { ExportUtils } from "@/components/export-utils"
import { type AssessmentResult, getEmptyResults } from "@/lib/assessment-data"
import { classifyMaturity, type MaturityClassification } from "@/lib/maturity-engine"

export default function ResultsPage() {
  const [results, setResults] = useState<AssessmentResult>(getEmptyResults())
  const [organizationName, setOrganizationName] = useState<string>("Your Organization")
  const [organizationSize, setOrganizationSize] = useState<string>("mid-size")
  const [classification, setClassification] = useState<MaturityClassification | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load results from localStorage
    try {
      if (typeof window !== "undefined") {
        const savedResults = localStorage.getItem("assessmentResults")
        if (savedResults) {
          const parsedResults = JSON.parse(savedResults)
          setResults(parsedResults)

          // Classify the results using our maturity engine
          const maturityClassification = classifyMaturity(parsedResults)
          setClassification(maturityClassification)
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
            Review your IT maturity assessment results and get personalized recommendations
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/maturity/assessment">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Edit Responses
            </Button>
          </Link>
          <ExportUtils results={results} organizationName={organizationName} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mb-8">
        <div className="md:col-span-2 lg:col-span-3">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="chart">Radar Chart</TabsTrigger>
              <TabsTrigger value="table">Detailed Scores</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-6">
              {classification ? (
                <MaturitySummary classification={classification} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Results Available</CardTitle>
                    <CardDescription>Complete the maturity assessment to view your results.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The maturity assessment will help identify areas for improvement and provide targeted
                      recommendations based on your organization's current maturity level.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

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
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>{organizationName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Organization Size</p>
                  <p className="text-sm text-muted-foreground">
                    {organizationSize === "small" && "Small (1-50 employees)"}
                    {organizationSize === "mid-size" && "Mid-size (51-500 employees)"}
                    {organizationSize === "large" && "Large (500+ employees)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Assessment Date</p>
                  <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Overall Maturity</p>
                  <p className="text-sm text-muted-foreground">
                    {classification ? (
                      <>
                        {classification.overallBand} ({classification.overallScore.toFixed(1)}/5.0)
                      </>
                    ) : (
                      "Not available"
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Priority Recommendations</h2>
        {classification ? (
          <MaturityRecommendations domainScores={classification.weakestDomains} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Recommendations Available</CardTitle>
              <CardDescription>
                Complete the maturity assessment to receive personalized recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The maturity assessment will help identify areas for improvement and provide targeted recommendations
                based on your organization's current maturity level.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/maturity/assessment">
                <Button>Start Assessment</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Domain Recommendations</h2>
          <Link href="/playbook">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              View Full Playbook
            </Button>
          </Link>
        </div>

        {classification ? (
          <Tabs defaultValue="weakest" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="weakest">Weakest Domains</TabsTrigger>
              <TabsTrigger value="strongest">Strongest Domains</TabsTrigger>
              <TabsTrigger value="all">All Domains</TabsTrigger>
            </TabsList>

            <TabsContent value="weakest" className="mt-6">
              <MaturityRecommendations domainScores={classification.weakestDomains} />
            </TabsContent>

            <TabsContent value="strongest" className="mt-6">
              <MaturityRecommendations domainScores={classification.strongestDomains} />
            </TabsContent>

            <TabsContent value="all" className="mt-6">
              <MaturityRecommendations
                domainScores={Object.values(classification.domainScores)}
                showAllDomains={true}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Recommendations Available</CardTitle>
              <CardDescription>
                Complete the maturity assessment to receive personalized recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The maturity assessment will help identify areas for improvement and provide targeted recommendations
                based on your organization's current maturity level.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/maturity/assessment">
                <Button>Start Assessment</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/maturity">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Maturity Hub
          </Button>
        </Link>

        <Link href="/playbook">
          <Button className="gap-2">
            View Legal Modernization Playbook
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
