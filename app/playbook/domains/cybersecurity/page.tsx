"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MaturityBanner } from "@/components/maturity-banner"
import { type DomainMaturityInfo, getDomainMaturityInfo } from "@/lib/assessment-utils"

// Define window.dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function CybersecurityDomainPage() {
  const [downloadClicked, setDownloadClicked] = useState(false)
  const [maturityInfo, setMaturityInfo] = useState<DomainMaturityInfo>({
    score: 0,
    level: "",
    hasCompleted: false,
  })

  useEffect(() => {
    // Get the maturity info for this domain
    const info = getDomainMaturityInfo("cybersecurity")
    setMaturityInfo(info)
  }, [])

  const handleDownload = () => {
    // Track the download event
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "file_download",
        file_name: "cybersecurity-playbook.pdf",
        file_type: "pdf",
        content_type: "domain_playbook",
      })

      if (window.gtag) {
        window.gtag("event", "file_download", {
          file_type: "pdf",
          file_name: "cybersecurity-playbook.pdf",
          content_type: "domain_playbook",
        })
      }

      try {
        const downloads = JSON.parse(localStorage.getItem("tracked_downloads") || "[]")
        downloads.push({
          type: "pdf",
          module: "Cybersecurity Domain Playbook",
          date: new Date().toISOString(),
        })
        localStorage.setItem("tracked_downloads", JSON.stringify(downloads))
      } catch (error) {
        console.error("Error tracking download:", error)
      }
    }

    setDownloadClicked(true)
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
          {downloadClicked ? "Downloading..." : "Download Domain Playbook (PDF)"}
        </Button>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mb-4">
          <Shield className="h-8 w-8 text-blue-700" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">Cybersecurity</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Strengthen your institution's ability to defend against cyber threats, manage vulnerabilities, and align with
          Zero Trust principles.
        </p>
      </div>

      {/* Maturity Banner - Shows personalized recommendations based on assessment */}
      <MaturityBanner domainId="cybersecurity" domainName="Cybersecurity" maturityInfo={maturityInfo} />

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="grid w-full md:w-auto grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Model</TabsTrigger>
          <TabsTrigger value="federal">Federal Alignment</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="tools">Tools & Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Domain Overview</CardTitle>
              <CardDescription>
                Cybersecurity is foundational to trust and regulatory compliance in the legal sector
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  Cybersecurity is foundational to trust and regulatory compliance in the legal sector. Legal
                  institutions manage sensitive client data, protected health information (PHI), and privileged
                  communications, making them prime targets for cyberattacks. This domain helps organizations secure
                  their systems by adopting Zero Trust principles and aligning with NIST and federal cybersecurity
                  mandates.
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
              <CardTitle>Maturity Model</CardTitle>
              <CardDescription>
                Five-level maturity model for cybersecurity capabilities in legal organizations
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">1.0–1.9</td>
                      <td className="border p-2 font-medium">Initial</td>
                      <td className="border p-2">
                        Security practices are informal, ad hoc, or nonexistent. No dedicated ownership.
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">2.0–2.9</td>
                      <td className="border p-2 font-medium">Developing</td>
                      <td className="border p-2">
                        Basic controls exist but are inconsistently applied. Partial awareness of threats.
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">3.0–3.9</td>
                      <td className="border p-2 font-medium">Established</td>
                      <td className="border p-2">
                        Roles, policies, and tooling are in place. Security is documented and reviewed.
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">4.0–4.4</td>
                      <td className="border p-2 font-medium">Managed</td>
                      <td className="border p-2">
                        Threat intelligence, advanced monitoring, and governance practices are embedded.
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">4.5–5.0</td>
                      <td className="border p-2 font-medium">Optimized</td>
                      <td className="border p-2">
                        Zero Trust architecture is fully implemented. Security is automated, proactive, and benchmarked.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Sample KPIs</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5">•</div>
                    <span>% endpoints with updated AV/MFA</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5">•</div>
                    <span># of detected vs. resolved incidents per quarter</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5">•</div>
                    <span>% of systems covered by Zero Trust controls</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5">•</div>
                    <span>Time-to-remediate (TTR) vs. industry benchmark</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="federal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Federal Alignment</CardTitle>
              <CardDescription>
                How cybersecurity modernization aligns with federal frameworks and mandates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <h3>Executive Order 14028</h3>
                <p>This domain aligns with the following EO 14028 mandates:</p>
                <ul>
                  <li>Mandates endpoint detection, logging, and coordinated incident response</li>
                  <li>Requires improved supply chain security and software assurance</li>
                  <li>Emphasizes the need for enhanced detection capabilities</li>
                  <li>Promotes information sharing and collaboration</li>
                </ul>

                <h3>OMB M-22-09</h3>
                <p>This domain supports the following Zero Trust pillars:</p>
                <ul>
                  <li>Requires Zero Trust architecture adoption across five pillars</li>
                  <li>Emphasizes strong identity verification and authentication</li>
                  <li>Promotes device security and continuous validation</li>
                  <li>Encourages network segmentation and encryption</li>
                </ul>

                <h3>National Cybersecurity Strategy (2023)</h3>
                <p>This domain supports the following strategy elements:</p>
                <ul>
                  <li>Prioritizes risk reduction, sector resilience, and vendor accountability</li>
                  <li>Emphasizes public-private collaboration on cybersecurity</li>
                  <li>Promotes secure-by-design software development</li>
                  <li>Encourages proactive defense against cyber threats</li>
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

        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations by Maturity Level</CardTitle>
              <CardDescription>Tailored recommendations based on your current cybersecurity maturity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className={maturityInfo.level === "Initial" ? "bg-blue-50 p-4 rounded-md" : ""}>
                  <h3 className="text-lg font-semibold mb-2">Initial (1.0-1.9)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Appoint a security lead. Document a minimum incident response plan.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Conduct basic phishing awareness training for all staff.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Implement password management and basic access controls.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Deploy endpoint protection across all devices.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Establish basic network security controls.</span>
                    </li>
                  </ul>
                </div>

                <div className={maturityInfo.level === "Developing" ? "bg-blue-50 p-4 rounded-md" : ""}>
                  <h3 className="text-lg font-semibold mb-2">Developing (2.0-2.9)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Deploy MFA, endpoint protection, and encryption.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Establish access management policies and procedures.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Develop formal security policies and standards.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Implement basic vulnerability scanning and patch management.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Establish security awareness training program.</span>
                    </li>
                  </ul>
                </div>

                <div className={maturityInfo.level === "Established" ? "bg-blue-50 p-4 rounded-md" : ""}>
                  <h3 className="text-lg font-semibold mb-2">Established (3.0-3.9)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Implement vulnerability scanning, centralized logging, and SIEM tools.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Begin Zero Trust architecture design and implementation.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Conduct regular security assessments and penetration testing.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Develop incident response playbooks and conduct tabletop exercises.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Implement data classification and protection controls.</span>
                    </li>
                  </ul>
                </div>

                <div className={maturityInfo.level === "Managed" ? "bg-blue-50 p-4 rounded-md" : ""}>
                  <h3 className="text-lg font-semibold mb-2">Managed (4.0-4.4)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Formalize threat detection playbooks and response procedures.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Integrate security telemetry across all systems.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Automate compliance checks and security controls.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Implement advanced endpoint detection and response.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Develop security metrics and dashboards.</span>
                    </li>
                  </ul>
                </div>

                <div className={maturityInfo.level === "Optimized" ? "bg-blue-50 p-4 rounded-md" : ""}>
                  <h3 className="text-lg font-semibold mb-2">Optimized (4.5-5.0)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Conduct red teaming exercises and advanced security simulations.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Participate in legal sector threat-sharing programs.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Leverage AI-enhanced defense and analytics.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Implement fully automated security orchestration and response.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Benchmark security capabilities against industry leaders.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Tools & Templates</CardTitle>
              <CardDescription>Resources to accelerate your cybersecurity modernization journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Incident Response Plan Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A customizable template for creating a comprehensive incident response plan tailored to legal
                      organizations.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cybersecurity Policy Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive policy framework aligned to NIST 800-53 controls, customized for legal
                      organizations.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Framework
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Zero Trust Adoption Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Step-by-step checklist for implementing Zero Trust architecture in legal environments.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Checklist
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Legal Sector Security Tool Evaluation Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Evaluation criteria for selecting security tools that meet the unique needs of legal
                      organizations.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Matrix
                    </Button>
                  </CardContent>
                </Card>
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
          <Button className="gap-2">
            Start Cybersecurity Assessment
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
