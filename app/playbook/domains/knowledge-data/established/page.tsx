import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DomainContentDisplay } from "@/components/domain-content"

export const metadata = {
  title: "Knowledge & Data Governance - Established | Legal IT Maturity",
  description: "Implementation guide for Knowledge & Data Governance at the Established maturity level",
}

export default function KnowledgeDataEstablishedPage() {
  // Get domain content
  const content = {
    title: "Knowledge & Data Governance — Established (3.0–3.9)",
    description: "Implementation guide for Knowledge & Data Governance at the Established maturity level",
    whatThisMeans:
      "Your firm has implemented formal knowledge and data governance practices. Policies are documented and generally followed, data ownership is clearly defined, and there are consistent approaches to document management and knowledge sharing across most of the organization.",
    priorities: [
      "Implement Enterprise-wide Data Governance",
      "Enhance Document Management System Integration",
      "Develop Advanced Metadata and Taxonomy",
      "Establish Knowledge Sharing Platforms",
      "Create Data Quality Monitoring",
    ],
    templates: [
      "Enterprise Data Governance Charter",
      "DMS Integration Requirements Template",
      "Legal Taxonomy Framework",
      "Knowledge Sharing Platform Requirements",
      "Data Quality Metrics Dashboard",
    ],
    quickWins: [
      "Conduct a metadata audit of your document management system",
      "Implement a knowledge sharing session for one practice area",
      "Create a data quality dashboard for one critical system",
      "Develop a taxonomy for one practice area's documents",
    ],
    relatedLinks: [
      { text: "View Knowledge & Data Governance Overview", href: "/playbook/domains/knowledge-data" },
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
              This guide is for organizations at the Established maturity level (3.0-3.9). Focus on enhancing and
              integrating your knowledge and data governance practices across the organization.
            </p>
          </div>
        </div>
      </div>

      <DomainContentDisplay content={content} />

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/knowledge-data/developing">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous: Developing Maturity Level
          </Button>
        </Link>

        <Link href="/playbook/domains/knowledge-data/managed">
          <Button className="gap-2">
            Next: Managed Maturity Level
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
