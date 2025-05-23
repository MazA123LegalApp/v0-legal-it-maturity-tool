"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle,
  Download,
  FileText,
  Home,
  Lightbulb,
  Lock,
  Settings,
  Shield,
  Zap,
  Server,
  Clock,
  Database,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { getDomainPageUrl } from "@/lib/url-utils"

// Define window.dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function PlaybookLandingPage() {
  const [downloadClicked, setDownloadClicked] = useState(false)

const handleDownload = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "file_download",
      file_name: "legal-modernization-playbook.pdf",
      file_type: "pdf",
      content_type: "playbook",
    })

    if (window.gtag) {
      window.gtag("event", "file_download", {
        file_type: "pdf",
        file_name: "legal-modernization-playbook.pdf",
        content_type: "playbook",
      })
    }

    try {
      const downloads = JSON.parse(localStorage.getItem("tracked_downloads") || "[]")
      downloads.push({
        type: "pdf",
        module: "Legal Modernization Playbook",
        date: new Date().toISOString(),
      })
      localStorage.setItem("tracked_downloads", JSON.stringify(downloads))
    } catch (error) {
      console.error("Error tracking download:", error)
    }

    // Trigger the actual file download
    const a = document.createElement("a")
    a.href = "/legal-modernization-playbook.pdf"
    a.download = "legal-modernization-playbook.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  setDownloadClicked(true)
  setTimeout(() => setDownloadClicked(false), 3000)
}

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <div className="container max-w-6xl py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Hub</span>
              <span className="sm:hidden">Home</span>
            </Button>
          </Link>

          <Button
            onClick={handleDownload}
            variant="outline"
            className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50"
            disabled={downloadClicked}
          >
            <Download className="h-4 w-4" />
            {downloadClicked ? "Downloading..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="flex flex-col items-center text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Modernize Legal IT with Confidence
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mb-8">
              Use our federal-aligned playbook and self-assessment to benchmark, prioritize, and transform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/maturity/assessment">
                <Button size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                  <BarChart3 className="h-5 w-5" />
                  Start Maturity Assessment
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white text-white hover:bg-white/10"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                <BookOpen className="h-5 w-5" />
                Explore Playbook
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Foreword */}
      <div className="py-16 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Foreword</h2>
          <div className="prose max-w-none mx-auto text-slate-600">
            <p className="text-lg mb-4">
              This playbook was developed to address the widening gap between the operational demands placed on legal
              institutions and the maturity of their supporting IT systems. Amid escalating cybersecurity threats,
              regulatory scrutiny, and digital disruption, legal firms must move beyond reactive patchwork solutions and
              embrace structured, secure modernization.
            </p>
            <p className="text-lg mb-4">
              Rooted in both practice and policy, this playbook draws on U.S. federal modernization mandates including
              Executive Order 14028, the National Cybersecurity Strategy, and OMB M-22-09. It aligns legal sector IT
              transformation with Zero Trust architecture, institutional resilience principles, and modern governance
              frameworks.
            </p>
            <p className="text-lg mb-4">
              The guidance herein is grounded in real-world implementation experience across law firms, government
              programs, and regulated sectors. It offers not just strategy, but execution: a framework of tools, models,
              and best practices to move from assessment to maturity. Whether you are launching your first digital audit
              or scaling an enterprise transformation, this resource is built to guide your journey.
            </p>
            <p className="text-lg">
              Welcome to the Legal Modernization Playbook. This interactive web-based resource is designed to help legal
              and compliance-driven institutions modernize their legacy IT systems with confidence, security, and
              strategic alignment to federal priorities. It includes detailed domain guidance, assessment tools,
              implementation roadmaps, and governance frameworks to accelerate secure digital transformation across
              legal institutions.
            </p>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div id="features" className="py-16 bg-slate-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Executive Summary</h2>
          <div className="prose max-w-none mx-auto text-slate-600 mb-8">
            <p className="text-lg mb-4">
              The U.S. legal and regulatory sectors face growing pressure to modernize legacy systems. Security risks,
              client expectations, and federal policies such as Executive Order 14028 and OMB M-22-09 have made
              modernization an urgent strategic priority. This playbook helps legal CIOs, IT Directors, and operational
              leaders benchmark their maturity, reduce risks, and implement sustainable improvements.
            </p>
            <p className="text-lg mb-4">
              Modernization is not only a technical exercise—it is a transformation of people, process, and platforms.
              This playbook offers:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <BarChart3 className="h-5 w-5" />
                  Self-Assessment Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  A comprehensive assessment across eight legal IT maturity domains to benchmark your current state.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Shield className="h-5 w-5" />
                  Maturity Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Detailed 1-5 scoring scales with recommendations tailored to your maturity level.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <FileText className="h-5 w-5" />
                  Federal Alignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Guidance aligned with EO 14028, OMB M-22-09, NIST frameworks, and other federal policies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Zap className="h-5 w-5" />
                  Ready-to-Use Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Downloadable workflows, templates, and transformation blueprints for immediate implementation.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-8 mb-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">Real-World Success Story</h3>
                <p className="text-orange-700 mb-0">
                  See how a mid-sized law firm improved their IT governance and reduced critical system downtime by 83%
                </p>
              </div>
              <Link href="/playbook/case-study">
                <Button
                  size="lg"
                  className="whitespace-nowrap bg-orange-500 hover:bg-orange-600 text-white gap-2 min-w-[200px]"
                >
                  <FileText className="h-5 w-5" />
                  Read Case Study
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Who This Is For */}
      <div className="py-16 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Who This Is For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Settings className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Legal CIOs and IT Directors</h3>
                  <p className="text-slate-600">
                    Technology leaders responsible for modernizing legal IT infrastructure and services.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Managing Partners and Legal Ops Leaders</h3>
                  <p className="text-slate-600">
                    Executives overseeing operational excellence and strategic technology investments.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Lock className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Compliance and Risk Officers</h3>
                  <p className="text-slate-600">
                    Professionals responsible for managing regulatory compliance and security risks.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Lightbulb className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Law Firm Technology Advisors</h3>
                  <p className="text-slate-600">
                    Consultants and transformation specialists guiding legal technology initiatives.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How To Use This Playbook */}
      <div className="py-16 bg-slate-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">How To Use This Playbook</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Assess Your Maturity</h3>
                  <p className="text-slate-600">Begin with a diagnostic tool covering eight domains.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Analyze Results</h3>
                  <p className="text-slate-600">Understand your current state with maturity banding.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Target Improvements</h3>
                  <p className="text-slate-600">Use domain-specific guidance to prioritize efforts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Implement Change</h3>
                  <p className="text-slate-600">Apply the roadmap and governance model.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                  <p className="text-slate-600">Reassess maturity periodically and report outcomes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Domains of Legal IT Modernization */}
      <div className="py-16 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 text-center text-slate-800">Domains of Legal IT Modernization</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Each domain includes maturity subdomains, scoring models, federal mapping, recommendations, and tools.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Link href={getDomainPageUrl("cybersecurity")} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Cybersecurity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Strengthen your institution's ability to defend against cyber threats, manage vulnerabilities, and
                    align with Zero Trust principles.
                  </p>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Maturity Focus:</span> Security protocols, threat management, Zero
                    Trust architecture
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href={getDomainPageUrl("risk-compliance")} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-blue-600" />
                    Risk & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Implement modern approaches to risk management, regulatory compliance, and audit readiness.
                  </p>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Maturity Focus:</span> Governance, controls, policy alignment, audit
                    readiness
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href={getDomainPageUrl("incident-problem")} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Incident & Problem Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Create formal, repeatable response structures to minimize service disruption and prevent recurrence.
                  </p>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Maturity Focus:</span> Response procedures, root cause analysis,
                    service continuity
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href={getDomainPageUrl("continuity-resilience")} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-blue-600" />
                    Service Continuity & Resilience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Support business continuity, disaster recovery, and resilience across litigation-critical systems.
                  </p>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Maturity Focus:</span> Recovery planning, business impact analysis,
                    resilience testing
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href={getDomainPageUrl("knowledge-data")} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    Knowledge & Data Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Modernize document management, knowledge sharing, and information governance practices.
                  </p>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Maturity Focus:</span> Metadata standards, document lifecycle, data
                    classification
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href={getDomainPageUrl("change-deployment")} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Change & Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Implement controlled and well-structured change management to prevent disruption to legal
                    operations.
                  </p>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Maturity Focus:</span> Change advisory, impact assessment, rollback
                    planning
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href={getDomainPageUrl("infrastructure-tooling")} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-blue-600" />
                    Infrastructure & Tooling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Manage, modernize, and optimize infrastructure and tooling to reduce risks and improve performance.
                  </p>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Maturity Focus:</span> Cloud migration, virtualization, automation,
                    observability
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href={getDomainPageUrl("service-management")} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    Service Management & Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Define, deliver, and improve IT services in alignment with legal business objectives.
                  </p>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Maturity Focus:</span> Service catalog, SLAs, performance metrics,
                    value alignment
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Using Your Scores */}
      <div className="py-16 bg-slate-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Using Your Scores to Drive Improvement</h2>
          <div className="prose max-w-none mx-auto text-slate-600 mb-8">
            <p className="text-lg mb-6">
              This playbook is designed to work in tandem with your maturity assessment. Once you complete your
              diagnostic, each score directly maps to a band in the maturity model — Initial, Developing, Established,
              Managed, or Optimized — and unlocks the specific guidance within the relevant section of this playbook.
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-3 text-left">Score Range</th>
                  <th className="border border-slate-300 p-3 text-left">Maturity Band</th>
                  <th className="border border-slate-300 p-3 text-left">Description</th>
                  <th className="border border-slate-300 p-3 text-left">Where to Start</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-3">1.0–1.9</td>
                  <td className="border border-slate-300 p-3 font-medium">Initial</td>
                  <td className="border border-slate-300 p-3">
                    Practices are largely undocumented or reactive. Major gaps exist in structure, security, or
                    leadership.
                  </td>
                  <td className="border border-slate-300 p-3">
                    Use the foundational checklists and "Initial" maturity recommendations in each domain. Begin with
                    Phase 1 of the roadmap.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">2.0–2.9</td>
                  <td className="border border-slate-300 p-3 font-medium">Developing</td>
                  <td className="border border-slate-300 p-3">
                    Some structure exists but practices are inconsistent or siloed. Improvements are underway.
                  </td>
                  <td className="border border-slate-300 p-3">
                    Focus on "Developing" maturity recommendations. Target quick wins in Phase 3 of the roadmap.
                    Prioritize governance setup.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">3.0–3.9</td>
                  <td className="border border-slate-300 p-3 font-medium">Established</td>
                  <td className="border border-slate-300 p-3">
                    Core practices are defined and functioning. Risk is managed but optimization is needed.
                  </td>
                  <td className="border border-slate-300 p-3">
                    Follow "Established" and "Managed" sections. Prioritize system integrations and roadmap Phases 3–4.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">4.0–4.4</td>
                  <td className="border border-slate-300 p-3 font-medium">Managed</td>
                  <td className="border border-slate-300 p-3">
                    Governance, performance tracking, and policy integration are in place. CI/CD may be emerging.
                  </td>
                  <td className="border border-slate-300 p-3">
                    Scale strategic projects. Strengthen dashboards, SLAs, and proactive controls. Focus on Phase 5
                    improvements.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">4.5–5.0</td>
                  <td className="border border-slate-300 p-3 font-medium">Optimized</td>
                  <td className="border border-slate-300 p-3">
                    The domain is fully modernized, automated, and delivering measurable value.
                  </td>
                  <td className="border border-slate-300 p-3">
                    Use benchmarking tools. Share practices. Mentor others. Shift toward enterprise-level
                    transformation.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <p className="text-slate-600 mb-6">
              By matching your score to the guidance tier in each domain, you can create a targeted and efficient
              improvement roadmap. Every domain section in this playbook includes tailored recommendations, KPIs, and
              downloadable templates that align with these bands.
            </p>
            <Link href="/maturity/assessment">
              <Button size="lg" className="gap-2">
                <BarChart3 className="h-5 w-5" />
                Take the Maturity Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Strategic Roadmap */}
      <div className="py-16 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Strategic Roadmap for Implementation</h2>
          <div className="prose max-w-none mx-auto text-slate-600 mb-8">
            <p className="text-lg mb-6">
              This roadmap outlines a practical, phased approach to legacy IT modernization. Each phase includes
              specific objectives, recommended actions, and example KPIs to support progress tracking.
            </p>
          </div>

          <div className="grid gap-8 mb-12">
            <Card>
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold">1</span>
                  </div>
                  Phase 1: Discovery & Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Objective</h3>
                    <p className="text-slate-600">
                      Establish baseline understanding of the current IT maturity and risk exposure.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Actions</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Complete the Legal IT Maturity Assessment</li>
                      <li>• Inventory all critical systems, tools, and data assets</li>
                      <li>• Identify top 3–5 priority gaps or risks</li>
                      <li>• Map dependencies across legal, compliance, and business functions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• % of systems inventoried</li>
                      <li>• # of risk findings documented</li>
                      <li>• % completion of maturity assessment across domains</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold">2</span>
                  </div>
                  Phase 2: Planning & Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Objective</h3>
                    <p className="text-slate-600">Formalize leadership, scope, and transformation structure.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Actions</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Establish Modernization Steering Committee and domain leads</li>
                      <li>• Define transformation goals, scope, and target maturity scores</li>
                      <li>• Identify funding, resource needs, and key stakeholders</li>
                      <li>• Develop high-level transformation roadmap</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• # of governance roles assigned</li>
                      <li>• % of domains with defined scope and KPIs</li>
                      <li>• Approval of roadmap and budget</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold">3</span>
                  </div>
                  Phase 3: Foundations & Quick Wins
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Objective</h3>
                    <p className="text-slate-600">
                      Build early momentum by resolving critical vulnerabilities and delivering visible value.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Actions</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Implement or formalize incident response and change management processes</li>
                      <li>• Address known risks (e.g., access gaps, unsupported tools)</li>
                      <li>• Introduce risk register and service catalog</li>
                      <li>• Deploy high-value improvements (e.g., MFA, backups)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• % of quick win actions completed</li>
                      <li>• # of critical risks mitigated</li>
                      <li>• User feedback on changes implemented</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold">4</span>
                  </div>
                  Phase 4: Transformation Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Objective</h3>
                    <p className="text-slate-600">
                      Deliver major modernization efforts in line with roadmap and policy requirements.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Actions</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Upgrade or replace legacy systems (e.g., DMS, financial tools)</li>
                      <li>• Migrate services to cloud or hybrid environments</li>
                      <li>• Pilot and adopt Zero Trust security architecture</li>
                      <li>• Rationalize and integrate IT tooling</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• % project milestones completed on time</li>
                      <li>• # of legacy systems decommissioned</li>
                      <li>• Compliance audit readiness score</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold">5</span>
                  </div>
                  Phase 5: Optimization & Scale
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Objective</h3>
                    <p className="text-slate-600">
                      Institutionalize maturity improvements and create a repeatable improvement cycle.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Actions</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Establish IT performance dashboards and service scorecards</li>
                      <li>• Benchmark maturity scores year over year</li>
                      <li>• Integrate continuous improvement into business planning</li>
                      <li>• Share success metrics with leadership and stakeholders</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• % of services with real-time performance metrics</li>
                      <li>• YoY maturity score improvement per domain</li>
                      <li>• Stakeholder satisfaction ratings</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-slate-600 mb-6">
              Each phase can be tailored to the firm's size, structure, and risk appetite. Institutions are encouraged
              to revisit each phase annually to ensure alignment with evolving client expectations and federal policy
              developments.
            </p>
            <Link href="/playbook/roadmap">
              <Button size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                View Detailed Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Governance Framework */}
      <div className="py-16 bg-slate-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Governance Framework</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Sponsor:</strong> CIO, COO, or Managing Partner
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Steering Committee:</strong> Legal Ops, Risk, IT, Business Stakeholders
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Domain Leads:</strong> Assigned to each of the 8 domains
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Monthly governance meetings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Quarterly risk and roadmap reviews</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>KPI reporting and dashboarding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Stakeholder workshops</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/playbook/governance">
              <Button size="lg" className="gap-2">
                <Settings className="h-5 w-5" />
                View Governance Model
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Downloadable Templates */}
      <div className="py-16 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Downloadable Templates</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maturity Assessment Workbook</h4>
                    <p className="text-sm text-slate-500">Excel</p>
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
                    <h4 className="font-medium">Cybersecurity Gap Tracker</h4>
                    <p className="text-sm text-slate-500">Excel</p>
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
                    <h4 className="font-medium">Risk Register & Scoring Matrix</h4>
                    <p className="text-sm text-slate-500">Excel</p>
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
                    <h4 className="font-medium">Change Request Template</h4>
                    <p className="text-sm text-slate-500">Word</p>
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
                    <h4 className="font-medium">DMS Migration Checklist</h4>
                    <p className="text-sm text-slate-500">Excel</p>
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
                    <h4 className="font-medium">SLA Definition Template</h4>
                    <p className="text-sm text-slate-500">Word</p>
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
                    <h4 className="font-medium">Continuity Planning Toolkit</h4>
                    <p className="text-sm text-slate-500">PowerPoint</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    PPTX
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Balanced Scorecard for Legal IT</h4>
                    <p className="text-sm text-slate-500">Excel</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    XLSX
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/playbook/templates">
              <Button size="lg" className="gap-2">
                <FileText className="h-5 w-5" />
                View All Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Start Now */}
      <div className="py-16 bg-blue-900 text-white">
        <div className="container max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Now</h2>
            <p className="text-xl text-blue-100 max-w-3xl mb-8">
              Begin with the Legal IT Maturity Assessment to evaluate your starting point. This playbook is a living
              tool to support sustained transformation. Use the tools, act on the insights, and lead your institution
              into a modern, secure, and resilient future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/maturity/assessment">
                <Button size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                  <BarChart3 className="h-5 w-5" />
                  Start Maturity Assessment
                </Button>
              </Link>
              <Button
                onClick={handleDownload}
                variant="outline"
                size="lg"
                className="gap-2 border-white text-white hover:bg-white/10"
                disabled={downloadClicked}
              >
                <Download className="h-5 w-5" />
                {downloadClicked ? "Downloading..." : "Download Full Playbook"}
              </Button>
            </div>
            <p className="text-blue-200 mt-8">
              For additional support, templates, or advisory access, contact{" "}
              <a href="mailto:support@yourfirm.com" className="underline">
                support@yourfirm.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="py-8 bg-slate-100">
        <div className="container max-w-6xl">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" className="gap-2 text-slate-600">
                <ArrowLeft className="h-4 w-4" />
                Back to Hub
              </Button>
            </Link>

            <Link href="/maturity">
              <Button variant="ghost" className="gap-2 text-slate-600">
                Maturity Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
