"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchControlMatrix, getOMBPillarStats } from "@/lib/control-matrix"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function OMBHeatmap() {
  const [pillarStats, setPillarStats] = useState<
    Array<{ name: string; completed: number; total: number; percentage: number }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchControlMatrix()
        const stats = getOMBPillarStats(data)
        setPillarStats(stats)
      } catch (error) {
        console.error("Error loading pillar data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Zero Trust Pillar Progress</CardTitle>
        <CardDescription>Implementation status across OMB M-22-09 pillars</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex gap-1 h-8 rounded overflow-hidden">
            {pillarStats.map((pillar, index) => (
              <Tooltip key={pillar.name}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex-1 relative transition-all hover:opacity-80 cursor-pointer ${
                      pillar.percentage >= 80
                        ? "bg-green-500"
                        : pillar.percentage >= 60
                          ? "bg-yellow-500"
                          : pillar.percentage >= 40
                            ? "bg-orange-500"
                            : "bg-red-500"
                    }`}
                    style={{
                      opacity: 0.3 + (pillar.percentage / 100) * 0.7,
                    }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-current transition-all"
                      style={{ height: `${pillar.percentage}%` }}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <p className="font-medium">{pillar.name}</p>
                    <p className="text-sm">
                      {pillar.completed}/{pillar.total} complete
                    </p>
                    <p className="text-sm">{Math.round(pillar.percentage)}%</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="mt-2 text-xs text-gray-600 text-center">Hover over segments to see pillar details</div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
