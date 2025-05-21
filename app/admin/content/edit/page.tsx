"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ContentItem, ContentType } from "@/lib/content-management"

export default function AdminContentEditPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [contentItem, setContentItem] = useState<Partial<ContentItem>>({
    type: "domain-overview",
    title: "",
    content: "",
    domain: "",
    maturityBand: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const contentId = searchParams?.get("id")

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = sessionStorage.getItem("admin_authenticated")

    if (adminAuth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)

      // If editing existing content, fetch it
      if (contentId) {
        fetchContent(contentId)
      }
    }

    setIsLoading(false)
  }, [router, contentId])

  const fetchContent = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/content?id=${id}`)
      if (response.ok) {
        const data = await response.json()
        setContentItem(data)
      } else {
        setError("Failed to fetch content")
      }
    } catch (error) {
      console.error("Error fetching content:", error)
      setError("An error occurred while fetching content")
    }
  }

  const handleSave = async () => {
    setError(null)
    setSuccess(null)
    setIsSaving(true)

    try {
      // Validate required fields
      if (!contentItem.type || !contentItem.title || !contentItem.content) {
        setError("Type, title, and content are required")
        setIsSaving(false)
        return
      }

      // For maturity guides, domain and maturity band are required
      if (contentItem.type === "maturity-guide" && (!contentItem.domain || !contentItem.maturityBand)) {
        setError("Domain and maturity band are required for maturity guides")
        setIsSaving(false)
        return
      }

      // For domain overviews, domain is required
      if (contentItem.type === "domain-overview" && !contentItem.domain) {
        setError("Domain is required for domain overviews")
        setIsSaving(false)
        return
      }

      // Add updatedBy field
      const itemToSave: ContentItem = {
        ...(contentItem as ContentItem),
        updatedBy: "admin",
        lastUpdated: new Date().toISOString(),
      }

      // If no ID, generate one
      if (!itemToSave.id) {
        itemToSave.id = `${Date.now()}`
      }

      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToSave),
      })

      if (response.ok) {
        setSuccess("Content saved successfully")

        // If creating new content, redirect to the content list after a delay
        if (!contentId) {
          setTimeout(() => {
            router.push("/admin/content")
          }, 1500)
        }
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save content")
      }
    } catch (error) {
      console.error("Error saving content:", error)
      setError("An error occurred while saving content")
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: keyof ContentItem, value: string) => {
    setContentItem((prev) => ({
      ...prev,
      [field]: value,
    }))
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
    <div className="container max-w-4xl py-6 md:py-10">
      <div className="mb-8">
        <Link href="/admin/content">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Content Management
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{contentId ? "Edit Content" : "Create New Content"}</CardTitle>
          <CardDescription>
            {contentId
              ? "Update existing content in the Legal IT Maturity Tool"
              : "Add new content to the Legal IT Maturity Tool"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">{error}</div>}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-3 text-sm">{success}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <Select value={contentItem.type} onValueChange={(value) => handleInputChange("type", value as ContentType)}>
              <SelectTrigger id="content-type">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domain-overview">Domain Overview</SelectItem>
                <SelectItem value="maturity-guide">Maturity Guide</SelectItem>
                <SelectItem value="template">Template</SelectItem>
                <SelectItem value="playbook-section">Playbook Section</SelectItem>
                <SelectItem value="roadmap">Roadmap</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={contentItem.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter content title"
            />
          </div>

          {(contentItem.type === "domain-overview" ||
            contentItem.type === "maturity-guide" ||
            contentItem.type === "template") && (
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Select value={contentItem.domain || ""} onValueChange={(value) => handleInputChange("domain", value)}>
                <SelectTrigger id="domain">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
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
          )}

          {contentItem.type === "maturity-guide" && (
            <div className="space-y-2">
              <Label htmlFor="maturity-band">Maturity Band</Label>
              <Select
                value={contentItem.maturityBand || ""}
                onValueChange={(value) => handleInputChange("maturityBand", value)}
              >
                <SelectTrigger id="maturity-band">
                  <SelectValue placeholder="Select maturity band" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Initial">Initial</SelectItem>
                  <SelectItem value="Developing">Developing</SelectItem>
                  <SelectItem value="Established">Established</SelectItem>
                  <SelectItem value="Managed">Managed</SelectItem>
                  <SelectItem value="Optimized">Optimized</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={contentItem.content || ""}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Enter content here..."
              className="min-h-[300px]"
            />
            <p className="text-xs text-muted-foreground">
              You can use Markdown formatting for rich text. HTML tags are also supported.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/content">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Content"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
