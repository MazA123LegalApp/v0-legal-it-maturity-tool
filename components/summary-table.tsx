"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { domains, getMaturityLevel, getMaturityColor } from "@/lib/assessment-data"

interface SummaryTableProps {
  domainScores: Record<string, number>
}

export function SummaryTable({ domainScores = {} }: SummaryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Domain</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Maturity Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((domain) => {
            const score = domainScores[domain.id] || 0
            const level = getMaturityLevel(score)
            const colorClass = getMaturityColor(score)

            return (
              <TableRow key={domain.id}>
                <TableCell className="font-medium">{domain.name}</TableCell>
                <TableCell>{score.toFixed(1)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={colorClass}>
                    {level}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
