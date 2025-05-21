"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ContentItem, ContentType } from "@/lib/content-management"

export default function AdminContentPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [contentType, setContentType] = useState<ContentType>("domain-overview")
  const [domain, setDomain] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = sessionStorage.getItem("admin_authenticated")

    if (adminAuth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchContent()
    }

    setIsLoading(false)
  }, [router, contentType, domain])

  const fetchContent = async () => {
    try {
      let url = `/api/admin/content?type=${contentType}`
      if (domain !== "all") url += `&domain=${domain}`

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setContentItems(data)
      } else {
        console.error("Failed to fetch content")
      }
    } catch (error) {
      console.error("Error fetching content:", error)
    }
  }

  const handleDelete = async (item: ContentItem) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        const response = await fetch("/api/admin/content", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })

        if (response.ok) {
          fetchContent()
        } else {
          alert("Failed to delete content")
        }
      } catch (error) {
        console.error("Error deleting content:", error)
        alert("An error occurred while deleting content")
      }
    }
  }

  const filteredContent = contentItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.domain && item.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.maturityBand && item.maturityBand.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">Manage content across the Legal IT Maturity Tool</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/admin/content/edit">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Content
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="domain-overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="domain-overview" onClick={() => setContentType("domain-overview")}>
            Domain Overviews
          </TabsTrigger>
          <TabsTrigger value="maturity-guide" onClick={() => setContentType("maturity-guide")}>
            Maturity Guides
          </TabsTrigger>
          <TabsTrigger value="template" onClick={() => setContentType("template")}>
            Templates
          </TabsTrigger>
          <TabsTrigger value="playbook-section" onClick={() => setContentType("playbook-section")}>
            Playbook Sections
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <Select value={domain} onValueChange={setDomain}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="risk-compliance">Risk & Compliance</SelectItem>
                <SelectItem value="incident-problem">Incident & Problem Management</SelectItem>
                <SelectItem value="continuity-resilience">Continuity & Resilience</SelectItem>
                <SelectItem value="knowledge-data">Knowledge & Data</SelectItem>
                <SelectItem value="change-deployment">Change & Deployment</SelectItem>
                <SelectItem value="infrastructure-tooling">Infrastructure & Tooling</SelectItem>
                <SelectItem value="service-management">Service Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-2/3">
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="domain-overview" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Domain Overview Content</CardTitle>
              <CardDescription>Manage domain overview pages and content</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredContent.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No content found</p>
              ) : (
                <div className="grid gap-4">
                  {filteredContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.domain && `Domain: ${item.domain}`}
                          {item.lastUpdated && ` • Updated: ${new Date(item.lastUpdated).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/content/edit?id=${item.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maturity-guide" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Maturity Guide Content</CardTitle>
              <CardDescription>Manage maturity band-specific implementation guides</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredContent.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No content found</p>
              ) : (
                <div className="grid gap-4">
                  {filteredContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.domain && `Domain: ${item.domain}`}
                          {item.maturityBand && ` • Band: ${item.maturityBand}`}
                          {item.lastUpdated && ` • Updated: ${new Date(item.lastUpdated).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/content/edit?id=${item.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Template Content</CardTitle>
              <CardDescription>Manage downloadable templates and resources</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredContent.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No content found</p>
              ) : (
                <div className="grid gap-4">
                  {filteredContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.domain && `Domain: ${item.domain}`}
                          {item.maturityBand && ` • Band: ${item.maturityBand}`}
                          {item.lastUpdated && ` • Updated: ${new Date(item.lastUpdated).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/content/edit?id=${item.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playbook-section" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Playbook Section Content</CardTitle>
              <CardDescription>Manage playbook sections and content</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredContent.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No content found</p>
              ) : (
                <div className="grid gap-4">
                  {filteredContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.lastUpdated && `Updated: ${new Date(item.lastUpdated).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/content/edit?id=${item.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
