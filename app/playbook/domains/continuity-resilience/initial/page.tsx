import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ContinuityResilienceInitialPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/playbook/domains/continuity-resilience">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Continuity & Resilience Domain
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            Service Continuity & Resilience: Initial Maturity
          </h1>
          <p className="text-muted-foreground mb-6">
            Implementation guide for organizations at the Initial maturity level (Level 1)
          </p>

          {/* Static Maturity Banner */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Initial Maturity (Level 1/5)</h2>
                  <p className="text-muted-foreground">Basic, reactive practices with minimal documentation</p>
                </div>
                <div className="md:w-1/3">
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Initial</span>
                    <span>Optimized</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What This Score Means</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>
                    Your firm has minimal or no formal plans to ensure continuity of service during disruption. There
                    may be reliance on ad hoc responses or informal knowledge. If plans exist, they are outdated,
                    siloed, or untested.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <CardTitle>Top 5 Priorities for Legal Institutions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Identify Critical Services and Systems</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>
                          List legal tech platforms, systems, or functions that support time-sensitive work (e.g., DMS,
                          court deadlines, billing)
                        </li>
                        <li>Rank their importance to ongoing service delivery</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Document Roles for Continuity Planning</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Assign responsibility for recovery strategy and plan maintenance</li>
                        <li>Create a central point of contact for continuity coordination</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Begin Drafting a Basic Business Continuity Plan (BCP)</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Define basic response protocols for loss of systems, personnel, or office access</li>
                        <li>Include steps for triage, communication, and contact lists</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Establish Communication Protocols</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Draft templates for internal/external crisis comms</li>
                        <li>Define who makes decisions and how updates are pushed (email, SMS, intranet)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Conduct a Basic Tabletop Scenario</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>
                          Run a one-hour discussion exercise simulating a DMS outage, ransomware attack, or fire/flood
                          at a key office
                        </li>
                        <li>Capture gaps and action items</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-green-600" />
                  <CardTitle>Recommended Templates</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Critical Systems Inventory Worksheet</h4>
                      <p className="text-xs text-muted-foreground">
                        Template for documenting critical systems and dependencies
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      XLSX
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Basic BCP Template</h4>
                      <p className="text-xs text-muted-foreground">
                        Simple business continuity plan template for legal firms
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      DOCX
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Continuity Roles & Contacts Sheet</h4>
                      <p className="text-xs text-muted-foreground">
                        Template for documenting continuity responsibilities
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      DOCX
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Tabletop Exercise Script</h4>
                      <p className="text-xs text-muted-foreground">Guide for running a basic continuity exercise</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <CardTitle>Quick Wins</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Inventory your top 10 systems and confirm backup and recovery owners</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Identify legal deadlines (e.g., filing, hearings) that cannot be missed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Draft a 1-page emergency contacts & decision tree</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Schedule your first tabletop with IT, risk, and operations leads</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <CardTitle>Related Playbook Links</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/playbook/domains/continuity-resilience" className="block">
                    <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                      <h4 className="font-medium text-sm flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                        View Continuity & Resilience Domain Overview
                      </h4>
                    </div>
                  </Link>

                  <Link href="/playbook/roadmap?phase=1" className="block">
                    <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                      <h4 className="font-medium text-sm flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                        Jump to Roadmap Phase 1: Discovery & Assessment
                      </h4>
                    </div>
                  </Link>

                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <Download className="h-4 w-4 mr-2 text-amber-600" />
                      Download Initial Toolkit
                    </h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:w-64 lg:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">On This Page</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <a href="#overview" className="block text-sm hover:text-amber-600 py-1">
                  What This Score Means
                </a>
                <a href="#priorities" className="block text-sm hover:text-amber-600 py-1">
                  Top 5 Priorities
                </a>
                <a href="#templates" className="block text-sm hover:text-amber-600 py-1">
                  Recommended Templates
                </a>
                <a href="#quick-wins" className="block text-sm hover:text-amber-600 py-1">
                  Quick Wins
                </a>
                <a href="#related-links" className="block text-sm hover:text-amber-600 py-1">
                  Related Playbook Links
                </a>
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Maturity Levels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                <span className="text-sm font-medium">Initial (Current)</span>
              </div>
              <Separator />
              <Link href="/playbook/domains/continuity-resilience/developing" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Developing</span>
              </Link>
              <Link href="/playbook/domains/continuity-resilience/established" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Established</span>
              </Link>
              <Link href="/playbook/domains/continuity-resilience/managed" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Managed</span>
              </Link>
              <Link href="/playbook/domains/continuity-resilience/optimized" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Optimized</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Link href="/playbook/domains/continuity-resilience">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Domain
          </Button>
        </Link>
        <Link href="/playbook/domains/continuity-resilience/developing">
          <Button className="gap-2">
            Next: Developing Maturity
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
