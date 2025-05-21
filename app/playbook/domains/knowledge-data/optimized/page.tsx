import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DomainContentDisplay } from "@/components/domain-content"

export const metadata = {
  title: "Knowledge & Data Governance - Optimized | Legal IT Maturity",
  description: "Implementation guide for Knowledge & Data Governance at the Optimized maturity level",
}

export default function KnowledgeDataOptimizedPage() {
  // Get domain content
  const content = {
    title: "Knowledge & Data Governance — Optimized (4.5–5.0)",
    description: "Implementation guide for Knowledge & Data Governance at the Optimized maturity level",
    whatThisMeans:
      "Your firm has exemplary knowledge and data governance practices. Governance is fully integrated into business processes, with continuous improvement mechanisms. Knowledge sharing is a competitive advantage, and data quality is proactively managed with advanced analytics and automation.",
    priorities: [
      "Implement AI-Enhanced Knowledge Discovery",
      "Develop Predictive Data Quality Management",
      "Establish Automated Knowledge Lifecycle Management",
      "Create Advanced Knowledge Analytics",
      "Implement Cross-Organizational Knowledge Sharing",
    ],
    templates: [
      "AI Knowledge Discovery Framework",
      "Predictive Data Quality Model",
      "Automated Knowledge Lifecycle Workflow",
      "Advanced Knowledge Analytics Dashboard",
      "Cross-Organizational Knowledge Sharing Program",
    ],
    quickWins: [
      "Pilot an AI-enhanced knowledge discovery tool for one practice area",
      "Implement predictive data quality monitoring for one critical system",
      "Develop an automated knowledge lifecycle workflow for one document type",
      "Create an advanced knowledge analytics dashboard for leadership",
    ],
    relatedLinks: [
      { text: "View Knowledge & Data Governance Overview", href: "/playbook/domains/knowledge-data" },
      { text: "Jump to Roadmap Phase 5: Optimization & Scale", href: "/playbook/roadmap?phase=5" },
      { text: "Download Optimized Toolkit", href: "#" },
    ],
  }

  return (
    <div className="container max-w-4xl py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-200 p-1 rounded-full">
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
              className="text-indigo-700"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-indigo-800">Optimized Maturity Level</h3>
            <p className="text-indigo-800 text-sm mt-1">
              This guide is for organizations at the Optimized maturity level (4.5-5.0). Focus on innovation and
              continuous improvement of your knowledge and data governance practices.
            </p>
          </div>
        </div>
      </div>

      <DomainContentDisplay content={content} />

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/knowledge-data/managed">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous: Managed Maturity Level
          </Button>
        </Link>

        <Link href="/playbook/domains/knowledge-data">
          <Button className="gap-2">
            Back to Knowledge & Data Governance Overview
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
