import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Database } from "lucide-react"
import { getImplementationGuideUrl } from "@/lib/url-utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function KnowledgeDataPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Database className="h-6 w-6 text-blue-600" />
          Knowledge & Data Governance
        </h1>
        <p className="text-muted-foreground">
          Structuring, managing, and governing information assets across the legal organization
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Domain Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Knowledge & Data Governance focuses on how legal organizations structure, manage, and govern their
              information assets. This domain covers data classification, information lifecycle management, knowledge
              sharing, data quality, and information security and privacy.
            </p>
            <p>
              For legal institutions, this domain is particularly important due to the knowledge-intensive nature of
              legal work, client confidentiality requirements, and the need to efficiently access and leverage
              institutional knowledge. Effective governance ensures that information is accurate, accessible, secure,
              and compliant with regulatory requirements.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why This Domain Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Knowledge Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Enables attorneys to quickly find and leverage institutional knowledge, precedents, and work product
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Client Confidentiality</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures proper handling of sensitive client information throughout its lifecycle
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Regulatory Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  Supports compliance with data protection, privacy, and records management requirements
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Operational Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Reduces time spent searching for information and prevents duplication of effort
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
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">1</span>
                </div>
                <span>Initial (1.0-1.9)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Ad-hoc data management with minimal structure and inconsistent practices. Information is siloed and
                difficult to access.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify core knowledge and data assets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Assign ownership for knowledge governance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Create a basic file and folder structure policy</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("knowledge-data", "Initial")}>
                <Button variant="outline" className="w-full gap-2">
                  View Initial Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">2</span>
                </div>
                <span>Developing (2.0-2.9)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Basic data organization with some policies and reactive governance. Beginning to standardize metadata
                and document management.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Formalize metadata and taxonomy standards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Roll out governance roles and policies firmwide</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Develop a matter lifecycle archive process</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("knowledge-data", "Developing")}>
                <Button variant="outline" className="w-full gap-2">
                  View Developing Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">3</span>
                </div>
                <span>Established (3.0-3.9)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Defined data governance with consistent taxonomy and regular quality reviews. Information lifecycle
                management is formalized.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Automate metadata compliance checks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Strengthen cross-system consistency</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Publish a firmwide knowledge governance policy</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("knowledge-data", "Established")}>
                <Button variant="outline" className="w-full gap-2">
                  View Established Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">4</span>
                </div>
                <span>Managed (4.0-4.4)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Measured data quality with proactive governance and integrated lifecycle management. Analytics drive
                continuous improvement.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Integrate governance KPIs into firmwide reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Enable lifecycle automation and policy enforcement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Expand governance to non-document assets</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("knowledge-data", "Managed")}>
                <Button variant="outline" className="w-full gap-2">
                  View Managed Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">5</span>
                </div>
                <span>Optimized (4.5-5.0)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Strategic knowledge management with predictive analytics and continuous innovation. Knowledge is a
                competitive advantage.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Leverage AI and analytics for predictive governance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Align governance with client value and innovation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Benchmark governance maturity with peer firms</span>
                </li>
              </ul>
              <Link href={getImplementationGuideUrl("knowledge-data", "Optimized")}>
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
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Data Classification Framework</h3>
                    <p className="text-sm text-muted-foreground">Template for categorizing legal information assets</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Metadata Standards Guide</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive guide for document metadata</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Knowledge Governance Charter</h3>
                    <p className="text-sm text-muted-foreground">
                      Template for establishing governance roles and responsibilities
                    </p>
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
                  <Database className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">ILTA Knowledge Management Resources</h3>
                    <p className="text-sm text-muted-foreground">Industry best practices for legal KM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">ARK Knowledge Management Conference</h3>
                    <p className="text-sm text-muted-foreground">Annual event for legal knowledge professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">DAMA Data Management Body of Knowledge</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive data management framework</p>
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
        <Link href={getImplementationGuideUrl("knowledge-data", "Initial")}>
          <Button className="gap-2">
            Start with Initial Maturity
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
