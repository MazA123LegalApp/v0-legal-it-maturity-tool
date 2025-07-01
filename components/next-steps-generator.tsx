"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, FileText, CheckSquare, AlertTriangle, Star, Target, TrendingUp, ExternalLink } from "lucide-react"
import {
  fetchControlMatrix,
  getRecommendedActionsForDomains,
  getQuickWins,
  type ControlMatrixItem,
} from "@/lib/control-matrix"
import { domains, getMaturityLevel } from "@/lib/assessment-data"
import { toast } from "@/hooks/use-toast"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"

interface NextStepsGeneratorProps {
  domainScores: Record<string, number>
  onViewControlMatrix?: (filter?: string) => void
}

export function NextStepsGenerator({ domainScores, onViewControlMatrix }: NextStepsGeneratorProps) {
  const [controlData, setControlData] = useState<ControlMatrixItem[]>([])
  const [recommendedActions, setRecommendedActions] = useState<ControlMatrixItem[]>([])
  const [quickWins, setQuickWins] = useState<ControlMatrixItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedActions, setSelectedActions] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchControlMatrix()
        setControlData(data)

        // Identify low-scoring domains (< 3.0)
        const lowScoreDomains = Object.entries(domainScores)
          .filter(([_, score]) => score > 0 && score < 3.0)
          .map(([domainId, score]) => {
            const domain = domains.find((d) => d.id === domainId)
            return {
              name: domain?.name || domainId,
              score,
              band: getMaturityLevel(score),
            }
          })

        // Get recommended actions for low-scoring domains
        const recommended = getRecommendedActionsForDomains(data, lowScoreDomains)
        setRecommendedActions(recommended)

        // Get quick wins
        const wins = getQuickWins(data, 5)
        setQuickWins(wins)
      } catch (error) {
        console.error("Error loading next steps data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [domainScores])

  const handleActionSelect = (actionId: string) => {
    const newSelected = new Set(selectedActions)
    if (newSelected.has(actionId)) {
      newSelected.delete(actionId)
    } else {
      newSelected.add(actionId)
    }
    setSelectedActions(newSelected)
  }

  const exportToCSV = (actions: ControlMatrixItem[], filename: string) => {
    const headers = [
      "Action ID",
      "Domain",
      "Action Description",
      "Priority",
      "Execution Effort",
      "KPI",
      "Evidence Template",
      "NIST CSF",
      "ISO 27001",
      "EO Reference",
      "Status",
    ]

    const csvContent = [
      headers.join(","),
      ...actions.map((item) =>
        [
          `"${item.Playbook_Action_ID}"`,
          `"${item.Domain}"`,
          `"${item["Playbook Action"]}"`,
          `"${item.priority || "medium"}"`,
          `"${item.execution_effort || "medium"}"`,
          `"${item.KPI}"`,
          `"${item.Evidence_Template}"`,
          `"${item.NIST_CSF}"`,
          `"${item.ISO_27001_AnnexA}"`,
          `"${item.EO_14028_Reference}"`,
          `"${item.status || "not_started"}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: `${actions.length} actions exported to CSV—ready for project management tools.`,
    })
  }

  const exportQuickWinsPDF = () => {
    const doc = new jsPDF()

    // Title
    doc.setFontSize(20)
    doc.text("Quick Wins - Priority Actions", 20, 30)

    doc.setFontSize(12)
    doc.text("High-impact, low-effort controls to implement immediately", 20, 45)

    let yPosition = 65

    quickWins.slice(0, 5).forEach((action, index) => {
      // Action header
      doc.setFontSize(14)
      doc.setFont(undefined, "bold")
      doc.text(`${index + 1}. ${action.Playbook_Action_ID}: ${action.Domain}`, 20, yPosition)

      yPosition += 10

      // Action description
      doc.setFontSize(10)
      doc.setFont(undefined, "normal")
      const actionText = doc.splitTextToSize(action["Playbook Action"], 170)
      doc.text(actionText, 20, yPosition)
      yPosition += actionText.length * 5 + 5

      // KPI and Evidence
      if (action.KPI) {
        doc.setFont(undefined, "bold")
        doc.text("Success Criteria: ", 20, yPosition)
        doc.setFont(undefined, "normal")
        doc.text(action.KPI, 55, yPosition)
        yPosition += 8
      }

      if (action.Evidence_Template) {
        doc.setFont(undefined, "bold")
        doc.text("Evidence Required: ", 20, yPosition)
        doc.setFont(undefined, "normal")
        doc.text(action.Evidence_Template, 60, yPosition)
        yPosition += 8
      }

      // Compliance frameworks
      const frameworks = []
      if (action.NIST_CSF) frameworks.push(`NIST: ${action.NIST_CSF}`)
      if (action.ISO_27001_AnnexA) frameworks.push(`ISO: ${action.ISO_27001_AnnexA}`)
      if (action.EO_14028_Reference) frameworks.push(`EO: ${action.EO_14028_Reference}`)

      if (frameworks.length > 0) {
        doc.setFont(undefined, "bold")
        doc.text("Compliance: ", 20, yPosition)
        doc.setFont(undefined, "normal")
        doc.text(frameworks.join(" | "), 50, yPosition)
        yPosition += 8
      }

      yPosition += 10

      // Page break if needed
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }
    })

    doc.save("quick-wins-action-plan.pdf")

    toast({
      title: "PDF Generated",
      description: "Quick wins action plan downloaded—share with your implementation team.",
    })
  }

  const exportSelectedToJira = () => {
    const selectedItems = recommendedActions.filter((action) => selectedActions.has(action.Playbook_Action_ID))

    if (selectedItems.length === 0) {
      toast({
        title: "No Actions Selected",
        description: "Please select actions to export to Jira format.",
      })
      return
    }

    // Create Jira-compatible format
    const jiraContent = selectedItems.map((action) => ({
      "Issue Type": "Task",
      Summary: `${action.Playbook_Action_ID}: ${action["Playbook Action"]}`,
      Description: `**Domain:** ${action.Domain}\n\n**Success Criteria:** ${action.KPI}\n\n**Evidence Required:** ${action.Evidence_Template}\n\n**Compliance Frameworks:**\n- NIST CSF: ${action.NIST_CSF || "N/A"}\n- ISO 27001: ${action.ISO_27001_AnnexA || "N/A"}\n- Executive Order: ${action.EO_14028_Reference || "N/A"}`,
      Priority: action.priority === "critical" ? "Highest" : action.priority === "high" ? "High" : "Medium",
      Labels: `compliance,${action.Domain.toLowerCase().replace(/\s+/g, "-")},${action.priority}`,
      Components: action.Domain,
      Effort: action.execution_effort,
    }))

    // Export as Excel for Jira import
    const ws = XLSX.utils.json_to_sheet(jiraContent)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Jira Import")

    XLSX.writeFile(wb, "jira-import-compliance-actions.xlsx")

    toast({
      title: "Jira Export Ready",
      description: `${selectedItems.length} actions formatted for Jira import.`,
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Next Steps Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const lowScoreCount = Object.values(domainScores).filter((score) => score > 0 && score < 3.0).length
  const criticalActions = recommendedActions.filter((action) => action.priority === "critical").length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Next Steps Generator
        </CardTitle>
        <CardDescription>Actionable roadmap based on your assessment results</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quick-wins">Quick Wins</TabsTrigger>
            <TabsTrigger value="roadmap">Full Roadmap</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {lowScoreCount > 0 ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p>
                      <strong>Action Required:</strong> {lowScoreCount} domains need improvement
                    </p>
                    <p>
                      <strong>Recommended Actions:</strong> {recommendedActions.length} controls identified
                    </p>
                    <p>
                      <strong>Critical Priority:</strong> {criticalActions} actions require immediate attention
                    </p>
                    <p>
                      <strong>Quick Wins Available:</strong> {quickWins.length} high-impact, low-effort actions
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-green-200 bg-green-50">
                <CheckSquare className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Well Done!</strong> All domains are performing at Established level or above. Consider
                  advanced optimization actions to reach Managed/Optimized levels.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">{quickWins.length}</p>
                      <p className="text-sm text-gray-600">Quick Wins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">{criticalActions}</p>
                      <p className="text-sm text-gray-600">Critical Actions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{recommendedActions.length}</p>
                      <p className="text-sm text-gray-600">Total Actions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => onViewControlMatrix?.("not_started")}>
                View Full Control Matrix
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={exportQuickWinsPDF}>
                <FileText className="h-4 w-4 mr-2" />
                Quick Wins PDF
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="quick-wins" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">High-Impact Quick Wins</h3>
                <Button onClick={exportQuickWinsPDF} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>

              {quickWins.length > 0 ? (
                <div className="space-y-3">
                  {quickWins.map((action, index) => (
                    <Card key={action.Playbook_Action_ID} className="border-l-4 border-l-yellow-400">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{action.Playbook_Action_ID}</Badge>
                              <Badge variant="secondary">{action.Domain}</Badge>
                              <Badge className="bg-yellow-100 text-yellow-800">Quick Win</Badge>
                            </div>
                            <h4 className="font-medium mb-2">{action["Playbook Action"]}</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                <strong>KPI:</strong> {action.KPI}
                              </p>
                              <p>
                                <strong>Evidence:</strong> {action.Evidence_Template}
                              </p>
                              <div className="flex gap-2 mt-2">
                                {action.NIST_CSF && (
                                  <Badge variant="outline" className="text-xs">
                                    NIST: {action.NIST_CSF}
                                  </Badge>
                                )}
                                {action.ISO_27001_AnnexA && (
                                  <Badge variant="outline" className="text-xs">
                                    ISO: {action.ISO_27001_AnnexA}
                                  </Badge>
                                )}
                                {action.EO_14028_Reference && (
                                  <Badge variant="outline" className="text-xs">
                                    EO: {action.EO_14028_Reference}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={`${action.priority === "critical" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                            >
                              {action.priority}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  No quick wins identified. Your current maturity level may not have low-effort, high-impact actions
                  available.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Complete Action Roadmap</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedActions.size === recommendedActions.length) {
                        setSelectedActions(new Set())
                      } else {
                        setSelectedActions(new Set(recommendedActions.map((a) => a.Playbook_Action_ID)))
                      }
                    }}
                  >
                    {selectedActions.size === recommendedActions.length ? "Deselect All" : "Select All"}
                  </Button>
                  <Button onClick={() => onViewControlMatrix?.("not_started")} size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Full Matrix
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {recommendedActions.map((action) => (
                  <Card
                    key={action.Playbook_Action_ID}
                    className={`cursor-pointer transition-colors ${
                      selectedActions.has(action.Playbook_Action_ID) ? "bg-blue-50 border-blue-200" : ""
                    } ${
                      action.priority === "critical"
                        ? "border-l-4 border-l-red-500"
                        : action.priority === "high"
                          ? "border-l-4 border-l-orange-500"
                          : ""
                    }`}
                    onClick={() => handleActionSelect(action.Playbook_Action_ID)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedActions.has(action.Playbook_Action_ID)}
                          onChange={() => handleActionSelect(action.Playbook_Action_ID)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{action.Playbook_Action_ID}</Badge>
                            <Badge variant="secondary">{action.Domain}</Badge>
                            <Badge
                              className={`${
                                action.priority === "critical"
                                  ? "bg-red-100 text-red-800"
                                  : action.priority === "high"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {action.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {action.execution_effort} effort
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-1">{action["Playbook Action"]}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>KPI:</strong> {action.KPI}
                          </p>
                          <div className="flex gap-1">
                            {action.NIST_CSF && (
                              <Badge variant="outline" className="text-xs">
                                NIST
                              </Badge>
                            )}
                            {action.ISO_27001_AnnexA && (
                              <Badge variant="outline" className="text-xs">
                                ISO
                              </Badge>
                            )}
                            {action.EO_14028_Reference && (
                              <Badge variant="outline" className="text-xs">
                                EO
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {recommendedActions.length === 0 && (
                <p className="text-gray-600">No recommended actions. All domains are performing well!</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Export Options</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Wins PDF</CardTitle>
                    <CardDescription>Executive summary of top 5 high-impact actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={exportQuickWinsPDF} className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">CSV Export</CardTitle>
                    <CardDescription>All recommended actions for spreadsheet analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => exportToCSV(recommendedActions, "recommended-actions.csv")}
                      className="w-full"
                      variant="outline"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Jira Import</CardTitle>
                    <CardDescription>Selected actions formatted for project management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={exportSelectedToJira}
                      className="w-full bg-transparent"
                      variant="outline"
                      disabled={selectedActions.size === 0}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Export to Jira ({selectedActions.size} selected)
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">ServiceNow CAB</CardTitle>
                    <CardDescription>Change requests for governance approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() =>
                        exportToCSV(
                          recommendedActions.filter((a) => selectedActions.has(a.Playbook_Action_ID)),
                          "servicenow-change-requests.csv",
                        )
                      }
                      className="w-full"
                      variant="outline"
                      disabled={selectedActions.size === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CAB Format ({selectedActions.size} selected)
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tip:</strong> Select specific actions in the Roadmap tab before exporting to Jira or
                  ServiceNow. The CSV export includes all recommended actions based on your assessment results.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
