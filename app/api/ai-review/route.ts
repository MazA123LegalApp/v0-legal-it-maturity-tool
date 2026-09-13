import { generateObject, gateway } from "ai"
import { z } from "zod"
import { domains, dimensions, type AssessmentResult } from "@/lib/assessment-data"

const requestSchema = z.object({
  results: z.record(
    z.object({
      people: z.number().min(0).max(5),
      process: z.number().min(0).max(5),
      tooling: z.number().min(0).max(5),
      data: z.number().min(0).max(5),
      improvement: z.number().min(0).max(5),
    }),
  ),
  context: z.record(z.string().max(2000)).default({}),
  domains: z.array(z.string()).min(1).max(8),
})

const reviewSchema = z.object({
  reviews: z.array(
    z.object({
      domainId: z.string(),
      executiveSummary: z.string().min(1).max(900),
      strengths: z.array(z.string().min(1).max(240)).min(1).max(4),
      risks: z.array(z.string().min(1).max(240)).min(1).max(4),
      recommendedActions: z.array(z.string().min(1).max(300)).min(1).max(4),
      evidenceGaps: z.array(z.string().min(1).max(240)).max(4),
      confidence: z.enum(["low", "moderate", "high"]),
    }),
  ),
})

const reviewDomains = new Set(["cybersecurity", "risk-compliance", "continuity-resilience"])

export async function POST(request: Request) {
  try {
    const parsed = requestSchema.safeParse(await request.json())
    if (!parsed.success) {
      return Response.json({ error: "Invalid assessment review request." }, { status: 400 })
    }

    const selectedDomains = parsed.data.domains.filter((id) => reviewDomains.has(id))
    if (!selectedDomains.length) {
      return Response.json({ error: "No supported AI review domains were selected." }, { status: 400 })
    }

    const domainPayload = selectedDomains.map((id) => {
      const domain = domains.find((item) => item.id === id)
      return {
        id,
        name: domain?.name ?? id,
        description: domain?.description ?? "",
        scores: parsed.data.results[id as keyof AssessmentResult] ?? {},
        writtenContext: parsed.data.context[id] || "No written context provided.",
      }
    })

    const result = await generateObject({
      model: gateway("openai/o4-mini"),
      schema: reviewSchema,
      system: `You are a senior legal-sector IT governance and cybersecurity review panel. Review maturity assessment inputs for a law firm. Produce evidence-bound, decision-useful observations, not legal advice and not a certification. Never invent controls, incidents, policies, benchmarks, or evidence. Treat scores as self-reported indicators. Separate observed strengths, risks, recommended next actions, and evidence gaps. Recommend practical actions suitable for a legal organization handling confidential client data. ${JSON.stringify(dimensions)}`,
      prompt: `Review these assessment domains and return one structured review for each selected domain:\n${JSON.stringify(domainPayload, null, 2)}\n\nUse cautious language when written evidence is absent. Prioritize materiality, confidentiality, resilience, and accountability.`,
      temperature: 0.2,
    })

    return Response.json({
      ...result.object,
      metadata: {
        reviewedAt: new Date().toISOString(),
        model: "openai/o4-mini",
        reviewType: "AI-assisted domain review",
        reviewedDomains: selectedDomains,
        humanValidationRequired: true,
      },
    })
  } catch (error) {
    console.error("[v0] AI domain review failed", error)
    return Response.json({ error: "The AI review could not be completed. Please try again." }, { status: 502 })
  }
}

export const runtime = "nodejs"
export const maxDuration = 60
