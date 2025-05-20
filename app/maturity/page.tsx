import Link from "next/link"
import { ArrowRight, BarChart3, CheckCircle2, Home, Lightbulb, PieChart, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MaturityLandingPage() {
  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center text-center mb-12">
        <div className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
          Assessment Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal IT Maturity Assessment</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Evaluate your organization's IT maturity across key domains and dimensions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card className="border-orange-200 hover:shadow-md transition-all">
          <CardHeader className="bg-orange-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Complete Assessment
            </CardTitle>
            <CardDescription>Answer questions about your IT practices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The assessment covers 8 domains and 5 dimensions of IT maturity. Answer questions about your current
              practices to receive a detailed maturity score.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">8 key IT domains</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">5 maturity dimensions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">Takes about 15-20 minutes</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-orange-50 to-transparent">
            <Link href="/maturity/assessment" className="w-full">
              <Button className="w-full gap-2 bg-orange-600 hover:bg-orange-700">
                Start Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-blue-200 hover:shadow-md transition-all">
          <CardHeader className="bg-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              View Results
            </CardTitle>
            <CardDescription>Analyze your maturity scores</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Review your assessment results with detailed visualizations, domain-specific analysis, and benchmark
              comparisons against industry standards.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm">Interactive radar charts</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm">Domain-specific analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm">Industry benchmarking</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-blue-50 to-transparent">
            <Link href="/maturity/results" className="w-full">
              <Button variant="outline" className="w-full gap-2 border-blue-200 hover:bg-blue-50">
                View Results
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-green-200 hover:shadow-md transition-all">
          <CardHeader className="bg-green-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-green-600" />
              Improvement Plan
            </CardTitle>
            <CardDescription>Get recommendations for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Based on your assessment results, receive targeted recommendations to improve your IT maturity across all
              domains and dimensions.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm">Personalized recommendations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm">Prioritized action items</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm">Resource suggestions</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-green-50 to-transparent">
            <Button variant="outline" className="w-full gap-2 border-green-200 hover:bg-green-50" disabled>
              Coming Soon
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:max-w-xl">
            <h2 className="text-2xl font-bold mb-2">About This Assessment</h2>
            <p className="text-muted-foreground mb-4">
              This assessment tool helps legal organizations evaluate their IT maturity across key domains and
              dimensions. The results provide insights into strengths and areas for improvement.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <PieChart className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">8 Domains</p>
                  <p className="text-xs text-muted-foreground">Key areas of IT operations</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">5 Dimensions</p>
                  <p className="text-xs text-muted-foreground">Aspects of each domain</p>
                </div>
              </div>
            </div>
          </div>
          <Link href="/maturity/assessment">
            <Button size="lg" className="gap-2 bg-orange-600 hover:bg-orange-700">
              Start Assessment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>The assessment process is simple and straightforward</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 text-orange-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-medium mb-2">Complete the Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Answer questions about your organization's IT practices across 8 domains and 5 dimensions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 text-orange-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-medium mb-2">Review Your Results</h3>
              <p className="text-sm text-muted-foreground">
                Get a detailed breakdown of your maturity scores with visualizations and benchmark comparisons.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 text-orange-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-medium mb-2">Plan Improvements</h3>
              <p className="text-sm text-muted-foreground">
                Use the insights to develop a targeted improvement plan for your organization's IT maturity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
