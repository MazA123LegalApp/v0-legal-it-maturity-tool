"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaturityBanner } from "@/components/maturity-banner"
import { DomainOverviewTemplate } from "@/components/domain-overview-template"

export default function RiskComplianceDomainPageClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center mb-6">
        <Link href="/playbook" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Risk & Compliance Domain</h1>
      </div>

      <DomainOverviewTemplate
        domainId="risk-compliance"
        title="Risk & Compliance"
        description="Evaluates your ability to manage IT risks and comply with legal/regulatory obligations."
        keyAreas={[
          "Risk Assessment & Management: Identifying, evaluating, and mitigating IT and information risks",
          "Regulatory Compliance: Meeting legal, industry, and client requirements",
          "Policy Management: Creating, maintaining, and enforcing IT policies",
          "Audit & Assurance: Verifying controls and demonstrating compliance",
          "Vendor Risk Management: Assessing and managing third-party risks",
        ]}
        maturityJourney={[
          {
            band: "Initial (1.0–1.9)",
            description: "Ad-hoc risk management with minimal documentation and inconsistent compliance activities.",
            link: "/playbook/domains/risk-compliance/initial",
          },
          {
            band: "Developing (2.0–2.9)",
            description: "Basic risk processes with some documentation and reactive compliance management.",
            link: "/playbook/domains/risk-compliance/developing",
          },
          {
            band: "Established (3.0–3.9)",
            description: "Defined risk framework with regular assessments and consistent compliance processes.",
            link: "/playbook/domains/risk-compliance/established",
          },
          {
            band: "Managed (4.0–4.4)",
            description: "Measured risk management with integrated compliance and data-driven improvements.",
            link: "/playbook/domains/risk-compliance/managed",
          },
          {
            band: "Optimized (4.5–5.0)",
            description:
              "Strategic risk management with predictive analytics and industry-leading compliance practices.",
            link: "/playbook/domains/risk-compliance/optimized",
          },
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Domain Overview</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Model</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Risk Management</h3>
                    <p className="text-gray-600">
                      Processes for identifying, assessing, and mitigating risks to your firm's operations, reputation,
                      and client relationships.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Policy Governance</h3>
                    <p className="text-gray-600">
                      Development, maintenance, and enforcement of policies that guide behavior and ensure compliance
                      with legal and regulatory requirements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Regulatory Compliance</h3>
                    <p className="text-gray-600">
                      Monitoring and adhering to applicable laws, regulations, and industry standards, including bar
                      association requirements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Audit Management</h3>
                    <p className="text-gray-600">
                      Processes for preparing for and responding to internal and external audits, including client
                      security assessments.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Governance Structure</h3>
                    <p className="text-gray-600">
                      Organizational framework that defines roles, responsibilities, and accountability for risk and
                      compliance activities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why This Matters for Legal Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Client Requirements</h3>
                    <p className="text-gray-600">
                      Clients increasingly require law firms to demonstrate robust compliance programs, especially for
                      data protection and confidentiality.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Regulatory Pressure</h3>
                    <p className="text-gray-600">
                      Legal firms face growing regulatory requirements from bar associations, data protection
                      authorities, and industry-specific regulations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Reputation Protection</h3>
                    <p className="text-gray-600">
                      Effective risk management helps prevent incidents that could damage your firm's reputation and
                      client relationships.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Operational Efficiency</h3>
                    <p className="text-gray-600">
                      Well-designed compliance processes reduce duplication of effort and streamline responses to client
                      inquiries and audits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Resource Constraints</h3>
                    <p className="text-gray-600">
                      Many legal firms struggle to allocate sufficient resources to compliance activities, especially
                      smaller practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Siloed Approaches</h3>
                    <p className="text-gray-600">
                      Risk and compliance activities are often fragmented across IT, legal, and operations departments
                      without coordination.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Keeping Pace with Change</h3>
                    <p className="text-gray-600">
                      Regulatory requirements and client expectations evolve rapidly, making it challenging to stay
                      current.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Documentation Burden</h3>
                    <p className="text-gray-600">
                      Maintaining comprehensive and up-to-date policies, procedures, and evidence can be time-consuming.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maturity" className="pt-4">
          <div className="space-y-8">
            <MaturityBanner
              band="Initial"
              score="1.0–1.9"
              description="No formalized risk management or compliance structure. Policies are undocumented, outdated, or unknown to most staff. Legal, regulatory, or client obligations may be at risk."
              implementationUrl="/playbook/domains/risk-compliance/initial"
            />

            <MaturityBanner
              band="Developing"
              score="2.0–2.9"
              description="Beginning to address risk and compliance but may be operating in silos. Some policies exist but may be outdated or inconsistently enforced. Basic reporting is emerging."
              implementationUrl="/playbook/domains/risk-compliance/developing"
            />

            <MaturityBanner
              band="Established"
              score="3.0–3.9"
              description="Formal risk and compliance processes are in place with defined ownership. Policies are documented and reviewed regularly. Risk assessments are conducted periodically."
              implementationUrl="/playbook/domains/risk-compliance/established"
            />

            <MaturityBanner
              band="Managed"
              score="4.0–4.4"
              description="Well-structured compliance function integrated into core business processes. Risks are tracked, audits are conducted, and obligations are monitored actively."
              implementationUrl="/playbook/domains/risk-compliance/managed"
            />

            <MaturityBanner
              band="Optimized"
              score="4.5–5.0"
              description="Mature, integrated, and continuously improving risk and compliance program. Controls are automated where possible and compliance insights directly inform strategic decision-making."
              implementationUrl="/playbook/domains/risk-compliance/optimized"
            />
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="pt-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Guides by Maturity Level</CardTitle>
                <CardDescription>
                  Select your current maturity level to access detailed implementation guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Link
                    href="/playbook/domains/risk-compliance/initial"
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-amber-500" />
                      <div>
                        <h3 className="font-medium">Initial (1.0–1.9)</h3>
                        <p className="text-sm text-gray-500">
                          Foundational steps to establish basic risk and compliance controls
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>

                  <Link
                    href="/playbook/domains/risk-compliance/developing"
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-yellow-500" />
                      <div>
                        <h3 className="font-medium">Developing (2.0–2.9)</h3>
                        <p className="text-sm text-gray-500">
                          Building structured processes and consistent documentation
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>

                  <Link
                    href="/playbook/domains/risk-compliance/established"
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      <div>
                        <h3 className="font-medium">Established (3.0–3.9)</h3>
                        <p className="text-sm text-gray-500">
                          Formalizing governance and integrating with business processes
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>

                  <Link
                    href="/playbook/domains/risk-compliance/managed"
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-green-500" />
                      <div>
                        <h3 className="font-medium">Managed (4.0–4.4)</h3>
                        <p className="text-sm text-gray-500">
                          Implementing automation, metrics, and cross-functional integration
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>

                  <Link
                    href="/playbook/domains/risk-compliance/optimized"
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-indigo-500" />
                      <div>
                        <h3 className="font-medium">Optimized (4.5–5.0)</h3>
                        <p className="text-sm text-gray-500">
                          Leveraging predictive analytics and contributing to industry leadership
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Link href="#" className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                    <Download className="h-5 w-5 mr-2 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Risk & Compliance Toolkit</h3>
                      <p className="text-sm text-gray-500">
                        Comprehensive set of templates, checklists, and guides for all maturity levels
                      </p>
                    </div>
                  </Link>

                  <Link href="/playbook/roadmap" className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Implementation Roadmap</h3>
                      <p className="text-sm text-gray-500">
                        Step-by-step guide for improving your risk and compliance maturity
                      </p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
