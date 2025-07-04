"use client"

import Link from "next/link"
import { ArrowRight, BarChart4 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { domains } from "@/lib/assessment-data"

interface MaturitySummaryProps {
  classification?: {
    overallScore: number
    overallBand: string
    weakestDomains?: string[] | { domain: string; score: number }[]
    strongestDomains?: string[] | { domain: string; score: number }[]
    domainScores?: Record<string, number>
  }
}

export function MaturitySummary({ classification }: MaturitySummaryProps) {
  // Provide safe defaults
  const overallScore = classification?.overallScore || 0
  const overallBand = classification?.overallBand || "Initial"
  const weakestDomains = classification?.weakestDomains || []
  const strongestDomains = classification?.strongestDomains || []

  // Helper function to safely get domain name
  const getDomainName = (item: any): string => {
    if (typeof item === "string") {
      return item
    }
    if (item && typeof item === "object") {
      if (item.domain) {
        const domain = domains.find((d) => d.id === item.domain)
        return domain ? domain.name : item.domain
      }
      if (item.name) {
        return item.name
      }
    }
    return "Unknown Domain"
  }

  // Helper function to safely get domain score
  const getDomainScore = (item: any): number | null => {
    if (item && typeof item === "object" && typeof item.score === "number") {
      return item.score
    }
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Maturity Summary</CardTitle>
          <CardDescription>Your organization's IT maturity assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Overall Maturity Score</h3>
                <span className="font-medium">{overallScore.toFixed(1)}/5.0</span>
              </div>
              <Progress value={overallScore * 20} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Your organization is at the <span className="font-medium">{overallBand}</span> maturity level overall.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Areas for Improvement</h3>
                {Array.isArray(weakestDomains) && weakestDomains.length > 0 ? (
                  <ul className="space-y-2">
                    {weakestDomains.map((domain, index) => {
                      const domainName = getDomainName(domain)
                      const domainScore = getDomainScore(domain)
                      return (
                        <li key={`weak-${index}`} className="flex justify-between items-center">
                          <span>{domainName}</span>
                          {domainScore !== null && <span className="font-medium">{domainScore.toFixed(1)}</span>}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Complete the assessment to identify areas for improvement.
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-3">Strongest Areas</h3>
                {Array.isArray(strongestDomains) && strongestDomains.length > 0 ? (
                  <ul className="space-y-2">
                    {strongestDomains.map((domain, index) => {
                      const domainName = getDomainName(domain)
                      const domainScore = getDomainScore(domain)
                      return (
                        <li key={`strong-${index}`} className="flex justify-between items-center">
                          <span>{domainName}</span>
                          {domainScore !== null && <span className="font-medium">{domainScore.toFixed(1)}</span>}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Complete the assessment to identify your strongest areas.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/playbook" className="w-full">
            <Button variant="default" className="w-full gap-2">
              View Playbook Recommendations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>Recommended actions based on your assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-700 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium">Review Domain-Specific Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Explore detailed recommendations for each domain based on your maturity level.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-700 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium">Download Relevant Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Access templates and tools tailored to your maturity level for each domain.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-700 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium">Create an Improvement Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Develop a roadmap for improving your weakest domains using the playbook guidance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-700 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-medium">Reassess in 6-12 Months</h3>
                <p className="text-sm text-muted-foreground">
                  Track your progress by retaking the assessment after implementing improvements.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-3 w-full">
            <Link href="/maturity/assessment" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <BarChart4 className="h-4 w-4" />
                Retake Assessment
              </Button>
            </Link>
            <Link href="/playbook/roadmap" className="flex-1">
              <Button variant="default" className="w-full gap-2">
                View Implementation Roadmap
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
