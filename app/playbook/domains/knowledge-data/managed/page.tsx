import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DomainContentDisplay } from "@/components/domain-content"

export const metadata = {
  title: "Knowledge & Data Governance - Managed | Legal IT Maturity",
  description: "Implementation guide for Knowledge & Data Governance at the Managed maturity level",
}

export default function KnowledgeDataManagedPage() {
  // Get domain content
  const content = {
    title: "Knowledge & Data Governance — Managed (4.0–4.4)",
    description: "Implementation guide for Knowledge & Data Governance at the Managed maturity level",
    whatThisMeans:
      "Your firm has mature knowledge and data governance practices. Policies are well-documented, consistently followed, and regularly reviewed. Data ownership is clearly defined with accountability mechanisms. Knowledge sharing is embedded in the organizational culture, and data quality is actively monitored.",
    priorities: [
      "Implement Advanced Analytics for Knowledge Assets",
      "Develop Comprehensive Data Lineage Tracking",
      "Establish Cross-System Knowledge Integration",
      "Create Proactive Data Quality Management",
      "Implement Knowledge Performance Metrics",
    ],
    templates: [
      "Knowledge Analytics Framework",
      "Data Lineage Documentation Template",
      "Cross-System Integration Architecture",
      "Data Quality Management Plan",
      "Knowledge Performance Scorecard",
    ],
    quickWins: [
      "Implement a knowledge analytics dashboard for one practice area",
      "Document data lineage for one critical system",
      "Create a data quality management plan for client data",
      "Develop knowledge performance metrics for one department",
    ],
    relatedLinks: [
      { text: "View Knowledge & Data Governance Overview", href: "/playbook/domains/knowledge-data" },
      { text: "Jump to Roadmap Phase 4: Transformation Projects", href: "/playbook/roadmap?phase=4" },
      { text: "Download Managed Toolkit", href: "#" },
    ],
  }

  return (
    <div className="container max-w-4xl py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="bg-purple-200 p-1 rounded-full">
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
              className="text-purple-700"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-purple-800">Managed Maturity Level</h3>
            <p className="text-purple-800 text-sm mt-1">
              This guide is for organizations at the Managed maturity level (4.0-4.4). Focus on optimizing and measuring
              the effectiveness of your knowledge and data governance practices.
            </p>
          </div>
        </div>
      </div>

      <DomainContentDisplay content={content} />

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/knowledge-data/established">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous: Established Maturity Level
          </Button>
        </Link>

        <Link href="/playbook/domains/knowledge-data/optimized">
          <Button className="gap-2">
            Next: Optimized Maturity Level
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
