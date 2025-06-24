"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MaturityBand } from "@/lib/assessment-data"

// Define the expected props interface
export interface MaturityClassification {
  overallScore: number
  overallBand: MaturityBand
  weakestDomains?: string[] | { name: string; score: number }[]
  strongestDomains?: string[] | { name: string; score: number }[]
  domainScores?: Record<string, number>
}

interface MaturitySummaryProps {
  classification?: MaturityClassification
  // For backward compatibility
  overallScore?: number
  overallBand?: MaturityBand
  weakestDomains?: string[] | { name: string; score: number }[]
  strongestDomains?: string[] | { name: string; score: number }[]
}

export function MaturitySummary(props: MaturitySummaryProps) {
  // Handle both new and old prop structures
  const classification = props.classification || props

  // Extract data safely with fallbacks
  const overallScore = classification.overallScore || 0
  const overallBand = classification.overallBand || "Initial"

  // Handle different formats of domain arrays
  const weakestDomains = classification.weakestDomains || []
  const strongestDomains = classification.strongestDomains || []

  // Helper function to safely get domain names
  const getDomainName = (domain: any): string => {
    if (typeof domain === "string") return domain
    if (domain && typeof domain === "object" && domain.name) return domain.name
    return "Unknown Domain"
  }

  // Get color based on maturity level
  const getBandColor = (band: MaturityBand): string => {
    switch (band) {
      case "Initial":
        return "bg-red-100 text-red-800"
      case "Developing":
        return "bg-orange-100 text-orange-800"
      case "Established":
        return "bg-yellow-100 text-yellow-800"
      case "Managed":
        return "bg-blue-100 text-blue-800"
      case "Optimized":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maturity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Overall Maturity Score</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{overallScore.toFixed(1)}</span>
              <Badge className={`${getBandColor(overallBand)} px-3 py-1`}>{overallBand}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Areas for Improvement</h3>
            <ul className="list-disc pl-5 space-y-1">
              {Array.isArray(weakestDomains) && weakestDomains.length > 0 ? (
                weakestDomains.map((domain, index) => <li key={`weak-${index}`}>{getDomainName(domain)}</li>)
              ) : (
                <li>No specific areas identified</li>
              )}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Strongest Areas</h3>
            <ul className="list-disc pl-5 space-y-1">
              {Array.isArray(strongestDomains) && strongestDomains.length > 0 ? (
                strongestDomains.map((domain, index) => <li key={`strong-${index}`}>{getDomainName(domain)}</li>)
              ) : (
                <li>No specific areas identified</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
