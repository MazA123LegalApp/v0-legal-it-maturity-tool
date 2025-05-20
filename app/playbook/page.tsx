import Link from "next/link"
import { ArrowLeft, BookOpen, FileText, Home, Lightbulb, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PlaybookLandingPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">Legal Modernization Playbook</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A comprehensive guide to modernizing legal operations and technology
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Legal Modernization Playbook</CardTitle>
              <CardDescription>A guide to transforming legal operations with technology</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  Welcome to the Legal Modernization Playbook, a comprehensive resource designed to help legal
                  departments and law firms navigate the complex journey of digital transformation.
                </p>
                <p>
                  This playbook provides practical guidance, frameworks, and best practices for modernizing legal
                  operations through technology adoption, process optimization, and organizational change.
                </p>
                <h3>Key Benefits</h3>
                <ul>
                  <li>Structured approach to legal digital transformation</li>
                  <li>Practical frameworks and methodologies</li>
                  <li>Case studies and success stories</li>
                  <li>Implementation guides and checklists</li>
                  <li>Change management strategies</li>
                </ul>
                <p>
                  <em>
                    Note: This is a placeholder for the Legal Modernization Playbook. The full content will be available
                    soon.
                  </em>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="frameworks" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Digital Transformation Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A structured approach to legal digital transformation covering people, process, technology, and data
                  dimensions.
                </p>
                <p className="text-sm text-muted-foreground mt-4">Coming soon</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Technology Selection Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A methodology for evaluating, selecting, and implementing legal technology solutions aligned with
                  organizational needs.
                </p>
                <p className="text-sm text-muted-foreground mt-4">Coming soon</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Change Management Toolkit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Strategies and tools for managing organizational change during legal technology transformation
                  initiatives.
                </p>
                <p className="text-sm text-muted-foreground mt-4">Coming soon</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Implementation Playbook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Step-by-step guides for implementing various legal technologies and process improvements.</p>
                <p className="text-sm text-muted-foreground mt-4">Coming soon</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resources & Tools</CardTitle>
              <CardDescription>Helpful resources for your modernization journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                This section will contain downloadable templates, checklists, and other resources to support your legal
                modernization initiatives.
              </p>
              <p className="text-center text-muted-foreground">Resources coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </div>
    </div>
  )
}
