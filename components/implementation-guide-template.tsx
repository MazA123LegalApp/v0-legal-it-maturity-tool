import type React from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getTemplatesForDomain } from "@/lib/maturity-engine"

interface ImplementationGuideTemplateProps {
  domainId: string
  maturityBand: string
  domainName: string
  domainIcon: React.ReactNode
  whatThisMeans: string
  priorities: {
    title: string
    description: string
    steps: string[]
  }[]
  quickWins: string[]
  challenges: {
    title: string
    description: string
    solution: string
  }[]
  additionalTemplates?: {
    name: string
    description: string
    fileType: string
  }[]
}

export function ImplementationGuideTemplate({
  domainId,
  maturityBand,
  domainName,
  domainIcon,
  whatThisMeans,
  priorities,
  quickWins,
  challenges,
  additionalTemplates = [],
}: ImplementationGuideTemplateProps) {
  // Get templates for this domain and maturity level
  const templates = [...getTemplatesForDomain(domainId, maturityBand), ...additionalTemplates]

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href={`/playbook/domains/${domainId}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to {domainName} Domain
          </Button>
        </Link>

        <Link href="/playbook/roadmap?phase=4">
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            View Implementation Roadmap
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mb-4">{domainIcon}</div>
        <div className="inline-flex items-center gap-2 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">{domainName}</h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">{maturityBand}</span>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Tactical implementation guide for organizations at the {maturityBand} maturity level
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>What This Score Means</CardTitle>
              <CardDescription>Understanding your current maturity level</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>{whatThisMeans}</p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Implementation Guide</CardTitle>
              <CardDescription>Step-by-step tactical guidance for improving {domainName.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Top {priorities.length} Priorities for Legal Institutions
                  </h3>
                  <div className="space-y-4">
                    {priorities.map((priority, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-md">
                        <div className="bg-blue-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{priority.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{priority.description}</p>
                          <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                            <h5 className="text-sm font-medium text-blue-800 mb-2">Implementation Steps:</h5>
                            <ol className="text-sm text-slate-700 space-y-1 ml-4 list-decimal">
                              {priority.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Quick Wins</h3>
                  <ul className="space-y-2">
                    {quickWins.map((win, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Common Challenges and Solutions</h3>
                  <div className="space-y-3">
                    {challenges.map((challenge, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-md">
                        <h4 className="font-medium">Challenge: {challenge.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{challenge.description}</p>
                        <p className="text-sm text-slate-600 mt-1">
                          <strong>Solution:</strong> {challenge.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recommended Templates</CardTitle>
              <CardDescription>Tools to accelerate implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                      <Download className="h-3 w-3" />
                      {template.fileType.toUpperCase()}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Related Playbook Sections</CardTitle>
              <CardDescription>Strategic guidance and frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href={`/playbook/domains/${domainId}`} className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      {domainName} Domain Overview
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Strategic framework and maturity model for {domainName.toLowerCase()}
                    </p>
                  </div>
                </Link>

                <Link href="/playbook/roadmap?phase=4" className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Phase 4: Transformation Projects
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">Implementing advanced controls and processes</p>
                  </div>
                </Link>

                <Link href={`/playbook/domains/${domainId}#${maturityBand.toLowerCase()}`} className="block">
                  <div className="p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                    <h4 className="font-medium text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      {maturityBand} Maturity Overview
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      General guidance for the {maturityBand} maturity level
                    </p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Additional support options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-md">
                  <h4 className="font-medium text-sm">Schedule a Consultation</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Book a 30-minute call with an expert to discuss your specific challenges
                  </p>
                  <Button size="sm" className="w-full mt-2">
                    Request Consultation
                  </Button>
                </div>

                <div className="p-3 bg-slate-50 rounded-md">
                  <h4 className="font-medium text-sm">Join the Community</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Connect with peers in legal IT to share experiences and best practices
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Join Forum
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href={`/playbook/domains/${domainId}`}>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to {domainName} Domain
          </Button>
        </Link>

        <Link href="/playbook/roadmap?phase=4">
          <Button className="gap-2">
            View Implementation Roadmap
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
