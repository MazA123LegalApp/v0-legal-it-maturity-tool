import Link from "next/link"
import { ArrowLeft, ArrowRight, Download, Shield } from "lucide-react"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MaturityBanner } from "@/components/maturity-banner"
import { MaturityContentSection } from "@/components/maturity-content-section"
import { EditableContentWrapper } from "@/components/editable-content-wrapper"

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
            <Shield className="h-6 w-6 text-blue-600" />
            Cybersecurity: Initial Maturity
          </h1>
          <p className="text-muted-foreground mb-6">
            Implementation guide for organizations at the Initial maturity level (Level 1)
          </p>

          <MaturityBanner level={1} />

          <div className="mt-8 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Maturity Level Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading content...</div>}>
                  <EditableContentWrapper
                    type="maturity-guide"
                    domain="cybersecurity"
                    maturityBand="initial"
                    id="overview"
                    title="Cybersecurity Initial Maturity Overview"
                  >
                    <div className="prose max-w-none">
                      <p>
                        At the <strong>Initial</strong> maturity level, legal organizations typically have minimal
                        cybersecurity measures in place. Security practices are largely reactive, ad-hoc, and lack
                        formal documentation or consistent implementation. This level is characterized by:
                      </p>

                      <ul>
                        <li>Basic security controls with limited coverage</li>
                        <li>Minimal security awareness among staff</li>
                        <li>Absence of formal security policies and procedures</li>
                        <li>Reactive approach to security incidents</li>
                        <li>Limited visibility into security risks and threats</li>
                      </ul>

                      <p>
                        Organizations at this level are often vulnerable to common security threats and may struggle to
                        protect sensitive client information effectively. Security measures are typically implemented in
                        response to specific incidents rather than as part of a proactive strategy.
                      </p>

                      <p>
                        The primary goal for organizations at the Initial level should be to establish basic security
                        foundations and begin developing a more structured approach to cybersecurity.
                      </p>
                    </div>
                  </EditableContentWrapper>
                </Suspense>
              </CardContent>
            </Card>

            <MaturityContentSection
              title="Key Implementation Steps"
              icon={<Shield className="h-5 w-5 text-blue-600" />}
            >
              <Suspense fallback={<div>Loading content...</div>}>
                <EditableContentWrapper
                  type="maturity-guide"
                  domain="cybersecurity"
                  maturityBand="initial"
                  id="implementation-steps"
                  title="Cybersecurity Initial Implementation Steps"
                >
                  <div className="prose max-w-none">
                    <p>
                      To establish a basic cybersecurity foundation, legal organizations at the Initial maturity level
                      should focus on these essential implementation steps:
                    </p>

                    <h3>1. Establish Basic Security Controls</h3>
                    <ul>
                      <li>
                        <strong>Deploy fundamental security technologies:</strong> Implement basic antivirus software,
                        firewalls, and password management across all systems.
                      </li>
                      <li>
                        <strong>Enable automatic updates:</strong> Configure systems to automatically install security
                        patches and updates for operating systems and applications.
                      </li>
                      <li>
                        <strong>Implement basic backup solutions:</strong> Establish regular backups of critical data
                        with at least one copy stored securely off-site or in the cloud.
                      </li>
                    </ul>

                    <h3>2. Develop Essential Security Policies</h3>
                    <ul>
                      <li>
                        <strong>Create a basic acceptable use policy:</strong> Define appropriate use of organization
                        systems, devices, and data.
                      </li>
                      <li>
                        <strong>Establish password requirements:</strong> Implement minimum password complexity
                        standards and regular password changes.
                      </li>
                      <li>
                        <strong>Document basic incident response procedures:</strong> Create simple guidelines for
                        reporting and responding to security incidents.
                      </li>
                    </ul>

                    <h3>3. Implement Basic Access Controls</h3>
                    <ul>
                      <li>
                        <strong>Establish user account management:</strong> Create a process for provisioning and
                        deprovisioning user accounts when employees join or leave.
                      </li>
                      <li>
                        <strong>Limit administrative privileges:</strong> Restrict administrative access to only those
                        who require it for their job functions.
                      </li>
                      <li>
                        <strong>Implement basic network segmentation:</strong> Separate guest networks from internal
                        networks containing sensitive information.
                      </li>
                    </ul>

                    <h3>4. Conduct Basic Security Awareness Training</h3>
                    <ul>
                      <li>
                        <strong>Provide introductory security training:</strong> Educate all staff on basic security
                        practices, including password security and phishing awareness.
                      </li>
                      <li>
                        <strong>Establish a security communication channel:</strong> Create a simple method for staff to
                        report suspicious activities or potential security incidents.
                      </li>
                      <li>
                        <strong>Share basic security tips regularly:</strong> Distribute periodic reminders about
                        security best practices.
                      </li>
                    </ul>

                    <h3>5. Perform Initial Risk Assessment</h3>
                    <ul>
                      <li>
                        <strong>Identify critical assets:</strong> Document the most important data and systems that
                        require protection.
                      </li>
                      <li>
                        <strong>Recognize basic threats:</strong> Identify common security threats relevant to legal
                        organizations.
                      </li>
                      <li>
                        <strong>Document known vulnerabilities:</strong> Create a simple inventory of security
                        weaknesses that need to be addressed.
                      </li>
                    </ul>
                  </div>
                </EditableContentWrapper>
              </Suspense>
            </MaturityContentSection>

            <MaturityContentSection title="Common Challenges" icon={<Shield className="h-5 w-5 text-orange-600" />}>
              <Suspense fallback={<div>Loading content...</div>}>
                <EditableContentWrapper
                  type="maturity-guide"
                  domain="cybersecurity"
                  maturityBand="initial"
                  id="challenges"
                  title="Cybersecurity Initial Maturity Challenges"
                >
                  <div className="prose max-w-none">
                    <p>
                      Organizations at the Initial maturity level often face several challenges when implementing
                      cybersecurity measures:
                    </p>

                    <h3>Resource Constraints</h3>
                    <ul>
                      <li>
                        <strong>Limited budget:</strong> Insufficient financial resources dedicated to security
                        technologies and initiatives.
                      </li>
                      <li>
                        <strong>Lack of dedicated security personnel:</strong> No staff specifically responsible for
                        cybersecurity, often relying on IT generalists or external providers.
                      </li>
                      <li>
                        <strong>Competing priorities:</strong> Security initiatives frequently take a backseat to
                        operational and business development activities.
                      </li>
                    </ul>

                    <h3>Knowledge and Awareness Gaps</h3>
                    <ul>
                      <li>
                        <strong>Limited security expertise:</strong> Insufficient understanding of security risks and
                        appropriate controls among IT staff and leadership.
                      </li>
                      <li>
                        <strong>Low security awareness:</strong> Staff may not recognize security threats or understand
                        their role in protecting organizational assets.
                      </li>
                      <li>
                        <strong>Difficulty keeping up with threats:</strong> Rapidly evolving threat landscape outpaces
                        the organization's ability to stay informed and prepared.
                      </li>
                    </ul>

                    <h3>Organizational Resistance</h3>
                    <ul>
                      <li>
                        <strong>Perception of security as a barrier:</strong> Security measures viewed as obstacles to
                        productivity rather than necessary protections.
                      </li>
                      <li>
                        <strong>Lack of leadership buy-in:</strong> Insufficient support from senior management for
                        security initiatives.
                      </li>
                      <li>
                        <strong>Resistance to change:</strong> Staff reluctance to adopt new security practices that
                        alter established workflows.
                      </li>
                    </ul>

                    <h3>Technical Challenges</h3>
                    <ul>
                      <li>
                        <strong>Legacy systems:</strong> Outdated technologies that may not support modern security
                        controls.
                      </li>
                      <li>
                        <strong>Shadow IT:</strong> Unauthorized applications and services used without proper security
                        assessment.
                      </li>
                      <li>
                        <strong>Integration difficulties:</strong> Challenges implementing security controls across
                        diverse systems and applications.
                      </li>
                    </ul>

                    <p>
                      Addressing these challenges requires a pragmatic approach that balances security improvements with
                      organizational constraints. Starting with small, high-impact changes and gradually building
                      momentum can help overcome these obstacles.
                    </p>
                  </div>
                </EditableContentWrapper>
              </Suspense>
            </MaturityContentSection>

            <MaturityContentSection
              title="Templates and Resources"
              icon={<Download className="h-5 w-5 text-green-600" />}
            >
              <Suspense fallback={<div>Loading content...</div>}>
                <EditableContentWrapper
                  type="template"
                  domain="cybersecurity"
                  maturityBand="initial"
                  id="templates"
                  title="Cybersecurity Initial Maturity Templates"
                >
                  <div className="prose max-w-none">
                    <p>
                      The following templates and resources will help legal organizations at the Initial maturity level
                      establish basic cybersecurity foundations:
                    </p>

                    <h3>Policy Templates</h3>
                    <ul>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Basic Acceptable Use Policy Template
                        </a>{" "}
                        - A simple template defining appropriate use of organization systems and data.
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Password Policy Template
                        </a>{" "}
                        - Guidelines for creating and managing secure passwords.
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Basic Incident Response Procedure
                        </a>{" "}
                        - Simple steps for responding to common security incidents.
                      </li>
                    </ul>

                    <h3>Assessment Tools</h3>
                    <ul>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Security Self-Assessment Checklist
                        </a>{" "}
                        - A basic checklist to identify security gaps in your organization.
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Critical Asset Inventory Template
                        </a>{" "}
                        - Spreadsheet for documenting important data and systems.
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Simple Risk Assessment Matrix
                        </a>{" "}
                        - Tool for prioritizing security risks based on impact and likelihood.
                      </li>
                    </ul>

                    <h3>Training Resources</h3>
                    <ul>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Security Awareness Presentation
                        </a>{" "}
                        - Basic slides covering essential security practices for all staff.
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Phishing Awareness Guide
                        </a>{" "}
                        - Educational material to help staff identify and avoid phishing attempts.
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Security Tips Poster Set
                        </a>{" "}
                        - Printable posters highlighting key security practices.
                      </li>
                    </ul>

                    <h3>Implementation Guides</h3>
                    <ul>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Basic Security Controls Checklist
                        </a>{" "}
                        - Step-by-step guide for implementing fundamental security measures.
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Data Backup Guide
                        </a>{" "}
                        - Instructions for setting up basic backup procedures.
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Account Management Procedure
                        </a>{" "}
                        - Process for creating, modifying, and removing user accounts.
                      </li>
                    </ul>

                    <p className="text-sm text-muted-foreground mt-4">
                      Note: These templates are designed as starting points and should be customized to fit your
                      organization's specific needs and requirements.
                    </p>
                  </div>
                </EditableContentWrapper>
              </Suspense>
            </MaturityContentSection>
          </div>
        </div>

        <div className="md:w-64 lg:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">On This Page</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <a href="#overview" className="block text-sm hover:text-blue-600 py-1">
                  Maturity Level Overview
                </a>
                <a href="#implementation" className="block text-sm hover:text-blue-600 py-1">
                  Key Implementation Steps
                </a>
                <a href="#challenges" className="block text-sm hover:text-blue-600 py-1">
                  Common Challenges
                </a>
                <a href="#templates" className="block text-sm hover:text-blue-600 py-1">
                  Templates and Resources
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
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <span className="text-sm font-medium">Initial (Current)</span>
              </div>
              <Separator />
              <Link href="/playbook/domains/cybersecurity/developing" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-blue-600">Developing</span>
              </Link>
              <Link href="/playbook/domains/cybersecurity/established" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-blue-600">Established</span>
              </Link>
              <Link href="/playbook/domains/cybersecurity/managed" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-blue-600">Managed</span>
              </Link>
              <Link href="/playbook/domains/cybersecurity/optimized" className="flex items-center gap-2 py-1">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm text-muted-foreground hover:text-blue-600">Optimized</span>
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
