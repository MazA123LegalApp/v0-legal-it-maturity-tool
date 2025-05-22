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
  type Dimension,
  dimensions,
  getMaturityColor,
  getMaturityLevel,
} from "@/lib/assessment-data"

interface DomainRadarChartProps {
  results: AssessmentResult
  domainId: string
  domainName: string
}

export function DomainRadarChart({ results, domainId, domainName }: DomainRadarChartProps) {
  const chartData = useMemo(() => {
    return Object.keys(dimensions).map((dimension) => {
      const score = results[domainId]?.[dimension as Dimension] || 0
      return {
        dimension: dimensions[dimension as Dimension].name.split(" ")[0],
        fullName: dimensions[dimension as Dimension].name,
        value: score,
        level: getMaturityLevel(score),
      }
    })
  }, [results, domainId])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{data.fullName}</p>
          <p className="text-sm">
            Score:{" "}
            <span className="font-medium">
              {typeof data.value === "number" ? data.value.toFixed(1) : "N/A"}
            </span>
          </p>
          <p className="text-sm">
            Level:{" "}
            <span className={`font-medium ${getMaturityColor(data.value)}`}>
              {data.level || "Unknown"}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  if (chartData.every((item) => item.value === 0)) {
    return (
      <div className="flex items-center justify-center h-[250px] border rounded-md bg-muted/20">
        <p className="text-muted-foreground">Complete the assessment to see domain radar chart</p>
      </div>
    )
  }

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
          <Radar
            name={domainName}
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
