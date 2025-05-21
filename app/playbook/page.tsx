"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Download, FileText, Home, Lightbulb, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { trackEvent } from "@/components/analytics"

export default function PlaybookLandingPage() {
  const [downloadClicked, setDownloadClicked] = useState(false)

  const handleDownload = () => {
    // Track the download event
    trackEvent("file_download", {
      file_name: "legal-modernization-playbook.pdf",
      file_type: "pdf",
      content_type: "playbook",
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
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Hub
          </Button>
        </Link>

        <Button
          onClick={handleDownload}
          variant="outline"
          className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50"
          disabled={downloadClicked}
        >
          <Download className="h-4 w-4" />
          {downloadClicked ? "Downloading..." : "Download Full Playbook (PDF)"}
        </Button>
      </div>

      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">Legal Modernization Playbook</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A comprehensive guide to modernizing legal operations and technology
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
          <CardDescription>Purpose and approach of the Legal Modernization Playbook</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h3>Purpose</h3>
            <p>
              This playbook provides a practical framework for modernizing legacy IT systems within U.S. legal and
              compliance-driven institutions. Designed to support law firms, regulatory bodies, legal service providers,
              and governance-aligned organizations, it aims to drive measurable improvements in cybersecurity posture,
              operational resilience, and regulatory alignment.
            </p>

            <h3>Context</h3>
            <p>
              Many legal institutions continue to operate on fragmented, outdated, or poorly integrated systems—exposing
              them to cyber risk, productivity loss, and noncompliance with federal security frameworks. In response to
              Executive Order 14028, OMB M-22-09, and the National Cybersecurity Strategy (2023), there is now both an
              opportunity and an obligation to modernize.
            </p>

            <h3>Approach</h3>
            <p>
              This playbook, delivered as a web-based application, blends a structured maturity assessment tool with
              practical modernization guidance. Organizations can:
            </p>
            <ul>
              <li>Evaluate their current state using the Legal IT Maturity Assessment Tool</li>
              <li>Benchmark against sector peers</li>
              <li>Receive tailored modernization recommendations by domain</li>
              <li>Access templates, frameworks, and visual aids for implementation planning</li>
            </ul>

            <h3>Audience</h3>
            <ul>
              <li>Legal CIOs and IT Directors</li>
              <li>Firm Managing Partners</li>
              <li>Compliance and Risk Officers</li>
              <li>Legal Tech Consultants and Transformation Leaders</li>
            </ul>

            <h3>How to Use This Playbook</h3>
            <ul>
              <li>Start with the maturity assessment</li>
              <li>Review recommended actions by domain (e.g., cybersecurity, knowledge governance)</li>
              <li>Use the roadmap and templates to structure modernization efforts</li>
              <li>Return periodically to re-assess and track improvements</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/maturity">
            <Button className="gap-2">Start Maturity Assessment</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>The Modernization Imperative</CardTitle>
          <CardDescription>Why legal organizations need to modernize their IT systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h3>Why Modernize?</h3>
            <p>
              Legal organizations handle highly sensitive data yet often lag behind other sectors in IT modernization.
              Legacy systems—whether case management tools, document repositories, or security platforms—introduce risk
              and impede agility.
            </p>

            <h4>Key drivers:</h4>
            <ul>
              <li>Increasing client and insurer demands for stronger cybersecurity controls</li>
              <li>Rapid emergence of AI, cloud-native, and Zero Trust architectures</li>
              <li>Heightened federal focus on cybersecurity readiness and public-private collaboration</li>
            </ul>

            <h3>Federal Alignment</h3>
            <p>
              This playbook maps modernization activities to U.S. federal frameworks, ensuring legal institutions meet
              or exceed:
            </p>
            <ul>
              <li>Executive Order 14028 – Mandating stronger national cybersecurity standards</li>
              <li>OMB M-22-09 – Requiring adoption of Zero Trust principles</li>
              <li>National Cybersecurity Strategy (2023) – Emphasizing risk reduction and institutional resilience</li>
            </ul>

            <h3>What's at Stake</h3>
            <ul>
              <li>Exposure to ransomware and data breaches</li>
              <li>Inability to meet client-imposed security audits</li>
              <li>Rising cyber insurance premiums due to low maturity</li>
              <li>Operational fragility during litigation, discovery, or regulatory scrutiny</li>
            </ul>

            <h3>The Opportunity</h3>
            <p>With the right tools, governance, and phased approach, legal institutions can:</p>
            <ul>
              <li>Replace fragile legacy systems</li>
              <li>Integrate scalable, secure, and cloud-aligned technologies</li>
              <li>Improve cross-functional workflows between IT, legal, and compliance</li>
              <li>Enable data-driven decision-making and reporting</li>
            </ul>

            <p>
              This playbook enables legal leaders to act decisively—equipping their institutions to meet the demands of
              a digital-first legal future, while satisfying the policy imperatives driving U.S. cyber readiness.
            </p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold mb-6 text-center">Modernization Domains</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <Link href="/playbook/domains/cybersecurity" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Cybersecurity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Strengthen your institution's ability to defend against cyber threats, manage vulnerabilities, and align
                with Zero Trust principles.
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-blue-600">View domain details →</p>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/playbook/domains/knowledge-governance" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Knowledge Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Modernize document management, knowledge sharing, and information governance practices.</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-blue-600">View domain details →</p>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/playbook/domains/cloud-infrastructure" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                Cloud Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Transform legacy infrastructure into scalable, resilient cloud-based environments.</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-blue-600">View domain details →</p>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/playbook/domains/data-analytics" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Data & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Leverage data for insights, reporting, and decision-making across legal operations.</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-blue-600">View domain details →</p>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/playbook/domains/client-experience" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Client Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Enhance client interactions through digital portals, collaboration tools, and service delivery
                platforms.
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-blue-600">View domain details →</p>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/playbook/domains/risk-compliance" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Risk & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Implement modern approaches to risk management, regulatory compliance, and audit readiness.</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-blue-600">View domain details →</p>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <div className="flex justify-between">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Hub
          </Button>
        </Link>

        <Button
          onClick={handleDownload}
          variant="outline"
          className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50"
          disabled={downloadClicked}
        >
          <Download className="h-4 w-4" />
          {downloadClicked ? "Downloading..." : "Download Full Playbook (PDF)"}
        </Button>
      </div>
    </div>
  )
}
