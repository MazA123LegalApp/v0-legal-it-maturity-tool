import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function CybersecurityEstablishedPage() {
  // Get templates for this domain and maturity level
  const templates = getTemplatesForDomain("cybersecurity", "Established")

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cybersecurity Domain
          </Button>
        </Link>

        <Link href="/playbook/roadmap?phase=4">
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
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">Established</span>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Tactical implementation guide for organizations at the Established (3.0-3.9) maturity level
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
                Your firm has adopted baseline controls and processes such as MFA, endpoint protection, and a documented
                incident response plan. However, threat detection, visibility, and automation are still emerging. Now is
                the time to mature your program by introducing centralized logging, Zero Trust principles, and
                continuous monitoring.
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
                        <h4 className="font-medium">Deploy Centralized Logging and Monitoring</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Aggregate logs from key systems (e.g., email, DMS, firewalls) into a centralized system.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Identify key systems that need to be logged (email, DMS, firewalls, etc.)</li>
                            <li>
                              Select a SIEM tool (Microsoft Sentinel, LogRhythm, or open-source options like Wazuh)
                            </li>
                            <li>Configure log collection agents on critical systems</li>
                            <li>Set up basic alerting for suspicious activities</li>
                            <li>Establish a log review schedule and assign responsibility</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Begin Designing a Zero Trust Architecture</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Identify "crown jewel" assets and define segmentation strategies.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Identify and classify your most sensitive data and systems</li>
                            <li>Map access patterns and dependencies between systems</li>
                            <li>Implement identity-based access control and conditional access policies</li>
                            <li>Begin segmenting networks based on data sensitivity</li>
                            <li>Develop a roadmap for full Zero Trust implementation</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Conduct a Cybersecurity Risk Assessment</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Identify likely threat vectors and map controls to risks.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Identify key assets and their value to the organization</li>
                            <li>Document potential threats and vulnerabilities</li>
                            <li>Assess likelihood and impact of each risk</li>
                            <li>Map existing controls to identified risks</li>
                            <li>Align assessment results with the NIST Cybersecurity Framework or ISO 27001 Annex A</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Formalize Your Security Policy Framework</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Establish policies for access control, device security, data classification, and remote work.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Develop a comprehensive security policy framework</li>
                            <li>
                              Include policies for access control, device security, data classification, and remote work
                            </li>
                            <li>Ensure policies are version-controlled and accessible</li>
                            <li>Get formal approval from leadership</li>
                            <li>Communicate policies to all staff and provide training</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Test Your Incident Response Process</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Conduct a live tabletop simulation with IT, legal, and operations teams.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Develop realistic incident scenarios relevant to legal firms</li>
                            <li>Schedule a tabletop exercise with key stakeholders</li>
                            <li>Include external notification scenarios (e.g., regulators, clients)</li>
                            <li>Document lessons learned and areas for improvement</li>
                            <li>Update your incident response plan based on findings</li>
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
                      <span>Enable audit logging in Microsoft 365 / Google Workspace</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Use endpoint tools to enforce USB blocking and local encryption</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Publish your security policies in a shared document library</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Subscribe to threat intel updates (CISA, FBI InfraGard, MS-ISAC)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Common Challenges and Solutions</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Balancing Security with Attorney Workflow</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Attorneys may resist security measures that slow down their work.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Focus on transparent security controls that don't disrupt workflow.
                        Involve attorneys in policy development. Provide clear communication about security benefits.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Limited Security Expertise</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Difficulty finding or affording dedicated security personnel.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Consider a hybrid model with managed security services for
                        specialized functions like monitoring. Invest in training for existing IT staff.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Legacy Systems</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Older practice management or document systems may lack modern security features.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Implement compensating controls like network segmentation. Create a
                        roadmap for system modernization. Consider middleware solutions for authentication.
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
                    <h4 className="font-medium text-sm">Logging & Monitoring Configuration Workbook</h4>
                    <p className="text-xs text-muted-foreground">
                      Guide for setting up centralized logging and monitoring
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    XLSX
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Cyber Risk Assessment Template</h4>
                    <p className="text-xs text-muted-foreground">
                      Template for conducting a comprehensive cybersecurity risk assessment
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    DOCX
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Zero Trust Design Checklist</h4>
                    <p className="text-xs text-muted-foreground">
                      Checklist for implementing Zero Trust architecture principles
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Security Policy Framework Template</h4>
                    <p className="text-xs text-muted-foreground">
                      Template for creating a comprehensive security policy framework
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    DOCX
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

                <Link href="/playbook/roadmap?phase=4" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Phase 4: Transformation Projects
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Implementing advanced security controls and processes
                    </p>
                  </div>
                </Link>

                <Link href="/playbook/domains/cybersecurity#established" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Established Maturity Overview
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      General guidance for the Established maturity level
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

        <Link href="/playbook/roadmap?phase=4">
          <Button className="gap-2">
            View Implementation Roadmap
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
