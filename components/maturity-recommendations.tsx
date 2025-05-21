import Link from "next/link"
import { ArrowRight, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  type DomainScore,
  type MaturityBand,
  getPlaybookUrlForDomain,
  getTemplatesForDomain,
  type Template,
} from "@/lib/maturity-engine"
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
        const playbookUrl = getPlaybookUrlForDomain(domainScore.domain, domainScore.band)
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
    // Add similar recommendation structures for other domains
    "risk-compliance": {
      Initial: [
        "Assign compliance responsibility to a specific role",
        "Document basic compliance requirements",
        "Create a simple risk register",
        "Establish basic policy documentation",
        "Conduct compliance awareness training",
      ],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    // Default empty arrays for other domains and bands
    "incident-problem": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "continuity-resilience": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "knowledge-data": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "change-deployment": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "infrastructure-tooling": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "service-management": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
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
