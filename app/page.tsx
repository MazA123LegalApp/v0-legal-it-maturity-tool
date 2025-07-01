import Link from "next/link"
import { ArrowRight, BookOpen, BarChart3, CheckCircle2, Users, FileText, Settings, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MainLandingPage() {
  return (
    <div className="container max-w-6xl py-6 md:py-10 relative">
      {/* BETA Label */}
      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
        BETA
      </div>

      <div className="flex flex-col items-center text-center mb-12">
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
          Legal Technology Resources
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Technology Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Resources and tools for legal technology modernization and maturity assessment
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <Card className="border-blue-200 overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg text-xs font-medium">
            Framework
          </div>
          <CardHeader className="bg-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <BookOpen className="h-6 w-6" />
              Legal Modernization Playbook
            </CardTitle>
            <CardDescription>A comprehensive guide to modernizing legal operations</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              The Legal Modernization Playbook provides frameworks, methodologies, and best practices for transforming
              legal operations through technology adoption, process optimization, and organizational change.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm">Digital transformation frameworks</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm">Technology selection guides</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm">Change management strategies</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm">Implementation playbooks</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-blue-50 to-transparent">
            <Link href="/playbook" className="w-full">
              <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 group-hover:translate-x-1 transition-transform">
                Access Playbook
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-orange-200 overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 bg-orange-600 text-white px-3 py-1 rounded-bl-lg text-xs font-medium">
            Assessment
          </div>
          <CardHeader className="bg-orange-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <BarChart3 className="h-6 w-6" />
              Legal IT Maturity Assessment
            </CardTitle>
            <CardDescription>Evaluate your organization's IT maturity</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              The Legal IT Maturity Assessment helps legal organizations evaluate their IT maturity across key domains
              and dimensions. The results provide insights into strengths and areas for improvement.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">Comprehensive maturity evaluation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">Domain-specific analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">Benchmark comparisons</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">Improvement recommendations</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-orange-50 to-transparent">
            <Link href="/maturity" className="w-full">
              <Button className="w-full gap-2 bg-orange-600 hover:bg-orange-700 group-hover:translate-x-1 transition-transform">
                Start Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              For Legal Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Evaluate your current technology maturity and identify opportunities for improvement to enhance client
              service.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              For IT Leaders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gain insights into legal-specific technology needs and build a roadmap for supporting legal operations.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              For Executives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Understand the strategic value of legal technology investments and prioritize initiatives for maximum
              impact.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
            <p className="text-muted-foreground">
              Choose a module above to begin your legal technology modernization journey.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/playbook">
              <Button variant="outline" className="gap-2 border-blue-200 hover:bg-blue-50 bg-transparent">
                <BookOpen className="h-4 w-4" />
                Playbook
              </Button>
            </Link>
            <Link href="/maturity">
              <Button className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Assessment
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="gap-2 border-gray-200 hover:bg-gray-50 bg-transparent">
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
