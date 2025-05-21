import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, Download, Shield, Zap, BarChart3, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Case Study: Strengthening IT Continuity and Change Governance",
  description: "Learn how a mid-sized law firm improved their IT governance and service management maturity",
}

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-4xl py-6">
          <div className="mb-6">
            <Link href="/playbook">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Playbook
              </Button>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Case Study: Strengthening IT Continuity and Change Governance at Firm A
            </h1>
            <p className="text-muted-foreground text-lg">
              A real-world example of improving IT governance and service management maturity
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-8">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <BarChart3 className="h-6 w-6 text-blue-700" />
                </div>
                <div className="text-3xl font-bold text-blue-700">83%</div>
                <p className="text-sm text-slate-600">Reduction in Critical System Downtime</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-green-700" />
                </div>
                <div className="text-3xl font-bold text-green-700">100%</div>
                <p className="text-sm text-slate-600">Change Approval Documentation</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <RefreshCw className="h-6 w-6 text-orange-700" />
                </div>
                <div className="text-3xl font-bold text-orange-700">3x</div>
                <p className="text-sm text-slate-600">Increase in Continuity Testing</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <Zap className="h-6 w-6 text-purple-700" />
                </div>
                <div className="text-3xl font-bold text-purple-700">45%</div>
                <p className="text-sm text-slate-600">Improvement in IT Satisfaction</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <Card className="bg-white h-full">
              <CardHeader>
                <CardTitle>Firm Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Mid-sized U.S. law firm</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>~250 attorneys, 3 offices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Practice focus: Healthcare, Real Estate, and Commercial Litigation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>IT team of 12 supporting legal tech, compliance, and client-facing platforms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white h-full">
              <CardHeader>
                <CardTitle>Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <Clock className="h-4 w-4 text-blue-700" />
                    </div>
                    <span>Service Continuity & Resilience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <Shield className="h-4 w-4 text-blue-700" />
                    </div>
                    <span>Incident & Problem Management</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <Zap className="h-4 w-4 text-blue-700" />
                    </div>
                    <span>Change & Deployment Governance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Background and Challenge
          </h2>
          <Card className="bg-white">
            <CardContent className="p-6">
              <p className="mb-4">
                In early 2023, Firm A experienced a four-hour outage of its document management system (DMS) during a
                time-sensitive client filing. The issue stemmed from an unreviewed patch that was applied without formal
                testing or rollback planning. Internal post-mortem analysis revealed:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 text-red-500">•</div>
                  <span>No formal business continuity or disaster recovery playbooks</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 text-red-500">•</div>
                  <span>Inconsistent incident escalation pathways</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 text-red-500">•</div>
                  <span>Low ticket classification accuracy</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 text-red-500">•</div>
                  <span>Uncoordinated system changes across teams</span>
                </li>
              </ul>
              <p>
                The outage caused delays in a healthcare litigation matter and raised concerns from a key client. Senior
                leadership initiated a broader review of the firm's IT governance and service management maturity.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Engagement Approach</h2>
          <Card className="bg-white">
            <CardContent className="p-6">
              <p className="mb-4">
                I was brought in to support the firm's IT leadership in assessing and remediating foundational risks.
                Using a structured maturity framework tailored to legal-sector operations, the approach focused on three
                domains:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                    <RefreshCw className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="font-medium">Service Continuity & Resilience</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                    <Clock className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="font-medium">Incident & Problem Management</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                    <Zap className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="font-medium">Change & Deployment Governance</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What We Did</h2>

          <div className="space-y-4">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold">1</span>
                  </div>
                  Baseline Assessment & Prioritization
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>Used a self-assessment tool to establish baseline maturity scores</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>
                      Identified gaps in continuity planning, unstructured change control, and low visibility into
                      incident trends
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold">2</span>
                  </div>
                  Targeted Interventions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>Created a simplified Business Continuity Plan (BCP) and DMS recovery procedure</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>
                      Established a Change Review Board and a risk classification system for production changes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>Developed root cause templates and implemented post-incident reviews</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>Introduced change freeze windows aligned to matter milestones and fiscal periods</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold">3</span>
                  </div>
                  Operational Foundations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>Defined service ownership and documented SLAs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>Improved ticket classification logic in the helpdesk system</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 text-blue-500">•</div>
                    <span>Conducted the firm's first tabletop continuity simulation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Outcomes</h2>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-3 text-left">Area</th>
                      <th className="border border-slate-300 p-3 text-left">Before</th>
                      <th className="border border-slate-300 p-3 text-left">After</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-3">Documented Change Approvals</td>
                      <td className="border border-slate-300 p-3">&lt;20%</td>
                      <td className="border border-slate-300 p-3 font-medium text-green-600">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Ticket Categorization Accuracy</td>
                      <td className="border border-slate-300 p-3">42%</td>
                      <td className="border border-slate-300 p-3 font-medium text-green-600">90%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Continuity Tests Conducted</td>
                      <td className="border border-slate-300 p-3">0/year</td>
                      <td className="border border-slate-300 p-3 font-medium text-green-600">3/year</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Downtime (Critical Systems)</td>
                      <td className="border border-slate-300 p-3">6 hrs/month</td>
                      <td className="border border-slate-300 p-3 font-medium text-green-600">&lt;1 hr/month</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">IT Satisfaction Score (CSAT)</td>
                      <td className="border border-slate-300 p-3">3.1 / 5</td>
                      <td className="border border-slate-300 p-3 font-medium text-green-600">4.5 / 5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Reflections</h2>
          <Card className="bg-white">
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-700" />
                  </div>
                  <span>Quick operational wins helped build internal trust and momentum</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-700" />
                  </div>
                  <span>Having a neutral framework (not vendor-aligned) improved buy-in across IT and legal ops</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-700" />
                  </div>
                  <span>
                    Improvements reduced reputational risk with institutional clients subject to regulatory scrutiny
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <BarChart3 className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="font-semibold mb-2">Measure First</h3>
                  <p className="text-slate-600">
                    Establish baseline metrics before making changes to demonstrate value and track progress
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="font-semibold mb-2">Governance Matters</h3>
                  <p className="text-slate-600">
                    Simple governance structures create accountability and improve outcomes
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <RefreshCw className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="font-semibold mb-2">Practice Makes Perfect</h3>
                  <p className="text-slate-600">
                    Regular testing and simulation exercises build resilience and confidence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <Link href="/playbook">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Playbook
            </Button>
          </Link>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4" />
            Download Case Study
          </Button>
        </div>
      </div>
    </div>
  )
}
