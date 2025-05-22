"use client"

import {
  type AssessmentResult,
  type Dimension,
  calculateDimensionAverages,
  calculateDomainAverages,
  dimensions,
  domains,
  getMaturityColor,
  getMaturityLevel,
} from "@/lib/assessment-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SummaryTableProps {
  results: AssessmentResult
}

export function SummaryTable({ results }: SummaryTableProps) {
  const domainAverages = calculateDomainAverages(results)
  const dimensionAverages = calculateDimensionAverages(results)

  const hasResults = Object.values(domainAverages).some((score) => score > 0)

  if (!hasResults) {
    return (
      <div className="flex items-center justify-center h-[300px] border rounded-md bg-muted/20">
        <p className="text-muted-foreground">Complete the assessment to see your summary table</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Domain</TableHead>
            {Object.keys(dimensions).map((dimension) => (
              <TableHead key={dimension}>{dimensions[dimension as Dimension].name}</TableHead>
            ))}
            <TableHead>Average</TableHead>
            <TableHead>Maturity Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((domain) => {
            const domainScore = domainAverages[domain.id]
            if (typeof domainScore !== "number" || domainScore === 0) return null

            return (
              <TableRow key={domain.id}>
                <TableCell className="font-medium">{domain.name}</TableCell>
                {Object.keys(dimensions).map((dimension) => {
                  const val = results[domain.id][dimension as Dimension]
                  return (
                    <TableCell
                      key={dimension}
                      className={getMaturityColor(typeof val === "number" ? val : 0)}
                    >
                      {typeof val === "number" ? val : "-"}
                    </TableCell>
                  )
                })}
                <TableCell className={`font-medium ${getMaturityColor(domainScore)}`}>
                  {typeof domainScore === "number" ? domainScore.toFixed(1) : "-"}
                </TableCell>
                <TableCell className={getMaturityColor(domainScore)}>
                  {getMaturityLevel(domainScore)}
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow className="bg-muted/50">
            <TableCell className="font-medium">Dimension Average</TableCell>
            {Object.keys(dimensions).map((dimension) => {
              const avg = dimensionAverages[dimension]
              return (
                <TableCell
                  key={dimension}
                  className={`font-medium ${getMaturityColor(typeof avg === "number" ? avg : 0)}`}
                >
                  {typeof avg === "number" ? avg.toFixed(1) : "-"}
                </TableCell>
              )
            })}
            <TableCell className="font-medium" colSpan={2}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
