import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DomainContentDisplay } from "@/components/domain-content"

export const metadata = {
  title: "Service Continuity & Resilience - Developing | Legal IT Maturity",
  description: "Implementation guide for Service Continuity & Resilience at the Developing maturity level",
}

export default function ContinuityResilienceDevelopingPage() {
  // Get domain content
  const content = {
    title: "Service Continuity & Resilience — Developing (2.0–2.9)",
    description: "Implementation guide for Service Continuity & Resilience at the Developing maturity level",
    whatThisMeans:
      "Your firm has begun to establish basic continuity plans, but they may be inconsistent or incomplete. Some recovery procedures exist, but testing is limited, and there may be gaps in coverage for critical systems or scenarios.",
    priorities: [
      "Complete a Business Impact Analysis (BIA)",
      "Develop a Comprehensive Business Continuity Plan",
      "Establish Recovery Time Objectives (RTOs)",
      "Create System-Specific Recovery Procedures",
      "Implement Regular Testing Protocols",
    ],
    templates: [
      "Business Impact Analysis Template",
      "Business Continuity Plan Framework",
      "RTO/RPO Definition Worksheet",
      "System Recovery Procedure Template",
      "Continuity Testing Schedule",
    ],
    quickWins: [
      "Conduct a tabletop exercise for a critical system outage",
      "Document recovery procedures for your document management system",
      "Establish RTOs for your top 5 critical applications",
      "Create a communication tree for emergency notifications",
    ],
    relatedLinks: [
      { text: "View Service Continuity & Resilience Overview", href: "/playbook/domains/continuity-resilience" },
      { text: "Jump to Roadmap Phase 2: Planning & Governance", href: "/playbook/roadmap?phase=2" },
      { text: "Download Developing Toolkit", href: "#" },
    ],
  }

  return (
    <div className="container max-w-4xl py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="bg-blue-200 p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-700"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Developing Maturity Level</h3>
            <p className="text-blue-800 text-sm mt-1">
              This guide is for organizations at the Developing maturity level (2.0-2.9). Focus on formalizing
              continuity plans and establishing recovery objectives before advancing to higher maturity levels.
            </p>
          </div>
        </div>
      </div>

      <DomainContentDisplay content={content} />

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/continuity-resilience/initial">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous: Initial Maturity Level
          </Button>
        </Link>

        <Link href="/playbook/domains/continuity-resilience/established">
          <Button className="gap-2">
            Next: Established Maturity Level
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
