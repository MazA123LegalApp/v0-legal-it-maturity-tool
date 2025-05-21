import Link from "next/link"
import { ArrowLeft, ArrowRight, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EditableContent } from "@/components/editable-content"

export default function CybersecurityDomainPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="mb-4">
            <Link href="/playbook">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Playbook
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Cybersecurity Domain
          </h1>
          <p className="text-muted-foreground mt-2">
            Protecting your legal organization from digital threats and ensuring compliance
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <Link href="/playbook/domains/cybersecurity/initial" className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle>Initial</CardTitle>
              <CardDescription>Maturity Level 1</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Basic security measures with limited formal processes and reactive approach to threats.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/playbook/domains/cybersecurity/developing" className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle>Developing</CardTitle>
              <CardDescription>Maturity Level 2</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Emerging security framework with some documented processes and basic threat monitoring.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/playbook/domains/cybersecurity/established" className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle>Established</CardTitle>
              <CardDescription>Maturity Level 3</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive security program with defined policies and regular risk assessments.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/playbook/domains/cybersecurity/managed" className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle>Managed</CardTitle>
              <CardDescription>Maturity Level 4</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Proactive security management with metrics-driven approach and continuous monitoring.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/playbook/domains/cybersecurity/optimized" className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle>Optimized</CardTitle>
              <CardDescription>Maturity Level 5</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced security posture with automation, threat intelligence, and continuous improvement.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="space-y-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Domain Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <EditableContent type="domain-overview" domain="cybersecurity" title="Cybersecurity Domain Overview">
              <div className="prose max-w-none">
                <p>
                  Cybersecurity in legal organizations encompasses the technologies, processes, and practices designed
                  to protect networks, devices, programs, and data from attack, damage, or unauthorized access. With the
                  increasing digitization of legal services and the sensitive nature of client information, a robust
                  cybersecurity framework is essential for modern legal practices.
                </p>

                <h3>Key Components</h3>
                <ul>
                  <li>
                    <strong>Data Protection:</strong> Safeguarding sensitive client information and confidential legal
                    documents from unauthorized access or breaches.
                  </li>
                  <li>
                    <strong>Threat Management:</strong> Identifying, assessing, and mitigating security threats to the
                    organization's digital assets.
                  </li>
                  <li>
                    <strong>Access Control:</strong> Implementing proper authentication and authorization mechanisms to
                    ensure only appropriate personnel can access specific information.
                  </li>
                  <li>
                    <strong>Incident Response:</strong> Developing and maintaining plans for detecting, responding to,
                    and recovering from security incidents.
                  </li>
                  <li>
                    <strong>Compliance:</strong> Ensuring adherence to relevant security regulations and standards in
                    the legal industry.
                  </li>
                </ul>

                <h3>Why It Matters</h3>
                <p>
                  For legal organizations, cybersecurity is not just an IT concern but a fundamental business risk that
                  can impact client trust, regulatory compliance, and operational continuity. A security breach can lead
                  to:
                </p>
                <ul>
                  <li>Loss of confidential client information</li>
                  <li>Damage to firm reputation and client relationships</li>
                  <li>Potential malpractice claims and regulatory penalties</li>
                  <li>Business disruption and financial losses</li>
                </ul>

                <h3>Maturity Journey</h3>
                <p>
                  As legal organizations progress in their cybersecurity maturity, they move from basic security
                  measures with limited formal processes to comprehensive, proactive security frameworks with continuous
                  monitoring and improvement. Higher maturity levels involve more sophisticated threat intelligence,
                  automated security controls, and a security-aware organizational culture.
                </p>
              </div>
            </EditableContent>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <EditableContent type="roadmap" domain="cybersecurity" title="Cybersecurity Implementation Roadmap">
              <div className="prose max-w-none">
                <p>
                  Implementing a comprehensive cybersecurity program in a legal organization requires a strategic
                  approach that addresses people, processes, and technology. The following roadmap provides a structured
                  path to enhance your cybersecurity posture:
                </p>

                <h3>Phase 1: Assessment and Planning</h3>
                <ul>
                  <li>Conduct a comprehensive security risk assessment</li>
                  <li>Identify and classify sensitive data and systems</li>
                  <li>Develop a security strategy aligned with business objectives</li>
                  <li>Establish baseline security policies and standards</li>
                </ul>

                <h3>Phase 2: Foundation Building</h3>
                <ul>
                  <li>Implement basic security controls (firewalls, antivirus, etc.)</li>
                  <li>Establish identity and access management processes</li>
                  <li>Develop incident response procedures</li>
                  <li>Conduct initial security awareness training</li>
                </ul>

                <h3>Phase 3: Enhanced Protection</h3>
                <ul>
                  <li>Deploy advanced security technologies (endpoint protection, email security, etc.)</li>
                  <li>Implement multi-factor authentication</li>
                  <li>Establish regular vulnerability scanning and patch management</li>
                  <li>Develop and test business continuity plans</li>
                </ul>

                <h3>Phase 4: Proactive Security Management</h3>
                <ul>
                  <li>Implement security monitoring and threat detection capabilities</li>
                  <li>Establish a security metrics program</li>
                  <li>Conduct regular penetration testing and security assessments</li>
                  <li>Enhance security awareness with role-based training</li>
                </ul>

                <h3>Phase 5: Continuous Improvement</h3>
                <ul>
                  <li>Integrate threat intelligence into security operations</li>
                  <li>Implement automation for security processes</li>
                  <li>Establish a security governance framework</li>
                  <li>Develop advanced incident response capabilities</li>
                </ul>

                <p>
                  This roadmap should be tailored to your organization's specific needs, size, and current security
                  posture. Regular reassessment and adjustment of the roadmap are essential as the threat landscape and
                  your organization evolve.
                </p>
              </div>
            </EditableContent>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Link href="/playbook">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>
        <Link href="/playbook/domains/cybersecurity/initial">
          <Button className="gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
