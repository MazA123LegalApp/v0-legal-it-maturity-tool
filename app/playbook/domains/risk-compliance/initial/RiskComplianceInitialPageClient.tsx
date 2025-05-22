"use client"
import { ImplementationGuideTemplate } from "@/components/implementation-guide-template"

export default function RiskComplianceInitialPageClient() {
  return (
    <ImplementationGuideTemplate
      domain="risk-compliance"
      level="initial"
      title="Risk & Compliance Management - Initial Level Implementation Guide"
      description="This guide provides practical steps to establish basic risk and compliance management practices in your legal department."
      keyAreas={[
        {
          title: "Basic Risk Assessment",
          description: "Establish fundamental risk identification and assessment processes.",
          steps: [
            "Document known legal and compliance risks in a simple spreadsheet",
            "Prioritize risks based on potential impact and likelihood",
            "Assign ownership for monitoring each key risk area",
            "Schedule quarterly reviews of the risk register",
          ],
        },
        {
          title: "Compliance Foundations",
          description: "Implement essential compliance monitoring and reporting.",
          steps: [
            "Identify key regulatory requirements applicable to your organization",
            "Create a basic compliance calendar with important deadlines",
            "Establish a simple process for tracking compliance obligations",
            "Develop templates for compliance reporting to leadership",
          ],
        },
        {
          title: "Documentation Practices",
          description: "Develop basic documentation standards for risk and compliance activities.",
          steps: [
            "Create templates for documenting risk assessments",
            "Establish a central repository for compliance documentation",
            "Implement version control for key compliance documents",
            "Define retention periods for risk and compliance records",
          ],
        },
      ]}
      resources={[
        {
          title: "Risk Assessment Template",
          description: "Basic spreadsheet template for documenting and tracking legal risks",
          link: "#",
        },
        {
          title: "Compliance Calendar Template",
          description: "Simple calendar template for tracking regulatory deadlines",
          link: "#",
        },
        {
          title: "Documentation Guidelines",
          description: "Basic guidelines for documenting risk and compliance activities",
          link: "#",
        },
      ]}
      nextSteps={{
        title: "Moving to the Developing Level",
        description:
          "Once you've established these initial practices, consider these next steps to advance to the Developing level:",
        steps: [
          "Formalize your risk assessment methodology",
          "Expand compliance monitoring to cover all relevant regulations",
          "Implement basic compliance training for key stakeholders",
          "Begin developing metrics to measure compliance effectiveness",
        ],
      }}
    />
  )
}
