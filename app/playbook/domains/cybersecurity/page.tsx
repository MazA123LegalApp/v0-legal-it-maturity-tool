"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trackEvent } from "@/components/analytics"

export default function CybersecurityDomainPage() {
  const [downloadClicked, setDownloadClicked] = useState(false)

  const handleDownload = () => {
    // Track the download event
    trackEvent("file_download", {
      file_name: "cybersecurity-domain-guide.pdf",
      file_type: "pdf",
      content_type: "domain_guide",
      domain: "cybersecurity",
    })

    setDownloadClicked(true)

    // In a real implementation, this would trigger the actual PDF download
    // For now, we'll just simulate it with a timeout
    setTimeout(() => {
      setDownloadClicked(false)
    }, 3000)
  }

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/playbook">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>

        <Button
          onClick={handleDownload}
          variant="outline"
          className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50"
          disabled={downloadClicked}
        >
          <Download className="h-4 w-4" />
          {downloadClicked ? "Downloading..." : "Download Cybersecurity Guide (PDF)"}
        </Button>
      </div>

      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">Domain 1: Cybersecurity Modernization</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Strengthen your institution's ability to defend against cyber threats, manage vulnerabilities, and align with
          Zero Trust principles
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="grid w-full md:w-auto grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Levels</TabsTrigger>
          <TabsTrigger value="federal">Federal Mapping</TabsTrigger>
          <TabsTrigger value="toolkit">Toolkit</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Domain Overview</CardTitle>
              <CardDescription>Understanding the cybersecurity modernization domain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  Cybersecurity is the cornerstone of digital trust, particularly in law firms and legal institutions
                  where client confidentiality and regulatory exposure are critical. This domain helps assess and
                  improve your institution's ability to defend against cyber threats, manage vulnerabilities, and align
                  with Zero Trust principles.
                </p>

                <h3>Maturity Subdomains</h3>
                <ul>
                  <li>
                    <strong>People & Organization:</strong> Security roles, training, awareness, and culture
                  </li>
                  <li>
                    <strong>Process:</strong> Security policies, incident response, and governance
                  </li>
                  <li>
                    <strong>Tooling:</strong> Security technologies, monitoring, and controls
                  </li>
                  <li>
                    <strong>Data:</strong> Data classification, protection, and privacy
                  </li>
                  <li>
                    <strong>Continual Improvement:</strong> Security program evolution and adaptation
                  </li>
                </ul>

                <div className="bg-gray-50 p-4 rounded-md my-6">
                  <h4 className="text-lg font-medium mb-2">Key Modernization Objectives</h4>
                  <ul>
                    <li>Transition from perimeter-based to Zero Trust security models</li>
                    <li>Implement continuous monitoring and threat detection</li>
                    <li>Establish robust incident response capabilities</li>
                    <li>Align security controls with legal-specific requirements</li>
                    <li>Develop security awareness specific to legal professionals</li>
                  </ul>
                </div>

                <h3>Why This Matters for Legal Organizations</h3>
                <p>Legal institutions face unique cybersecurity challenges due to:</p>
                <ul>
                  <li>Handling of highly sensitive client information and confidential data</li>
                  <li>Regulatory requirements for data protection and privacy</li>
                  <li>Increasing client demands for security assurance</li>
                  <li>Rising cyber insurance requirements</li>
                  <li>Targeted attacks against legal organizations</li>
                </ul>

                <p>
                  Modernizing your cybersecurity approach is not just about technology—it's about creating a
                  comprehensive security program that addresses people, processes, and technology in a way that's
                  tailored to legal operations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maturity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maturity Levels & Recommendations</CardTitle>
              <CardDescription>Understanding your cybersecurity maturity and how to improve</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 bg-gray-50">Score</th>
                        <th className="border px-4 py-2 bg-gray-50">Maturity Level</th>
                        <th className="border px-4 py-2 bg-gray-50">Description</th>
                        <th className="border px-4 py-2 bg-gray-50">Recommendations</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">1.0–1.9</td>
                        <td className="border px-4 py-2 font-medium">Initial</td>
                        <td className="border px-4 py-2">
                          No formal cybersecurity program; controls are ad hoc or reactive.
                        </td>
                        <td className="border px-4 py-2">
                          <ul className="list-disc pl-4 my-0">
                            <li>Appoint a security lead</li>
                            <li>Develop a basic incident response plan</li>
                            <li>Implement password management</li>
                            <li>Conduct initial security awareness training</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">2.0–2.9</td>
                        <td className="border px-4 py-2 font-medium">Developing</td>
                        <td className="border px-4 py-2">
                          Basic controls exist; no consistent monitoring or centralized strategy.
                        </td>
                        <td className="border px-4 py-2">
                          <ul className="list-disc pl-4 my-0">
                            <li>Implement MFA and endpoint protection</li>
                            <li>Define escalation and triage workflows</li>
                            <li>Establish basic security policies</li>
                            <li>Conduct vulnerability scanning</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">3.0–3.9</td>
                        <td className="border px-4 py-2 font-medium">Established</td>
                        <td className="border px-4 py-2">
                          Security roles are defined; tooling is in place; incidents are managed.
                        </td>
                        <td className="border px-4 py-2">
                          <ul className="list-disc pl-4 my-0">
                            <li>Conduct periodic phishing drills</li>
                            <li>Align with NIST or ISO 27001 controls</li>
                            <li>Implement EDR and SIEM solutions</li>
                            <li>Establish security governance committee</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">4.0–4.4</td>
                        <td className="border px-4 py-2 font-medium">Managed</td>
                        <td className="border px-4 py-2">Security processes are measured and continuously improved.</td>
                        <td className="border px-4 py-2">
                          <ul className="list-disc pl-4 my-0">
                            <li>Integrate threat intel feeds</li>
                            <li>Automate patch management workflows</li>
                            <li>Implement Zero Trust architecture</li>
                            <li>Conduct regular tabletop exercises</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">4.5–5.0</td>
                        <td className="border px-4 py-2 font-medium">Optimized</td>
                        <td className="border px-4 py-2">
                          Zero Trust is embedded; analytics and AI-driven controls are in use.
                        </td>
                        <td className="border px-4 py-2">
                          <ul className="list-disc pl-4 my-0">
                            <li>Participate in sector threat sharing programs</li>
                            <li>Benchmark SOC metrics and perform red-team exercises</li>
                            <li>Implement AI-driven security analytics</li>
                            <li>Establish advanced threat hunting capabilities</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="mt-8">Dimension-Specific Recommendations</h3>

                <h4>People & Organization</h4>
                <ul>
                  <li>Develop role-based security training for legal professionals</li>
                  <li>Establish clear security responsibilities in job descriptions</li>
                  <li>Create a security champions program across practice areas</li>
                  <li>Implement regular security awareness campaigns</li>
                </ul>

                <h4>Process</h4>
                <ul>
                  <li>Develop legal-specific security policies and procedures</li>
                  <li>Establish incident response processes with legal considerations</li>
                  <li>Implement change management for security controls</li>
                  <li>Create data classification policies aligned with legal requirements</li>
                </ul>

                <h4>Tooling</h4>
                <ul>
                  <li>Implement legal-specific DLP solutions</li>
                  <li>Deploy MFA across all systems with client data</li>
                  <li>Implement endpoint protection with legal workflow considerations</li>
                  <li>Deploy email security with focus on legal-specific threats</li>
                </ul>

                <h4>Data</h4>
                <ul>
                  <li>Implement data classification for legal documents</li>
                  <li>Deploy encryption for client communications</li>
                  <li>Establish data retention policies aligned with legal requirements</li>
                  <li>Implement secure client data sharing mechanisms</li>
                </ul>

                <h4>Continual Improvement</h4>
                <ul>
                  <li>Establish security metrics relevant to legal operations</li>
                  <li>Conduct regular security assessments and penetration tests</li>
                  <li>Implement lessons learned process after security incidents</li>
                  <li>Benchmark security controls against legal industry standards</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="federal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Federal Framework Mapping</CardTitle>
              <CardDescription>How cybersecurity modernization aligns with federal requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  Modernizing your cybersecurity approach helps align with key federal frameworks and mandates. This
                  alignment is increasingly important for legal organizations working with government clients or
                  handling sensitive information subject to federal regulations.
                </p>

                <h3>Executive Order 14028</h3>
                <p>This Executive Order on Improving the Nation's Cybersecurity establishes requirements for:</p>
                <ul>
                  <li>
                    <strong>Endpoint Detection and Response:</strong> Implementing advanced threat detection
                    capabilities
                  </li>
                  <li>
                    <strong>Logging and Monitoring:</strong> Enhancing visibility into security events
                  </li>
                  <li>
                    <strong>Incident Response:</strong> Developing robust incident handling procedures
                  </li>
                  <li>
                    <strong>Supply Chain Security:</strong> Managing third-party and vendor risks
                  </li>
                </ul>

                <h3>OMB M-22-09</h3>
                <p>The Office of Management and Budget memorandum on Zero Trust Architecture supports:</p>
                <ul>
                  <li>
                    <strong>Identity:</strong> Strong authentication and identity verification
                  </li>
                  <li>
                    <strong>Devices:</strong> Inventory and security of all devices
                  </li>
                  <li>
                    <strong>Networks:</strong> Segmentation and encryption of network traffic
                  </li>
                  <li>
                    <strong>Applications:</strong> Security testing and hardening of applications
                  </li>
                  <li>
                    <strong>Data:</strong> Classification and protection of sensitive information
                  </li>
                </ul>

                <h3>National Cybersecurity Strategy (2023)</h3>
                <p>The strategy emphasizes:</p>
                <ul>
                  <li>
                    <strong>Institutional Resilience:</strong> Building robust security programs
                  </li>
                  <li>
                    <strong>Public-Private Collaboration:</strong> Sharing threat intelligence
                  </li>
                  <li>
                    <strong>Risk Reduction:</strong> Implementing controls to mitigate cyber risks
                  </li>
                  <li>
                    <strong>Incident Response:</strong> Preparing for and responding to cyber incidents
                  </li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-md my-6">
                  <h4 className="text-lg font-medium mb-2">Legal-Specific Considerations</h4>
                  <p className="mb-2">When implementing federal frameworks in legal organizations, consider:</p>
                  <ul className="mb-0">
                    <li>Client confidentiality requirements alongside security controls</li>
                    <li>Legal professional privilege implications for security monitoring</li>
                    <li>Ethical obligations related to data protection</li>
                    <li>Regulatory requirements specific to legal practice areas</li>
                  </ul>
                </div>

                <h3>Compliance Benefits</h3>
                <p>Aligning with these federal frameworks provides several benefits:</p>
                <ul>
                  <li>Improved ability to work with government clients</li>
                  <li>Enhanced cybersecurity insurance positioning</li>
                  <li>Stronger security posture against evolving threats</li>
                  <li>Competitive advantage in security-conscious client environments</li>
                  <li>Reduced risk of regulatory penalties and reputational damage</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toolkit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Toolkit & Resources</CardTitle>
              <CardDescription>Practical tools to support your cybersecurity modernization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  The following resources are designed to help legal organizations implement cybersecurity modernization
                  initiatives. These templates, checklists, and guides can be downloaded and customized for your
                  specific needs.
                </p>

                <div className="grid gap-6 md:grid-cols-2 my-6">
                  <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Incident Response Plan Template
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      A customizable template for creating a comprehensive incident response plan tailored to legal
                      organizations.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => {
                        trackEvent("file_download", {
                          file_name: "incident-response-template.docx",
                          file_type: "docx",
                          content_type: "template",
                          domain: "cybersecurity",
                        })
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Download Template
                    </Button>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Security Vendor Evaluation Scorecard
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      A scorecard for evaluating security vendors and solutions specific to legal requirements.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => {
                        trackEvent("file_download", {
                          file_name: "vendor-evaluation-scorecard.xlsx",
                          file_type: "xlsx",
                          content_type: "template",
                          domain: "cybersecurity",
                        })
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Download Scorecard
                    </Button>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Cybersecurity Quick Wins Checklist
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      A checklist of the top 10 cybersecurity quick wins specifically for law firms and legal
                      departments.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => {
                        trackEvent("file_download", {
                          file_name: "cybersecurity-quick-wins.pdf",
                          file_type: "pdf",
                          content_type: "checklist",
                          domain: "cybersecurity",
                        })
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Download Checklist
                    </Button>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Security Awareness Training Guide
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      A guide for developing and implementing security awareness training for legal professionals.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => {
                        trackEvent("file_download", {
                          file_name: "security-awareness-guide.pdf",
                          file_type: "pdf",
                          content_type: "guide",
                          domain: "cybersecurity",
                        })
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Download Guide
                    </Button>
                  </div>
                </div>

                <h3>Additional Resources</h3>

                <h4>External References</h4>
                <ul>
                  <li>
                    <a href="https://www.cisa.gov/zero-trust-maturity-model" target="_blank" rel="noopener noreferrer">
                      CISA Zero Trust Maturity Model
                    </a>
                  </li>
                  <li>
                    <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">
                      NIST Cybersecurity Framework
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.americanbar.org/groups/cybersecurity/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ABA Cybersecurity Resources
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.lawsociety.org.uk/topics/cybersecurity"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Law Society Cybersecurity Guidance
                    </a>
                  </li>
                </ul>

                <h4>Webinars and Training</h4>
                <ul>
                  <li>Cybersecurity for Legal Professionals (Coming Soon)</li>
                  <li>Implementing Zero Trust in Legal Environments (Coming Soon)</li>
                  <li>Incident Response for Law Firms (Coming Soon)</li>
                  <li>Client Data Protection Best Practices (Coming Soon)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Guide</CardTitle>
              <CardDescription>Step-by-step approach to implementing cybersecurity modernization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  Implementing cybersecurity modernization in a legal organization requires a structured approach. This
                  guide provides a phased implementation plan that can be adapted to your organization's specific needs
                  and current maturity level.
                </p>

                <h3>Phase 1: Assessment and Planning (1-2 months)</h3>
                <ol>
                  <li>
                    <strong>Conduct a comprehensive security assessment</strong>
                    <ul>
                      <li>Complete the Legal IT Maturity Assessment</li>
                      <li>Identify critical assets and data</li>
                      <li>Document current security controls</li>
                      <li>Identify gaps and vulnerabilities</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Develop a security strategy and roadmap</strong>
                    <ul>
                      <li>Define security objectives aligned with business goals</li>
                      <li>Prioritize security initiatives based on risk</li>
                      <li>Develop a phased implementation plan</li>
                      <li>Secure leadership buy-in and budget approval</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Establish governance structure</strong>
                    <ul>
                      <li>Define security roles and responsibilities</li>
                      <li>Create a security steering committee</li>
                      <li>Develop initial security policies</li>
                      <li>Establish security metrics and reporting</li>
                    </ul>
                  </li>
                </ol>

                <h3>Phase 2: Foundation Building (3-6 months)</h3>
                <ol>
                  <li>
                    <strong>Implement basic security controls</strong>
                    <ul>
                      <li>Deploy multi-factor authentication</li>
                      <li>Implement endpoint protection</li>
                      <li>Establish backup and recovery procedures</li>
                      <li>Deploy email security solutions</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Develop incident response capabilities</strong>
                    <ul>
                      <li>Create an incident response plan</li>
                      <li>Establish an incident response team</li>
                      <li>Implement basic security monitoring</li>
                      <li>Conduct tabletop exercises</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Implement security awareness program</strong>
                    <ul>
                      <li>Develop role-based security training</li>
                      <li>Conduct phishing simulations</li>
                      <li>Create security communication channels</li>
                      <li>Establish security champions program</li>
                    </ul>
                  </li>
                </ol>

                <h3>Phase 3: Advanced Implementation (6-12 months)</h3>
                <ol>
                  <li>
                    <strong>Implement Zero Trust architecture</strong>
                    <ul>
                      <li>Deploy network segmentation</li>
                      <li>Implement least privilege access</li>
                      <li>Deploy data loss prevention</li>
                      <li>Implement application security controls</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Enhance detection and response</strong>
                    <ul>
                      <li>Deploy SIEM solution</li>
                      <li>Implement threat intelligence</li>
                      <li>Establish security operations capabilities</li>
                      <li>Conduct penetration testing</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Implement vendor security management</strong>
                    <ul>
                      <li>Develop vendor security requirements</li>
                      <li>Implement vendor assessment process</li>
                      <li>Establish ongoing vendor monitoring</li>
                      <li>Integrate vendor risk into overall risk management</li>
                    </ul>
                  </li>
                </ol>

                <h3>Phase 4: Optimization and Maturity (12+ months)</h3>
                <ol>
                  <li>
                    <strong>Implement advanced security analytics</strong>
                    <ul>
                      <li>Deploy user behavior analytics</li>
                      <li>Implement AI-driven security tools</li>
                      <li>Establish threat hunting capabilities</li>
                      <li>Develop predictive security measures</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Establish continuous improvement</strong>
                    <ul>
                      <li>Implement security metrics and dashboards</li>
                      <li>Conduct regular security assessments</li>
                      <li>Participate in industry benchmarking</li>
                      <li>Refine security strategy based on outcomes</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Integrate security into business processes</strong>
                    <ul>
                      <li>Embed security in development processes</li>
                      <li>Integrate security into client onboarding</li>
                      <li>Align security with business objectives</li>
                      <li>Develop security as a competitive advantage</li>
                    </ul>
                  </li>
                </ol>

                <div className="bg-yellow-50 p-4 rounded-md my-6">
                  <h4 className="text-lg font-medium mb-2">Implementation Tips</h4>
                  <ul className="mb-0">
                    <li>Start with quick wins to build momentum and demonstrate value</li>
                    <li>Focus on people and process before technology</li>
                    <li>Align security initiatives with business objectives</li>
                    <li>Communicate regularly with stakeholders</li>
                    <li>Measure and report on progress and outcomes</li>
                    <li>Adapt the implementation plan based on changing threats and business needs</li>
                  </ul>
                </div>

                <h3>Common Implementation Challenges</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 bg-gray-50">Challenge</th>
                      <th className="border px-4 py-2 bg-gray-50">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Limited budget and resources</td>
                      <td className="border px-4 py-2">
                        <ul className="list-disc pl-4 my-0">
                          <li>Prioritize initiatives based on risk</li>
                          <li>Consider managed security services</li>
                          <li>Implement in phases</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Resistance to change</td>
                      <td className="border px-4 py-2">
                        <ul className="list-disc pl-4 my-0">
                          <li>Focus on user experience</li>
                          <li>Communicate benefits clearly</li>
                          <li>Involve stakeholders in planning</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Integration with legal workflows</td>
                      <td className="border px-4 py-2">
                        <ul className="list-disc pl-4 my-0">
                          <li>Understand workflow requirements</li>
                          <li>Customize controls for legal processes</li>
                          <li>Pilot with select practice groups</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Measuring effectiveness</td>
                      <td className="border px-4 py-2">
                        <ul className="list-disc pl-4 my-0">
                          <li>Establish baseline metrics</li>
                          <li>Define clear success criteria</li>
                          <li>Implement regular assessments</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Link href="/playbook">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>

        <Button
          onClick={handleDownload}
          variant="outline"
          className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50"
          disabled={downloadClicked}
        >
          <Download className="h-4 w-4" />
          {downloadClicked ? "Downloading..." : "Download Cybersecurity Guide (PDF)"}
        </Button>
      </div>
    </div>
  )
}
