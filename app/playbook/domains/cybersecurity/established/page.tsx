import { Shield } from "lucide-react"
import { ImplementationGuideTemplate } from "@/components/implementation-guide-template"

export default function CybersecurityEstablishedPage() {
  return (
    <ImplementationGuideTemplate
      domainId="cybersecurity"
      maturityBand="Established"
      domainName="Cybersecurity"
      domainIcon={<Shield className="h-8 w-8 text-blue-700" />}
      whatThisMeans="Your firm has adopted baseline controls and processes such as MFA, endpoint protection, and a documented incident response plan. However, threat detection, visibility, and automation are still emerging. Now is the time to mature your program by introducing centralized logging, Zero Trust principles, and continuous monitoring."
      priorities={[
        {
          title: "Deploy Centralized Logging and Monitoring",
          description: "Aggregate logs from key systems (e.g., email, DMS, firewalls) into a centralized system.",
          steps: [
            "Identify key systems that need to be logged (email, DMS, firewalls, etc.)",
            "Select a SIEM tool (Microsoft Sentinel, LogRhythm, or open-source options like Wazuh)",
            "Configure log collection agents on critical systems",
            "Set up basic alerting for suspicious activities",
            "Establish a log review schedule and assign responsibility",
          ],
        },
        {
          title: "Begin Designing a Zero Trust Architecture",
          description: 'Identify "crown jewel" assets and define segmentation strategies.',
          steps: [
            "Identify and classify your most sensitive data and systems",
            "Map access patterns and dependencies between systems",
            "Implement identity-based access control and conditional access policies",
            "Begin segmenting networks based on data sensitivity",
            "Develop a roadmap for full Zero Trust implementation",
          ],
        },
        {
          title: "Conduct a Cybersecurity Risk Assessment",
          description: "Identify likely threat vectors and map controls to risks.",
          steps: [
            "Identify key assets and their value to the organization",
            "Document potential threats and vulnerabilities",
            "Assess likelihood and impact of each risk",
            "Map existing controls to identified risks",
            "Align assessment results with the NIST Cybersecurity Framework or ISO 27001 Annex A",
          ],
        },
        {
          title: "Formalize Your Security Policy Framework",
          description: "Establish policies for access control, device security, data classification, and remote work.",
          steps: [
            "Develop a comprehensive security policy framework",
            "Include policies for access control, device security, data classification, and remote work",
            "Ensure policies are version-controlled and accessible",
            "Get formal approval from leadership",
            "Communicate policies to all staff and provide training",
          ],
        },
        {
          title: "Test Your Incident Response Process",
          description: "Conduct a live tabletop simulation with IT, legal, and operations teams.",
          steps: [
            "Develop realistic incident scenarios relevant to legal firms",
            "Schedule a tabletop exercise with key stakeholders",
            "Include external notification scenarios (e.g., regulators, clients)",
            "Document lessons learned and areas for improvement",
            "Update your incident response plan based on findings",
          ],
        },
      ]}
      quickWins={[
        "Enable audit logging in Microsoft 365 / Google Workspace",
        "Use endpoint tools to enforce USB blocking and local encryption",
        "Publish your security policies in a shared document library",
        "Subscribe to threat intel updates (CISA, FBI InfraGard, MS-ISAC)",
      ]}
      challenges={[
        {
          title: "Balancing Security with Attorney Workflow",
          description: "Attorneys may resist security measures that slow down their work.",
          solution:
            "Focus on transparent security controls that don't disrupt workflow. Involve attorneys in policy development. Provide clear communication about security benefits.",
        },
        {
          title: "Limited Security Expertise",
          description: "Difficulty finding or affording dedicated security personnel.",
          solution:
            "Consider a hybrid model with managed security services for specialized functions like monitoring. Invest in training for existing IT staff.",
        },
        {
          title: "Legacy Systems",
          description: "Older practice management or document systems may lack modern security features.",
          solution:
            "Implement compensating controls like network segmentation. Create a roadmap for system modernization. Consider middleware solutions for authentication.",
        },
      ]}
      additionalTemplates={[
        {
          name: "Logging & Monitoring Configuration Workbook",
          description: "Guide for setting up centralized logging and monitoring",
          fileType: "xlsx",
        },
        {
          name: "Cyber Risk Assessment Template",
          description: "Template for conducting a comprehensive cybersecurity risk assessment",
          fileType: "docx",
        },
        {
          name: "Zero Trust Design Checklist",
          description: "Checklist for implementing Zero Trust architecture principles",
          fileType: "pdf",
        },
        {
          name: "Security Policy Framework Template",
          description: "Template for creating a comprehensive security policy framework",
          fileType: "docx",
        },
      ]}
    />
  )
}
