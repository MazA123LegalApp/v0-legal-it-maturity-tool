"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { hasCompletedAssessment } from "@/lib/assessment-utils"
import { DynamicContent } from "@/components/dynamic-content"

export default function ContinuityResilienceInitialPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if the user has completed the assessment
    const assessmentCompleted = hasCompletedAssessment()
    if (!assessmentCompleted) {
      router.push("/maturity/assessment")
    } else {
      setIsAuthorized(true)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="container py-10">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container max-w-5xl py-6 md:py-10">
      <div className="mb-8">
        <Link href="/playbook/domains/continuity-resilience">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Continuity & Resilience Overview
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Continuity & Resilience — Initial (1.0–1.9)</h1>
        <p className="text-muted-foreground">Implementation guide for organizations at the Initial maturity level</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What This Score Means</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <DynamicContent
            type="maturity-guide"
            domain="continuity-resilience"
            maturityBand="Initial"
            fallbackContent={<p>SAMPLE TEXT - What This Score Means for Continuity & Resilience at Initial level</p>}
          />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Top 5 Priorities for Legal Institutions</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <DynamicContent
            type="maturity-guide"
            domain="continuity-resilience"
            maturityBand="Initial"
            id="priorities"
            fallbackContent={
              <>
                <h3>1. SAMPLE PRIORITY 1</h3>
                <p>SAMPLE TEXT - Description of priority 1</p>
                <ul>
                  <li>SAMPLE TEXT - Action item 1</li>
                  <li>SAMPLE TEXT - Action item 2</li>
                </ul>

                <h3>2. SAMPLE PRIORITY 2</h3>
                <p>SAMPLE TEXT - Description of priority 2</p>
                <ul>
                  <li>SAMPLE TEXT - Action item 1</li>
                  <li>SAMPLE TEXT - Action item 2</li>
                </ul>

                <h3>3. SAMPLE PRIORITY 3</h3>
                <p>SAMPLE TEXT - Description of priority 3</p>
                <ul>
                  <li>SAMPLE TEXT - Action item 1</li>
                  <li>SAMPLE TEXT - Action item 2</li>
                </ul>

                <h3>4. SAMPLE PRIORITY 4</h3>
                <p>SAMPLE TEXT - Description of priority 4</p>
                <ul>
                  <li>SAMPLE TEXT - Action item 1</li>
                  <li>SAMPLE TEXT - Action item 2</li>
                </ul>

                <h3>5. SAMPLE PRIORITY 5</h3>
                <p>SAMPLE TEXT - Description of priority 5</p>
                <ul>
                  <li>SAMPLE TEXT - Action item 1</li>
                  <li>SAMPLE TEXT - Action item 2</li>
                </ul>
              </>
            }
          />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Wins</CardTitle>
          </CardHeader>
          <CardContent>
            <DynamicContent
              type="maturity-guide"
              domain="continuity-resilience"
              maturityBand="Initial"
              id="quick-wins"
              fallbackContent={
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>SAMPLE TEXT - Quick win 1</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>SAMPLE TEXT - Quick win 2</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>SAMPLE TEXT - Quick win 3</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>SAMPLE TEXT - Quick win 4</span>
                  </li>
                </ul>
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Challenges & Solutions</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <DynamicContent
              type="maturity-guide"
              domain="continuity-resilience"
              maturityBand="Initial"
              id="challenges"
              fallbackContent={
                <>
                  <h4>SAMPLE CHALLENGE 1</h4>
                  <p>SAMPLE TEXT - Description of challenge 1</p>
                  <p>
                    <strong>Solution:</strong> SAMPLE TEXT - Solution to challenge 1
                  </p>

                  <h4>SAMPLE CHALLENGE 2</h4>
                  <p>SAMPLE TEXT - Description of challenge 2</p>
                  <p>
                    <strong>Solution:</strong> SAMPLE TEXT - Solution to challenge 2
                  </p>
                </>
              }
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recommended Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <div>
                <h5 className="font-medium text-sm">SAMPLE TEMPLATE 1</h5>
                <p className="text-xs text-muted-foreground">SAMPLE TEXT - Description of template 1</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                <Download className="h-3 w-3" />
                DOCX
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <div>
                <h5 className="font-medium text-sm">SAMPLE TEMPLATE 2</h5>
                <p className="text-xs text-muted-foreground">SAMPLE TEXT - Description of template 2</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                <Download className="h-3 w-3" />
                XLSX
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <div>
                <h5 className="font-medium text-sm">SAMPLE TEMPLATE 3</h5>
                <p className="text-xs text-muted-foreground">SAMPLE TEXT - Description of template 3</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                <Download className="h-3 w-3" />
                PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Playbook Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Link
              href="/playbook/domains/continuity-resilience"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <FileText className="h-4 w-4" />
              View Continuity & Resilience Domain Overview
            </Link>
            <Link href="/playbook/roadmap" className="flex items-center gap-2 text-blue-600 hover:underline">
              <FileText className="h-4 w-4" />
              Jump to Roadmap Phase 1: Discovery & Assessment
            </Link>
            <Link href="/playbook/templates" className="flex items-center gap-2 text-blue-600 hover:underline">
              <FileText className="h-4 w-4" />
              Download Initial Continuity & Resilience Toolkit
            </Link>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Link href="/playbook/domains/continuity-resilience">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Domain Overview
          </Button>
        </Link>
      </div>
    </div>
  )
}
