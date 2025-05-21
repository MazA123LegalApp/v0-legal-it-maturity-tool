"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function RiskComplianceOptimizedPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const templates = getTemplatesForDomain("risk-compliance", "Optimized")

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center mb-6">
        <Link href="/playbook/domains/risk-compliance" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Domain Overview
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Risk & Compliance — Optimized (4.5–5.0)</h1>
      </div>

      <Card className="mb-8 border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle>What This Score Means</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Your firm has a mature, integrated, and continuously improving risk and compliance program. Controls are
            automated where possible, policies are reviewed continuously, and compliance insights directly inform
            strategic decision-making. The focus now is external validation, predictive analytics, and sector
            leadership.
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
                <CardTitle>1. Leverage Predictive Risk Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use historical audit and risk data to forecast likelihood and trends</li>
                  <li>Apply machine learning tools or scenario modeling to predict compliance failure points</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Integrate Compliance Intelligence Into Business Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Embed compliance KPIs into legal practice management, strategic planning, and board reporting</li>
                  <li>Use risk appetite metrics to drive investment, resource allocation, and M&A reviews</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Benchmark Against Peer Institutions and Frameworks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Participate in legal tech peer benchmarking groups (e.g., ILTA, CLOC)</li>
                  <li>Align to NIST CSF or COBIT and compare posture annually</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Support Continuous Compliance Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Establish a compliance community of practice or champions across offices</li>
                  <li>Deliver micro-trainings and create incentives for policy leadership</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Contribute to Sector Thought Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Publish white papers, contribute to ABA or CLOC research, or present audit case studies</li>
                  <li>Share anonymized lessons learned to elevate sector trust and resilience</li>
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
                  <span>Publish a firm-wide compliance maturity report</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Submit maturity model or audit improvements to peer groups (ILTA, CLOC)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Conduct an end-to-end tabletop risk scenario for all business units</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Mentor junior professionals in compliance or governance rotations</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Step 1: Leverage Predictive Risk Analytics</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Consolidate historical risk data</p>
                      <p className="text-gray-600 mt-1">Gather and organize data from various sources:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Past risk assessments and audit findings</li>
                        <li>Incident reports and near-misses</li>
                        <li>Control effectiveness measurements</li>
                        <li>Compliance violations and exceptions</li>
                        <li>External threat intelligence</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement predictive modeling</p>
                      <p className="text-gray-600 mt-1">Apply analytics techniques to identify patterns and trends:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Trend analysis to identify emerging risks</li>
                        <li>Correlation analysis to find relationships between risk factors</li>
                        <li>Scenario modeling to test "what if" situations</li>
                        <li>Machine learning for anomaly detection</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Develop early warning indicators</p>
                      <p className="text-gray-600 mt-1">
                        Create a system of leading indicators that can predict compliance issues:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Define key risk indicators (KRIs) for each major risk area</li>
                        <li>Set thresholds for escalation and intervention</li>
                        <li>Implement automated monitoring and alerting</li>
                        <li>Validate indicators against actual outcomes</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Step 2: Integrate Compliance Intelligence Into Business Strategy
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Align compliance with strategic objectives</p>
                      <p className="text-gray-600 mt-1">
                        Ensure compliance considerations are embedded in strategic planning:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Include compliance leaders in strategic planning sessions</li>
                        <li>Map compliance capabilities to business objectives</li>
                        <li>Identify how compliance can enable business growth</li>
                        <li>Quantify the business value of compliance investments</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Develop risk appetite frameworks</p>
                      <p className="text-gray-600 mt-1">Create a structured approach to risk decision-making:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Define risk appetite statements for different risk categories</li>
                        <li>Establish quantitative risk tolerance thresholds</li>
                        <li>Create decision frameworks for evaluating new initiatives</li>
                        <li>Implement governance processes for risk acceptance</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Integrate compliance metrics into executive reporting</p>
                      <p className="text-gray-600 mt-1">
                        Ensure compliance insights are visible at the highest levels:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Include compliance KPIs in executive dashboards</li>
                        <li>Provide risk-adjusted performance metrics</li>
                        <li>Report on compliance as a business enabler</li>
                        <li>Demonstrate ROI of compliance investments</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 3: Benchmark Against Peer Institutions and Frameworks</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Join industry benchmarking groups</p>
                      <p className="text-gray-600 mt-1">
                        Participate in legal industry forums for compliance benchmarking:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>International Legal Technology Association (ILTA)</li>
                        <li>Corporate Legal Operations Consortium (CLOC)</li>
                        <li>Association of Corporate Counsel (ACC)</li>
                        <li>Legal industry information sharing groups</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Align with industry frameworks</p>
                      <p className="text-gray-600 mt-1">Map your compliance program to recognized frameworks:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>NIST Cybersecurity Framework</li>
                        <li>ISO 27001 for information security</li>
                        <li>COBIT for IT governance</li>
                        <li>ABA cybersecurity guidelines</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Conduct comparative assessments</p>
                      <p className="text-gray-600 mt-1">Regularly assess your program against external benchmarks:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Engage third-party assessors for objective evaluation</li>
                        <li>Participate in industry maturity assessments</li>
                        <li>Compare metrics against published industry averages</li>
                        <li>Identify areas for improvement based on peer performance</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 4: Support Continuous Compliance Culture</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Establish a compliance champions network</p>
                      <p className="text-gray-600 mt-1">Create a distributed network of compliance advocates:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Identify champions in each practice group and office</li>
                        <li>Provide specialized training and resources</li>
                        <li>Create a community of practice with regular meetings</li>
                        <li>Recognize and reward champion contributions</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Implement micro-learning approaches</p>
                      <p className="text-gray-600 mt-1">Deliver compliance training in digestible formats:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Short video modules (3-5 minutes)</li>
                        <li>Weekly compliance tips via email or intranet</li>
                        <li>Interactive quizzes and scenarios</li>
                        <li>Just-in-time learning resources</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Create incentives for compliance excellence</p>
                      <p className="text-gray-600 mt-1">Motivate and recognize compliance contributions:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Include compliance in performance evaluations</li>
                        <li>Recognize compliance innovations and improvements</li>
                        <li>Provide career advancement opportunities in governance roles</li>
                        <li>Celebrate compliance successes firm-wide</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Step 5: Contribute to Sector Thought Leadership</h3>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <p className="font-medium">Develop thought leadership content</p>
                      <p className="text-gray-600 mt-1">Create and share valuable compliance insights:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>White papers on emerging compliance challenges</li>
                        <li>Case studies of successful compliance initiatives</li>
                        <li>Best practice guides for legal compliance</li>
                        <li>Trend analyses and future predictions</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Participate in industry research</p>
                      <p className="text-gray-600 mt-1">Contribute to advancing industry knowledge:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Participate in ABA or CLOC research initiatives</li>
                        <li>Contribute to industry surveys and benchmarking studies</li>
                        <li>Collaborate on developing new standards or frameworks</li>
                        <li>Share anonymized data for industry analysis</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Establish a public presence</p>
                      <p className="text-gray-600 mt-1">Share your expertise with the broader community:</p>
                      <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>Present at industry conferences and webinars</li>
                        <li>Publish articles in legal and compliance publications</li>
                        <li>Participate in panel discussions and roundtables</li>
                        <li>Mentor other organizations on compliance best practices</li>
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
                  Data Quality for Predictive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Predictive analytics require high-quality, consistent data, which may be difficult to obtain from
                  disparate systems.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Implement data quality controls and validation processes</li>
                    <li>Start with a focused data set before expanding</li>
                    <li>Use data normalization techniques to standardize inputs</li>
                    <li>Consider AI-assisted data cleansing tools</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Balancing Risk Appetite with Business Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Finding the right balance between risk management and enabling business innovation can be challenging.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Develop tiered risk appetite statements for different business activities</li>
                    <li>Create a structured exception process for higher-risk initiatives</li>
                    <li>Implement a risk-adjusted return on investment (RAROI) approach</li>
                    <li>Use scenario planning to evaluate potential outcomes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Benchmarking Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Legal firms may be reluctant to share detailed compliance information, limiting benchmarking
                  effectiveness.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Participate in anonymous benchmarking studies through trusted third parties</li>
                    <li>Focus on process maturity rather than specific control details</li>
                    <li>Use industry frameworks as proxy benchmarks</li>
                    <li>Establish trusted peer groups for more detailed sharing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Sustaining a Compliance Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Maintaining enthusiasm and engagement for compliance over time can be difficult, especially in
                  high-performing environments.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Regularly refresh training content and delivery methods</li>
                    <li>Connect compliance to professional development and career advancement</li>
                    <li>Share success stories and positive client feedback</li>
                    <li>Rotate compliance champion roles to bring in fresh perspectives</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Balancing Thought Leadership with Confidentiality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Sharing valuable insights while protecting sensitive information and competitive advantage can be
                  challenging.
                </p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold mb-2">Solutions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Develop clear guidelines for what can be shared externally</li>
                    <li>Use anonymized case studies and aggregated data</li>
                    <li>Focus on methodology and approach rather than specific details</li>
                    <li>Have legal and compliance review all external content</li>
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
                <Link href="/playbook/roadmap#phase5" className="text-blue-600 hover:underline flex items-center">
                  <span>Jump to Roadmap Phase 5: Optimization & Scale</span>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Link href="#" className="text-blue-600 hover:underline flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Optimized Risk Toolkit</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
