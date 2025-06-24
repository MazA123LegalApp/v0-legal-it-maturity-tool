"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { domains } from "@/lib/assessment-data"

interface DomainRadarChartProps {
  domainScores: Record<string, number>
}

export function DomainRadarChart({ domainScores = {} }: DomainRadarChartProps) {
  // Transform domain scores into chart data
  const chartData = domains.map((domain) => ({
    domain: domain.name,
    score: domainScores[domain.id] || 0,
    fullMark: 5,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Maturity Overview</CardTitle>
        <CardDescription>Visual representation of your maturity across all domains</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="domain" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10 }} />
            <Radar
              name="Maturity Score"
              dataKey="score"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
