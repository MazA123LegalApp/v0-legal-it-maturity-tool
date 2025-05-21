import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function IncidentProblemInitialPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/playbook/domains/incident-problem">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Incident & Problem Management Domain
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            Incident & Problem Management: Initial Maturity
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
                    Your firm likely lacks a defined process for capturing, resolving, or analyzing IT incidents. There
                    may be no clear responsibility for managing outages or recurring issues. Users rely on ad hoc
                    communication (e.g., email, verbal reports), which increases downtime and damages trust in IT
                    services.
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
                      <h4 className="font-medium">Assign Incident Response Roles</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Designate primary contacts for service issues and outages</li>
                        <li>Post roles and contacts in shared systems and visible locations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Create a Basic Incident Log</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>
                          Use a spreadsheet to begin tracking incidents with fields like date, issue, impact, resolution
                          time
                        </li>
                        <li>Assign a unique reference number to each entry</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Introduce an Incident Severity Scale</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>
                          Define 3 levels: Minor (user-level), Major (practice-area-wide), Critical (firm-wide outage)
                        </li>
                        <li>Use this scale to triage priorities and clarify communications</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Document a Basic Escalation Procedure</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>
                          Define when and how incidents are escalated (e.g., unresolved after 1 hour → notify manager)
                        </li>
                        <li>Keep a visual flow posted in the IT workspace or shared folder</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Start Logging Repeat Issues</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Highlight any incident reported more than once</li>
                        <li>Track frequency and symptoms to prepare for root cause analysis later</li>
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
                      <h4 className="font-medium text-sm">Basic Incident Log Template</h4>
                      <p className="text-xs text-muted-foreground">Excel spreadsheet for tracking incidents</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      XLSX
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Incident Severity Classification Chart</h4>
                      <p className="text-xs text-muted-foreground">Guide for categorizing incident severity</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Escalation Flow Template</h4>
                      <p className="text-xs text-muted-foreground">Visual guide for incident escalation</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Repeat Incident Tracker</h4>
                      <p className="text-xs text-muted-foreground">Template for tracking recurring issues</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      XLSX
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
                    <span>Share the incident log template with your helpdesk or IT contact</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Schedule a weekly review of unresolved issues with IT leadership</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Assign a label/tag for "recurring incidents" in your email or ticketing system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Communicate to staff how to report issues consistently (email address or form)</span>
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
                  <Link href="/playbook/domains/incident-problem" className="block">
                    <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                      <h4 className="font-medium text-sm flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                        View Incident & Problem Management Domain Overview
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

                  <Link href="/playbook/domains/incident-problem/initial" className="block">
                    <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                      <h4 className="font-medium text-sm flex items-center">
                        <Download className="h-4 w-4 mr-2 text-amber-600" />
                        Download Incident Management Starter Toolkit
                      </h4>
                    </div>
                  </Link>
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
              <Link href="/playbook/domains/incident-problem/developing" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Developing</span>
              </Link>
              <Link href="/playbook/domains/incident-problem/established" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Established</span>
              </Link>
              <Link href="/playbook/domains/incident-problem/managed" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Managed</span>
              </Link>
              <Link href="/playbook/domains/incident-problem/optimized" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Optimized</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Link href="/playbook/domains/incident-problem">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Domain
          </Button>
        </Link>
        <Link href="/playbook/domains/incident-problem/developing">
          <Button className="gap-2">
            Next: Developing Maturity
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
