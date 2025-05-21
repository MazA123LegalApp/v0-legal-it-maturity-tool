import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

export default function CybersecurityInitialPage() {
  // Get templates for this domain and maturity level
  const templates = getTemplatesForDomain("cybersecurity", "Initial")

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cybersecurity Domain
          </Button>
        </Link>

        <Link href="/playbook/roadmap?phase=1">
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
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">Initial</span>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Tactical implementation guide for organizations at the Initial (1.0-1.9) maturity level
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
                At the <strong>Initial</strong> maturity level, your organization has minimal or ad hoc security
                practices in place. You likely have:
              </p>
              <ul>
                <li>Limited or no formal security policies</li>
                <li>Basic antivirus but few other security controls</li>
                <li>No dedicated security personnel or clear ownership</li>
                <li>Minimal visibility into threats or vulnerabilities</li>
                <li>Reactive approach to security incidents</li>
              </ul>
              <p>
                Organizations at this level are highly vulnerable to common cyber threats and may have already
                experienced security incidents. The good news is that even small, focused improvements can significantly
                reduce your risk profile.
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
                        <h4 className="font-medium">Appoint a Security Lead</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Designate someone to be responsible for security, even if it's a part-time role within IT.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Identify a suitable candidate (IT Manager, Systems Administrator)</li>
                            <li>Update their job description to include security responsibilities</li>
                            <li>Allocate dedicated time for security tasks (minimum 4-8 hours per week)</li>
                            <li>Provide basic security training (SANS Securing The Human, CompTIA Security+)</li>
                            <li>Establish reporting structure to leadership for security matters</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Implement Password Management</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Establish strong password policies and deploy a password manager for the organization.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Create a basic password policy (minimum length, complexity, change frequency)</li>
                            <li>Select a password manager (LastPass, 1Password, Bitwarden)</li>
                            <li>Deploy to IT team first as a pilot</li>
                            <li>Create a rollout plan for the rest of the organization</li>
                            <li>Provide training on using the password manager</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Deploy Basic Endpoint Protection</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Ensure all devices have modern antivirus/anti-malware protection with central management.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Inventory all endpoints (computers, laptops, servers)</li>
                            <li>Select an endpoint protection solution (Microsoft Defender, Sophos, Bitdefender)</li>
                            <li>Deploy to all devices with standard configuration</li>
                            <li>Verify installation and proper functioning</li>
                            <li>Establish a process for monitoring alerts</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Conduct Basic Security Awareness Training</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Provide fundamental security training to all staff, focusing on common threats.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Develop or acquire basic security awareness training materials</li>
                            <li>Focus on phishing, password security, and physical security</li>
                            <li>Schedule training sessions for all staff</li>
                            <li>Make training mandatory for new hires</li>
                            <li>Send regular security reminders via email</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                      <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Document a Minimum Incident Response Plan</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Create a basic plan for responding to security incidents.
                        </p>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                          <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                            <li>Define what constitutes a security incident</li>
                            <li>Establish a simple incident reporting process</li>
                            <li>Create a contact list for incident response team</li>
                            <li>Document basic containment and recovery procedures</li>
                            <li>Define communication protocols during an incident</li>
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
                        <strong>Week 1:</strong> Appoint security lead and inventory all devices
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Week 2:</strong> Deploy endpoint protection to critical systems
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Week 3:</strong> Create and distribute password policy
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Week 4:</strong> Conduct initial security awareness session for all staff
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Common Challenges and Solutions</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Limited Resources</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Small IT teams with limited time and budget for security initiatives.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Focus on high-impact, low-cost solutions first. Leverage built-in
                        security features in existing tools. Consider cloud-based security services with predictable
                        costs.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: Lack of Security Expertise</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        IT staff may have limited security knowledge or training.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Invest in basic security training for IT staff. Use security services
                        with managed components. Consider periodic consulting for specific security tasks.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <h4 className="font-medium">Challenge: User Resistance</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Staff may resist new security measures that change their workflow.
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        <strong>Solution:</strong> Communicate the importance of security measures. Provide clear
                        training and support. Start with leadership to set an example. Implement changes gradually.
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
                    <h4 className="font-medium text-sm">Basic Security Policy Template</h4>
                    <p className="text-xs text-muted-foreground">
                      Starter security policy templates for small organizations
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    DOCX
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Security Awareness Training Slides</h4>
                    <p className="text-xs text-muted-foreground">
                      Ready-to-use training materials for basic security awareness
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    PPTX
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-sm">Simple Incident Response Template</h4>
                    <p className="text-xs text-muted-foreground">
                      Basic template for documenting and responding to security incidents
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

                <Link href="/playbook/roadmap?phase=1" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Phase 1: Discovery & Assessment
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Establishing a baseline understanding of your security posture
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
                      Establishing basic security governance and ownership
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

        <Link href="/playbook/roadmap?phase=1">
          <Button className="gap-2">
            View Implementation Roadmap
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
