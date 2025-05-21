import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CybersecurityInitialPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cybersecurity Domain
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-amber-600" />
            Cybersecurity: Initial Maturity
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
                    Your firm has minimal cybersecurity controls in place. Security is handled reactively, with limited
                    awareness of threats or vulnerabilities. There may be no formal policies, and security
                    responsibilities are unclear or undefined.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
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
                      <h4 className="font-medium">Implement Basic Access Controls</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Require strong passwords for all systems (12+ characters, complexity)</li>
                        <li>Implement multi-factor authentication for email and remote access</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Establish Regular Patching</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Create a monthly schedule for applying security updates</li>
                        <li>Prioritize internet-facing and client-data systems</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Deploy Basic Endpoint Protection</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Install antivirus/anti-malware on all devices</li>
                        <li>Enable basic firewall protection</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Create a Basic Incident Response Plan</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Document who to contact when a security incident occurs</li>
                        <li>Outline basic steps for containing common incidents</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                    <div className="bg-amber-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-bold text-sm">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Conduct Basic Security Awareness Training</h4>
                      <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc ml-4">
                        <li>Train all staff on phishing awareness and password security</li>
                        <li>Provide guidance on handling sensitive client data</li>
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
                      <h4 className="font-medium text-sm">Password Policy Template</h4>
                      <p className="text-xs text-muted-foreground">Basic password requirements and guidelines</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      DOCX
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Security Incident Response Checklist</h4>
                      <p className="text-xs text-muted-foreground">Steps to take when a security incident occurs</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Phishing Awareness Guide</h4>
                      <p className="text-xs text-muted-foreground">How to identify and avoid phishing attempts</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">Monthly Patching Schedule Template</h4>
                      <p className="text-xs text-muted-foreground">Schedule for regular security updates</p>
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
                    <span>Enable MFA on your Microsoft 365 or Google Workspace account</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Run Windows Update on all computers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Send a test phishing email to staff and use it as a training opportunity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Create a contact list for security incidents</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-blue-600" />
                  <CardTitle>Related Playbook Links</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/playbook/domains/cybersecurity" className="block">
                    <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                      <h4 className="font-medium text-sm flex items-center">
                        <ShieldAlert className="h-4 w-4 mr-2 text-amber-600" />
                        View Cybersecurity Domain Overview
                      </h4>
                    </div>
                  </Link>

                  <Link href="/playbook/roadmap?phase=1" className="block">
                    <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                      <h4 className="font-medium text-sm flex items-center">
                        <ShieldAlert className="h-4 w-4 mr-2 text-amber-600" />
                        Jump to Roadmap Phase 1: Discovery & Assessment
                      </h4>
                    </div>
                  </Link>

                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <Download className="h-4 w-4 mr-2 text-amber-600" />
                      Download Cybersecurity Starter Toolkit
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
              <Link href="/playbook/domains/cybersecurity/developing" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Developing</span>
              </Link>
              <Link href="/playbook/domains/cybersecurity/established" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Established</span>
              </Link>
              <Link href="/playbook/domains/cybersecurity/managed" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Managed</span>
              </Link>
              <Link href="/playbook/domains/cybersecurity/optimized" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-amber-600">Optimized</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Domain
          </Button>
        </Link>
        <Link href="/playbook/domains/cybersecurity/developing">
          <Button className="gap-2">
            Next: Developing Maturity
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
