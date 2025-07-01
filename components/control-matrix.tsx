"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Search } from "lucide-react"
import {
  fetchControlMatrix,
  getControlMatrixByDomain,
  getUniqueValues,
  type ControlMatrixItem,
} from "@/lib/control-matrix"
import * as XLSX from "xlsx"

interface ControlMatrixProps {
  selectedDomain?: string
}

export function ControlMatrix({ selectedDomain }: ControlMatrixProps) {
  const [controlData, setControlData] = useState<ControlMatrixItem[]>([])
  const [filteredData, setFilteredData] = useState<ControlMatrixItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPillar, setSelectedPillar] = useState<string>("all")
  const [selectedFramework, setSelectedFramework] = useState<string>("all")

  useEffect(() => {
    const loadControlMatrix = async () => {
      try {
        const data = await fetchControlMatrix()
        setControlData(data)

        // Filter by domain if provided
        if (selectedDomain) {
          const domainData = getControlMatrixByDomain(data, selectedDomain)
          setFilteredData(domainData)
        } else {
          setFilteredData(data)
        }
      } catch (error) {
        console.error("Error loading control matrix:", error)
      } finally {
        setLoading(false)
      }
    }

    loadControlMatrix()
  }, [selectedDomain])

  useEffect(() => {
    let filtered = selectedDomain ? getControlMatrixByDomain(controlData, selectedDomain) : controlData

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply pillar filter
    if (selectedPillar !== "all") {
      filtered = filtered.filter((item) => item.OMB_M22_09_Pillar.toLowerCase().includes(selectedPillar.toLowerCase()))
    }

    // Apply framework filter
    if (selectedFramework !== "all") {
      filtered = filtered.filter((item) => {
        switch (selectedFramework) {
          case "nist":
            return item.NIST_CSF && item.NIST_CSF.trim() !== ""
          case "iso":
            return item.ISO_27001_AnnexA && item.ISO_27001_AnnexA.trim() !== ""
          case "eo":
            return item.EO_14028_Reference && item.EO_14028_Reference.trim() !== ""
          default:
            return true
        }
      })
    }

    setFilteredData(filtered)
  }, [controlData, selectedDomain, searchTerm, selectedPillar, selectedFramework])

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Control Matrix")

    const fileName = selectedDomain
      ? `Control_Matrix_${selectedDomain.replace(/\s+/g, "_")}.xlsx`
      : "Control_Matrix_Complete.xlsx"

    XLSX.writeFile(wb, fileName)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Control Matrix</CardTitle>
          <CardDescription>Loading control matrix data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const uniquePillars = getUniqueValues(controlData, "OMB_M22_09_Pillar")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Control Matrix</CardTitle>
            <CardDescription>
              {selectedDomain
                ? `Controls and actions for ${selectedDomain}`
                : "Complete control matrix with compliance mappings"}
            </CardDescription>
          </div>
          <Button onClick={exportToExcel} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search controls, actions, or frameworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={selectedPillar} onValueChange={setSelectedPillar}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Pillar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pillars</SelectItem>
              {uniquePillars.map((pillar) => (
                <SelectItem key={pillar} value={pillar}>
                  {pillar}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Frameworks</SelectItem>
              <SelectItem value="nist">NIST CSF</SelectItem>
              <SelectItem value="iso">ISO 27001</SelectItem>
              <SelectItem value="eo">Executive Order</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredData.length} of {controlData.length} controls
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Domain</TableHead>
                <TableHead className="min-w-[100px]">Action ID</TableHead>
                <TableHead className="min-w-[250px]">Playbook Action</TableHead>
                <TableHead className="min-w-[150px]">OMB Pillar</TableHead>
                <TableHead className="min-w-[100px]">NIST CSF</TableHead>
                <TableHead className="min-w-[120px]">ISO 27001</TableHead>
                <TableHead className="min-w-[150px]">Evidence Template</TableHead>
                <TableHead className="min-w-[120px]">KPI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {item.Domain}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.Playbook_Action_ID}</TableCell>
                  <TableCell className="max-w-[250px]">
                    <div className="truncate" title={item["Playbook Action"]}>
                      {item["Playbook Action"]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {item.OMB_M22_09_Pillar}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.NIST_CSF}</TableCell>
                  <TableCell className="font-mono text-sm">{item.ISO_27001_AnnexA}</TableCell>
                  <TableCell className="max-w-[150px]">
                    <div className="truncate" title={item.Evidence_Template}>
                      {item.Evidence_Template}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[120px]">
                    <div className="truncate" title={item.KPI}>
                      {item.KPI}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">No controls found matching your criteria.</div>
        )}
      </CardContent>
    </Card>
  )
}
