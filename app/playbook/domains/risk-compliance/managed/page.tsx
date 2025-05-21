"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function RiskComplianceManagedPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const templates = getTemplatesForDomain("risk-compliance", "Managed")

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center mb-6">
        <Link href="/playbook/domains/risk-compliance" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Domain Overview
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Risk & Compliance — Managed (4.0–4.4)</h1>
      </div>

      <Card className="mb-8 border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle>What This Score Means</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Your compliance and risk function is well-structured and integrated into core business processes. Risks are
            tracked, audits are conducted, and obligations are monitored actively. The focus now should be on
            automation, visualisation, and strategic integration with legal operations.
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
                <CardTitle>1. Integrate GRC Tools With Operational Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Link risk registers to workflow platforms (e.g. contract management, ITSM)</li>
                  <li>Enable automatic policy review reminders and audit evidence capture</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Establish KPI Dashboards for Compliance & Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Track policy review status, audit findings, unresolved risks, and control test results</li>
                  <li>Display live on legal ops dashboards or in monthly reports</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Formalize Cross-Department Risk Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Run risk reviews quarterly across IT, Legal, HR, and Finance</li>
                  <li>Assign top 3 risks to each team with measurable mitigations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Expand Regulatory Change Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Track developments across ABA, CISA, and state-level bar compliance</li>
                  <li>Subscribe to alerts and maintain a living tracker of regulatory actions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Conduct Mock Audits and Benchmarking</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Perform internal "tabletop" compliance reviews simulating client/regulator audits</li>
                  <li>Benchmark maturity against SOC 2, ISO 27001, or industry peers</li>
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
                  <span>Visualise top 5 risks in a heatmap for senior stakeholders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Automate email reminders for risk reviews and policy expiry</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Add compliance metrics to service level reviews</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Review all vendor contracts for breach notification clauses</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Step 1: Integrate GRC Tools With Operational Systems</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Map integration points</p>
                      <p className="text-gray-600 mt-1">
                        Identify key systems that should connect with your GRC (Governance, Risk, and Compliance) tools:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Document Management System (DMS)</li>
                        <li>IT Service Management (ITSM) platform</li>
                        <li>Contract Management System</li>
                        <li>HR systems for training and onboarding</li>
                        <li>Ticketing systems for incident management</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement automated workflows</p>
                      <p className="text-gray-600 mt-1">Set up automated processes for common compliance activities:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Policy review reminders based on review dates</li>
                        <li>Automatic evidence collection for key controls</li>
                        <li>Risk assessment scheduling and notification</li>
                        <li>Compliance task assignment and tracking</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Establish data synchronization</p>
                      <p className="text-gray-600 mt-1">
                        Create processes to keep compliance data current across systems:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Regular data imports/exports between systems</li>
                        <li>API connections where available</li>
                        <li>Scheduled reconciliation checks</li>
                        <li>Single source of truth for key compliance data</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 2: Establish KPI Dashboards for Compliance & Risk</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Define key metrics</p>
                      <p className="text-gray-600 mt-1">
                        Identify the most important compliance and risk metrics to track:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Policy review status (% current vs. overdue)</li>
                        <li>Open audit findings by severity</li>
                        <li>Risk levels by category</li>
                        <li>Control effectiveness ratings</li>
                        <li>Compliance training completion rates</li>
                        <li>Incident response times</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Design visual dashboards</p>
                      <p className="text-gray-600 mt-1">Create dashboards that present information clearly:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Use color-coding for status indicators (red/amber/green)</li>
                        <li>Include trend data to show progress over time</li>
                        <li>Create different views for different audiences (executive, operational)</li>
                        <li>Enable drill-down capabilities for detailed analysis</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement reporting cadence</p>
                      <p className="text-gray-600 mt-1">
                        Establish a regular schedule for dashboard updates and reviews:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Weekly operational updates</li>
                        <li>Monthly management reviews</li>
                        <li>Quarterly executive summaries</li>
                        <li>Annual comprehensive reviews</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 3: Formalize Cross-Department Risk Reviews</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Establish a cross-functional risk committee</p>
                      <p className="text-gray-600 mt-1">Form a committee with representatives from key departments:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>IT and Security</li>
                        <li>Legal Operations</li>
                        <li>Human Resources</li>
                        <li>Finance</li>
                        <li>Practice group leaders</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement quarterly risk review meetings</p>
                      <p className="text-gray-600 mt-1">Structure the meetings to include:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Review of top risks by department</li>
                        <li>Status updates on previous mitigation actions</li>
                        <li>Discussion of emerging risks</li>
                        <li>Assignment of new mitigation actions with clear owners</li>
                        <li>Documentation of decisions and follow-ups</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Assign departmental risk ownership</p>
                      <p className="text-gray-600 mt-1">For each department:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Identify the top 3 risks they are responsible for managing</li>
                        <li>Define specific, measurable mitigation actions</li>
                        <li>Set deadlines and success criteria</li>
                        <li>Establish reporting requirements</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 4: Expand Regulatory Change Management</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Identify relevant regulatory sources</p>
                      <p className="text-gray-600 mt-1">Create a list of regulatory bodies and sources to monitor:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>American Bar Association (ABA) ethics opinions</li>
                        <li>State bar associations</li>
                        <li>Cybersecurity and Infrastructure Security Agency (CISA)</li>
                        <li>Data protection authorities (for GDPR, CCPA, etc.)</li>
                        <li>Industry-specific regulators relevant to your clients</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement a regulatory tracking system</p>
                      <p className="text-gray-600 mt-1">Develop a system to track regulatory changes:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Subscribe to regulatory alerts and newsletters</li>
                        <li>Create a database of regulatory requirements</li>
                        <li>Document changes and their impact on your firm</li>
                        <li>Link requirements to affected policies and controls</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Establish a change management process</p>
                      <p className="text-gray-600 mt-1">Create a process for responding to regulatory changes:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Assess the impact on current policies and practices</li>
                        <li>Determine required changes to controls</li>
                        <li>Update documentation and training</li>
                        <li>Verify and validate compliance with new requirements</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 5: Conduct Mock Audits and Benchmarking</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Develop mock audit scenarios</p>
                      <p className="text-gray-600 mt-1">Create realistic audit scenarios based on:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Client security questionnaires</li>
                        <li>Regulatory compliance reviews</li>
                        <li>Industry framework assessments (ISO 27001, SOC 2, etc.)</li>
                        <li>Data breach response simulations</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Conduct tabletop exercises</p>
                      <p className="text-gray-600 mt-1">Run mock audit sessions that include:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Evidence collection and review</li>
                        <li>Interviews with key personnel</li>
                        <li>Documentation of findings</li>
                        <li>Development of remediation plans</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Benchmark against industry standards</p>
                      <p className="text-gray-600 mt-1">Compare your compliance program against:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Industry frameworks (ISO 27001, NIST CSF)</li>
                        <li>Peer law firms of similar size</li>
                        <li>Client expectations and requirements</li>
                        <li>Best practices from legal industry associations</li>
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
                  System Integration Complexity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Integrating GRC tools with operational systems can be technically challenging and resource-intensive.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Start with manual data synchronization for critical systems before investing in full integration
                    </li>
                    <li>Prioritize integrations based on risk reduction and efficiency gains</li>
                    <li>Consider middleware or API-based solutions that don't require custom development</li>
                    <li>Implement in phases, starting with the most critical data flows</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Metric Overload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Too many metrics can lead to information overload and dilute focus on what matters most.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Limit executive dashboards to 5-7 key metrics that align with strategic objectives</li>
                    <li>Create tiered dashboards with increasing detail for different user roles</li>
                    <li>Focus on trend data rather than point-in-time measurements</li>
                    <li>Regularly review and refine metrics based on their usefulness and impact</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Cross-Departmental Coordination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Getting different departments to collaborate effectively on risk management can be challenging.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Secure executive sponsorship for the cross-functional risk committee</li>
                    <li>Align risk management with departmental goals and performance metrics</li>
                    <li>Rotate meeting leadership among departments to increase buy-in</li>
                    <li>Create shared risk ownership models with joint accountability</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Keeping Pace with Regulatory Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The volume and complexity of regulatory changes can be overwhelming to track and implement.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Consider using a regulatory intelligence service or tool</li>
                    <li>Assign specific regulatory domains to subject matter experts</li>
                    <li>Develop a triage process to assess the impact and urgency of changes</li>
                    <li>Partner with outside counsel or consultants for complex regulatory areas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Mock Audit Fatigue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Teams may experience audit fatigue if mock audits are too frequent or disruptive.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Schedule mock audits during lower-activity periods</li>
                    <li>Rotate the focus areas to distribute the workload</li>
                    <li>Provide advance notice and clear expectations</li>
                    <li>Recognize and reward participation and improvement</li>
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
                <Link href="/playbook/roadmap#phase4" className="text-blue-600 hover:underline flex items-center">
                  <span>Jump to Roadmap Phase 4: Transformation Projects</span>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Link href="#" className="text-blue-600 hover:underline flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Managed Compliance Toolkit</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
