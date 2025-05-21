import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Suspense } from "react"
import { DomainOverviewTemplate } from "@/components/domain-overview-template"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditableContentWrapper } from "@/components/editable-content-wrapper"

export const metadata = {
  title: "Incident & Problem Management | Legal IT Maturity",
  description: "Incident & Problem Management domain overview and implementation guides",
}

export default function IncidentProblemPage() {
  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <DomainOverviewTemplate
        domainId="incident-problem"
        title="Incident & Problem Management"
        description="Focuses on how effectively you detect, respond to, and learn from operational issues."
        keyAreas={[
          "Incident Detection & Logging: Identifying and recording service disruptions",
          "Incident Response & Resolution: Restoring normal service operations",
          "Problem Identification: Finding underlying causes of recurring incidents",
          "Root Cause Analysis: Investigating and addressing systemic issues",
          "Knowledge Management: Learning from incidents to prevent recurrence",
        ]}
        maturityJourney={[
          {
            band: "Initial (1.0–1.9)",
            description: "Ad-hoc incident response with minimal documentation and no formal problem management.",
            link: "/playbook/domains/incident-problem/initial",
          },
          {
            band: "Developing (2.0–2.9)",
            description: "Basic incident tracking with some categorization and reactive problem management.",
            link: "/playbook/domains/incident-problem/developing",
          },
          {
            band: "Established (3.0–3.9)",
            description: "Defined incident processes with consistent resolution and regular problem analysis.",
            link: "/playbook/domains/incident-problem/established",
          },
          {
            band: "Managed (4.0–4.4)",
            description: "Measured incident performance with proactive problem management and trend analysis.",
            link: "/playbook/domains/incident-problem/managed",
          },
          {
            band: "Optimized (4.5–5.0)",
            description: "Strategic incident prevention with predictive analytics and continuous improvement.",
            link: "/playbook/domains/incident-problem/optimized",
          },
        ]}
      />

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="w-full justify-start border-b pb-0 mb-6">
          <TabsTrigger value="overview" className="rounded-b-none">
            Domain Overview
          </TabsTrigger>
          <TabsTrigger value="maturity-levels" className="rounded-b-none">
            Maturity Levels
          </TabsTrigger>
          <TabsTrigger value="implementation" className="rounded-b-none">
            Implementation Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Domain Description</CardTitle>
                  <CardDescription>Understanding Incident & Problem Management</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading content...</div>}>
                    <EditableContentWrapper
                      type="domain"
                      domain="incident-problem"
                      id="overview"
                      title="Incident & Problem Management Overview"
                    >
                      <div className="prose max-w-none">
                        <p>
                          Incident & Problem Management encompasses the processes, tools, and capabilities that legal
                          organizations use to detect, respond to, resolve, and learn from IT service disruptions. This
                          domain focuses on two interconnected but distinct areas:
                        </p>

                        <h3>Incident Management</h3>
                        <p>
                          Incident Management is concerned with restoring normal service operation as quickly as
                          possible following an unplanned interruption or quality reduction. The primary goals are to:
                        </p>
                        <ul>
                          <li>Minimize the adverse impact on business operations</li>
                          <li>Ensure the best possible levels of service quality and availability are maintained</li>
                          <li>Provide clear and timely communication during service disruptions</li>
                        </ul>

                        <h3>Problem Management</h3>
                        <p>
                          Problem Management focuses on identifying and addressing the root causes of incidents to
                          prevent their recurrence. The primary goals are to:
                        </p>
                        <ul>
                          <li>Minimize the adverse impact of incidents that cannot be prevented</li>
                          <li>Eliminate recurring incidents through root cause analysis</li>
                          <li>Document known errors and workarounds to speed incident resolution</li>
                        </ul>

                        <p>
                          For legal organizations, effective Incident & Problem Management is particularly critical due
                          to:
                        </p>
                        <ul>
                          <li>
                            <strong>Time sensitivity of legal work:</strong> Billable time and court deadlines make
                            service disruptions especially costly
                          </li>
                          <li>
                            <strong>Client confidentiality requirements:</strong> Incidents may have regulatory and
                            ethical implications
                          </li>
                          <li>
                            <strong>Complex application ecosystems:</strong> Legal-specific applications require
                            specialized troubleshooting
                          </li>
                        </ul>

                        <p>
                          As organizations mature in this domain, they move from reactive, ad-hoc incident handling to
                          proactive problem prevention with continuous improvement cycles.
                        </p>
                      </div>
                    </EditableContentWrapper>
                  </Suspense>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Key Components</CardTitle>
                  <CardDescription>Essential elements of effective Incident & Problem Management</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading content...</div>}>
                    <EditableContentWrapper
                      type="domain"
                      domain="incident-problem"
                      id="components"
                      title="Incident & Problem Management Components"
                    >
                      <div className="prose max-w-none">
                        <h3>Incident Management Components</h3>
                        <ul>
                          <li>
                            <strong>Incident Detection & Logging:</strong> Mechanisms to identify and record service
                            disruptions through user reports, monitoring tools, and alerts
                          </li>
                          <li>
                            <strong>Incident Categorization & Prioritization:</strong> Frameworks for classifying
                            incidents by type, impact, and urgency to ensure appropriate resource allocation
                          </li>
                          <li>
                            <strong>Incident Response & Resolution:</strong> Procedures for diagnosing, troubleshooting,
                            and resolving incidents to restore normal service
                          </li>
                          <li>
                            <strong>Escalation Paths:</strong> Clear processes for involving additional expertise or
                            management when needed
                          </li>
                          <li>
                            <strong>Communication Protocols:</strong> Methods for keeping users and stakeholders
                            informed during service disruptions
                          </li>
                        </ul>

                        <h3>Problem Management Components</h3>
                        <ul>
                          <li>
                            <strong>Problem Identification:</strong> Processes to recognize patterns in incidents that
                            indicate underlying problems
                          </li>
                          <li>
                            <strong>Root Cause Analysis:</strong> Methodologies to investigate and determine the
                            fundamental causes of problems
                          </li>
                          <li>
                            <strong>Known Error Database:</strong> Repository of identified problems, their symptoms,
                            and temporary workarounds
                          </li>
                          <li>
                            <strong>Problem Resolution:</strong> Processes for implementing permanent fixes to address
                            root causes
                          </li>
                          <li>
                            <strong>Trend Analysis:</strong> Regular review of incident data to identify improvement
                            opportunities
                          </li>
                        </ul>

                        <h3>Supporting Elements</h3>
                        <ul>
                          <li>
                            <strong>Service Desk Function:</strong> First point of contact for users reporting incidents
                          </li>
                          <li>
                            <strong>Incident & Problem Management Tools:</strong> Software for tracking, managing, and
                            analyzing incidents and problems
                          </li>
                          <li>
                            <strong>Service Level Agreements (SLAs):</strong> Defined response and resolution timeframes
                            based on incident priority
                          </li>
                          <li>
                            <strong>Knowledge Management:</strong> Processes for capturing and sharing troubleshooting
                            information
                          </li>
                          <li>
                            <strong>Continuous Improvement:</strong> Regular review of incident and problem management
                            effectiveness
                          </li>
                        </ul>
                      </div>
                    </EditableContentWrapper>
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Why This Matters</CardTitle>
                  <CardDescription>Impact on legal organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading content...</div>}>
                    <EditableContentWrapper
                      type="domain"
                      domain="incident-problem"
                      id="importance"
                      title="Why Incident & Problem Management Matters"
                    >
                      <div className="prose max-w-none">
                        <h3>Business Impact</h3>
                        <ul>
                          <li>
                            <strong>Minimized Downtime:</strong> Reduces billable hour losses and missed deadlines
                          </li>
                          <li>
                            <strong>Improved Productivity:</strong> Faster resolution means less disruption to legal
                            work
                          </li>
                          <li>
                            <strong>Enhanced Client Service:</strong> More reliable systems support better client
                            experience
                          </li>
                          <li>
                            <strong>Cost Reduction:</strong> Fewer recurring issues means lower support costs
                          </li>
                        </ul>

                        <h3>Risk Mitigation</h3>
                        <ul>
                          <li>
                            <strong>Reduced Security Incidents:</strong> Better problem management helps identify
                            security vulnerabilities
                          </li>
                          <li>
                            <strong>Compliance Support:</strong> Proper incident handling helps meet regulatory
                            requirements
                          </li>
                          <li>
                            <strong>Reputation Protection:</strong> Faster incident resolution minimizes client-visible
                            issues
                          </li>
                        </ul>

                        <h3>Operational Excellence</h3>
                        <ul>
                          <li>
                            <strong>Continuous Improvement:</strong> Problem management drives ongoing service
                            enhancement
                          </li>
                          <li>
                            <strong>Knowledge Retention:</strong> Documented incidents preserve troubleshooting
                            expertise
                          </li>
                          <li>
                            <strong>Better Resource Allocation:</strong> Data-driven insights help prioritize IT
                            investments
                          </li>
                        </ul>
                      </div>
                    </EditableContentWrapper>
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementation Guides</CardTitle>
                  <CardDescription>Maturity level-specific guidance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Link
                      href="/playbook/domains/incident-problem/initial"
                      className="block p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <h3 className="font-medium flex items-center">
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Initial
                        </span>
                        Getting Started
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Basic incident tracking and response for organizations with minimal processes
                      </p>
                    </Link>

                    <Link
                      href="/playbook/domains/incident-problem/developing"
                      className="block p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <h3 className="font-medium flex items-center">
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Developing
                        </span>
                        Building Structure
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Formalizing incident processes and introducing basic problem management
                      </p>
                    </Link>

                    <Link
                      href="/playbook/domains/incident-problem/established"
                      className="block p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <h3 className="font-medium flex items-center">
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Established
                        </span>
                        Standardizing Practices
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Implementing structured root cause analysis and continuous improvement
                      </p>
                    </Link>

                    <Link
                      href="/playbook/domains/incident-problem/managed"
                      className="block p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <h3 className="font-medium flex items-center">
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Managed
                        </span>
                        Data-Driven Improvement
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Using analytics and automation to enhance incident and problem management
                      </p>
                    </Link>

                    <Link
                      href="/playbook/domains/incident-problem/optimized"
                      className="block p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <h3 className="font-medium flex items-center">
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Optimized
                        </span>
                        Proactive Excellence
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Leveraging predictive analytics and industry leadership in incident prevention
                      </p>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="maturity-levels">
          <Card>
            <CardHeader>
              <CardTitle>Maturity Level Progression</CardTitle>
              <CardDescription>Evolution of Incident & Problem Management capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading content...</div>}>
                <EditableContentWrapper
                  type="domain"
                  domain="incident-problem"
                  id="maturity-levels"
                  title="Incident & Problem Management Maturity Levels"
                >
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-md border-l-4 border-red-400">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Initial (1.0-1.9)
                        </span>
                      </h3>
                      <div className="prose max-w-none mt-2">
                        <p>
                          Your firm likely lacks a defined process for capturing, resolving, or analyzing IT incidents.
                          There may be no clear responsibility for managing outages or recurring issues. Users rely on
                          ad hoc communication (e.g., email, verbal reports), which increases downtime and damages trust
                          in IT services.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-md border-l-4 border-orange-400">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Developing (2.0-2.9)
                        </span>
                      </h3>
                      <div className="prose max-w-none mt-2">
                        <p>
                          Your firm has basic awareness of incident handling and root cause analysis but lacks
                          consistent execution. Escalation paths may exist informally, and data about incidents is
                          likely underused. Improvement efforts tend to follow major disruptions rather than ongoing
                          measurement.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-md border-l-4 border-yellow-400">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Established (3.0-3.9)
                        </span>
                      </h3>
                      <div className="prose max-w-none mt-2">
                        <p>
                          Your firm has defined roles, consistent use of a ticketing system, and a maturing problem
                          management process. Escalations follow defined paths, and root cause analyses are regularly
                          performed. However, improvement opportunities still rely heavily on manual tracking and
                          post-event learnings.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-md border-l-4 border-green-400">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Managed (4.0-4.4)
                        </span>
                      </h3>
                      <div className="prose max-w-none mt-2">
                        <p>
                          Your firm has a fully operational incident and problem management process. RCA is routine,
                          problem records are tracked systematically, and SLAs are consistently met. Now is the time to
                          shift from reactive control to proactive prevention, automation, and insight-driven
                          improvement.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-md border-l-4 border-blue-400">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Optimized (4.5-5.0)
                        </span>
                      </h3>
                      <div className="prose max-w-none mt-2">
                        <p>
                          Your firm demonstrates sector-leading incident response and problem management maturity.
                          Incident trends proactively inform strategic investment, client assurance, and risk
                          management. Problem prevention is embedded into development, operations, and vendor oversight.
                        </p>
                      </div>
                    </div>
                  </div>
                </EditableContentWrapper>
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Approach</CardTitle>
              <CardDescription>Strategic guidance for improving Incident & Problem Management</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading content...</div>}>
                <EditableContentWrapper
                  type="domain"
                  domain="incident-problem"
                  id="implementation"
                  title="Incident & Problem Management Implementation"
                >
                  <div className="prose max-w-none">
                    <h3>Assessment & Planning</h3>
                    <ol>
                      <li>
                        <strong>Evaluate Current State:</strong> Assess existing incident handling practices, tools, and
                        capabilities
                      </li>
                      <li>
                        <strong>Identify Gaps:</strong> Compare current state to target maturity level requirements
                      </li>
                      <li>
                        <strong>Prioritize Improvements:</strong> Focus on high-impact, achievable changes first
                      </li>
                      <li>
                        <strong>Develop Roadmap:</strong> Create a phased implementation plan with clear milestones
                      </li>
                    </ol>

                    <h3>Foundation Building</h3>
                    <ol>
                      <li>
                        <strong>Define Roles & Responsibilities:</strong> Clarify who handles incidents at each level
                      </li>
                      <li>
                        <strong>Establish Incident Categories:</strong> Create a classification system for types of
                        incidents
                      </li>
                      <li>
                        <strong>Implement Severity Levels:</strong> Define impact and urgency criteria
                      </li>
                      <li>
                        <strong>Document Escalation Paths:</strong> Create clear procedures for when and how to escalate
                      </li>
                      <li>
                        <strong>Select Appropriate Tools:</strong> Choose ticketing/tracking systems that fit your needs
                      </li>
                    </ol>

                    <h3>Process Implementation</h3>
                    <ol>
                      <li>
                        <strong>Develop Standard Procedures:</strong> Create consistent processes for incident handling
                      </li>
                      <li>
                        <strong>Establish SLAs:</strong> Define response and resolution time targets
                      </li>
                      <li>
                        <strong>Implement Communication Templates:</strong> Standardize user notifications
                      </li>
                      <li>
                        <strong>Introduce Problem Management:</strong> Begin tracking recurring issues and root causes
                      </li>
                      <li>
                        <strong>Create Knowledge Base:</strong> Document solutions and workarounds
                      </li>
                    </ol>

                    <h3>Maturity Advancement</h3>
                    <ol>
                      <li>
                        <strong>Implement Metrics & Reporting:</strong> Track key performance indicators
                      </li>
                      <li>
                        <strong>Conduct Regular Reviews:</strong> Hold incident and problem review meetings
                      </li>
                      <li>
                        <strong>Integrate with Change Management:</strong> Ensure changes address known problems
                      </li>
                      <li>
                        <strong>Automate Where Possible:</strong> Implement monitoring and auto-ticketing
                      </li>
                      <li>
                        <strong>Develop Proactive Capabilities:</strong> Move toward predictive incident prevention
                      </li>
                    </ol>

                    <h3>Cultural Considerations</h3>
                    <p>
                      Successful implementation requires not just process and tools, but cultural alignment. Consider
                      these factors:
                    </p>
                    <ul>
                      <li>
                        <strong>Leadership Support:</strong> Ensure management understands and champions the importance
                        of effective incident management
                      </li>
                      <li>
                        <strong>Blame-Free Culture:</strong> Foster an environment where the focus is on fixing
                        problems, not assigning blame
                      </li>
                      <li>
                        <strong>Continuous Learning:</strong> Encourage sharing of lessons learned from incidents
                      </li>
                      <li>
                        <strong>User Education:</strong> Train all staff on how and when to report incidents
                      </li>
                      <li>
                        <strong>Recognition:</strong> Acknowledge good incident handling and problem-solving
                      </li>
                    </ul>
                  </div>
                </EditableContentWrapper>
              </Suspense>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-center">
            <Link href="/playbook/domains/incident-problem/initial">
              <Button size="lg" className="gap-2">
                View Initial Maturity Implementation Guide
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            All Domains
          </Button>
        </Link>

        <Link href="/playbook/domains/incident-problem/initial">
          <Button className="gap-2">
            Implementation Guide
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
