"use client"

import { useMemo } from "react"
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import {
  type AssessmentResult,
  calculateDomainAverages,
  domains,
  getMaturityColor,
  getMaturityLevel,
} from "@/lib/assessment-data"

interface MaturityRadarChartProps {
  results: AssessmentResult
}

export function MaturityRadarChart({ results }: MaturityRadarChartProps) {
  const chartData = useMemo(() => {
    const domainAverages = calculateDomainAverages(results)

    return domains
      .map((domain) => {
        const score = domainAverages[domain.id] || 0
        return {
          domain: domain.name.split(" ")[0], // Short name for display
          fullName: domain.name,
          value: score,
          level: getMaturityLevel(score),
        }
      })
      .filter((item) => item.value > 0) // Only include domains with scores
  }, [results])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{data.fullName}</p>
          <p className="text-sm">
            Score: <span className="font-medium">{data.value.toFixed(1)}</span>
          </p>
          <p className="text-sm">
            Level: <span className={`font-medium ${getMaturityColor(data.value)}`}>{data.level}</span>
          </p>
        </div>
      )
    }
    return null
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] border rounded-md bg-muted/20">
        <p className="text-muted-foreground">Complete the assessment to see your radar chart</p>
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="domain" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
          <Radar
            name="Maturity Score"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
