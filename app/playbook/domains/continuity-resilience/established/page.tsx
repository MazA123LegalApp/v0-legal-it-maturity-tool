import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DomainContentDisplay } from "@/components/domain-content"

export const metadata = {
  title: "Service Continuity & Resilience - Established | Legal IT Maturity",
  description: "Implementation guide for Service Continuity & Resilience at the Established maturity level",
}

export default function ContinuityResilienceEstablishedPage() {
  // Get domain content
  const content = {
    title: "Service Continuity & Resilience — Established (3.0–3.9)",
    description: "Implementation guide for Service Continuity & Resilience at the Established maturity level",
    whatThisMeans:
      "Your firm has comprehensive continuity plans that cover most critical systems and scenarios. Recovery procedures are documented and tested periodically, and staff are aware of their roles during disruptions.",
    priorities: [
      "Implement Integrated Continuity Management",
      "Develop Advanced Recovery Testing",
      "Establish Resilience Metrics",
      "Create Vendor Continuity Requirements",
      "Implement Crisis Management Protocols",
    ],
    templates: [
      "Integrated Continuity Management Framework",
      "Advanced Recovery Testing Scenarios",
      "Resilience Metrics Dashboard",
      "Vendor Continuity Requirements Template",
      "Crisis Management Playbook",
    ],
    quickWins: [
      "Conduct a full recovery test for one critical system",
      "Implement resilience metrics for your top 3 systems",
      "Review and update vendor continuity requirements",
      "Run a crisis management tabletop exercise",
    ],
    relatedLinks: [
      { text: "View Service Continuity & Resilience Overview", href: "/playbook/domains/continuity-resilience" },
      { text: "Jump to Roadmap Phase 3: Foundations & Quick Wins", href: "/playbook/roadmap?phase=3" },
      { text: "Download Established Toolkit", href: "#" },
    ],
  }

  return (
    <div className="container max-w-4xl py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="bg-green-200 p-1 rounded-full">
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
              className="text-green-700"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-green-800">Established Maturity Level</h3>
            <p className="text-green-800 text-sm mt-1">
              This guide is for organizations at the Established maturity level (3.0-3.9). Focus on integrating
              continuity management across the organization and implementing advanced testing protocols.
            </p>
          </div>
        </div>
      </div>

      <DomainContentDisplay content={content} />

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/continuity-resilience/developing">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous: Developing Maturity Level
          </Button>
        </Link>

        <Link href="/playbook/domains/continuity-resilience/managed">
          <Button className="gap-2">
            Next: Managed Maturity Level
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
