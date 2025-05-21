import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DomainContentDisplay } from "@/components/domain-content"

export const metadata = {
  title: "Knowledge & Data Governance - Initial | Legal IT Maturity",
  description: "Implementation guide for Knowledge & Data Governance at the Initial maturity level",
}

export default function KnowledgeDataInitialPage() {
  // Get domain content
  const content = {
    title: "Knowledge & Data Governance — Initial (1.0–1.9)",
    description: "Implementation guide for Knowledge & Data Governance at the Initial maturity level",
    whatThisMeans:
      "Your firm currently lacks formal knowledge and data governance practices. Information is often siloed, inconsistently tagged, and managed informally. There are limited or no policies for data ownership, structure, or lifecycle management.",
    priorities: [
      "Identify Core Knowledge and Data Assets",
      "Assign Ownership for Knowledge Governance",
      "Create a Basic File and Folder Structure Policy",
      "Clean Up Critical Repositories",
      "Draft an Initial Data Governance Charter",
    ],
    templates: [
      "Knowledge Asset Inventory Sheet",
      "Data Ownership Matrix",
      "Folder Structure & Naming Convention Guide",
      "Data Governance Charter Template",
    ],
    quickWins: [
      "Inventory your top 10 shared folders for cleanup and tagging",
      "Identify the top 3 areas where duplicated or incorrect data causes friction",
      "Run a pilot data hygiene review for one practice group",
      "Assign a single point of contact for DMS or template management",
    ],
    relatedLinks: [
      { text: "View Knowledge & Data Governance Overview", href: "/playbook/domains/knowledge-data" },
      { text: "Jump to Roadmap Phase 1: Discovery & Assessment", href: "/playbook/roadmap" },
      { text: "Download Initial Toolkit", href: "#" },
    ],
  }

  return (
    <div className="container max-w-4xl py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="bg-amber-200 p-1 rounded-full">
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
              className="text-amber-700"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-amber-800">Initial Maturity Level</h3>
            <p className="text-amber-800 text-sm mt-1">
              This guide is for organizations at the Initial maturity level (1.0-1.9). Focus on establishing basic
              processes and controls before advancing to higher maturity levels.
            </p>
          </div>
        </div>
      </div>

      <DomainContentDisplay content={content} />

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/knowledge-data">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Knowledge & Data Governance Overview
          </Button>
        </Link>

        <Link href="/playbook/domains/knowledge-data/developing">
          <Button className="gap-2">
            Next: Developing Maturity Level
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
