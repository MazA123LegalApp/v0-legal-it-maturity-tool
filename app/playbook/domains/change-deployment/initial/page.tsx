import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DomainContentDisplay } from "@/components/domain-content"

export const metadata = {
  title: "Change & Deployment - Initial | Legal IT Maturity",
  description: "Implementation guide for Change & Deployment at the Initial maturity level",
}

export default function ChangeDeploymentInitialPage() {
  // Get domain content
  const content = {
    title: "Change & Deployment — Initial (1.0–1.9)",
    description: "Implementation guide for Change & Deployment at the Initial maturity level",
    whatThisMeans:
      "Your firm currently lacks a formal process for introducing, testing, and releasing IT changes. Changes may be made directly in production with little documentation, stakeholder communication, or peer review. Disruptions are common, and rollback procedures are unclear or non-existent.",
    priorities: [
      "Create a Basic Change Request and Approval Form",
      "Assign a Change Coordinator or Governance Role",
      "Establish a Weekly Change Review Meeting",
      "Log All Changes in a Shared Register",
      "Introduce a Rollback Plan Requirement",
    ],
    templates: [
      "Basic Change Request Form",
      "Change Register Spreadsheet",
      "Weekly Change Review Agenda",
      "Rollback Plan Template",
    ],
    quickWins: [
      "Identify the top 3 business-critical systems that should never be changed live without review",
      "Hold your first change review meeting with IT and operations",
      "Log last month's major changes and assess any issues that resulted",
      "Standardize naming for system deployments or patch cycles",
    ],
    relatedLinks: [
      { text: "View Change & Deployment Overview", href: "/playbook/domains/change-deployment" },
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
        <Link href="/playbook/domains/change-deployment">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Change & Deployment Overview
          </Button>
        </Link>

        <Link href="/playbook/domains/change-deployment/developing">
          <Button className="gap-2">
            Next: Developing Maturity Level
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
