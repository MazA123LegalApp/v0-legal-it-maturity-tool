import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export const metadata = {
  title: "Incident & Problem Management | Legal IT Maturity",
  description: "Incident & Problem Management domain overview and implementation guides",
}

export default function IncidentProblemPage() {
  return (
    <DomainOverviewTemplate
      domainId="incident-problem"
      title="Incident & Problem Management"
      description="Focuses on how effectively your organization responds to and resolves IT disruptions."
      keyAreas={[
        "Incident Response: Quickly addressing and resolving disruptions",
        "Problem Identification: Finding root causes of recurring incidents",
        "Escalation Procedures: Routing issues to appropriate resources",
        "Service Restoration: Minimizing downtime and business impact",
        "Incident Prevention: Proactively addressing potential issues",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc incident response with minimal documentation and inconsistent practices.",
          link: "/playbook/domains/incident-problem/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic incident tracking with some documentation and reactive problem management.",
          link: "/playbook/domains/incident-problem/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined incident processes with consistent problem analysis and regular reviews.",
          link: "/playbook/domains/incident-problem/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured incident performance with proactive problem prevention and integrated management.",
          link: "/playbook/domains/incident-problem/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description:
            "Strategic incident and problem management with predictive analytics and continuous improvement.",
          link: "/playbook/domains/incident-problem/optimized",
        },
      ]}
    />
  )
}
