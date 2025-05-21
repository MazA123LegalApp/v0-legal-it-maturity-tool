import Link from "next/link"
import { ArrowRight, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type DomainScore, type MaturityBand, getTemplatesForDomain, type Template } from "@/lib/maturity-engine"
import { domains } from "@/lib/assessment-data"

interface MaturityRecommendationsProps {
  domainScores: DomainScore[]
  showAllDomains?: boolean
  maxDomains?: number
}

export function MaturityRecommendations({
  domainScores,
  showAllDomains = false,
  maxDomains = 3,
}: MaturityRecommendationsProps) {
  // Filter and limit domains to display
  const domainsToShow = showAllDomains
    ? domainScores.filter((d) => d.score > 0)
    : domainScores.slice(0, maxDomains).filter((d) => d.score > 0)

  if (domainsToShow.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Recommendations Available</CardTitle>
          <CardDescription>Complete the maturity assessment to receive personalized recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The maturity assessment will help identify areas for improvement and provide targeted recommendations based
            on your organization's current maturity level.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/maturity/assessment">
            <Button>Start Assessment</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {domainsToShow.map((domainScore) => {
        const domainInfo = domains.find((d) => d.id === domainScore.domain)
        const domainName = domainInfo?.name || domainScore.domain
        const playbookUrl = `/playbook/domains/${domainScore.domain}`
        const templates = getTemplatesForDomain(domainScore.domain, domainScore.band)

        // Create a URL to the band-specific implementation guide
        const bandLowercase = domainScore.band.toLowerCase()
        const implementationGuideUrl = `/playbook/domains/${domainScore.domain}/${bandLowercase}`

        return (
          <Card key={domainScore.domain} className="overflow-hidden">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{domainName}</CardTitle>
                  <CardDescription>
                    Maturity Level: <span className="font-medium">{domainScore.band}</span> (
                    {domainScore.score.toFixed(1)}/5.0)
                  </CardDescription>
                </div>
                <Link href={playbookUrl}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    View Playbook
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Recommended Actions</h3>
              <RecommendationsByBand domain={domainScore.domain} band={domainScore.band} />

              {templates.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <h3 className="text-lg font-semibold mb-3">Recommended Templates</h3>
                  <div className="grid gap-3">
                    {templates.map((template, index) => (
                      <TemplateDownloadCard key={index} template={template} />
                    ))}
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <Link href={implementationGuideUrl} className="w-full">
                <Button variant="default" className="w-full gap-2">
                  View Implementation Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

interface RecommendationsByBandProps {
  domain: string
  band: MaturityBand
}

function RecommendationsByBand({ domain, band }: RecommendationsByBandProps) {
  // This would ideally come from a database or API
  // For now, we'll return some sample recommendations based on domain and band

  const recommendations: Record<string, Record<MaturityBand, string[]>> = {
    cybersecurity: {
      Initial: [
        "Appoint a security lead and establish basic security roles",
        "Implement password management and basic access controls",
        "Deploy endpoint protection across all devices",
        "Conduct basic security awareness training for all staff",
        "Document a minimum incident response plan",
      ],
      Developing: [
        "Deploy multi-factor authentication for critical systems",
        "Establish formal security policies and standards",
        "Implement basic vulnerability scanning and patch management",
        "Develop an incident response process with clear roles",
        "Conduct regular security awareness training",
      ],
      Established: [
        "Implement centralized logging and SIEM capabilities",
        "Begin Zero Trust architecture design and implementation",
        "Conduct regular security assessments and penetration testing",
        "Develop incident response playbooks for common scenarios",
        "Implement data classification and protection controls",
      ],
      Managed: [
        "Integrate security telemetry across all systems",
        "Automate compliance checks and security controls",
        "Implement advanced endpoint detection and response",
        "Develop security metrics and dashboards",
        "Establish a formal threat intelligence program",
      ],
      Optimized: [
        "Conduct red team exercises and advanced security simulations",
        "Participate in legal sector threat-sharing programs",
        "Leverage AI-enhanced defense and analytics",
        "Implement fully automated security orchestration",
        "Benchmark security capabilities against industry leaders",
      ],
    },
    "risk-compliance": {
      Initial: [
        "Assign compliance responsibility to a specific role",
        "Document basic compliance requirements",
        "Create a simple risk register",
        "Establish basic policy documentation",
        "Conduct compliance awareness training",
      ],
      Developing: [
        "Formalize compliance categories and risk scoring",
        "Introduce a centralized policy management system",
        "Establish regular compliance reviews",
        "Begin capturing compliance metrics",
        "Launch a quarterly review cycle",
      ],
      Established: [
        "Implement structured risk assessment frameworks",
        "Integrate compliance data into improvement cycles",
        "Develop compliance dashboards and reporting",
        "Define compliance SLAs and metrics",
        "Align compliance to business impact",
      ],
      Managed: [
        "Automate compliance monitoring and reporting",
        "Use compliance analytics for risk reduction",
        "Establish compliance review boards",
        "Integrate compliance KPIs into executive dashboards",
        "Run compliance simulations and tabletop exercises",
      ],
      Optimized: [
        "Leverage predictive analytics for compliance risk",
        "Benchmark compliance metrics against industry peers",
        "Expand lessons learned into firmwide practice",
        "Embed compliance into procurement and development",
        "Support industry compliance thought leadership",
      ],
    },
    "incident-problem": {
      Initial: [
        "Assign incident response roles",
        "Create a basic incident log",
        "Introduce an incident severity scale",
        "Document a basic escalation procedure",
        "Start logging repeat issues",
      ],
      Developing: [
        "Formalize incident categories and severity levels",
        "Introduce a centralized ticketing system",
        "Establish escalation paths and on-call coverage",
        "Begin capturing root causes",
        "Launch a monthly review cycle",
      ],
      Established: [
        "Implement structured root cause analysis frameworks",
        "Integrate incident data into continuous improvement cycles",
        "Develop problem records and known error logs",
        "Define SLAs and SLOs for incident resolution",
        "Align incident handling to business impact",
      ],
      Managed: [
        "Automate incident detection and routing",
        "Use incident analytics for risk reduction",
        "Establish problem review boards",
        "Integrate incident KPIs into executive dashboards",
        "Run simulations and tabletop exercises",
      ],
      Optimized: [
        "Leverage predictive analytics for incident prevention",
        "Benchmark incident metrics against industry peers",
        "Expand lessons learned into firmwide practice",
        "Embed problem prevention into procurement and development",
        "Support industry resilience thought leadership",
      ],
    },
    "continuity-resilience": {
      Initial: [
        "Identify critical services and systems",
        "Document roles for continuity planning",
        "Begin drafting a basic business continuity plan (BCP)",
        "Establish communication protocols",
        "Conduct a basic tabletop scenario",
      ],
      Developing: [
        "Define recovery time objectives (RTOs) and recovery point objectives (RPOs)",
        "Standardize continuity and disaster recovery documentation",
        "Begin periodic testing",
        "Integrate resilience planning with change and release",
        "Create a continuity risk register",
      ],
      Established: [
        "Enhance testing scope and realism",
        "Build a resilience scorecard",
        "Link continuity readiness to matter delivery",
        "Integrate with enterprise risk and compliance",
        "Expand cross-functional exercises",
      ],
      Managed: [
        "Automate backup verification and failover",
        "Embed resilience KPIs in executive dashboards",
        "Develop a business service continuity map",
        "Extend continuity planning to third parties",
        "Institutionalize learning from tests",
      ],
      Optimized: [
        "Leverage resilience analytics and forecasting",
        "Benchmark continuity capability across the sector",
        "Embed resilience into strategic growth planning",
        "Create a continuity culture",
        "Contribute to legal sector resilience leadership",
      ],
    },
    "knowledge-data": {
      Initial: [
        "Identify core knowledge and data assets",
        "Assign ownership for knowledge governance",
        "Create a basic file and folder structure policy",
        "Clean up critical repositories",
        "Draft an initial data governance charter",
      ],
      Developing: [
        "Formalize metadata and taxonomy standards",
        "Roll out governance roles and policies firmwide",
        "Develop a matter lifecycle archive process",
        "Implement a template management process",
        "Begin reporting on data quality metrics",
      ],
      Established: [
        "Automate metadata compliance checks",
        "Strengthen cross-system consistency",
        "Publish a firmwide knowledge governance policy",
        "Integrate governance into onboarding and training",
        "Establish a knowledge governance committee",
      ],
      Managed: [
        "Integrate governance KPIs into firmwide reporting",
        "Enable lifecycle automation and policy enforcement",
        "Expand governance to non-document assets",
        "Create governance-driven search optimization",
        "Close the loop with governance reviews and action plans",
      ],
      Optimized: [
        "Leverage AI and analytics for predictive governance",
        "Align governance with client value and innovation",
        "Benchmark governance maturity with peer firms",
        "Institutionalize knowledge culture",
        "Publish and share thought leadership on governance",
      ],
    },
    "change-deployment": {
      Initial: [
        "Create a basic change request and approval form",
        "Assign a change coordinator or governance role",
        "Establish a weekly change review meeting",
        "Log all changes in a shared register",
        "Introduce a rollback plan requirement",
      ],
      Developing: [
        "Introduce change classification and risk scoring",
        "Formalize pre-deployment testing and sign-off",
        "Expand communication plans for stakeholders",
        "Introduce a change freeze calendar",
        "Track change success and failure metrics",
      ],
      Established: [
        "Integrate change process with incident and problem management",
        "Implement peer review and segregation of duties",
        "Introduce automation for low-risk changes",
        "Track deployment quality and regression metrics",
        "Enhance business involvement in CAB or review boards",
      ],
      Managed: [
        "Automate deployment workflows where safe",
        "Align change strategy with business value streams",
        "Implement change readiness criteria and exit gates",
        "Continuously review change failures and learnings",
        "Create a feedback loop from end-users and clients",
      ],
      Optimized: [
        "Use predictive change analytics and risk scoring",
        "Benchmark against industry change maturity",
        "Integrate change KPIs into strategic planning",
        "Scale federated change governance across practice groups",
        "Lead sector education and thought leadership",
      ],
    },
    "infrastructure-tooling": {
      Initial: [
        "Create a basic infrastructure inventory",
        "Identify end-of-life (EOL) and high-risk systems",
        "Begin a tool rationalization list",
        "Assign accountability for infrastructure oversight",
        "Establish a review cycle for technology decisions",
      ],
      Developing: [
        "Standardize technology stack documentation",
        "Implement a basic technology lifecycle policy",
        "Begin tooling consolidation planning",
        "Include legal operations in tooling decisions",
        "Track technical debt and prioritize reductions",
      ],
      Established: [
        "Introduce infrastructure KPIs and reporting dashboards",
        "Implement environment monitoring and alerting",
        "Review and optimize cloud usage",
        "Conduct annual infrastructure health reviews",
        "Align tooling strategy with legal service value",
      ],
      Managed: [
        "Automate infrastructure provisioning and maintenance",
        "Embed tooling governance into budget and portfolio planning",
        "Run cross-system dependency simulations",
        "Conduct cost-to-value tooling analysis",
        "Launch continuous improvement for infrastructure teams",
      ],
      Optimized: [
        "Adopt predictive and self-healing infrastructure",
        "Benchmark infrastructure maturity against peer firms",
        "Embed tooling strategy in client experience metrics",
        "Create a strategic technology innovation portfolio",
        "Showcase infrastructure leadership across the sector",
      ],
    },
    "service-management": {
      Initial: [
        "Define your core IT services",
        "Document basic service descriptions",
        "Start capturing support metrics",
        "Create a shared ITSM contact and escalation matrix",
        "Launch a weekly IT service review",
      ],
      Developing: [
        "Establish standard operating procedures (SOPs) for core services",
        "Define service levels and targets",
        "Launch a service portfolio register",
        "Expand ticket categorization and metrics analysis",
        "Create a service request intake process",
      ],
      Established: [
        "Conduct quarterly service performance reviews",
        "Integrate ITSM with change, risk, and continuity planning",
        "Establish a service design lifecycle",
        "Improve service demand forecasting and capacity planning",
        "Launch user satisfaction surveys tied to services",
      ],
      Managed: [
        "Align ITSM metrics with business outcomes",
        "Automate service request fulfillment for common tasks",
        "Build service risk profiles and control frameworks",
        "Integrate service management into financial planning",
        "Run cross-service optimization reviews",
      ],
      Optimized: [
        "Use predictive service analytics and sentiment scoring",
        "Benchmark ITSM maturity and publish transparency reports",
        "Co-design services with legal and operational stakeholders",
        "Evolve to outcome-based service models",
        "Lead sector engagement on legal service excellence",
      ],
    },
  }

  const domainRecommendations = recommendations[domain]?.[band] || []

  if (domainRecommendations.length === 0) {
    return (
      <p className="text-muted-foreground">
        Visit the implementation guide for detailed recommendations for {band} maturity level.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {domainRecommendations.map((recommendation, index) => (
        <li key={index} className="flex items-start">
          <div className="mr-2 mt-0.5">•</div>
          <span>{recommendation}</span>
        </li>
      ))}
    </ul>
  )
}

interface TemplateDownloadCardProps {
  template: Template
}

function TemplateDownloadCard({ template }: TemplateDownloadCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
      <div>
        <h4 className="font-medium">{template.name}</h4>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
      <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
        <Download className="h-3 w-3" />
        {template.fileType.toUpperCase()}
      </Button>
    </div>
  )
}
