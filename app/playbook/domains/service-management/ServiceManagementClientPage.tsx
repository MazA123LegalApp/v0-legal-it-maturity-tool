"use client"
import { DomainOverviewTemplate } from "@/components/domain-overview-template"

const ServiceManagementClientPage = () => {
  return (
    <DomainOverviewTemplate
      domainId="service-management"
      title="Service Management & Strategy"
      description="Focused on how IT services are structured, delivered, and improved."
      keyAreas={[
        "Service Catalog & Portfolio: Defining and managing IT service offerings",
        "Service Level Management: Setting and meeting service expectations",
        "Request Fulfillment: Efficiently handling service requests",
        "Service Strategy: Aligning IT services with business needs",
        "Service Measurement: Tracking and improving service performance",
      ]}
      maturityJourney={[
        {
          band: "Initial (1.0–1.9)",
          description: "Ad-hoc service delivery with undefined roles and minimal documentation.",
          link: "/playbook/domains/service-management/initial",
        },
        {
          band: "Developing (2.0–2.9)",
          description: "Basic service definitions with some documentation and inconsistent delivery.",
          link: "/playbook/domains/service-management/developing",
        },
        {
          band: "Established (3.0–3.9)",
          description: "Defined service catalog with consistent delivery and regular performance reviews.",
          link: "/playbook/domains/service-management/established",
        },
        {
          band: "Managed (4.0–4.4)",
          description: "Measured service performance with data-driven improvements and business alignment.",
          link: "/playbook/domains/service-management/managed",
        },
        {
          band: "Optimized (4.5–5.0)",
          description: "Strategic service management with predictive analytics and continuous innovation.",
          link: "/playbook/domains/service-management/optimized",
        },
      ]}
    />
  )
}

export default ServiceManagementClientPage
