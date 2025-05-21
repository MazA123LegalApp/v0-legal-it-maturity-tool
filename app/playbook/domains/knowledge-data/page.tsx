import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export const metadata = {
  title: "Knowledge & Data Governance | Legal IT Maturity",
  description: "Knowledge & Data Governance domain overview and implementation guides",
}

export default function KnowledgeDataPage() {
  return (
    <DomainOverviewTemplate
      domainId="knowledge-data"
      title="Knowledge & Data Governance"
      description="Assesses how information is structured, governed, and maintained."
      keyAreas={[
        "Data Classification & Taxonomy: Organizing and categorizing information",
        "Information Lifecycle Management: Managing data from creation to deletion",
        "Knowledge Sharing & Collaboration: Enabling information exchange",
        "Data Quality & Integrity: Ensuring accuracy and consistency",
        "Information Security & Privacy: Protecting sensitive data",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc data management with minimal structure and inconsistent practices.",
          link: "/playbook/domains/knowledge-data/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic data organization with some policies and reactive governance.",
          link: "/playbook/domains/knowledge-data/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined data governance with consistent taxonomy and regular quality reviews.",
          link: "/playbook/domains/knowledge-data/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured data quality with proactive governance and integrated lifecycle management.",
          link: "/playbook/domains/knowledge-data/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic knowledge management with predictive analytics and continuous innovation.",
          link: "/playbook/domains/knowledge-data/optimized",
        },
      ]}
    />
  )
}
