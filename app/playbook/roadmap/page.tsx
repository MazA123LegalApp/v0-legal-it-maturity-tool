"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function RoadmapPage() {
  const searchParams = useSearchParams()
  const phaseParam = searchParams?.get("phase")

  // Set default tab based on URL parameter
  const defaultTab = phaseParam && ["1", "2", "3", "4", "5"].includes(phaseParam) ? phaseParam : "1"

  // Scroll to specific section if hash is present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash) {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }
      }
    }
  }, [])

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/playbook">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Playbook
          </Button>
        </Link>

        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Hub</span>
            <span className="sm:hidden">Home</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Strategic Implementation Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A phased approach to legacy IT modernization for legal institutions
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How to Use This Roadmap</CardTitle>
          <CardDescription>
            This roadmap outlines a practical, phased approach to legacy IT modernization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>
              Each phase includes specific objectives, recommended actions, and example KPIs to support progress
              tracking. The roadmap is designed to be flexible and can be tailored to your organization's specific needs
              and maturity level.
            </p>
            <p>Based on your maturity assessment results, you may want to focus on specific phases of the roadmap:</p>
            <ul>
              <li>
                <strong>Initial (1.0-1.9):</strong> Start with Phase 1 and focus on establishing a baseline
              </li>
              <li>
                <strong>Developing (2.0-2.9):</strong> Focus on Phases 2-3 to formalize governance and implement quick
                wins
              </li>
              <li>
                <strong>Established (3.0-3.9):</strong> Prioritize Phases 3-4 to enhance existing capabilities
              </li>
              <li>
                <strong>Managed (4.0-4.4):</strong> Focus on Phases 4-5 to optimize and scale your modernization efforts
              </li>
              <li>
                <strong>Optimized (4.5-5.0):</strong> Focus on Phase 5 and continuous improvement
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={defaultTab} className="mb-12">
        <TabsList className="grid w-full md:w-auto grid-cols-5">
          <TabsTrigger value="1">Phase 1</TabsTrigger>
          <TabsTrigger value="2">Phase 2</TabsTrigger>
          <TabsTrigger value="3">Phase 3</TabsTrigger>
          <TabsTrigger value="4">Phase 4</TabsTrigger>
          <TabsTrigger value="5">Phase 5</TabsTrigger>
        </TabsList>

        <TabsContent value="1" className="mt-6">
          <Card id="phase-1">
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
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Complete the Legal IT Maturity Assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Inventory all critical systems, tools, and data assets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Identify top 3–5 priority gaps or risks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Map dependencies across legal, compliance, and business functions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                  <ul className="text-slate-600 space-y-1">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>% of systems inventoried</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span># of risk findings documented</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>% completion of maturity assessment across domains</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-2">Recommended for Initial Maturity Level</h3>
                <p className="text-slate-600">
                  Organizations at the Initial maturity level should focus on completing a thorough assessment and
                  establishing a baseline understanding of their current state. This phase is critical for identifying
                  immediate risks and setting priorities for improvement.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="2" className="mt-6">
          <Card id="phase-2">
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
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Establish Modernization Steering Committee and domain leads</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Define transformation goals, scope, and target maturity scores</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Identify funding, resource needs, and key stakeholders</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Develop high-level transformation roadmap</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                  <ul className="text-slate-600 space-y-1">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span># of governance roles assigned</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>% of domains with defined scope and KPIs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Approval of roadmap and budget</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-2">Recommended for Developing Maturity Level</h3>
                <p className="text-slate-600">
                  Organizations at the Developing maturity level should focus on formalizing governance structures and
                  establishing clear ownership for modernization initiatives. This phase helps create the foundation for
                  sustainable improvement.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3" className="mt-6">
          <Card id="phase-3">
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
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Implement or formalize incident response and change management processes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Address known risks (e.g., access gaps, unsupported tools)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Introduce risk register and service catalog</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Deploy high-value improvements (e.g., MFA, backups)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                  <ul className="text-slate-600 space-y-1">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>% of quick win actions completed</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span># of critical risks mitigated</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>User feedback on changes implemented</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-2">
                  Recommended for Developing to Established Maturity Levels
                </h3>
                <p className="text-slate-600">
                  Organizations at the Developing to Established maturity levels should focus on implementing quick wins
                  to build momentum and demonstrate value. This phase helps establish credibility for the modernization
                  program and addresses immediate risks.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="4" className="mt-6">
          <Card id="phase-4">
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
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Upgrade or replace legacy systems (e.g., DMS, financial tools)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Migrate services to cloud or hybrid environments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pilot and adopt Zero Trust security architecture</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Rationalize and integrate IT tooling</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                  <ul className="text-slate-600 space-y-1">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>% project milestones completed on time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span># of legacy systems decommissioned</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Compliance audit readiness score</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-2">
                  Recommended for Established to Managed Maturity Levels
                </h3>
                <p className="text-slate-600">
                  Organizations at the Established to Managed maturity levels should focus on implementing major
                  transformation projects to modernize legacy systems and adopt advanced capabilities. This phase
                  delivers significant improvements in maturity and capabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="5" className="mt-6">
          <Card id="phase-5">
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
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Establish IT performance dashboards and service scorecards</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Benchmark maturity scores year over year</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Integrate continuous improvement into business planning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Share success metrics with leadership and stakeholders</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">KPIs</h3>
                  <ul className="text-slate-600 space-y-1">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>% of services with real-time performance metrics</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>YoY maturity score improvement per domain</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5">•</div>
                      <span>Stakeholder satisfaction ratings</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-2">
                  Recommended for Managed to Optimized Maturity Levels
                </h3>
                <p className="text-slate-600">
                  Organizations at the Managed to Optimized maturity levels should focus on institutionalizing
                  improvements and creating a culture of continuous improvement. This phase ensures that modernization
                  becomes an ongoing process rather than a one-time project.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div id="initial" className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Maturity-Based Roadmap Recommendations</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Initial (1.0-1.9)</CardTitle>
              <CardDescription>Focus on assessment and establishing a baseline</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Organizations at the Initial maturity level should focus on:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Completing a thorough assessment of current capabilities</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Identifying critical risks and vulnerabilities</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Establishing basic governance and ownership</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implementing foundational security controls</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link href="/playbook/roadmap?phase=1">
                  <Button className="w-full">View Phase 1 Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Developing (2.0-2.9)</CardTitle>
              <CardDescription>Focus on governance and quick wins</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Organizations at the Developing maturity level should focus on:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Formalizing governance structures and processes</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implementing quick wins to demonstrate value</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Addressing known risks and vulnerabilities</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Developing a roadmap for further improvements</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link href="/playbook/roadmap?phase=2">
                  <Button className="w-full">View Phase 2 Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Established (3.0-3.9)</CardTitle>
              <CardDescription>Focus on transformation projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Organizations at the Established maturity level should focus on:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implementing major transformation projects</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Modernizing legacy systems and infrastructure</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Enhancing security capabilities and controls</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Developing metrics and performance tracking</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link href="/playbook/roadmap?phase=3">
                  <Button className="w-full">View Phase 3 Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managed to Optimized (4.0-5.0)</CardTitle>
              <CardDescription>Focus on optimization and continuous improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Organizations at the Managed to Optimized maturity levels should focus on:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Institutionalizing improvements and best practices</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Creating a culture of continuous improvement</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Implementing advanced capabilities and automation</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>Benchmarking against industry leaders</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link href="/playbook/roadmap?phase=5">
                  <Button className="w-full">View Phase 5 Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
            Start Maturity Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
