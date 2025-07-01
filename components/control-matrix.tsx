"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Download, CheckCircle, Clock, AlertTriangle, Circle, MoreVertical, FileText } from "lucide-react"
import {
  fetchControlMatrix,
  getControlMatrixByDomain,
  updateControlStatus,
  type ControlMatrixItem,
} from "@/lib/control-matrix"
import { domains } from "@/lib/assessment-data"
import { toast } from "@/hooks/use-toast"

interface ControlMatrixProps {
  defaultFilter?: string
  priorityDomains?: string[]
}

export function ControlMatrix({ defaultFilter = "", priorityDomains = [] }: ControlMatrixProps) {
  const [controlData, setControlData] = useState<ControlMatrixItem[]>([])
  const [filteredData, setFilteredData] = useState<ControlMatrixItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDomain, setSelectedDomain] = useState(defaultFilter)
  const [selectedPillar, setSelectedPillar] = useState("")
  const [selectedFramework, setSelectedFramework] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [showCriticalOnly, setShowCriticalOnly] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchControlMatrix()
        setControlData(data)
        setFilteredData(data)
      } catch (error) {
        console.error("Error loading control matrix:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    let filtered = controlData

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item["Playbook Action"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Playbook_Action_ID.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply domain filter
    if (selectedDomain) {
      filtered = getControlMatrixByDomain(filtered, selectedDomain)
    }

    // Apply pillar filter
    if (selectedPillar) {
      filtered = filtered.filter((item) => item.OMB_M22_09_Pillar === selectedPillar)
    }

    // Apply framework filter
    if (selectedFramework) {
      filtered = filtered.filter((item) => {
        switch (selectedFramework) {
          case "NIST":
            return item.NIST_CSF
          case "ISO":
            return item.ISO_27001_AnnexA
          case "EO":
            return item.EO_14028_Reference
          default:
            return true
        }
      })
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter)
    }

    // Apply critical only filter
    if (showCriticalOnly) {
      filtered = filtered.filter((item) => item.priority === "critical")
    }

    setFilteredData(filtered)
  }, [controlData, searchTerm, selectedDomain, selectedPillar, selectedFramework, statusFilter, showCriticalOnly])

  const handleStatusUpdate = (actionId: string, newStatus: "not_started" | "in_progress" | "completed") => {
    updateControlStatus(actionId, newStatus)

    // Update local state
    setControlData((prev) =>
      prev.map((item) => (item.Playbook_Action_ID === actionId ? { ...item, status: newStatus } : item)),
    )

    // Show toast notification
    const statusLabels = {
      not_started: "Not Started",
      in_progress: "In Progress",
      completed: "Completed",
    }

    toast({
      title: "Status Updated",
      description: `${actionId} marked as ${statusLabels[newStatus]}`,
    })
  }

  const getStatusIcon = (status: string, priority: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "not_started":
        return priority === "critical" ? (
          <AlertTriangle className="h-4 w-4 text-red-600" />
        ) : (
          <Circle className="h-4 w-4 text-gray-400" />
        )
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getRowClassName = (item: ControlMatrixItem) => {
    switch (item.status) {
      case "completed":
        return "bg-green-50 hover:bg-green-100"
      case "in_progress":
        return "bg-blue-50 hover:bg-blue-100"
      case "not_started":
        return item.priority === "critical" ? "bg-red-50 hover:bg-red-100" : "bg-amber-50 hover:bg-amber-100"
      default:
        return "hover:bg-gray-50"
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Domain",
      "Action ID",
      "Playbook Action",
      "Status",
      "Priority",
      "EO Reference",
      "OMB Pillar",
      "NIST CSF",
      "Evidence Template",
      "KPI",
      "ISO 27001",
    ]

    const csvContent = [
      headers.join(","),
      ...filteredData.map((item) =>
        [
          `"${item.Domain}"`,
          `"${item.Playbook_Action_ID}"`,
          `"${item["Playbook Action"]}"`,
          `"${item.status || "not_started"}"`,
          `"${item.priority || "low"}"`,
          `"${item.EO_14028_Reference}"`,
          `"${item.OMB_M22_09_Pillar}"`,
          `"${item.NIST_CSF}"`,
          `"${item.Evidence_Template}"`,
          `"${item.KPI}"`,
          `"${item.ISO_27001_AnnexA}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `control-matrix-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: `${filteredData.length} actions exported to CSV—remember to attach evidence templates.`,
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Control Matrix</CardTitle>
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

  const domainCounts = domains.map((domain) => {
    const count = getControlMatrixByDomain(controlData, domain.name).filter(
      (item) => item.status === "not_started",
    ).length
    return { ...domain, gapCount: count }
  })

  return (
    <Card id="control-matrix-section">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Control Matrix</span>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardTitle>
        <CardDescription>
          Implementation roadmap with compliance mappings ({filteredData.length} of {controlData.length} actions shown)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search actions, domains, or IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {domainCounts.map((domain) => (
                <SelectItem key={domain.id} value={domain.name}>
                  {domain.name}{" "}
                  {domain.gapCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {domain.gapCount} gaps
                    </Badge>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showCriticalOnly ? "default" : "outline"}
            onClick={() => setShowCriticalOnly(!showCriticalOnly)}
            size="sm"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Critical Only
          </Button>
        </div>

        {/* Priority domains alert */}
        {priorityDomains.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Showing controls for priority domains: {priorityDomains.join(", ")}</AlertDescription>
          </Alert>
        )}

        {/* Control Matrix Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Status</TableHead>
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="w-32">Domain</TableHead>
                <TableHead className="w-32">OMB Pillar</TableHead>
                <TableHead className="w-24">Frameworks</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.Playbook_Action_ID} className={getRowClassName(item)}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status || "not_started", item.priority || "low")}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.Playbook_Action_ID}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item["Playbook Action"]}</p>
                      {item.KPI && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>KPI:</strong> {item.KPI}
                        </p>
                      )}
                      {item.Evidence_Template && (
                        <p className="text-sm text-blue-600 mt-1">
                          <FileText className="h-3 w-3 inline mr-1" />
                          {item.Evidence_Template}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {item.Domain}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.OMB_M22_09_Pillar && (
                      <Badge variant="secondary" className="text-xs">
                        {item.OMB_M22_09_Pillar}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.NIST_CSF && (
                        <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                          NIST
                        </Badge>
                      )}
                      {item.ISO_27001_AnnexA && (
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                          ISO
                        </Badge>
                      )}
                      {item.EO_14028_Reference && (
                        <Badge variant="default" className="text-xs bg-purple-100 text-purple-800">
                          EO
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusUpdate(item.Playbook_Action_ID, "not_started")}>
                          <Circle className="h-4 w-4 mr-2" />
                          Not Started
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(item.Playbook_Action_ID, "in_progress")}>
                          <Clock className="h-4 w-4 mr-2" />
                          In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(item.Playbook_Action_ID, "completed")}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">No controls match your current filters.</div>
        )}
      </CardContent>
    </Card>
  )
}
