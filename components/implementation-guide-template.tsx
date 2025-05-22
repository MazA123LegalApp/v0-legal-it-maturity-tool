"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { trackPlaybookDownload } from "@/lib/tracking-utils"

interface ImplementationGuideTemplateProps {
  domainId?: string
  maturityLevel?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export const ImplementationGuideTemplate = ({
  domainId = "unknown",
  maturityLevel = "unknown",
  title = "Implementation Guide",
  description = "This guide provides step-by-step instructions for implementation.",
  children,
}: ImplementationGuideTemplateProps) => {
  const handleDownload = () => {
    // Track the download event
    if (typeof trackPlaybookDownload === "function") {
      trackPlaybookDownload("PDF", domainId, maturityLevel, false)
    } else {
      console.log("Download tracking function not available")
    }

    // Simulate a download (replace with actual download logic)
    console.log("Downloading Implementation Guide...")
    alert("Implementation Guide Downloaded (Simulated)")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          {children || (
            <div className="space-y-4">
              <p>Domain: {domainId}</p>
              <p>Maturity Level: {maturityLevel}</p>
              <p>This implementation guide will help you achieve the next level of maturity in this domain.</p>
            </div>
          )}
          <div className="mt-6">
            <Button onClick={handleDownload}>Download PDF</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImplementationGuideTemplate
