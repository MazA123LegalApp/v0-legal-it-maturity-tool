"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText, Lock, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Domain Overview</CardTitle>
          <CardDescription>Key components of legal cybersecurity modernization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h3>Context</h3>
            <p>
              Legal organizations face unique cybersecurity challenges due to the sensitive nature of client data,
              attorney-client privilege concerns, and regulatory requirements. The cybersecurity domain focuses on
              protecting these critical assets while enabling secure, efficient operations.
            </p>

            <h3>Key Components</h3>
            <ul>
              <li>
                <strong>Zero Trust Architecture</strong> - Implementing "never trust, always verify" principles across
                all systems and access points
              </li>
              <li>
                <strong>Identity and Access Management</strong> - Ensuring appropriate access controls and
                authentication mechanisms
              </li>
              <li>
                <strong>Data Protection</strong> - Safeguarding sensitive client and case information through encryption
                and data loss prevention
              </li>
              <li>
                <strong>Threat Detection and Response</strong> - Monitoring for and responding to security incidents
                effectively
              </li>
              <li>
                <strong>Security Governance</strong> - Establishing policies, procedures, and oversight mechanisms
              </li>
            </ul>

            <h3>Federal Alignment</h3>
            <p>
              This domain aligns with Executive Order 14028 (Improving the Nation's Cybersecurity), NIST Cybersecurity
              Framework, and ABA Formal Opinion 483 on lawyers' obligations after a data breach.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Maturity-specific recommendations */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Maturity-Based Recommendations</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className={maturityInfo.level === "Initial" ? "border-blue-500 shadow-md" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded">
                  Initial (1.0-1.9)
                </span>
              </CardTitle>
              <CardDescription>Focus on establishing foundational security controls</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implement basic endpoint protection across all devices</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Establish password policies and basic access controls</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Conduct security awareness training for all staff</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Document basic security incident response procedures</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implement network firewall protection</span>
                </li>
              </ul>
              {maturityInfo.level === "Initial" && (
                <div className="mt-4">
                  <Link href="/playbook/domains/cybersecurity/roadmap#phase-1">
                    <Button className="w-full">Start with these recommendations</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={maturityInfo.level === "Developing" ? "border-blue-500 shadow-md" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-0.5 rounded">
                  Developing (2.0-2.9)
                </span>
              </CardTitle>
              <CardDescription>Formalize security policies and implement basic monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Establish formal security policies and standards</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implement multi-factor authentication for critical systems</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Conduct regular vulnerability assessments</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Establish security incident management process</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implement log management and basic monitoring</span>
                </li>
              </ul>
              {maturityInfo.level === "Developing" && (
                <div className="mt-4">
                  <Link href="/playbook/domains/cybersecurity/roadmap#phase-2">
                    <Button className="w-full">Start with these recommendations</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={maturityInfo.level === "Established" ? "border-blue-500 shadow-md" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-0.5 rounded">
                  Established (3.0-3.9)
                </span>
              </CardTitle>
              <CardDescription>Implement comprehensive security architecture and testing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implement comprehensive security architecture</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Establish security operations center (SOC) capabilities</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Conduct regular penetration testing</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implement data classification and protection controls</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Establish security metrics and reporting</span>
                </li>
              </ul>
              {maturityInfo.level === "Established" && (
                <div className="mt-4">
                  <Link href="/playbook/domains/cybersecurity/roadmap#phase-3">
                    <Button className="w-full">Start with these recommendations</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={maturityInfo.level === "Managed" ? "border-blue-500 shadow-md" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                  Managed (4.0-4.4)
                </span>
              </CardTitle>
              <CardDescription>Implement advanced threat detection and quantitative risk modeling</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implement advanced threat detection and response</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Establish quantitative security risk modeling</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implement automated security compliance monitoring</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Develop advanced security analytics capabilities</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Establish comprehensive third-party security program</span>
                </li>
              </ul>
              {maturityInfo.level === "Managed" && (
                <div className="mt-4">
                  <Link href="/playbook/domains/cybersecurity/roadmap#phase-4">
                    <Button className="w-full">Start with these recommendations</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Implementation Resources
          </CardTitle>
          <CardDescription>Templates and tools to accelerate your cybersecurity modernization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Security Policy Template</h4>
                    <p className="text-sm text-slate-500">Comprehensive policy framework</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    DOCX
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Risk Assessment Worksheet</h4>
                    <p className="text-sm text-slate-500">Identify and prioritize risks</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    XLSX
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Incident Response Playbook</h4>
                    <p className="text-sm text-slate-500">Step-by-step response guide</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Security Training Materials</h4>
                    <p className="text-sm text-slate-500">Staff awareness resources</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    ZIP
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Link href="/playbook">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>

        <Link href="/playbook/domains/cybersecurity/roadmap">
          <Button className="gap-2">
            View Implementation Roadmap
            <Lock className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
