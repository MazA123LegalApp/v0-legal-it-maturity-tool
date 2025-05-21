"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SummaryTable } from "@/components/summary-table"
import { DomainRadarChart } from "@/components/domain-radar-chart"
import { MaturitySummary } from "@/components/maturity-summary"
import { BenchmarkComparison } from "@/components/benchmark-comparison"
import { WorkingExportButton } from "@/components/working-export-button"
import { useRouter } from "next/navigation"

export default function ResultsClientPage() {
  const router = useRouter()
  const [assessmentData, setAssessmentData] = useState<any>(null)
  const [organizationName, setOrganizationName] = useState<string>("")
  const [activeTab, setActiveTab] = useState("summary")

  useEffect(() => {
    // Load assessment data from localStorage
    const storedData = localStorage.getItem("assessmentData")
    const storedOrgName = localStorage.getItem("organizationName")

    if (storedData) {
      setAssessmentData(JSON.parse(storedData))
    }

    if (storedOrgName) {
      setOrganizationName(storedOrgName)
    }
  }, [])

  const handleViewImplementationGuide = () => {
    router.push("/playbook/roadmap")
  }

  if (!assessmentData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-4">No Assessment Data</h1>
            <p className="mb-4">You haven't completed an assessment yet.</p>
            <Button onClick={() => router.push("/maturity/assessment")}>Start Assessment</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          {organizationName ? `${organizationName}'s Results` : "Assessment Results"}
        </h1>
        <div className="flex space-x-2">
          <WorkingExportButton />
          <Button onClick={handleViewImplementationGuide}>View Implementation Guide</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Detailed Results</TabsTrigger>
          <TabsTrigger value="benchmark">Benchmark Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Maturity Overview</h2>
                <MaturitySummary assessmentData={assessmentData} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Domain Visualization</h2>
                <DomainRadarChart assessmentData={assessmentData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Detailed Domain Results</h2>
              <SummaryTable assessmentData={assessmentData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmark">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Industry Benchmark Comparison</h2>
              <BenchmarkComparison assessmentData={assessmentData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
