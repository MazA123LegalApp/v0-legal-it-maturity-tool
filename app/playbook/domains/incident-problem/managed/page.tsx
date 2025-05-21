import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DomainContentDisplay } from "@/components/domain-content"

export const metadata = {
  title: "Incident & Problem Management - Managed | Legal IT Maturity",
  description: "Implementation guide for Incident & Problem Management at the Managed maturity level",
}

export default function IncidentProblemManagedPage() {
  // Get domain content
  const content = {
    title: "Incident & Problem Management — Managed (4.0–4.4)",
    description: "Implementation guide for Incident & Problem Management at the Managed maturity level",
    whatThisMeans:
      "Your firm has mature incident and problem management processes. Incidents are efficiently handled with minimal business impact. Problem management is proactive, with a focus on preventing incidents before they occur.",
    priorities: [
      "Implement Predictive Incident Management",
      "Develop Advanced Root Cause Analysis",
      "Establish Service Improvement from Incidents",
      "Create Integrated Incident and Problem Management",
      "Implement Automated Incident Resolution",
    ],
    templates: [
      "Predictive Incident Management Framework",
      "Advanced Root Cause Analysis Methodology",
      "Service Improvement Process",
      "Integrated Incident and Problem Management Guide",
      "Automated Incident Resolution Architecture",
    ],
    quickWins: [
      "Implement predictive analytics for incident patterns",
      "Enhance root cause analysis methodologies",
      "Establish a service improvement process based on incident data",
      "Automate resolution for common incidents",
    ],
    relatedLinks: [
      { text: "View Incident & Problem Management Overview", href: "/playbook/domains/incident-problem" },
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
              This guide is for organizations at the Managed maturity level (4.0-4.4). Focus on predictive incident
              management and advanced root cause analysis.
            </p>
          </div>
        </div>
      </div>

      <DomainContentDisplay content={content} />

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/incident-problem/established">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous: Established Maturity Level
          </Button>
        </Link>

        <Link href="/playbook/domains/incident-problem/optimized">
          <Button className="gap-2">
            Next: Optimized Maturity Level
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
