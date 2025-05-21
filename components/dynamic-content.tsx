"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { type ContentItem, getContent } from "@/lib/content-management"

interface DynamicContentProps {
  type: string
  domain?: string
  maturityBand?: string
  id?: string
  fallbackContent: React.ReactNode
}

export function DynamicContent({ type, domain, maturityBand, id, fallbackContent }: DynamicContentProps) {
  const [content, setContent] = useState<ContentItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentData = await getContent(type as any, domain, maturityBand, id)
        setContent(contentData)
      } catch (error) {
        console.error("Error fetching content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [type, domain, maturityBand, id])

  if (isLoading) {
    return <div className="animate-pulse bg-slate-100 h-20 rounded-md"></div>
  }

  if (!content) {
    return <>{fallbackContent}</>
  }

  // Render the content - this could be enhanced with a Markdown renderer
  return <div dangerouslySetInnerHTML={{ __html: content.content }} />
}
