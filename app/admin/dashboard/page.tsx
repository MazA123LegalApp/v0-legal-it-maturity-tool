"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, BarChart3, Download, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = sessionStorage.getItem("admin_authenticated")

    if (adminAuth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor usage and manage content for the Legal Technology Hub</p>
        </div>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Assessment</TabsTrigger>
          <TabsTrigger value="playbook">Playbook</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Total Visitors
                </CardTitle>
                <CardDescription>Unique visitors in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">127</p>
                <p className="text-sm text-muted-foreground mt-2">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  Assessment Completions
                </CardTitle>
                <CardDescription>Completed assessments in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">43</p>
                <p className="text-sm text-muted-foreground mt-2">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5 text-green-600" />
                  Playbook Downloads
                </CardTitle>
                <CardDescription>Downloads in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">18</p>
                <p className="text-sm text-muted-foreground mt-2">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest user interactions with the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium">Assessment Completed</p>
                  <p className="text-sm text-muted-foreground">Organization: Acme Legal Services</p>
                  <p className="text-xs text-muted-foreground">Today at 10:23 AM</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-medium">Playbook Downloaded</p>
                  <p className="text-sm text-muted-foreground">Organization: Smith & Partners</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-medium">Assessment Completed</p>
                  <p className="text-sm text-muted-foreground">Organization: Legal Tech Solutions</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 11:12 AM</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-medium">Assessment Started</p>
                  <p className="text-sm text-muted-foreground">Organization: Johnson Legal</p>
                  <p className="text-xs text-muted-foreground">2 days ago at 2:30 PM</p>
                </div>
                <div>
                  <p className="font-medium">Playbook Downloaded</p>
                  <p className="text-sm text-muted-foreground">Organization: Global Law Associates</p>
                  <p className="text-xs text-muted-foreground">2 days ago at 9:15 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maturity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maturity Assessment Analytics</CardTitle>
              <CardDescription>Usage statistics for the IT Maturity Assessment tool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Assessment Completions</h3>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Average Scores by Domain</h3>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Top Organizations</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Organization</th>
                          <th className="text-left py-2 px-4">Size</th>
                          <th className="text-left py-2 px-4">Overall Score</th>
                          <th className="text-left py-2 px-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">Acme Legal Services</td>
                          <td className="py-2 px-4">Mid-size</td>
                          <td className="py-2 px-4">3.8</td>
                          <td className="py-2 px-4">Today</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">Legal Tech Solutions</td>
                          <td className="py-2 px-4">Large</td>
                          <td className="py-2 px-4">4.2</td>
                          <td className="py-2 px-4">Yesterday</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">Smith & Partners</td>
                          <td className="py-2 px-4">Small</td>
                          <td className="py-2 px-4">3.1</td>
                          <td className="py-2 px-4">3 days ago</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">Global Law Associates</td>
                          <td className="py-2 px-4">Mid-size</td>
                          <td className="py-2 px-4">3.5</td>
                          <td className="py-2 px-4">5 days ago</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playbook" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Playbook Analytics</CardTitle>
              <CardDescription>Usage statistics for the Legal Modernization Playbook</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Playbook Downloads</h3>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Most Viewed Sections</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Section</th>
                          <th className="text-left py-2 px-4">Views</th>
                          <th className="text-left py-2 px-4">Avg. Time Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">Digital Transformation Framework</td>
                          <td className="py-2 px-4">87</td>
                          <td className="py-2 px-4">4m 12s</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">Technology Selection Guide</td>
                          <td className="py-2 px-4">65</td>
                          <td className="py-2 px-4">3m 45s</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">Change Management Toolkit</td>
                          <td className="py-2 px-4">52</td>
                          <td className="py-2 px-4">5m 30s</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">Implementation Playbook</td>
                          <td className="py-2 px-4">43</td>
                          <td className="py-2 px-4">6m 15s</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Download Sources</h3>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
