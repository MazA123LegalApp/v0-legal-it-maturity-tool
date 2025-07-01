"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportUtils } from "./export-utils"
import { ControlMatrix } from "./control-matrix"
import { getAssessmentResults } from "@/lib/assessment-utils"
import { calculateDomainAverages, domains } from "@/lib/assessment-data"
import { FileText, Target, Shield, BookOpen } from "lucide-react"

export function ResultsActions() {
  const [selectedDomain, setSelectedDomain] = useState<string>("")

  // Get assessment results to pass to export
  const results = getAssessmentResults()
  const domainAverages = results ? calculateDomainAverages(results) : {}

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Next Steps
          </CardTitle>
          <CardDescription>Explore your results and take action to improve your IT maturity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="playbook">Playbook</TabsTrigger>
              <TabsTrigger value="controls">Control Matrix</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

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
                        <p className="font-medium">Review Domain Results</p>
                        <p className="text-sm text-gray-600">
                          Examine detailed scores for each domain to identify improvement areas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Access Modernization Playbook</p>
                        <p className="text-sm text-gray-600">
                          Get specific guidance and templates for your maturity level
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Implement Control Framework</p>
                        <p className="text-sm text-gray-600">
                          Use the control matrix to align with compliance requirements
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

                      return (
                        <div key={domain.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{domain.name}</h4>
                            <span className="text-sm text-gray-600">{score.toFixed(1)}/5.0</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{domain.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/playbook/domains/${domain.id}`, "_blank")}
                          >
                            View Playbook
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="controls" className="space-y-4">
              <ControlMatrix selectedDomain={selectedDomain} />

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
                  <div className="flex flex-col sm:flex-row gap-4">{results && <ExportUtils results={results} />}</div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">What's included in exports:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Executive summary with overall maturity score</li>
                      <li>• Detailed domain and dimension analysis</li>
                      <li>• Prioritized recommendations</li>
                      <li>• Compliance framework mappings</li>
                      <li>• Implementation roadmap</li>
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
