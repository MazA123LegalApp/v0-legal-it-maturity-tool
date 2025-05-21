import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export const metadata = {
  title: "Knowledge & Data Management | Legal IT Maturity",
  description: "Knowledge & Data Management domain overview and implementation guides",
}

export default function KnowledgeDataPage() {
  return (
    <DomainOverviewTemplate
      domainId="knowledge-data"
      title="Knowledge & Data Management"
      description="Evaluates how effectively your organization captures, stores, and utilizes information."
      keyAreas={[
        "Knowledge Base: Capturing and sharing organizational knowledge",
        "Data Governance: Establishing data policies and standards",
        "Information Architecture: Structuring data for accessibility",
        "Data Quality: Ensuring accuracy and reliability of information",
        "Knowledge Sharing: Promoting collaboration and information exchange",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc knowledge management with minimal documentation and inconsistent practices.",
          link: "/playbook/domains/knowledge-data/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic knowledge repositories with some documentation and reactive data management.",
          link: "/playbook/domains/knowledge-data/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined knowledge framework with consistent data governance and regular reviews.",
          link: "/playbook/domains/knowledge-data/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured knowledge performance with proactive data quality management and integration.",
          link: "/playbook/domains/knowledge-data/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic knowledge management with advanced analytics and continuous improvement.",
          link: "/playbook/domains/knowledge-data/optimized",
        },
      ]}
    />
  )
}
