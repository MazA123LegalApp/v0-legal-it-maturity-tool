"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, FileSearch, Loader2, ShieldCheck, Sparkles } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { domains, type AssessmentResult } from "@/lib/assessment-data"

type Review = {
  domainId: string
  executiveSummary: string
  strengths: string[]
  risks: string[]
  recommendedActions: string[]
  evidenceGaps: string[]
  confidence: "low" | "moderate" | "high"
}

type ReviewResponse = {
  reviews: Review[]
  metadata: { reviewedAt: string; model: string; reviewedDomains: string[]; humanValidationRequired: boolean }
}

const reviewedDomainIds = ["cybersecurity", "risk-compliance", "continuity-resilience"]

export function AIDomainReview({ results, context }: { results: AssessmentResult; context: Record<string, string> }) {
  const [review, setReview] = useState<ReviewResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function runReview() {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/ai-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results, context, domains: reviewedDomainIds }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "AI review failed")
      setReview(data)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "AI review failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="gap-4 bg-primary/[0.03]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-5" aria-hidden="true" />
            </div>
            <div>
              <CardTitle>AI-assisted domain review</CardTitle>
              <CardDescription className="mt-1 max-w-2xl leading-relaxed">
                A governed review panel will analyze Cybersecurity, Risk and Compliance, and Business Continuity using your scores and written context.
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="w-fit gap-1.5 border-primary/30 text-primary">
            <ShieldCheck className="size-3.5" aria-hidden="true" /> Human validation required
          </Badge>
        </div>
        <Alert>
          <AlertCircle className="size-4" aria-hidden="true" />
          <AlertTitle>Decision support, not automated certification</AlertTitle>
          <AlertDescription>
            AI findings are evidence-bound recommendations. They do not change your maturity scores, certify compliance, or replace legal, security, or executive review.
          </AlertDescription>
        </Alert>
        <Button onClick={runReview} disabled={isLoading} className="w-fit">
          {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" /> : <Sparkles className="mr-2 size-4" aria-hidden="true" />}
          {isLoading ? "Reviewing selected domains..." : review ? "Run review again" : "Run AI domain review"}
        </Button>
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      </CardHeader>

      {review && (
        <CardContent className="flex flex-col gap-6 pt-6">
          <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>Reviewed {new Date(review.metadata.reviewedAt).toLocaleString()}</span>
            <span>Model: {review.metadata.model}</span>
          </div>
          {review.reviews.map((item) => {
            const domain = domains.find((candidate) => candidate.id === item.domainId)
            return (
              <article key={item.domainId} className="rounded-xl border bg-background p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold">{domain?.name ?? item.domainId}</h3>
                  <Badge variant={item.confidence === "high" ? "default" : "secondary"}>
                    {item.confidence} confidence
                  </Badge>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.executiveSummary}</p>
                <Separator className="my-5" />
                <div className="grid gap-5 lg:grid-cols-2">
                  <ReviewList title="Observed strengths" icon={<CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />} items={item.strengths} />
                  <ReviewList title="Material risks" icon={<AlertCircle className="size-4 text-amber-600" aria-hidden="true" />} items={item.risks} />
                  <ReviewList title="Recommended next actions" icon={<ShieldCheck className="size-4 text-primary" aria-hidden="true" />} items={item.recommendedActions} />
                  <ReviewList title="Evidence gaps" icon={<FileSearch className="size-4 text-muted-foreground" aria-hidden="true" />} items={item.evidenceGaps.length ? item.evidenceGaps : ["No additional evidence gaps identified from the submitted context."]} />
                </div>
              </article>
            )
          })}
          <p className="text-xs leading-relaxed text-muted-foreground">
            Governance note: retain the underlying evidence, have a qualified reviewer validate each finding, and record accepted or rejected recommendations before using this output in an executive or client-facing decision.
          </p>
        </CardContent>
      )}
    </Card>
  )
}

function ReviewList({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-sm font-semibold">{icon}{title}</h4>
      <ul className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
        {items.map((item) => <li key={item} className="list-disc pl-4">{item}</li>)}
      </ul>
    </div>
  )
}
