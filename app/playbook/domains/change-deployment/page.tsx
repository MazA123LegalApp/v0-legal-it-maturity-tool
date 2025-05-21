import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export const metadata = {
  title: "Change & Deployment | Legal IT Maturity",
  description: "Change & Deployment domain overview and implementation guides",
}

export default function ChangeDeploymentPage() {
  return (
    <DomainOverviewTemplate
      domainId="change-deployment"
      title="Change & Deployment"
      description="Evaluates the maturity of how systems and technologies are introduced and updated."
      keyAreas={[
        "Change Management: Controlling modifications to IT systems",
        "Release Management: Planning and coordinating system deployments",
        "Testing & Validation: Ensuring changes meet requirements",
        "Change Communication: Informing stakeholders about changes",
        "Rollback & Recovery: Managing failed changes",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc changes with minimal documentation and inconsistent deployment practices.",
          link: "/playbook/domains/change-deployment/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic change control with some documentation and reactive deployment management.",
          link: "/playbook/domains/change-deployment/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined change processes with consistent testing and regular deployment reviews.",
          link: "/playbook/domains/change-deployment/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured change performance with proactive risk management and integrated deployment.",
          link: "/playbook/domains/change-deployment/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic change management with automated deployment and continuous improvement.",
          link: "/playbook/domains/change-deployment/optimized",
        },
      ]}
    />
  )
}
