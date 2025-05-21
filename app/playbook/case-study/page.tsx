import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Case Study: Strengthening IT Continuity and Change Governance",
  description: "Learn how a mid-sized law firm improved their IT governance and service management maturity",
}

export default function CaseStudyPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <Link href="/playbook">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Case Study: Strengthening IT Continuity and Change Governance at Firm A
        </h1>
        <p className="text-muted-foreground">
          A real-world example of improving IT governance and service management maturity
        </p>
      </div>

      <Card className="mb-8">
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

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-500" />
          Background and Challenge
        </h2>
        <p className="mb-4">
          In early 2023, Firm A experienced a four-hour outage of its document management system (DMS) during a
          time-sensitive client filing. The issue stemmed from an unreviewed patch that was applied without formal
          testing or rollback planning. Internal post-mortem analysis revealed:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>No formal business continuity or disaster recovery playbooks</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>Inconsistent incident escalation pathways</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>Low ticket classification accuracy</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>Uncoordinated system changes across teams</span>
          </li>
        </ul>
        <p>
          The outage caused delays in a healthcare litigation matter and raised concerns from a key client. Senior
          leadership initiated a broader review of the firm's IT governance and service management maturity.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Engagement Approach</h2>
        <p className="mb-4">
          I was brought in to support the firm's IT leadership in assessing and remediating foundational risks. Using a
          structured maturity framework tailored to legal-sector operations, the approach focused on three domains:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>Service Continuity & Resilience</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>Incident & Problem Management</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>Change & Deployment Governance</span>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What We Did</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1. Baseline Assessment & Prioritization</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Used a self-assessment tool to establish baseline maturity scores</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>
                Identified gaps in continuity planning, unstructured change control, and low visibility into incident
                trends
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">2. Targeted Interventions</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Created a simplified Business Continuity Plan (BCP) and DMS recovery procedure</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Established a Change Review Board and a risk classification system for production changes</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Developed root cause templates and implemented post-incident reviews</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Introduced change freeze windows aligned to matter milestones and fiscal periods</span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">3. Operational Foundations</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Defined service ownership and documented SLAs</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Improved ticket classification logic in the helpdesk system</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Conducted the firm's first tabletop continuity simulation</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Outcomes</h2>
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
                <td className="border border-slate-300 p-3 font-medium">100%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-3">Ticket Categorization Accuracy</td>
                <td className="border border-slate-300 p-3">42%</td>
                <td className="border border-slate-300 p-3 font-medium">90%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-3">Continuity Tests Conducted</td>
                <td className="border border-slate-300 p-3">0/year</td>
                <td className="border border-slate-300 p-3 font-medium">3/year</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-3">Downtime (Critical Systems)</td>
                <td className="border border-slate-300 p-3">6 hrs/month</td>
                <td className="border border-slate-300 p-3 font-medium">&lt;1 hr/month</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-3">IT Satisfaction Score (CSAT)</td>
                <td className="border border-slate-300 p-3">3.1 / 5</td>
                <td className="border border-slate-300 p-3 font-medium">4.5 / 5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Reflections</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>Quick operational wins helped build internal trust and momentum</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>Having a neutral framework (not vendor-aligned) improved buy-in across IT and legal ops</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5">•</div>
            <span>
              Improvements reduced reputational risk with institutional clients subject to regulatory scrutiny
            </span>
          </li>
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <Link href="/playbook">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download Case Study
        </Button>
      </div>
    </div>
  )
}
