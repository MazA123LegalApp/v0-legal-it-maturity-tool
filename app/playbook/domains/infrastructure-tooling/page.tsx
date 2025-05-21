import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export const metadata = {
  title: "Infrastructure & Tooling | Legal IT Maturity",
  description: "Infrastructure & Tooling domain overview and implementation guides",
}

export default function InfrastructureToolingPage() {
  return (
    <DomainOverviewTemplate
      domainId="infrastructure-tooling"
      title="Infrastructure & Tooling"
      description="Assesses the health, scalability, and strategic value of your technology stack."
      keyAreas={[
        "Infrastructure Architecture: Designing resilient technology foundations",
        "Technology Stack Management: Maintaining and optimizing IT components",
        "Capacity & Performance: Ensuring systems meet demand",
        "Monitoring & Alerting: Detecting and responding to issues",
        "Technology Lifecycle: Managing from acquisition to retirement",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc infrastructure with minimal documentation and reactive maintenance.",
          link: "/playbook/domains/infrastructure-tooling/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic infrastructure management with some documentation and inconsistent practices.",
          link: "/playbook/domains/infrastructure-tooling/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined infrastructure architecture with consistent monitoring and regular reviews.",
          link: "/playbook/domains/infrastructure-tooling/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured infrastructure performance with proactive capacity planning and optimization.",
          link: "/playbook/domains/infrastructure-tooling/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic infrastructure management with automated scaling and continuous innovation.",
          link: "/playbook/domains/infrastructure-tooling/optimized",
        },
      ]}
    />
  )
}
