import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export const metadata = {
  title: "Cybersecurity | Legal IT Maturity",
  description: "Cybersecurity domain overview and implementation guides",
}

export default function CybersecurityPage() {
  return (
    <DomainOverviewTemplate
      domainId="cybersecurity"
      title="Cybersecurity"
      description="Assesses the strength and maturity of your cybersecurity program."
      keyAreas={[
        "Security Governance: Establishing policies, standards, and controls",
        "Threat Detection & Response: Identifying and addressing security incidents",
        "Identity & Access Management: Controlling system and data access",
        "Data Protection: Safeguarding sensitive information",
        "Security Awareness: Building a security-conscious culture",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc security measures with minimal documentation and inconsistent practices.",
          link: "/playbook/domains/cybersecurity/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic security controls with some documentation and reactive threat management.",
          link: "/playbook/domains/cybersecurity/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined security framework with consistent controls and regular risk assessments.",
          link: "/playbook/domains/cybersecurity/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured security performance with proactive threat hunting and integrated controls.",
          link: "/playbook/domains/cybersecurity/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic security program with predictive analytics and continuous adaptation.",
          link: "/playbook/domains/cybersecurity/optimized",
        },
      ]}
    />
  )
}
