import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMaturityBgColor, getMaturityColor, getMaturityLevel } from "@/lib/assessment-data"

interface DomainRecommendationsProps {
  domainId: string
  domainName: string
  score: number
}

export function DomainRecommendations({ domainId, domainName, score }: DomainRecommendationsProps) {
  const maturityLevel = getMaturityLevel(score)

  // Get recommendations based on domain and maturity level
  const recommendations = getDomainRecommendations(domainId, maturityLevel)

  return (
    <Card className={getMaturityBgColor(score)}>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{domainName} Recommendations</span>
          <span className={getMaturityColor(score)}>{maturityLevel}</span>
        </CardTitle>
        <CardDescription>Tailored recommendations based on your maturity assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function getDomainRecommendations(domainId: string, maturityLevel: string): string[] {
  const recommendations: Record<string, Record<string, string[]>> = {
    "service-management": {
      Initial: [
        "Establish basic service catalog with clear definitions",
        "Define core service level targets for critical services",
        "Implement a simple ticketing system for service requests",
        "Assign clear ownership for key services",
        "Document basic service management processes",
      ],
      Managed: [
        "Formalize service level agreements (SLAs) with business units",
        "Implement regular service reviews with stakeholders",
        "Enhance service catalog with detailed descriptions and request processes",
        "Develop service performance metrics and reporting",
        "Establish a service management framework based on ITIL principles",
      ],
      Defined: [
        "Implement comprehensive service portfolio management",
        "Establish end-to-end service monitoring and alerting",
        "Develop automated service request fulfillment for common requests",
        "Implement regular service improvement reviews",
        "Align service management processes with business objectives",
      ],
      "Quantitatively Managed": [
        "Implement predictive analytics for service demand and capacity",
        "Establish quantitative service quality targets and measurement",
        "Automate service performance reporting and dashboards",
        "Implement service value stream mapping and optimization",
        "Establish advanced service cost modeling and chargeback",
      ],
      Optimizing: [
        "Implement AI-driven service optimization and automation",
        "Establish continuous service innovation program",
        "Develop advanced business value metrics for services",
        "Implement service experience design methodologies",
        "Establish a service excellence culture with ongoing improvement",
      ],
    },
    "risk-compliance": {
      Initial: [
        "Document basic risk management approach",
        "Identify key regulatory requirements affecting the organization",
        "Establish simple risk register for critical systems",
        "Assign risk and compliance responsibilities",
        "Implement basic compliance documentation",
      ],
      Managed: [
        "Develop formal risk assessment methodology",
        "Implement regular compliance reviews and audits",
        "Establish risk treatment plans for high-risk areas",
        "Develop compliance training program for staff",
        "Implement policy management framework",
      ],
      Defined: [
        "Integrate risk management with business processes",
        "Implement automated compliance monitoring tools",
        "Establish enterprise-wide risk reporting",
        "Develop comprehensive policy lifecycle management",
        "Implement third-party risk management program",
      ],
      "Quantitatively Managed": [
        "Implement quantitative risk analysis and modeling",
        "Establish risk-based decision making framework",
        "Develop advanced compliance analytics and reporting",
        "Implement automated policy compliance verification",
        "Establish risk appetite framework with metrics",
      ],
      Optimizing: [
        "Implement predictive risk analytics and modeling",
        "Establish continuous compliance monitoring and assurance",
        "Develop integrated GRC (Governance, Risk, Compliance) platform",
        "Implement risk-aware culture program",
        "Establish strategic risk management aligned with business innovation",
      ],
    },
    cybersecurity: {
      Initial: [
        "Implement basic endpoint protection",
        "Establish password policies and basic access controls",
        "Conduct security awareness training for all staff",
        "Document basic security incident response procedures",
        "Implement network firewall protection",
      ],
      Managed: [
        "Establish formal security policies and standards",
        "Implement multi-factor authentication for critical systems",
        "Conduct regular vulnerability assessments",
        "Establish security incident management process",
        "Implement log management and basic monitoring",
      ],
      Defined: [
        "Implement comprehensive security architecture",
        "Establish security operations center (SOC) capabilities",
        "Conduct regular penetration testing",
        "Implement data classification and protection controls",
        "Establish security metrics and reporting",
      ],
      "Quantitatively Managed": [
        "Implement advanced threat detection and response",
        "Establish quantitative security risk modeling",
        "Implement automated security compliance monitoring",
        "Develop advanced security analytics capabilities",
        "Establish comprehensive third-party security program",
      ],
      Optimizing: [
        "Implement AI-driven security analytics and response",
        "Establish security by design in all processes",
        "Develop advanced threat hunting capabilities",
        "Implement zero trust security architecture",
        "Establish security innovation program",
      ],
    },
    "incident-problem": {
      Initial: [
        "Establish basic incident logging process",
        "Define incident severity levels and response times",
        "Implement simple incident tracking tool",
        "Assign incident management responsibilities",
        "Document basic incident resolution procedures",
      ],
      Managed: [
        "Implement formal incident management process",
        "Establish incident response teams with clear roles",
        "Develop regular incident reporting and reviews",
        "Implement basic problem management to address root causes",
        "Establish incident communication templates and protocols",
      ],
      Defined: [
        "Implement integrated incident and problem management",
        "Establish knowledge management for incident resolution",
        "Develop trend analysis for recurring incidents",
        "Implement major incident management procedures",
        "Establish service impact analysis for incidents",
      ],
      "Quantitatively Managed": [
        "Implement predictive incident analytics",
        "Establish automated incident classification and routing",
        "Develop advanced problem trend analysis and prevention",
        "Implement incident SLA monitoring and reporting",
        "Establish business impact quantification for incidents",
      ],
      Optimizing: [
        "Implement AI-assisted incident resolution",
        "Establish proactive problem prevention program",
        "Develop self-healing systems and automation",
        "Implement continuous incident management improvement",
        "Establish resilience engineering practices",
      ],
    },
    "continuity-resilience": {
      Initial: [
        "Identify critical business functions and systems",
        "Document basic recovery procedures for key systems",
        "Establish emergency contact lists and communication plan",
        "Implement basic backup procedures",
        "Conduct simple business impact analysis",
      ],
      Managed: [
        "Develop formal business continuity plans",
        "Implement regular backup testing and verification",
        "Establish recovery time objectives (RTOs) for critical systems",
        "Conduct annual business continuity exercises",
        "Implement disaster recovery site capabilities",
      ],
      Defined: [
        "Establish comprehensive business continuity management program",
        "Implement automated failover for critical systems",
        "Develop detailed recovery procedures and playbooks",
        "Conduct regular scenario-based continuity exercises",
        "Establish business continuity metrics and reporting",
      ],
      "Quantitatively Managed": [
        "Implement real-time resilience monitoring and metrics",
        "Establish advanced recovery automation",
        "Develop comprehensive dependency mapping and analysis",
        "Implement continuous availability architectures",
        "Establish quantitative business impact modeling",
      ],
      Optimizing: [
        "Implement AI-driven resilience optimization",
        "Establish resilience by design principles",
        "Develop advanced chaos engineering practices",
        "Implement self-healing and adaptive systems",
        "Establish continuous resilience improvement program",
      ],
    },
    "knowledge-data": {
      Initial: [
        "Establish basic document management system",
        "Implement simple knowledge sharing tools",
        "Define data ownership for critical information",
        "Document key processes and procedures",
        "Implement basic data backup procedures",
      ],
      Managed: [
        "Develop formal knowledge management processes",
        "Implement structured content creation and review cycles",
        "Establish data governance framework",
        "Develop metadata standards and taxonomy",
        "Implement regular knowledge base reviews and updates",
      ],
      Defined: [
        "Establish comprehensive knowledge management system",
        "Implement data quality management processes",
        "Develop knowledge sharing culture and incentives",
        "Implement master data management",
        "Establish data lifecycle management",
      ],
      "Quantitatively Managed": [
        "Implement advanced knowledge analytics and recommendations",
        "Establish quantitative data quality metrics",
        "Develop knowledge effectiveness measurement",
        "Implement automated knowledge capture from interactions",
        "Establish advanced data governance metrics",
      ],
      Optimizing: [
        "Implement AI-driven knowledge management",
        "Establish continuous knowledge improvement program",
        "Develop knowledge innovation and creation processes",
        "Implement advanced data monetization strategies",
        "Establish data-driven decision making culture",
      ],
    },
    "change-deployment": {
      Initial: [
        "Document basic change management process",
        "Establish simple change approval process",
        "Implement basic change logging",
        "Define emergency change procedure",
        "Document deployment steps for key systems",
      ],
      Managed: [
        "Implement formal change management process",
        "Establish change advisory board (CAB)",
        "Develop change risk assessment methodology",
        "Implement release planning process",
        "Establish post-implementation reviews",
      ],
      Defined: [
        "Establish integrated change, release and deployment management",
        "Implement automated testing for changes",
        "Develop comprehensive deployment procedures and rollback plans",
        "Implement change calendar and conflict management",
        "Establish change success metrics",
      ],
      "Quantitatively Managed": [
        "Implement advanced change impact analysis",
        "Establish automated deployment pipelines",
        "Develop change and deployment analytics",
        "Implement automated change risk scoring",
        "Establish quantitative change success metrics",
      ],
      Optimizing: [
        "Implement CI/CD with automated governance",
        "Establish change and deployment optimization program",
        "Develop zero-downtime deployment capabilities",
        "Implement feature flagging and progressive deployment",
        "Establish continuous deployment improvement",
      ],
    },
    "infrastructure-tooling": {
      Initial: [
        "Document existing infrastructure components",
        "Implement basic monitoring for critical systems",
        "Establish simple infrastructure change process",
        "Define standard configurations for common systems",
        "Implement basic capacity management",
      ],
      Managed: [
        "Develop formal infrastructure management processes",
        "Implement comprehensive monitoring and alerting",
        "Establish configuration management database (CMDB)",
        "Develop infrastructure standards and policies",
        "Implement regular capacity planning",
      ],
      Defined: [
        "Establish infrastructure as code practices",
        "Implement automated provisioning and configuration",
        "Develop comprehensive infrastructure documentation",
        "Implement performance management and optimization",
        "Establish infrastructure security standards",
      ],
      "Quantitatively Managed": [
        "Implement advanced infrastructure analytics",
        "Establish automated compliance verification",
        "Develop predictive capacity and performance management",
        "Implement cost optimization and chargeback",
        "Establish quantitative infrastructure quality metrics",
      ],
      Optimizing: [
        "Implement self-healing infrastructure",
        "Establish continuous infrastructure optimization",
        "Develop cloud-native architecture and practices",
        "Implement infrastructure innovation program",
        "Establish infrastructure resilience engineering",
      ],
    },
  }

  return (
    recommendations[domainId]?.[maturityLevel] || [
      "Conduct a detailed assessment of current capabilities",
      "Develop a roadmap for improvement based on industry best practices",
      "Implement regular reviews and improvement cycles",
      "Invest in training and skill development",
      "Consider external expertise to accelerate maturity",
    ]
  )
}
