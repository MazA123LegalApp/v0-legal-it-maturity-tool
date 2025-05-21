import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function CybersecurityManagedPage() {
  // Get templates for this domain and maturity level
  const templates = getTemplatesForDomain("cybersecurity", "Managed")

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cybersecurity Domain
          </Button>
        </Link>

        <Link href="/playbook/roadmap?phase=5">
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            View Implementation Roadmap
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mb-4">
          <Shield className="h-8 w-8 text-blue-700" />
        </div>
        <div className="inline-flex items-center gap-2 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Cybersecurity</h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">Managed</span>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Tactical implementation guide for organizations at the Managed (4.0-4.4) maturity level
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>What This Score Means</CardTitle>
              <CardDescription>Understanding your current maturity level</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Your security program is structured, well-resourced, and embedded into business operations. You have
                implemented Zero Trust components, enforce policies, and monitor key environments. The next level of
                maturity involves deeper integration, greater automation, and real-time threat response capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Implementation Guide</CardTitle>
              <CardDescription>Step-by-step tactical guidance for improving cybersecurity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top 5 Priorities for Legal Institutions</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Automate Threat Detection and Response Workflows</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Configure SOAR (Security Orchestration, Automation, and Response) rules.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Identify common security incidents that can be automated</li>
                            <li>Configure SOAR rules for these incidents</li>
                            <li>Automate account lockout, isolation, or alerting for priority systems</li>
                            <li>Test automation workflows in a controlled environment</li>
                            <li>Monitor and refine automation based on performance</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Expand Zero Trust Coverage</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Apply segmentation to lateral movement zones and enforce device health checks.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Map lateral movement zones (e.g., between practice groups or data tiers)</li>
                            <li>Implement network segmentation based on data sensitivity</li>
                            <li>Enforce device health checks before granting access</li>
                            <li>Implement compliance scoring for devices</li>
                            <li>Regularly review and update segmentation rules</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Deploy Data Loss Prevention (DLP) Policies</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Use DLP to monitor and control sensitive document transfers.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Define data classification scheme for legal documents</li>
                            <li>Identify sensitive data types (client data, PHI, privileged communications)</li>
                            <li>Configure DLP policies for email, DMS, file shares, and remote work platforms</li>
                            <li>Test policies in monitor-only mode before enforcement</li>
                            <li>Implement a process for handling DLP alerts and exceptions</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Integrate Cybersecurity KPIs Into Business Dashboards</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Report metrics such as mean time to detect/respond, failed logins, and blocked threats.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Define key security metrics relevant to your organization</li>
                            <li>Implement data collection for these metrics</li>
                            <li>Create dashboards for different stakeholders (IT, management, board)</li>
                            <li>Include metrics in service or risk dashboards for leadership visibility</li>
                            <li>Regularly review and update metrics based on changing threats</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Run Third-Party Security Risk Reviews</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Assess vendor access and controls for hosted platforms.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Inventory all third-party vendors with access to your systems or data</li>
                            <li>Develop a vendor risk assessment questionnaire</li>
                            <li>Prioritize vendors based on data access and criticality</li>
                            <li>Conduct assessments of high-priority vendors</li>
                            <li>Track contract clauses and SLAs for breach response and audit rights</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Quick Wins</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Apply conditional access based on device risk score</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Add cybersecurity KPIs to board or steering committee reporting packs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Review logs for privilege escalations or policy violations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Tag and classify files by sensitivity in your DMS</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Common Challenges and Solutions</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Balancing Automation with Human Oversight</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Automated responses may create false positives or unintended consequences.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Start with low-risk automation scenarios. Implement human
                        verification for critical actions. Create clear escalation paths for automated alerts.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Integrating Security Across Practice Groups</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Different practice areas may have varying security requirements and workflows.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Create security champions in each practice group. Develop
                        practice-specific security guidelines. Implement baseline controls across all groups with
                        additional controls for high-risk areas.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Measuring Security ROI</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Difficulty demonstrating the value of security investments to leadership.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Focus on risk reduction metrics. Quantify potential breach costs.
                        Highlight client security requirements as business drivers. Track operational improvements from
                        security initiatives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recommended Templates</CardTitle>
              <CardDescription>Tools to accelerate implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      {template.fileType.toUpperCase()}
                    </Button>
                  </div>
                ))}

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">SOAR Workflow Configuration Guide</h4>
                    <p className="text-xs text-muted-foreground">Guide for setting up automated security workflows</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Zero Trust Segmentation Plan</h4>
                    <p className="text-xs text-muted-foreground">
                      Template for planning network segmentation based on Zero Trust principles
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    DOCX
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">DLP Policy Deployment Framework</h4>
                    <p className="text-xs text-muted-foreground">
                      Framework for implementing Data Loss Prevention policies
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    DOCX
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Third-Party Security Risk Register</h4>
                    <p className="text-xs text-muted-foreground">
                      Template for tracking and managing vendor security risks
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    XLSX
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Related Playbook Sections</CardTitle>
              <CardDescription>Strategic guidance and frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/playbook/domains/cybersecurity" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Cybersecurity Domain Overview
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Strategic framework and maturity model for cybersecurity
                    </p>
                  </div>
                </Link>

                <Link href="/playbook/roadmap?phase=5" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Phase 5: Optimization & Scale
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">Optimizing and scaling your security program</p>
                  </div>
                </Link>

                <Link href="/playbook/domains/cybersecurity#managed" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Managed Maturity Overview
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      General guidance for the Managed maturity level
                    </p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Additional support options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-md">
                  <h4 className="font-medium text-sm">Schedule a Consultation</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Book a 30-minute call with a cybersecurity expert to discuss your specific challenges
                  </p>
                  <Button size="sm" className="w-full mt-2">
                    Request Consultation
                  </Button>
                </div>

                <div className="p-3 bg-slate-50 rounded-md">
                  <h4 className="font-medium text-sm">Join the Community</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Connect with peers in legal IT to share experiences and best practices
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Join Forum
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cybersecurity Domain
          </Button>
        </Link>

        <Link href="/playbook/roadmap?phase=5">
          <Button className="gap-2">
            View Implementation Roadmap
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
