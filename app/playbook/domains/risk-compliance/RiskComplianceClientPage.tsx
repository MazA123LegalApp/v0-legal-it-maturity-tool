"use client"

import { DomainOverviewTemplate } from "@/components/domain-overview-template"

const RiskComplianceClientPage = () => {
  return (
    <DomainOverviewTemplate
      domainId="risk-compliance"
      title="Risk & Compliance"
      description="Evaluates how effectively your organization manages legal and regulatory risks."
      keyAreas={[
        "Risk Assessment: Identifying and evaluating potential risks",
        "Compliance Management: Ensuring adherence to laws and regulations",
        "Policy Governance: Establishing and enforcing organizational policies",
        "Audit Management: Conducting and responding to audits",
        "Vendor Risk Management: Assessing and managing third-party risks",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc risk management with minimal documentation and inconsistent practices.",
          link: "/playbook/domains/risk-compliance/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic risk controls with some documentation and reactive compliance management.",
          link: "/playbook/domains/risk-compliance/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined risk framework with consistent controls and regular compliance assessments.",
          link: "/playbook/domains/risk-compliance/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured risk performance with proactive compliance monitoring and integrated controls.",
          link: "/playbook/domains/risk-compliance/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic risk program with predictive analytics and continuous adaptation.",
          link: "/playbook/domains/risk-compliance/optimized",
        },
      ]}
    />
  )
}

export default RiskComplianceClientPage
