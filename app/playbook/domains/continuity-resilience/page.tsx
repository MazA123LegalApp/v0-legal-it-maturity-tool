import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export const metadata = {
  title: "Continuity & Resilience | Legal IT Maturity",
  description: "Continuity & Resilience domain overview and implementation guides",
}

export default function ContinuityResiliencePage() {
  return (
    <DomainOverviewTemplate
      domainId="continuity-resilience"
      title="Continuity & Resilience"
      description="Evaluates how well your organization can maintain operations during disruptions."
      keyAreas={[
        "Business Continuity Planning: Preparing for operational disruptions",
        "Disaster Recovery: Restoring systems after major incidents",
        "Resilience Testing: Validating recovery capabilities",
        "Crisis Management: Coordinating responses to major disruptions",
        "Business Impact Analysis: Identifying critical functions and dependencies",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc continuity measures with minimal documentation and inconsistent practices.",
          link: "/playbook/domains/continuity-resilience/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic continuity plans with some documentation and reactive resilience management.",
          link: "/playbook/domains/continuity-resilience/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined continuity framework with consistent testing and regular resilience reviews.",
          link: "/playbook/domains/continuity-resilience/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured continuity performance with proactive resilience planning and integrated management.",
          link: "/playbook/domains/continuity-resilience/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic continuity and resilience program with advanced testing and continuous improvement.",
          link: "/playbook/domains/continuity-resilience/optimized",
        },
      ]}
    />
  )
}
