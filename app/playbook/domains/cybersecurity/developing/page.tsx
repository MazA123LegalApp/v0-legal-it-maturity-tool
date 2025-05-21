import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function CybersecurityDevelopingPage() {
  // Get templates for this domain and maturity level
  const templates = getTemplatesForDomain("cybersecurity", "Developing")

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cybersecurity Domain
          </Button>
        </Link>

        <Link href="/playbook/roadmap?phase=2">
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
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">Developing</span>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Tactical implementation guide for organizations at the Developing (2.0-2.9) maturity level
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>What This Means</CardTitle>
              <CardDescription>Understanding your current maturity level</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                At the <strong>Developing</strong> maturity level, your organization has started adopting security
                controls, but enforcement is inconsistent. You likely have:
              </p>
              <ul>
                <li>Basic security tools in place, but with gaps in coverage</li>
                <li>Some security policies, but they may be outdated or not fully implemented</li>
                <li>Limited monitoring capabilities and reactive incident response</li>
                <li>Inconsistent identity and access management practices</li>
                <li>Minimal security awareness training for staff</li>
              </ul>
              <p>
                Organizations at this level are vulnerable to common attacks and may struggle to detect or respond to
                security incidents effectively. The good news is that with focused effort on a few key areas, you can
                significantly improve your security posture.
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
                  <h3 className="text-lg font-semibold mb-3">Top 5 Priorities</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Deploy Multi-Factor Authentication (MFA)</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Implement MFA for all privileged accounts and critical systems. Start with admin accounts,
                          email, and financial systems.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Inventory all systems that support MFA</li>
                            <li>Prioritize critical systems (email, financial, admin portals)</li>
                            <li>Select an MFA solution (Microsoft Authenticator, Duo, Yubikey)</li>
                            <li>Create a phased rollout plan starting with IT and leadership</li>
                            <li>Document exceptions and compensating controls</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Implement Endpoint Protection</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Deploy modern endpoint protection with automated remediation capabilities on all devices.
                          Ensure central management and visibility.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>
                              Evaluate endpoint protection solutions (Microsoft Defender, CrowdStrike, SentinelOne)
                            </li>
                            <li>Deploy to a pilot group (IT team) for testing</li>
                            <li>Configure automated remediation for common threats</li>
                            <li>Establish a deployment schedule for all endpoints</li>
                            <li>Create a process for monitoring and responding to alerts</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Establish Security Policies and Training</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Assign clear ownership of security policies and conduct baseline security awareness training
                          for all staff.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Designate a security policy owner (CISO, IT Director, or Security Lead)</li>
                            <li>
                              Develop or update core security policies (Acceptable Use, Password, Data Classification)
                            </li>
                            <li>Create a security awareness training program (phishing, social engineering, etc.)</li>
                            <li>Schedule quarterly training sessions for all staff</li>
                            <li>Track completion and test effectiveness through simulated phishing</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Configure Audit Logging</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Enable and configure audit logging in core applications and systems to detect suspicious
                          activity.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Identify critical systems requiring logging (email, DMS, billing, VPN)</li>
                            <li>Configure logging for authentication events, admin actions, and data access</li>
                            <li>Establish log retention periods (minimum 90 days)</li>
                            <li>Implement a process for regular log review</li>
                            <li>Document logging gaps and create a plan to address them</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Develop a Basic Threat Model</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Create a simple threat model identifying your top 3-5 business-impacting scenarios and
                          mitigation strategies.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Identify critical assets (client data, financial systems, intellectual property)</li>
                            <li>
                              Document top threats (ransomware, data breach, business email compromise, insider threat)
                            </li>
                            <li>Assess potential business impact of each threat</li>
                            <li>Develop basic mitigation strategies for each threat</li>
                            <li>Review and update quarterly with leadership</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Quick Wins (30-Day Plan)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Week 1:</strong> Enable MFA for admin accounts and Microsoft 365/Google Workspace
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Week 2:</strong> Deploy endpoint protection to IT team and leadership devices
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Week 3:</strong> Conduct initial security awareness training for all staff
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Week 4:</strong> Enable audit logging in Microsoft 365/Google Workspace and document
                        management system
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Common Challenges and Solutions</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: User Resistance to MFA</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Users may resist MFA implementation due to perceived inconvenience.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Start with leadership adoption, provide clear communication about
                        security benefits, offer multiple MFA options (app, SMS, hardware token), and provide hands-on
                        support during rollout.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Limited Security Budget</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Implementing security improvements with limited financial resources.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Prioritize high-impact, low-cost solutions (MFA, basic logging),
                        leverage built-in security features in existing tools, consider cloud-based security services
                        with predictable costs, and build a business case using risk reduction metrics.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Lack of Security Expertise</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Limited internal security knowledge to implement and manage solutions.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Invest in training for IT staff, consider managed security services
                        for specific functions, engage with security consultants for implementation assistance, and join
                        legal security forums for peer support.
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
              <CardTitle>Resources & Templates</CardTitle>
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
                    <h4 className="font-medium text-sm">MFA Deployment Plan</h4>
                    <p className="text-xs text-muted-foreground">
                      Step-by-step guide for rolling out MFA across your organization
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    DOCX
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Audit Log Coverage Matrix</h4>
                    <p className="text-xs text-muted-foreground">
                      Template for documenting logging requirements across systems
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    XLSX
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Security Awareness Training Slides</h4>
                    <p className="text-xs text-muted-foreground">
                      Ready-to-use training materials for staff security awareness
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    PPTX
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

                <Link href="/playbook/roadmap?phase=2" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Phase 2: Planning & Governance
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Establishing governance structures for modernization
                    </p>
                  </div>
                </Link>

                <Link href="/playbook/roadmap?phase=3" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Phase 3: Foundations & Quick Wins
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">Implementing high-impact security improvements</p>
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

        <Link href="/playbook/roadmap?phase=3">
          <Button className="gap-2">
            View Implementation Roadmap
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
