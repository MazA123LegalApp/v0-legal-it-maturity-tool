"use client"

import { useSearchParams } from "next/navigation"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type MaturityBand, getTemplatesForDomain } from "@/lib/maturity-engine"
import { getDomainMaturityInfo } from "@/lib/assessment-utils"

interface MaturityContentSectionProps {
  domainId: string
  band: MaturityBand
  title: string
  description?: string
  children: React.ReactNode
  showTemplates?: boolean
  icon?: React.ReactNode
}

export function MaturityContentSection({
  domainId,
  band,
  title,
  description,
  children,
  showTemplates = true,
  icon,
}: MaturityContentSectionProps) {
  const searchParams = useSearchParams()
  const highlightParam = searchParams?.get("highlight")
  const [isUserMaturityLevel, setIsUserMaturityLevel] = useState(false)

  useEffect(() => {
    // Check if this section matches the user's maturity level for this domain
    const maturityInfo = getDomainMaturityInfo(domainId)
    if (maturityInfo.hasCompleted && maturityInfo.level === band) {
      setIsUserMaturityLevel(true)
    } else if (highlightParam === band.toLowerCase()) {
      setIsUserMaturityLevel(true)
    } else {
      setIsUserMaturityLevel(false)
    }
  }, [domainId, band, highlightParam])

  // Get templates for this domain and maturity level
  const templates = showTemplates ? getTemplatesForDomain(domainId, band) : []

  // Determine the background color based on whether this is the user's maturity level
  const bgColor = isUserMaturityLevel ? "bg-blue-50 border-blue-200" : ""

  // Create a URL to the band-specific implementation guide
  const bandLowercase = band.toLowerCase()
  const implementationGuideUrl = `/playbook/domains/${domainId}/${bandLowercase}`

  return (
    <Card className={`mb-6 ${bgColor}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
          {isUserMaturityLevel && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Your Current Level
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}

        {showTemplates && templates.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Recommended Templates</h4>
            <div className="grid gap-3">
              {templates.map((template, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <h5 className="font-medium text-sm">{template.name}</h5>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    {template.fileType.toUpperCase()}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {isUserMaturityLevel && (
        <CardFooter className="bg-blue-50 border-t border-blue-200">
          <Link href={implementationGuideUrl} className="w-full">
            <Button variant="default" className="w-full gap-2">
              View Detailed Implementation Guide
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
