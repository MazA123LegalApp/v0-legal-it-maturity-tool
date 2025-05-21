"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle2, Clock, Download, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type DomainMaturityInfo, getDomainMaturityInfo, getRecommendedRoadmapPhase } from "@/lib/assessment-utils"

export default function CybersecurityRoadmapPage() {
  const [maturityInfo, setMaturityInfo] = useState<DomainMaturityInfo>({
    score: 0,
    level: "",
    hasCompleted: false,
  })
  const [activePhase, setActivePhase] = useState("1")

  useEffect(() => {
    // Get the maturity info for this domain
    const info = getDomainMaturityInfo("cybersecurity")
    setMaturityInfo(info)

    // Set the active phase based on the maturity level
    if (info.hasCompleted) {
      const phase = getRecommendedRoadmapPhase(info.level).toString()
      setActivePhase(phase)

      // Check if there's a hash in the URL (e.g., #phase-2)
      if (typeof window !== "undefined") {
        const hash = window.location.hash
        if (hash.startsWith("#phase-")) {
          const phaseFromHash = hash.replace("#phase-", "")
          setActivePhase(phaseFromHash)
        }
      }
    }
  }, [])

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cybersecurity Domain
          </Button>
        </Link>

        <Button variant="outline" className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50">
          <Download className="h-4 w-4" />
          Download Roadmap (PDF)
        </Button>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Cybersecurity Implementation Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A phased approach to modernizing your legal organization's cybersecurity capabilities
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div>
              <h3 className="text-lg font-medium mb-1">How to use this roadmap</h3>
              <p className="text-slate-600">
                This roadmap is organized into 5 phases aligned with maturity levels. Based on your assessment, we
                recommend starting with Phase{" "}
                {maturityInfo.hasCompleted ? getRecommendedRoadmapPhase(maturityInfo.level) : "1"}.
              </p>
            </div>
            {maturityInfo.hasCompleted && (
              <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-100 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Recommended starting point:</p>
                  <p className="text-blue-700 font-bold">Phase {getRecommendedRoadmapPhase(maturityInfo.level)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={activePhase} value={activePhase} onValueChange={setActivePhase} className="mb-12">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="1" id="phase-1">
            Phase 1
          </TabsTrigger>
          <TabsTrigger value="2" id="phase-2">
            Phase 2
          </TabsTrigger>
          <TabsTrigger value="3" id="phase-3">
            Phase 3
          </TabsTrigger>
          <TabsTrigger value="4" id="phase-4">
            Phase 4
          </TabsTrigger>
          <TabsTrigger value="5" id="phase-5">
            Phase 5
          </TabsTrigger>
        </TabsList>

        <TabsContent value="1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phase 1: Foundation</CardTitle>
                  <CardDescription>Establish basic security controls and awareness</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>0-3 months</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Objective</h3>
                  <p>
                    Establish the foundational security controls necessary to protect against common threats and create
                    basic security awareness across the organization.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Actions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Deploy endpoint protection</p>
                        <p className="text-slate-600 text-sm">
                          Implement antivirus, anti-malware, and basic endpoint security tools on all devices.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Establish password policies</p>
                        <p className="text-slate-600 text-sm">
                          Create and enforce strong password requirements and account management procedures.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Conduct security awareness training</p>
                        <p className="text-slate-600 text-sm">
                          Provide basic security training to all staff, focusing on common threats like phishing.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Document incident response procedures</p>
                        <p className="text-slate-600 text-sm">
                          Create basic procedures for responding to and reporting security incidents.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Implement network protection</p>
                        <p className="text-slate-600 text-sm">
                          Deploy firewalls and basic network security controls to protect the organization's perimeter.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Performance Indicators</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">100%</p>
                            <p className="text-sm text-slate-500">Endpoint protection coverage</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">90%+</p>
                            <p className="text-sm text-slate-500">Staff trained on security basics</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">&lt; 24 hours</p>
                            <p className="text-sm text-slate-500">Incident response time</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phase 2: Formalization</CardTitle>
                  <CardDescription>Establish formal security policies and basic monitoring</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>3-6 months</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Objective</h3>
                  <p>
                    Formalize security policies and standards, implement multi-factor authentication, and establish
                    basic security monitoring capabilities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Actions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Develop formal security policies</p>
                        <p className="text-slate-600 text-sm">
                          Create comprehensive security policies aligned with legal industry requirements.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Implement multi-factor authentication</p>
                        <p className="text-slate-600 text-sm">
                          Deploy MFA for all critical systems, especially those containing client data.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Conduct vulnerability assessments</p>
                        <p className="text-slate-600 text-sm">
                          Establish regular vulnerability scanning and assessment processes.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Establish incident management</p>
                        <p className="text-slate-600 text-sm">
                          Develop formal incident management processes with clear roles and responsibilities.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Implement log management</p>
                        <p className="text-slate-600 text-sm">
                          Deploy centralized logging and basic security monitoring capabilities.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Performance Indicators</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">100%</p>
                            <p className="text-sm text-slate-500">MFA adoption for critical systems</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Monthly</p>
                            <p className="text-sm text-slate-500">Vulnerability assessment frequency</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">90%+</p>
                            <p className="text-sm text-slate-500">High-risk vulnerabilities remediated</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phase 3: Comprehensive Security</CardTitle>
                  <CardDescription>Implement comprehensive security architecture and testing</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>6-12 months</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Objective</h3>
                  <p>
                    Develop a comprehensive security architecture, establish security operations capabilities, and
                    implement regular security testing.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Actions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Develop security architecture</p>
                        <p className="text-slate-600 text-sm">
                          Create a comprehensive security architecture aligned with legal industry requirements.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Establish SOC capabilities</p>
                        <p className="text-slate-600 text-sm">
                          Implement security operations center capabilities, either in-house or through a managed
                          service.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Conduct penetration testing</p>
                        <p className="text-slate-600 text-sm">
                          Implement regular penetration testing to identify and address security vulnerabilities.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Implement data protection</p>
                        <p className="text-slate-600 text-sm">
                          Deploy data classification and protection controls for sensitive client information.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Establish security metrics</p>
                        <p className="text-slate-600 text-sm">
                          Develop and track security metrics to measure the effectiveness of security controls.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Performance Indicators</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Quarterly</p>
                            <p className="text-sm text-slate-500">Penetration testing frequency</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">100%</p>
                            <p className="text-sm text-slate-500">Sensitive data classified and protected</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">&lt; 4 hours</p>
                            <p className="text-sm text-slate-500">Mean time to detect security incidents</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phase 4: Advanced Security</CardTitle>
                  <CardDescription>Implement advanced threat detection and quantitative risk modeling</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>12-18 months</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Objective</h3>
                  <p>
                    Implement advanced threat detection capabilities, quantitative risk modeling, and automated security
                    compliance monitoring.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Actions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Implement advanced threat detection</p>
                        <p className="text-slate-600 text-sm">
                          Deploy advanced threat detection and response capabilities, such as EDR and NDR.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Develop quantitative risk modeling</p>
                        <p className="text-slate-600 text-sm">
                          Implement quantitative security risk modeling to prioritize security investments.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Automate compliance monitoring</p>
                        <p className="text-slate-600 text-sm">
                          Implement automated security compliance monitoring and reporting.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Develop security analytics</p>
                        <p className="text-slate-600 text-sm">
                          Implement advanced security analytics capabilities to identify patterns and trends.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Establish third-party security</p>
                        <p className="text-slate-600 text-sm">
                          Implement a comprehensive third-party security program for vendors and partners.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Performance Indicators</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">&lt; 1 hour</p>
                            <p className="text-sm text-slate-500">Mean time to detect security incidents</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">95%+</p>
                            <p className="text-sm text-slate-500">Automated compliance verification</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">100%</p>
                            <p className="text-sm text-slate-500">Critical vendors assessed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="5">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phase 5: Optimized Security</CardTitle>
                  <CardDescription>Implement AI-driven security and zero trust architecture</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>18-24 months</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Objective</h3>
                  <p>
                    Implement AI-driven security analytics, zero trust architecture, and continuous security innovation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Actions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Implement AI-driven security</p>
                        <p className="text-slate-600 text-sm">
                          Deploy AI-driven security analytics and response capabilities.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Establish security by design</p>
                        <p className="text-slate-600 text-sm">
                          Implement security by design principles in all processes and systems.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Develop threat hunting</p>
                        <p className="text-slate-600 text-sm">
                          Implement advanced threat hunting capabilities to proactively identify threats.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Implement zero trust</p>
                        <p className="text-slate-600 text-sm">
                          Deploy a comprehensive zero trust security architecture.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Establish security innovation</p>
                        <p className="text-slate-600 text-sm">
                          Implement a security innovation program to continuously improve security capabilities.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Performance Indicators</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">100%</p>
                            <p className="text-sm text-slate-500">Zero trust implementation</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">&lt; 30 minutes</p>
                            <p className="text-sm text-slate-500">Mean time to respond to incidents</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Monthly</p>
                            <p className="text-sm text-slate-500">Proactive threat hunting frequency</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Link href="/playbook/domains/cybersecurity">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cybersecurity Domain
          </Button>
        </Link>

        <Link href="/maturity/assessment">
          <Button className="gap-2">
            Reassess Your Maturity
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
