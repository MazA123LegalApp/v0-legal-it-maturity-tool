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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

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
    // Track the download event using dataLayer directly
    if (typeof window !== "undefined") {
      // Push to dataLayer for GTM
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "file_download",
        file_name: "legal-modernization-playbook.pdf",
        file_type: "pdf",
        content_type: "playbook",
      })

      // Also track with gtag if available
      if (window.gtag) {
        window.gtag("event", "file_download", {
          file_type: "pdf",
          file_name: "legal-modernization-playbook.pdf",
          content_type: "playbook",
        })
      }

      // Store in localStorage for admin dashboard to access
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
    }

    setDownloadClicked(true)

    // In a real implementation, this would trigger the actual PDF download
    // For now, we'll just simulate it with a timeout
    setTimeout(() => {
      setDownloadClicked(false)
    }, 3000)
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

      {/* Features Highlight */}
      <div id="features" className="py-16 bg-slate-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">Comprehensive Modernization Framework</h2>

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
                  Evaluate your organization's IT maturity across 8 critical domains with our interactive assessment
                  tool.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Shield className="h-5 w-5" />
                  Federal Alignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Align with Executive Order 14028, OMB M-22-09, and the National Cybersecurity Strategy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <FileText className="h-5 w-5" />
                  Templates & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Access ready-to-use templates, frameworks, and implementation guides for each maturity domain.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Zap className="h-5 w-5" />8 Maturity Domains
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Comprehensive coverage across cybersecurity, knowledge governance, infrastructure, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="py-16 bg-white">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Executive Summary</h2>
              <div className="prose max-w-none text-slate-600">
                <p className="text-lg mb-4">
                  This playbook provides a practical framework for modernizing legacy IT systems within U.S. legal and
                  compliance-driven institutions. Designed to support law firms, regulatory bodies, legal service
                  providers, and governance-aligned organizations.
                </p>
                <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-3">Purpose</h3>
                <p>
                  Drive measurable improvements in cybersecurity posture, operational resilience, and regulatory
                  alignment through a structured approach to IT modernization.
                </p>
                <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-3">Approach</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Evaluate current state using the Legal IT Maturity Assessment Tool</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Benchmark against sector peers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Receive tailored modernization recommendations by domain</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Access templates, frameworks, and visual aids for implementation</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link href="/maturity">
                  <Button className="gap-2">
                    Start Maturity Assessment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-slate-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Key Audience</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-white border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Settings className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Legal CIOs</h4>
                        <p className="text-sm text-slate-500">IT Directors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <BookOpen className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Managing Partners</h4>
                        <p className="text-sm text-slate-500">Firm Leadership</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Lock className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Compliance Officers</h4>
                        <p className="text-sm text-slate-500">Risk Management</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Tech Consultants</h4>
                        <p className="text-sm text-slate-500">Transformation Leaders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modernization Domains */}
      <div className="py-16 bg-slate-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 text-center text-slate-800">Modernization Domains</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Our comprehensive framework covers eight critical domains for legal IT modernization
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Link href="/playbook/domains/cybersecurity" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Cybersecurity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Strengthen your institution's ability to defend against cyber threats, manage vulnerabilities, and
                    align with Zero Trust principles.
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/playbook/domains/knowledge-governance" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Knowledge Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Modernize document management, knowledge sharing, and information governance practices.
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/playbook/domains/cloud-infrastructure" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    Cloud Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Transform legacy infrastructure into scalable, resilient cloud-based environments.
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/playbook/domains/data-analytics" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Data & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Leverage data for insights, reporting, and decision-making across legal operations.
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/playbook/domains/client-experience" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Client Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Enhance client interactions through digital portals, collaboration tools, and service delivery
                    platforms.
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    View domain details
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/playbook/domains/risk-compliance" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-blue-600" />
                    Risk & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Implement modern approaches to risk management, regulatory compliance, and audit readiness.
                  </p>
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

      {/* CTA Section */}
      <div className="py-16 bg-blue-900 text-white">
        <div className="container max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Modernize Your Legal IT?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mb-8">
              Start with our maturity assessment to benchmark your current state and receive tailored recommendations.
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
