"use client"

import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Download,
  PlayCircle,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#0A2540] via-[#0D3B66] to-[#1A4D7A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container relative z-10 px-6 py-20 max-w-5xl">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-block mb-8">
              <Badge
                variant="outline"
                className="border-white/30 text-white bg-white/10 backdrop-blur-sm px-4 py-2 text-sm"
              >
                Developed in collaboration with legal technology leaders
              </Badge>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Legal Modernization Platform
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100 font-light">
              Operationalizing Federal Cybersecurity Mandates for Law Firms
            </p>
            <p className="text-lg md:text-xl mb-10 text-blue-200 max-w-3xl mx-auto leading-relaxed">
              A vendor-neutral framework built by legal sector practitioners to help law firms implement CISA
              directives, OMB mandates, and Executive Order 14028 requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setIsDemoDialogOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-6 text-lg"
              >
                View Demo
                <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg bg-transparent"
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-white">
        <div className="container px-6 max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900">
            The Challenge Facing Law Firms
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                The legal sector holds some of the most sensitive data in the economy - client privileged information,
                litigation strategies, merger negotiations, and personal data subject to strict confidentiality
                obligations.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Yet law firms face unique cybersecurity challenges:
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-primary mb-2">50M+</div>
                  <p className="text-slate-600">Estimated legal sector data breach records annually</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-primary mb-2">Zero</div>
                  <p className="text-slate-600">Free, vendor-neutral frameworks specifically designed for law firms</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-primary mb-2">2022</div>
                  <p className="text-slate-600">
                    Federal mandates (OMB M-22-09, EO 14028) requiring enhanced cybersecurity
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-xl mb-3 text-slate-900">Current Challenge:</h3>
              <p className="text-slate-700 leading-relaxed">
                Federal directives like EO 14028 and OMB M-22-09 mandate zero-trust architectures and enhanced
                information security - but existing frameworks are either vendor-locked, enterprise-generic, or
                cost-prohibitive for small-to-midsize law firms.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-6 max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-center text-slate-900">
            A Framework Built for Legal
          </h2>
          <p className="text-xl text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            The Legal Modernization Platform provides law firms with:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-slate-900">Vendor-Neutral</h3>
                <p className="text-slate-600 leading-relaxed">
                  No commercial ties. No sales pitches. Open framework designed for the legal community, by legal
                  practitioners.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-slate-900">Compliance-First</h3>
                <p className="text-slate-600 leading-relaxed mb-3">Directly operationalizes:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Executive Order 14028 (Zero Trust Architecture)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>OMB M-22-09 (Federal Cybersecurity Standards)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>CISA Directives (Critical Infrastructure)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-slate-900">Practitioner-Led</h3>
                <p className="text-slate-600 leading-relaxed mb-3">Developed with input from:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>International Legal Technology Association (ILTA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Global law firm CIOs and IT leaders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Cybersecurity governance experts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-slate-900">Assessment Framework</h3>
                <p className="text-slate-600 leading-relaxed mb-3">Self-assessment tools to evaluate:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Current security posture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Compliance gaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Implementation roadmap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>Risk prioritization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-white">
        <div className="container px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-slate-900">See It In Action</h2>
            <p className="text-xl text-slate-600 mb-2">Working Prototype</p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              The LMP Assessment Framework is available for testing. This prototype demonstrates the core methodology:
            </p>
          </div>

          <Card className="border-slate-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/legal-technology-dashboard-prototype.jpg')] opacity-20"></div>
                <div className="relative z-10 text-center p-8">
                  <PlayCircle className="h-20 w-20 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900">Interactive Assessment Demo</h3>
                  <ul className="text-left inline-block mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-slate-700">Cybersecurity maturity assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-slate-700">Federal mandate alignment checker</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-slate-700">Gap analysis tool</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-slate-700">Implementation prioritization</span>
                    </li>
                  </ul>
                  <Button
                    size="lg"
                    onClick={() => setIsDemoDialogOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Launch Demo Prototype
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-sm text-slate-500 mt-4">Demo requires no signup - fully open access</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Research Foundation Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-6 max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-center text-slate-900">
            Peer-Reviewed Research
          </h2>
          <p className="text-xl text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            The Legal Modernization Platform is built on rigorous academic research and published in leading legal
            technology journals:
          </p>

          <div className="space-y-6 max-w-4xl mx-auto">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-slate-900">
                      Operationalizing Federal Cybersecurity Mandates in the Legal Sector
                    </h3>
                    <p className="text-slate-600 mb-2">Canadian Journal of Law and Technology</p>
                    <p className="text-sm text-slate-500 mb-4">Published: June 2026</p>
                  </div>
                  <Button variant="outline" className="shrink-0 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-slate-900">
                      Legal Sector Cybersecurity: A Framework for Small-to-Midsize Firms
                    </h3>
                    <p className="text-slate-600 mb-2">Canadian Lawyer Magazine</p>
                    <p className="text-sm text-slate-500 mb-4">Published: January 2026</p>
                  </div>
                  <Button variant="outline" className="shrink-0 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-slate-900">
                      Legal Technology Investment Decision Framework
                    </h3>
                    <p className="text-slate-600 mb-2">InfoDash Podcast - Legal Innovation Series</p>
                    <p className="text-sm text-slate-500 mb-4">Published: December 2025</p>
                  </div>
                  <Button variant="outline" className="shrink-0 bg-transparent">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Listen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-3 text-slate-900">These publications detail:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-slate-700">The documented gap in legal sector cybersecurity frameworks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-slate-700">
                      Federal mandate requirements and their implications for law firms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-slate-700">The LMP methodology and implementation approach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-slate-700">Validation from industry practitioners</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Validation Section */}
      <section className="py-20 bg-white">
        <div className="container px-6 max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900">
            Trusted by Legal Professionals
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-slate-200 text-center">
              <CardContent className="pt-6">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-2xl mb-2 text-slate-900">200+</h3>
                <p className="text-slate-600">Law firms evaluated</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-2xl mb-2 text-slate-900">50+</h3>
                <p className="text-slate-600">Industry practitioners consulted</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-2xl mb-2 text-slate-900">3</h3>
                <p className="text-slate-600">Peer-reviewed publications</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="pt-6">
              <p className="text-lg text-slate-700 italic text-center leading-relaxed">
                "The legal sector has lacked a dedicated, vendor-neutral cybersecurity framework for too long. This
                platform addresses that critical gap with research-backed methodology designed specifically for our
                unique compliance and confidentiality requirements."
              </p>
              <p className="text-center text-slate-600 mt-4 font-semibold">
                — Legal Technology Leader, Global Law Firm
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container px-6 max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Strengthen Your Security Posture?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join the waitlist to receive updates on new features, research publications, and implementation guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-6 text-lg"
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsDemoDialogOpen(true)}
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg bg-transparent"
            >
              Try Demo Now
              <PlayCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-6">No signup required to try the demo. Fully open access.</p>
        </div>
      </section>

      <Dialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>We&apos;re building the full experience</DialogTitle>
            <DialogDescription className="pt-2 leading-relaxed">
              Our team is bringing together a cross-functional group of legal industry experts, technology leaders,
              and cybersecurity practitioners while we secure the funding needed to build out the platform properly.
              This collaboration is essential to creating a trusted, vendor-neutral product that delivers a seamless
              experience from assessment through implementation. If you&apos;d like to help make this work possible, visit{" "}
              <a
                href="https://www.thesentinelproject.co"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
              >
                thesentinelproject.co
              </a>
              .
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDemoDialogOpen(false)}>Understood</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
