"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportReportButton } from "./export-report-button"
import { ControlMatrix } from "./control-matrix"
import { getAssessmentResults } from "@/lib/assessment-utils"
import { calculateDomainAverages, domains } from "@/lib/assessment-data"
import { FileText, Target, Shield, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ResultsActions() {
  const [selectedDomain, setSelectedDomain] = useState<string>("")

  // Get assessment results to determine low-scoring domains
  const results = getAssessmentResults()
  const domainAverages = results ? calculateDomainAverages(results) : {}

  // Get low-scoring domains for default filtering
  const lowScoreDomains = Object.entries(domainAverages)
    .filter(([_, score]) => score > 0 && score < 3.0)
    .map(([id]) => {
      const domain = domains.find((d) => d.id === id)
      return domain ? domain.name : id
    })

  return (
    <div className="space-y-6" id="control-matrix-section">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Next Steps & Action Plan
          </CardTitle>
          <CardDescription>Transform your assessment results into actionable improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="controls" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="controls">Control Matrix</TabsTrigger>
              <TabsTrigger value="playbook">Playbook</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

            <TabsContent value="controls" className="space-y-4">
              <ControlMatrix
                selectedDomain={selectedDomain}
                defaultFilter="not_started"
                lowScoreDomains={lowScoreDomains}
              />

              {selectedDomain && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  Showing controls for: <strong>{selectedDomain}</strong>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedDomain("")}>
                    Show All
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="playbook" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Modernization Playbook
                  </CardTitle>
                  <CardDescription>Access domain-specific guidance and implementation templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {domains.map((domain) => {
                      const score = domainAverages[domain.id] || 0
                      if (score === 0) return null

                      const isLowScore = score < 3.0
                      const isCritical = score < 2.0

                      return (
                        <div
                          key={domain.id}
                          className={`border rounded-lg p-4 ${
                            isCritical
                              ? "border-red-200 bg-red-50"
                              : isLowScore
                                ? "border-amber-200 bg-amber-50"
                                : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{domain.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">{score.toFixed(1)}/5.0</span>
                              {isCritical && <span className="text-xs text-red-600 font-medium">Critical</span>}
                              {isLowScore && !isCritical && (
                                <span className="text-xs text-amber-600 font-medium">Priority</span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{domain.description}</p>
                          <div className="flex gap-2">
                            <Link href={`/playbook/domains/${domain.id}`}>
                              <Button variant="outline" size="sm">
                                View Playbook
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedDomain(domain.name)
                                // Switch to controls tab
                                const controlsTab = document.querySelector('[value="controls"]') as HTMLElement
                                controlsTab?.click()
                              }}
                            >
                              View Controls
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommended Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Start with Critical Controls</p>
                        <p className="text-sm text-gray-600">
                          Focus on high-impact security controls like MFA and privileged access
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Address Low-Scoring Domains</p>
                        <p className="text-sm text-gray-600">
                          {lowScoreDomains.length > 0
                            ? `Prioritize improvements in: ${lowScoreDomains.slice(0, 2).join(", ")}`
                            : "Continue strengthening all domains for optimal maturity"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Track Implementation Progress</p>
                        <p className="text-sm text-gray-600">
                          Use the control matrix to monitor completion and gather evidence
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Priority Domains</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {domains
                        .map((domain) => ({
                          domain,
                          score: domainAverages[domain.id] || 0,
                        }))
                        .filter((item) => item.score > 0)
                        .sort((a, b) => a.score - b.score)
                        .slice(0, 3)
                        .map((item, index) => (
                          <div key={item.domain.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{item.domain.name}</p>
                              <p className="text-sm text-gray-600">Score: {item.score.toFixed(1)}/5.0</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedDomain(item.domain.name)
                                // Switch to controls tab
                                const controlsTab = document.querySelector('[value="controls"]') as HTMLElement
                                controlsTab?.click()
                              }}
                            >
                              View Controls
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Export Results
                  </CardTitle>
                  <CardDescription>Download comprehensive reports and documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <ExportReportButton />

                    <Link href="/playbook">
                      <Button className="w-full sm:w-auto">
                        View Implementation Guides
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">What's included in exports:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Executive summary with overall maturity score</li>
                      <li>• Detailed domain and dimension analysis</li>
                      <li>• Prioritized recommendations with control mappings</li>
                      <li>• Compliance framework alignments (NIST, ISO, EO)</li>
                      <li>• Implementation roadmap with evidence templates</li>
                      <li>• Control matrix with status tracking</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
