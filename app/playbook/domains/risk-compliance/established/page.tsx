"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function RiskComplianceEstablishedPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const templates = getTemplatesForDomain("risk-compliance", "Established")

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center mb-6">
        <Link href="/playbook/domains/risk-compliance" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Domain Overview
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Risk & Compliance — Established (3.0–3.9)</h1>
      </div>

      <Card className="mb-8 border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle>What This Score Means</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Your firm has formal risk and compliance processes in place with defined ownership. Policies are documented
            and reviewed regularly. Risk assessments are conducted periodically, and there is a structured approach to
            managing compliance obligations. The focus now should be on integration, automation, and metrics.
          </p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Steps</TabsTrigger>
          <TabsTrigger value="challenges">Challenges & Solutions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Top 5 Priorities for Legal Institutions</h2>

          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Formalize Governance Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Establish a formal Risk & Compliance Committee with clear charter and authority</li>
                  <li>Define roles and responsibilities across departments (IT, Legal, Operations)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Implement Structured Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adopt a formal risk assessment methodology with consistent scoring</li>
                  <li>Conduct comprehensive assessments at least annually with quarterly reviews</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Develop a Comprehensive Policy Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create a hierarchical policy structure (policies, standards, procedures)</li>
                  <li>Implement formal review and approval workflows for all governance documents</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Establish Compliance Monitoring Program</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Implement regular compliance assessments against key requirements</li>
                  <li>Develop key compliance indicators and reporting mechanisms</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Create Vendor Risk Management Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Develop a formal vendor assessment and monitoring program</li>
                  <li>Implement risk-based due diligence for new and existing vendors</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Quick Wins</h2>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <ul className="grid gap-3">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Create a central policy repository with version control</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Implement quarterly compliance status reporting to leadership</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Develop a risk assessment template with consistent scoring criteria</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Create a vendor risk tier classification system</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Step 1: Formalize Governance Structure</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Establish a Risk & Compliance Committee</p>
                      <p className="text-gray-600 mt-1">Create a formal committee with these elements:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Written charter defining purpose, authority, and responsibilities</li>
                        <li>Membership including representatives from IT, Legal, Operations, and Practice Groups</li>
                        <li>Regular meeting schedule (at least quarterly)</li>
                        <li>Reporting line to firm leadership</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Define roles and responsibilities</p>
                      <p className="text-gray-600 mt-1">Document clear responsibilities for key roles:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Compliance Officer/Manager</li>
                        <li>Risk Owner (for each major risk category)</li>
                        <li>Policy Owners</li>
                        <li>Department Representatives</li>
                        <li>Executive Sponsor</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement governance processes</p>
                      <p className="text-gray-600 mt-1">Establish formal processes for:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Risk acceptance and escalation</li>
                        <li>Policy approval and exceptions</li>
                        <li>Compliance reporting and oversight</li>
                        <li>Issue management and remediation</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 2: Implement Structured Risk Assessment</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Adopt a formal risk assessment methodology</p>
                      <p className="text-gray-600 mt-1">Implement a consistent approach that includes:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Risk identification techniques (workshops, interviews, surveys)</li>
                        <li>Standardized impact and likelihood scales (1-5 or High/Medium/Low)</li>
                        <li>Risk categorization (strategic, operational, financial, compliance)</li>
                        <li>Control effectiveness evaluation</li>
                        <li>Residual risk calculation</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Conduct comprehensive assessments</p>
                      <p className="text-gray-600 mt-1">Establish a regular assessment cycle:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Annual enterprise-wide risk assessment</li>
                        <li>Quarterly reviews of top risks</li>
                        <li>Ad-hoc assessments for new initiatives or significant changes</li>
                        <li>Targeted assessments for high-risk areas</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Document and track risks</p>
                      <p className="text-gray-600 mt-1">Implement a risk register that captures:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Risk description and category</li>
                        <li>Inherent and residual risk ratings</li>
                        <li>Existing controls and their effectiveness</li>
                        <li>Risk owner and action plans</li>
                        <li>Review dates and status updates</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 3: Develop a Comprehensive Policy Framework</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Create a hierarchical policy structure</p>
                      <p className="text-gray-600 mt-1">Establish a three-tier structure:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Policies (high-level statements of management intent, approved by executive leadership)</li>
                        <li>Standards (specific mandatory controls, approved by the compliance committee)</li>
                        <li>
                          Procedures (detailed step-by-step instructions, approved by department or function heads)
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement formal document management</p>
                      <p className="text-gray-600 mt-1">Establish processes for:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Document creation and formatting (using standard templates)</li>
                        <li>Review and approval workflows</li>
                        <li>Version control and document history</li>
                        <li>Regular review cycles (annual or biennial)</li>
                        <li>Distribution and acknowledgment tracking</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Ensure policy coverage</p>
                      <p className="text-gray-600 mt-1">Develop or update policies for key areas:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Information Security and Data Protection</li>
                        <li>Acceptable Use and Access Control</li>
                        <li>Incident Response and Business Continuity</li>
                        <li>Vendor Management</li>
                        <li>Compliance Management and Reporting</li>
                        <li>Risk Assessment and Management</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 4: Establish Compliance Monitoring Program</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Identify compliance requirements</p>
                      <p className="text-gray-600 mt-1">Create a comprehensive compliance register:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Regulatory requirements (bar association rules, data protection laws)</li>
                        <li>Contractual obligations (client requirements, vendor agreements)</li>
                        <li>Industry standards (ISO 27001, NIST CSF)</li>
                        <li>Internal policies and standards</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement compliance assessments</p>
                      <p className="text-gray-600 mt-1">Develop a structured assessment approach:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Self-assessments by control owners</li>
                        <li>Independent reviews by compliance function</li>
                        <li>Targeted assessments for high-risk areas</li>
                        <li>Regular testing of key controls</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Develop compliance metrics</p>
                      <p className="text-gray-600 mt-1">Establish key compliance indicators:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Policy compliance rates</li>
                        <li>Control effectiveness scores</li>
                        <li>Open compliance issues and remediation status</li>
                        <li>Training completion rates</li>
                        <li>Audit findings and resolution times</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 5: Create Vendor Risk Management Process</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Develop vendor assessment methodology</p>
                      <p className="text-gray-600 mt-1">Create a structured approach to vendor risk:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Vendor risk classification criteria (critical, high, medium, low)</li>
                        <li>Due diligence questionnaires tailored to vendor type and risk level</li>
                        <li>Security and compliance requirements by vendor tier</li>
                        <li>Assessment scoring and approval thresholds</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement vendor lifecycle management</p>
                      <p className="text-gray-600 mt-1">Establish processes for each stage:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Pre-contract due diligence and risk assessment</li>
                        <li>Contract review with appropriate security and compliance clauses</li>
                        <li>Onboarding and implementation oversight</li>
                        <li>Ongoing monitoring and periodic reassessment</li>
                        <li>Offboarding and termination procedures</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Create vendor management documentation</p>
                      <p className="text-gray-600 mt-1">Develop supporting materials:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Vendor management policy and procedures</li>
                        <li>Standard contract clauses for security and compliance</li>
                        <li>Vendor risk assessment templates</li>
                        <li>Vendor inventory and risk register</li>
                        <li>Monitoring and reporting templates</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Common Challenges & Solutions</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Governance Without Bureaucracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Implementing formal governance can create perceived bureaucracy that slows down business processes.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Design processes with efficiency in mind, focusing on value-added activities</li>
                    <li>Implement risk-based approaches that scale requirements to the level of risk</li>
                    <li>Automate routine compliance tasks where possible</li>
                    <li>Regularly review and streamline processes based on user feedback</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Risk Assessment Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Different stakeholders may have varying perspectives on risk, leading to inconsistent assessments.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Develop clear risk assessment criteria with specific examples</li>
                    <li>Provide training on risk assessment methodology</li>
                    <li>Use facilitated workshops to calibrate risk ratings across teams</li>
                    <li>Implement a validation process for risk assessments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Policy Implementation and Awareness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Creating policies is easier than ensuring they are understood, followed, and effectively implemented.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create concise policy summaries and visual guides</li>
                    <li>Implement role-based training on relevant policies</li>
                    <li>Use policy acknowledgment tracking</li>
                    <li>Develop implementation plans for new or updated policies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Compliance Monitoring Workload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Comprehensive compliance monitoring can create significant workload for already busy staff.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Prioritize monitoring based on risk and compliance importance</li>
                    <li>Implement a rotating schedule for deep-dive assessments</li>
                    <li>Use technology to automate evidence collection where possible</li>
                    <li>Integrate compliance checks into existing business processes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Vendor Management Scale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Law firms often have numerous vendors, making comprehensive vendor management challenging.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Implement a tiered approach based on vendor criticality and data access</li>
                    <li>Focus detailed assessments on high-risk vendors</li>
                    <li>Use standardized questionnaires and assessment tools</li>
                    <li>Consider vendor risk management platforms for larger firms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Recommended Templates</h2>

          <div className="grid gap-4 mb-8">
            {templates.length > 0 ? (
              templates.map((template, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={template.url}>
                        <Download className="mr-2 h-4 w-4" />
                        Download {template.fileType.toUpperCase()}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-500">
                    Templates for this maturity level are coming soon. Please check back later or contact us for
                    assistance.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-4">Related Playbook Links</h2>

          <div className="grid gap-4">
            <Card>
              <CardContent className="p-4">
                <Link
                  href="/playbook/domains/risk-compliance"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <span>View Risk & Compliance Domain Overview</span>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Link href="/playbook/roadmap#phase3" className="text-blue-600 hover:underline flex items-center">
                  <span>Jump to Roadmap Phase 3: Implementation & Integration</span>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Link href="#" className="text-blue-600 hover:underline flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Established Compliance Toolkit</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
