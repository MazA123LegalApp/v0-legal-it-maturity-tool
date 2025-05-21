import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, AlertTriangle } from "lucide-react"
import { getImplementationGuideUrl } from "@/lib/url-utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ContinuityResiliencePage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          Service Continuity & Resilience
        </h1>
        <p className="text-muted-foreground">
          Ensuring legal services can continue during disruptions and recover quickly from incidents
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Domain Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Service Continuity & Resilience focuses on maintaining legal service delivery during disruptions and
              recovering quickly from incidents. This domain covers business continuity planning, disaster recovery,
              resilience testing, and ensuring critical legal functions can continue during outages or crises.
            </p>
            <p>
              For legal institutions, this domain is particularly important due to court deadlines, client expectations,
              and the time-sensitive nature of many legal matters. Effective continuity planning ensures that client
              service remains uninterrupted even during technology failures, natural disasters, or other disruptions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why This Domain Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Client Service Continuity</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures legal services remain available during disruptions, maintaining client trust and meeting
                  obligations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Deadline Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Safeguards against missing critical court filings, statutes of limitations, or contractual deadlines
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Reputation Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Prevents reputational damage from service disruptions or data loss incidents
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Regulatory Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  Meets regulatory requirements for business continuity in the legal sector
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Maturity Levels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="bg-amber-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-sm">1</span>
                </div>
                <span>Initial (1.0-1.9)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Minimal or no formal plans to ensure continuity of service during disruption. Reliance on ad hoc
                responses or informal knowledge.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify critical services and systems</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Document roles for continuity planning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Begin drafting a basic business continuity plan</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("continuity-resilience", "Initial")}>
                <Button variant="outline" className="w-full gap-2">
                  View Initial Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-amber-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-sm">2</span>
                </div>
                <span>Developing (2.0-2.9)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Beginning to develop continuity practices but lacking consistency, regular testing, or integration with
                IT operations.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Define recovery time objectives (RTOs) and recovery point objectives</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Standardize continuity and disaster recovery documentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Begin periodic testing of recovery procedures</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("continuity-resilience", "Developing")}>
                <Button variant="outline" className="w-full gap-2">
                  View Developing Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-amber-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-sm">3</span>
                </div>
                <span>Established (3.0-3.9)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Formal, regularly updated business continuity and disaster recovery plans with defined RTOs/RPOs and
                scheduled testing.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Enhance testing scope and realism</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Build a resilience scorecard for systems</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Link continuity readiness to matter delivery</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("continuity-resilience", "Established")}>
                <Button variant="outline" className="w-full gap-2">
                  View Established Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-amber-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-sm">4</span>
                </div>
                <span>Managed (4.0-4.4)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Integrated, proactive continuity and resilience management with automated processes and alignment to
                business priorities.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Automate backup verification and failover</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Embed resilience KPIs in executive dashboards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Develop a business service continuity map</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("continuity-resilience", "Managed")}>
                <Button variant="outline" className="w-full gap-2">
                  View Managed Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-amber-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-sm">5</span>
                </div>
                <span>Optimized (4.5-5.0)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Leading business resilience with tested capabilities that influence strategic decisions and are embedded
                across the organization.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Leverage resilience analytics and forecasting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Benchmark continuity capability across the sector</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Embed resilience into strategic growth planning</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("continuity-resilience", "Optimized")}>
                <Button variant="outline" className="w-full gap-2">
                  View Optimized Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Templates & Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium">Business Continuity Plan Template</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive template for legal BCP documentation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium">RTO/RPO Assessment Worksheet</h3>
                    <p className="text-sm text-muted-foreground">Tool for determining recovery objectives</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium">Tabletop Exercise Scenarios</h3>
                    <p className="text-sm text-muted-foreground">Legal-specific continuity testing scenarios</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium">ABA Cybersecurity Legal Task Force</h3>
                    <p className="text-sm text-muted-foreground">Resources for legal continuity planning</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium">ILTA Disaster Recovery Resources</h3>
                    <p className="text-sm text-muted-foreground">Legal technology continuity guidance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium">ISO 22301 Business Continuity Standard</h3>
                    <p className="text-sm text-muted-foreground">International standard for continuity management</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook">
          <Button variant="outline" className="gap-2">
            Back to Playbook
          </Button>
        </Link>
        <Link href={getImplementationGuideUrl("continuity-resilience", "Initial")}>
          <Button className="gap-2">
            Start with Initial Maturity
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
