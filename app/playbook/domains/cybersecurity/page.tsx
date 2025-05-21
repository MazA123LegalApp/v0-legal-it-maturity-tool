"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Define window.dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function CybersecurityDomainPage() {
  const [downloadClicked, setDownloadClicked] = useState(false)

  const handleDownload = () => {
    // Track the download event using dataLayer directly
    if (typeof window !== "undefined") {
      // Push to dataLayer for GTM
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "file_download",
        file_name: "cybersecurity-domain-guide.pdf",
        file_type: "pdf",
        content_type: "domain_guide",
        domain: "cybersecurity",
      })

      // Also track with gtag if available
      if (window.gtag) {
        window.gtag("event", "file_download", {
          file_type: "pdf",
          file_name: "cybersecurity-domain-guide.pdf",
          content_type: "domain_guide",
          domain: "cybersecurity",
        })
      }

      // Store in localStorage for admin dashboard to access
      try {
        const downloads = JSON.parse(localStorage.getItem("tracked_downloads") || "[]")
        downloads.push({
          type: "pdf",
          module: "Cybersecurity Domain Guide",
          date: new Date().toISOString(),
        })
        localStorage.setItem("tracked_downloads", JSON.stringify(downloads))
      } catch (error) {
        console.error("Error tracking download:", error)
      }
    }

    setDownloadClicked(true)

    // In a real implementation, this would trigger the actual PDF download
    // For now, we'll just simulate it with a timeout
    setTimeout(() => {
      setDownloadClicked(false)
    }, 3000)
  }

  const handleResourceDownload = (fileName: string, fileType: string) => {
    // Track the download event using dataLayer directly
    if (typeof window !== "undefined") {
      // Push to dataLayer for GTM
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "file_download",
        file_name: fileName,
        file_type: fileType,
        content_type: "resource",
        domain: "cybersecurity",
      })

      // Also track with gtag if available
      if (window.gtag) {
        window.gtag("event", "file_download", {
          file_type: fileType,
          file_name: fileName,
          content_type: "resource",
          domain: "cybersecurity",
        })
      }

      // Store in localStorage for admin dashboard to access
      try {
        const downloads = JSON.parse(localStorage.getItem("tracked_downloads") || "[]")
        downloads.push({
          type: fileType,
          fileName: fileName,
          module: "Cybersecurity Resource",
          date: new Date().toISOString(),
        })
        localStorage.setItem("tracked_downloads", JSON.stringify(downloads))
      } catch (error) {
        console.error("Error tracking download:", error)
      }
    }
  }

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Hub
            </Button>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/playbook">
            <Button variant="ghost" size="sm">
              Playbook
            </Button>
          </Link>
        </div>

        <Button onClick={handleDownload} variant="outline" className="gap-2" disabled={downloadClicked}>
          <Download className="h-4 w-4" />
          {downloadClicked ? "Downloading..." : "Download Domain Guide"}
        </Button>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">Domain 1: Cybersecurity Modernization</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Strengthen your institution's ability to defend against cyber threats, manage vulnerabilities, and align with
          Zero Trust principles.
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
              <CardDescription>
                Cybersecurity is the cornerstone of digital trust, particularly in law firms and legal institutions
              </CardDescription>
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
                    <strong>People & Organization</strong>: Security awareness, training, roles, and responsibilities
                  </li>
                  <li>
                    <strong>Process</strong>: Security policies, incident response, vulnerability management
                  </li>
                  <li>
                    <strong>Tooling</strong>: Security technologies, monitoring, detection, and response capabilities
                  </li>
                  <li>
                    <strong>Data</strong>: Data classification, protection, encryption, and access controls
                  </li>
                  <li>
                    <strong>Continual Improvement</strong>: Security metrics, testing, and program enhancement
                  </li>
                </ul>

                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6">
                  <h4 className="text-blue-700 mb-2">Why This Domain Matters</h4>
                  <p className="mb-0">
                    Legal organizations are prime targets for cyber attacks due to the sensitive nature of their data.
                    Modernizing cybersecurity capabilities is essential for protecting client information, maintaining
                    regulatory compliance, and preserving the firm's reputation and trust.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maturity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maturity Levels & Recommendations</CardTitle>
              <CardDescription>
                Assessment of cybersecurity maturity levels and recommended actions for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Score</th>
                      <th className="border p-2 text-left">Maturity Level</th>
                      <th className="border p-2 text-left">Description</th>
                      <th className="border p-2 text-left">Recommendations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">1.0–1.9</td>
                      <td className="border p-2">Initial</td>
                      <td className="border p-2">No formal cybersecurity program; controls are ad hoc or reactive.</td>
                      <td className="border p-2">
                        <ul className="list-disc pl-5 mb-0">
                          <li>Appoint a security lead</li>
                          <li>Develop a basic incident response plan</li>
                          <li>Implement password management</li>
                          <li>Conduct initial security awareness training</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">2.0–2.9</td>
                      <td className="border p-2">Developing</td>
                      <td className="border p-2">
                        Basic controls exist; no consistent monitoring or centralized strategy.
                      </td>
                      <td className="border p-2">
                        <ul className="list-disc pl-5 mb-0">
                          <li>Implement MFA and endpoint protection</li>
                          <li>Define escalation and triage workflows</li>
                          <li>Develop security policies and standards</li>
                          <li>Implement basic vulnerability scanning</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">3.0–3.9</td>
                      <td className="border p-2">Established</td>
                      <td className="border p-2">
                        Security roles are defined; tooling is in place; incidents are managed.
                      </td>
                      <td className="border p-2">
                        <ul className="list-disc pl-5 mb-0">
                          <li>Conduct periodic phishing drills</li>
                          <li>Align with NIST or ISO 27001 controls</li>
                          <li>Implement security monitoring and alerting</li>
                          <li>Establish regular security assessments</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">4.0–4.4</td>
                      <td className="border p-2">Managed</td>
                      <td className="border p-2">Security processes are measured and continuously improved.</td>
                      <td className="border p-2">
                        <ul className="list-disc pl-5 mb-0">
                          <li>Integrate threat intel feeds</li>
                          <li>Automate patch management workflows</li>
                          <li>Implement advanced endpoint detection and response</li>
                          <li>Develop security metrics and dashboards</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">4.5–5.0</td>
                      <td className="border p-2">Optimized</td>
                      <td className="border p-2">
                        Zero Trust is embedded; analytics and AI-driven controls are in use.
                      </td>
                      <td className="border p-2">
                        <ul className="list-disc pl-5 mb-0">
                          <li>Participate in sector threat sharing programs</li>
                          <li>Benchmark SOC metrics and perform red-team exercises</li>
                          <li>Implement AI-driven security analytics</li>
                          <li>Establish a comprehensive Zero Trust architecture</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="federal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Federal Mapping</CardTitle>
              <CardDescription>
                How cybersecurity modernization aligns with federal frameworks and mandates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <h3>OMB M-22-09 Alignment</h3>
                <p>This domain supports the following Zero Trust pillars:</p>
                <ul>
                  <li>
                    <strong>Identity</strong>: Implementing strong authentication and identity verification
                  </li>
                  <li>
                    <strong>Devices</strong>: Ensuring device security and monitoring
                  </li>
                  <li>
                    <strong>Network Security</strong>: Segmentation, encryption, and monitoring
                  </li>
                </ul>

                <h3>Executive Order 14028 Alignment</h3>
                <p>This domain aligns with the following EO 14028 mandates:</p>
                <ul>
                  <li>Enhanced endpoint detection and response</li>
                  <li>Improved logging and incident response capabilities</li>
                  <li>Supply chain security measures</li>
                  <li>Zero Trust architecture implementation</li>
                </ul>

                <h3>National Cybersecurity Strategy (2023) Alignment</h3>
                <p>This domain supports the following strategy elements:</p>
                <ul>
                  <li>Institutional resilience and risk reduction</li>
                  <li>Public-private collaboration on cybersecurity</li>
                  <li>Proactive defense against cyber threats</li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-md border border-blue-200 my-6">
                  <h4 className="text-blue-700 mb-2">Compliance Benefit</h4>
                  <p className="mb-0">
                    By modernizing cybersecurity capabilities in alignment with these federal frameworks, legal
                    institutions can demonstrate compliance with emerging regulatory requirements and security standards
                    expected by clients and insurers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toolkit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Toolkit & Resources</CardTitle>
              <CardDescription>
                Downloadable templates, checklists, and resources for cybersecurity modernization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Sample Incident Response Plan Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A customizable template for creating a comprehensive incident response plan tailored to legal
                      organizations.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleResourceDownload("incident-response-template.docx", "docx")}
                    >
                      <Download className="h-4 w-4" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Vendor Security Evaluation Scorecard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A scorecard for evaluating the security posture of legal technology vendors and service providers.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleResourceDownload("vendor-security-evaluation-scorecard.xlsx", "xlsx")}
                    >
                      <Download className="h-4 w-4" />
                      Download Scorecard
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cybersecurity Quick Wins Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Top 10 cybersecurity quick wins specifically for law firms and legal departments.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleResourceDownload("cybersecurity-quick-wins-checklist.pdf", "pdf")}
                    >
                      <Download className="h-4 w-4" />
                      Download Checklist
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Security Awareness Training Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ready-to-use security awareness training materials tailored for legal professionals.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleResourceDownload("security-awareness-training-materials.zip", "zip")}
                    >
                      <Download className="h-4 w-4" />
                      Download Materials
                    </Button>
                  </CardContent>
                </Card>
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
                <h3>Phase 1: Assessment & Planning (1-2 months)</h3>
                <ol>
                  <li>
                    <strong>Conduct a security assessment</strong>: Evaluate current security posture using the maturity
                    assessment tool
                  </li>
                  <li>
                    <strong>Identify critical assets</strong>: Document critical systems, data, and workflows
                  </li>
                  <li>
                    <strong>Define security roles</strong>: Establish clear security responsibilities
                  </li>
                  <li>
                    <strong>Develop a roadmap</strong>: Create a phased implementation plan based on assessment results
                  </li>
                </ol>

                <h3>Phase 2: Foundation Building (2-4 months)</h3>
                <ol>
                  <li>
                    <strong>Implement basic controls</strong>: Deploy fundamental security controls (MFA, endpoint
                    protection)
                  </li>
                  <li>
                    <strong>Develop policies</strong>: Create or update security policies and procedures
                  </li>
                  <li>
                    <strong>Establish incident response</strong>: Implement basic incident response capabilities
                  </li>
                  <li>
                    <strong>Conduct awareness training</strong>: Roll out security awareness training
                  </li>
                </ol>

                <h3>Phase 3: Capability Enhancement (3-6 months)</h3>
                <ol>
                  <li>
                    <strong>Deploy monitoring</strong>: Implement security monitoring and alerting
                  </li>
                  <li>
                    <strong>Enhance access controls</strong>: Implement role-based access and least privilege
                  </li>
                  <li>
                    <strong>Improve vulnerability management</strong>: Establish regular scanning and patching
                  </li>
                  <li>
                    <strong>Conduct testing</strong>: Perform security testing and exercises
                  </li>
                </ol>

                <h3>Phase 4: Optimization & Maturity (6-12 months)</h3>
                <ol>
                  <li>
                    <strong>Implement advanced controls</strong>: Deploy advanced security technologies
                  </li>
                  <li>
                    <strong>Integrate threat intelligence</strong>: Incorporate threat feeds and analysis
                  </li>
                  <li>
                    <strong>Automate security processes</strong>: Implement security automation
                  </li>
                  <li>
                    <strong>Develop metrics</strong>: Establish security metrics and reporting
                  </li>
                </ol>

                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 my-6">
                  <h4 className="text-yellow-700 mb-2">Implementation Tip</h4>
                  <p className="mb-0">
                    Focus on quick wins early in the implementation to build momentum and demonstrate value. Prioritize
                    controls that address the most significant risks to your organization based on your assessment
                    results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>

        <Link href="/maturity/assessment">
          <Button className="gap-2">Start Cybersecurity Assessment</Button>
        </Link>
      </div>
    </div>
  )
}
