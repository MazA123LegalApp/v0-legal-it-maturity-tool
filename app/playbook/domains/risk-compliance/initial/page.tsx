"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function RiskComplianceInitialPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const templates = getTemplatesForDomain("risk-compliance", "Initial")

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center mb-6">
        <Link href="/playbook/domains/risk-compliance" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Domain Overview
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Risk & Compliance — Initial (1.0–1.9)</h1>
      </div>

      <Card className="mb-8 border-l-4 border-l-amber-500">
        <CardHeader>
          <CardTitle>What This Score Means</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Your firm likely has no formalized risk management or compliance structure in place. Policies, if they
            exist, are undocumented, outdated, or unknown to most staff. Legal, regulatory, or client obligations may be
            at risk. Immediate action is needed to introduce basic oversight and control.
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
                <CardTitle>1. Appoint a Risk & Compliance Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Assign one individual (even if part-time) to take ownership of compliance coordination</li>
                  <li>Document their responsibilities and create an internal point of contact</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Identify Core Compliance Obligations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Begin listing the top 5 applicable standards or client requirements (e.g. confidentiality, audit
                    access)
                  </li>
                  <li>Look at client contracts, bar association guidance, and vendor terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Gather Existing Policies (Even If Incomplete)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Collect any known versions of IT, security, or HR policies</li>
                  <li>Tag each with last known revision date and authorship</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Start a Basic Risk Log</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use a spreadsheet to record known or suspected operational risks</li>
                  <li>Note possible consequences and whether a mitigation plan exists</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Hold a Kickoff Meeting With Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Schedule a short call with firm leaders to explain the importance of building a compliance
                    foundation
                  </li>
                  <li>Share next steps and ask for their endorsement</li>
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
                  <span>Add policy version tracking to all Word files</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Create a shared folder called "Governance" and store all risk/policy material there</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Schedule monthly 30-min check-ins for risk & compliance tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Flag any areas with client audit clauses as high priority</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Step 1: Appoint a Risk & Compliance Contact</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Identify the right person</p>
                      <p className="text-gray-600 mt-1">
                        Look for someone with attention to detail and good organizational skills. This could be an
                        office manager, paralegal, or IT manager who has capacity to take on this responsibility.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">Document their role</p>
                      <p className="text-gray-600 mt-1">
                        Create a simple one-page description of their responsibilities, including:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Maintaining a list of compliance obligations</li>
                        <li>Tracking policy documents</li>
                        <li>Coordinating responses to client audits or questionnaires</li>
                        <li>Reporting compliance issues to leadership</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Announce the appointment</p>
                      <p className="text-gray-600 mt-1">
                        Send a firm-wide email introducing the compliance contact and explaining their role. Include
                        their contact information and when staff should reach out to them.
                      </p>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 2: Identify Core Compliance Obligations</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Review client contracts</p>
                      <p className="text-gray-600 mt-1">
                        Examine your top 5-10 client contracts for any compliance requirements, such as:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Data protection and confidentiality clauses</li>
                        <li>Security requirements</li>
                        <li>Audit rights</li>
                        <li>Reporting obligations</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Check bar association requirements</p>
                      <p className="text-gray-600 mt-1">
                        Review your state bar's ethics opinions and requirements related to technology, confidentiality,
                        and client communications.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">Document in a simple spreadsheet</p>
                      <p className="text-gray-600 mt-1">Create a basic register with columns for:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Requirement description</li>
                        <li>Source (client name, bar association, etc.)</li>
                        <li>Responsible person</li>
                        <li>Current status (unknown, non-compliant, partially compliant, compliant)</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 3: Gather Existing Policies</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Search for existing documents</p>
                      <p className="text-gray-600 mt-1">
                        Look in shared drives, email archives, and ask department heads for any policy documents they
                        may have, including:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>IT acceptable use policies</li>
                        <li>Security policies</li>
                        <li>HR policies</li>
                        <li>Client confidentiality policies</li>
                        <li>Document retention policies</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Create a central repository</p>
                      <p className="text-gray-600 mt-1">
                        Set up a dedicated folder in your document management system or shared drive to store all policy
                        documents.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">Add metadata to each document</p>
                      <p className="text-gray-600 mt-1">For each policy, document:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Last known revision date</li>
                        <li>Author or owner</li>
                        <li>Approval status (draft, approved, unknown)</li>
                        <li>Distribution status (who has received it)</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 4: Start a Basic Risk Log</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Create a simple risk register</p>
                      <p className="text-gray-600 mt-1">Set up a spreadsheet with the following columns:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Risk ID (simple numbering)</li>
                        <li>Risk description</li>
                        <li>Potential impact (High/Medium/Low)</li>
                        <li>Likelihood (High/Medium/Low)</li>
                        <li>Current controls (if any)</li>
                        <li>Responsible person</li>
                        <li>Action needed</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Identify initial risks</p>
                      <p className="text-gray-600 mt-1">
                        Hold a brainstorming session with key staff to identify the top 10-15 operational risks,
                        focusing on:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Client data protection</li>
                        <li>IT system reliability</li>
                        <li>Regulatory compliance</li>
                        <li>Business continuity</li>
                        <li>Vendor management</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Prioritize for action</p>
                      <p className="text-gray-600 mt-1">
                        Identify the top 3-5 risks based on impact and likelihood, and assign initial actions to address
                        them.
                      </p>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 5: Hold a Kickoff Meeting With Leadership</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Prepare a brief presentation</p>
                      <p className="text-gray-600 mt-1">Create a 5-7 slide presentation covering:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Current compliance status and key gaps</li>
                        <li>Top risks identified</li>
                        <li>Proposed next steps and timeline</li>
                        <li>Resources needed</li>
                        <li>Benefits of improved compliance (client retention, risk reduction)</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Schedule the meeting</p>
                      <p className="text-gray-600 mt-1">
                        Arrange a 30-45 minute meeting with firm leadership, emphasizing the business case for
                        compliance improvements.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">Document outcomes</p>
                      <p className="text-gray-600 mt-1">After the meeting, send a follow-up email summarizing:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Decisions made</li>
                        <li>Approvals granted</li>
                        <li>Next steps and timeline</li>
                        <li>Responsibilities assigned</li>
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
                  Limited Resources and Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Many small to mid-sized legal firms struggle to allocate dedicated resources to compliance activities.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Start with a part-time role (5-10 hours per week) rather than a full-time position</li>
                    <li>Focus on the highest-risk areas first (client requirements, data protection)</li>
                    <li>Use templates and checklists to minimize the time needed for documentation</li>
                    <li>Consider engaging a consultant for initial setup, then maintain internally</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Lack of Visibility Into Existing Policies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Policies may be scattered across different departments, individuals, or systems with no central
                  inventory.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Send a firm-wide email asking for any policy documents people may have</li>
                    <li>Search email archives for terms like "policy," "procedure," or "guidelines"</li>
                    <li>Interview long-tenured employees who may know where documents are stored</li>
                    <li>Start fresh with basic templates if existing documents can't be found</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Resistance to Change
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Partners and staff may resist new compliance processes, seeing them as bureaucratic or unnecessary.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Frame compliance in terms of client retention and competitive advantage</li>
                    <li>Share examples of client requirements that necessitate better compliance</li>
                    <li>Start with minimal documentation and processes, then gradually expand</li>
                    <li>Get buy-in from influential partners who can champion the initiative</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Unclear Compliance Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  It may be difficult to determine which regulations, standards, or client requirements apply to your
                  firm.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Start with bar association ethics opinions and guidelines</li>
                    <li>Review your top 5-10 client contracts for compliance requirements</li>
                    <li>Consider basic frameworks like NIST CSF or ISO 27001 for general guidance</li>
                    <li>Join legal industry groups (ILTA, ABA) to learn from peers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Maintaining Momentum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Initial enthusiasm may wane as other priorities compete for attention.</p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Schedule regular (monthly) check-ins on the calendar</li>
                    <li>Set specific, achievable quarterly goals</li>
                    <li>Report progress to leadership to maintain visibility</li>
                    <li>Celebrate small wins and improvements</li>
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
                <Link href="/playbook/roadmap#phase1" className="text-blue-600 hover:underline flex items-center">
                  <span>Jump to Roadmap Phase 1: Discovery & Assessment</span>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Link href="#" className="text-blue-600 hover:underline flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Initial Risk Toolkit</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
