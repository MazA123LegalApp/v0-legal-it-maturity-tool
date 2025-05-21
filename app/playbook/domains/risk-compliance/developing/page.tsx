"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function RiskComplianceDevelopingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const templates = getTemplatesForDomain("risk-compliance", "Developing")

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center mb-6">
        <Link href="/playbook/domains/risk-compliance" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Domain Overview
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Risk & Compliance — Developing (2.0–2.9)</h1>
      </div>

      <Card className="mb-8 border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle>What This Score Means</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Your organization has begun addressing risk and compliance but may be operating in silos or without formal
            oversight. Some policies exist, but they may be outdated, inconsistently enforced, or poorly mapped to
            external obligations. Now is the time to establish foundational controls and basic reporting.
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
                <CardTitle>1. Assign Risk & Compliance Accountability</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Appoint a named compliance lead, even if part-time</li>
                  <li>Create a contact process for questions, audits, and escalations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Create a Centralized Compliance Register</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>List applicable laws, policies, and contractual obligations</li>
                  <li>Begin mapping existing documents and practices to each requirement</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Begin Policy Documentation and Version Control</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Identify your top 5 essential policies (e.g. data protection, access control)</li>
                  <li>Record last reviewed dates, owners, and storage location</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Establish an Internal Audit Prep Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Simulate an audit by tracking if documents, logs, and approvals are easily retrievable</li>
                  <li>Identify high-risk gaps in coverage or responsibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Launch a Monthly Risk Review Meeting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Track risk items in a spreadsheet</li>
                  <li>Review top 3-5 risks monthly and assign simple mitigation actions</li>
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
                  <span>Tag your five most critical policies and store them in a shared folder</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Create a "last reviewed" field in all policy documents</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Create a shared calendar reminder for policy review meetings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Ask department heads to nominate key compliance contacts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Step 1: Assign Risk & Compliance Accountability</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Formalize the compliance role</p>
                      <p className="text-gray-600 mt-1">
                        Create a job description for the compliance lead role, including:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Responsibilities for policy management</li>
                        <li>Compliance monitoring and reporting</li>
                        <li>Risk assessment coordination</li>
                        <li>Audit response management</li>
                        <li>Time commitment expectations (e.g., 10-15 hours per week)</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Establish reporting lines</p>
                      <p className="text-gray-600 mt-1">
                        Determine who the compliance lead reports to (e.g., managing partner, COO) and how often they
                        should provide updates.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">Create a compliance contact process</p>
                      <p className="text-gray-600 mt-1">
                        Develop a simple process for staff to report compliance concerns or questions, including:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Dedicated email address</li>
                        <li>Response time expectations</li>
                        <li>Escalation path for urgent issues</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 2: Create a Centralized Compliance Register</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Identify compliance sources</p>
                      <p className="text-gray-600 mt-1">Compile a list of compliance sources relevant to your firm:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Bar association rules and ethics opinions</li>
                        <li>Client contractual requirements</li>
                        <li>Data protection regulations (GDPR, CCPA, etc.)</li>
                        <li>Industry standards (ISO 27001, NIST CSF)</li>
                        <li>Internal policies and procedures</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Create a compliance register</p>
                      <p className="text-gray-600 mt-1">Develop a spreadsheet or database with the following fields:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Requirement ID</li>
                        <li>Requirement description</li>
                        <li>Source (regulation, client, internal)</li>
                        <li>Applicability (which departments/functions)</li>
                        <li>Owner</li>
                        <li>Current compliance status</li>
                        <li>Evidence location</li>
                        <li>Last review date</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Begin mapping requirements to controls</p>
                      <p className="text-gray-600 mt-1">For each requirement, identify:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Existing policies or procedures that address it</li>
                        <li>Technical controls in place</li>
                        <li>Gaps requiring attention</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 3: Begin Policy Documentation and Version Control</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Identify essential policies</p>
                      <p className="text-gray-600 mt-1">
                        Prioritize the development or updating of these key policies:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Information Security Policy</li>
                        <li>Data Protection/Privacy Policy</li>
                        <li>Acceptable Use Policy</li>
                        <li>Document Retention Policy</li>
                        <li>Incident Response Policy</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Establish a policy template</p>
                      <p className="text-gray-600 mt-1">Create a standard template for all policies that includes:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Policy title and ID</li>
                        <li>Version number and date</li>
                        <li>Approval history</li>
                        <li>Purpose and scope</li>
                        <li>Policy statements</li>
                        <li>Roles and responsibilities</li>
                        <li>Review schedule</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement version control</p>
                      <p className="text-gray-600 mt-1">Set up a system to track policy versions:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Use a document management system with version control</li>
                        <li>Maintain a policy register spreadsheet</li>
                        <li>Establish a naming convention (e.g., Policy_Name_v1.0)</li>
                        <li>Document approval and review dates</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 4: Establish an Internal Audit Prep Checklist</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Create an audit readiness checklist</p>
                      <p className="text-gray-600 mt-1">Develop a checklist covering common audit areas:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Policy documentation</li>
                        <li>Access control evidence</li>
                        <li>Security controls</li>
                        <li>Training records</li>
                        <li>Incident response documentation</li>
                        <li>Risk assessment results</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Conduct a mock audit</p>
                      <p className="text-gray-600 mt-1">Use the checklist to perform a self-assessment:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Attempt to locate all required evidence</li>
                        <li>Test how quickly items can be retrieved</li>
                        <li>Verify document completeness and currency</li>
                        <li>Identify missing or outdated items</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Document and prioritize gaps</p>
                      <p className="text-gray-600 mt-1">Create an action plan to address audit readiness gaps:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Prioritize based on risk and client requirements</li>
                        <li>Assign owners and deadlines</li>
                        <li>Schedule follow-up reviews</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 5: Launch a Monthly Risk Review Meeting</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Develop a risk tracking tool</p>
                      <p className="text-gray-600 mt-1">Create a spreadsheet or simple database with these fields:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Risk ID and description</li>
                        <li>Risk category (operational, legal, financial, etc.)</li>
                        <li>Impact and likelihood ratings</li>
                        <li>Current controls</li>
                        <li>Risk owner</li>
                        <li>Action items and status</li>
                        <li>Review date</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Establish a regular meeting cadence</p>
                      <p className="text-gray-600 mt-1">Set up monthly risk review meetings:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Schedule recurring calendar invites</li>
                        <li>Identify required attendees (compliance lead, IT, operations, etc.)</li>
                        <li>Create a standard agenda template</li>
                        <li>Establish meeting roles (facilitator, note-taker)</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement a risk review process</p>
                      <p className="text-gray-600 mt-1">During each meeting:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Review status of previous action items</li>
                        <li>Discuss any new or changed risks</li>
                        <li>Update risk ratings based on current information</li>
                        <li>Assign new action items with clear owners and deadlines</li>
                        <li>Document decisions and follow-ups</li>
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
                  Fragmented Responsibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Compliance activities may be spread across multiple departments with no clear coordination.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Create a cross-functional compliance committee with representatives from IT, legal, and operations
                    </li>
                    <li>
                      Develop a RACI matrix (Responsible, Accountable, Consulted, Informed) for key compliance
                      activities
                    </li>
                    <li>Use a shared tracking tool accessible to all stakeholders</li>
                    <li>Hold regular coordination meetings to align efforts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Inconsistent Policy Enforcement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Policies may exist but are not consistently followed or enforced across the organization.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Conduct awareness sessions to explain the purpose and importance of policies</li>
                    <li>Simplify policies to make them easier to understand and follow</li>
                    <li>Implement technical controls where possible to enforce policy requirements</li>
                    <li>Develop a consistent approach to policy exceptions and violations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Difficulty Mapping Requirements to Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  It can be challenging to connect compliance requirements to specific policies, procedures, or
                  technical controls.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Start with a simple mapping matrix focusing on high-priority requirements</li>
                    <li>Use a common framework (e.g., NIST CSF) as an organizing structure</li>
                    <li>Break down complex requirements into discrete, manageable controls</li>
                    <li>Consider using a GRC (Governance, Risk, Compliance) tool for larger firms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Keeping Policies Current
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Policies often become outdated as technology, regulations, and business practices evolve.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Establish a regular review cycle (e.g., annual) for all policies</li>
                    <li>Assign policy owners responsible for keeping content current</li>
                    <li>Subscribe to regulatory update services for relevant jurisdictions</li>
                    <li>Include a "last reviewed" date on all policy documents</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Risk Assessment Paralysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Teams may struggle with risk assessment methodology or get bogged down in details.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Start with a simple risk assessment approach (High/Medium/Low)</li>
                    <li>Focus on identifying and addressing the top 5-10 risks initially</li>
                    <li>Use pre-populated risk templates for common legal practice risks</li>
                    <li>Set time limits for risk discussions to prevent analysis paralysis</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Recommended Templates</h2>

          <div className="grid gap-4 mb-8">
            {templates.map((template, index) => (
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
            ))}
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
                <Link href="/playbook/roadmap#phase2" className="text-blue-600 hover:underline flex items-center">
                  <span>Jump to Roadmap Phase 2: Planning & Governance</span>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Link href="#" className="text-blue-600 hover:underline flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Risk & Compliance Templates</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
