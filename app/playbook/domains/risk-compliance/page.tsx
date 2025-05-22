import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export const metadata = {
  title: "Risk & Compliance | Legal IT Maturity",
  description: "Risk & Compliance domain overview and implementation guides",
}

export default function RiskCompliancePage() {
  return (
    <DomainOverviewTemplate
      domainId="risk-compliance"
      title="Risk & Compliance"
      description="Assesses the effectiveness of your risk management and compliance efforts."
      keyAreas={[
        "Risk Assessment: Identifying and evaluating potential risks",
        "Compliance Framework: Establishing policies and procedures",
        "Monitoring & Reporting: Tracking compliance activities",
        "Audit Management: Conducting regular audits",
        "Policy Enforcement: Ensuring adherence to policies",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc risk management with minimal documentation and inconsistent practices.",
          link: "/playbook/domains/risk-compliance/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic risk assessments with some documentation and reactive compliance management.",
          link: "/playbook/domains/risk-compliance/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined risk framework with consistent compliance controls and regular reviews.",
          link: "/playbook/domains/risk-compliance/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured risk performance with proactive compliance planning and integrated management.",
          link: "/playbook/domains/risk-compliance/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic risk and compliance program with advanced analytics and continuous improvement.",
          link: "/playbook/domains/risk-compliance/optimized",
        },
      ]}
    />
  )
}
