"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Edit, Save, X } from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import { type ContentItem, saveContent, getContent } from "@/lib/content-management"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface EditableContentProps {
  type: string
  domain?: string
  maturityBand?: string
  id?: string
  title?: string
  children: React.ReactNode
  className?: string
}

export function EditableContent({
  type,
  domain,
  maturityBand,
  id,
  title,
  children,
  className = "",
}: EditableContentProps) {
  const { isAdminMode } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState("")
  const [originalContent, setOriginalContent] = useState<React.ReactNode>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Store the original content when component mounts
  useEffect(() => {
    setOriginalContent(children)
  }, [children])

  // Fetch existing content from database when editing starts
  useEffect(() => {
    if (isEditing) {
      const fetchContent = async () => {
        try {
          const contentData = await getContent(type as any, domain, maturityBand, id)
          if (contentData) {
            setContent(contentData.content)
          } else {
            // If no content exists yet, use the children as initial content
            // This handles the first edit of static content
            if (typeof children === "string") {
              setContent(children)
            } else {
              // If children is a React element, try to get its text content
              const tempDiv = document.createElement("div")
              tempDiv.innerHTML = children?.toString() || ""
              setContent(tempDiv.textContent || "")
            }
          }
        } catch (error) {
          console.error("Error fetching content:", error)
          toast({
            title: "Error",
            description: "Failed to load content for editing",
            variant: "destructive",
          })
        }
      }

      fetchContent()
    }
  }, [isEditing, type, domain, maturityBand, id, children])

  // Focus the editor when it opens
  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus()
    }
  }, [isEditing])

  const handleSave = async () => {
    try {
      const contentItem: ContentItem = {
        id: id || `${type}-${domain || ""}-${maturityBand || ""}-${Date.now()}`,
        type: type as any,
        title: title || `Content for ${domain || ""} ${maturityBand || ""}`,
        content,
        domain,
        maturityBand,
        lastUpdated: new Date().toISOString(),
        updatedBy: "admin",
      }

      const success = await saveContent(contentItem)

      if (success) {
        toast({
          title: "Success",
          description: "Content saved successfully",
        })
        setIsEditing(false)
      } else {
        toast({
          title: "Error",
          description: "Failed to save content",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Error",
        description: "An error occurred while saving content",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  if (!isAdminMode) {
    // If not in admin mode, just render the children
    return <>{children}</>
  }

  if (isEditing) {
    return (
      <div className={`relative border-2 border-blue-400 rounded-md p-4 ${className}`}>
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm font-medium text-blue-600">Editing Content</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 px-2 text-red-500">
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} className="h-8 px-2 bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
        <Textarea
          ref={editorRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px] font-mono text-sm"
        />
      </div>
    )
  }

  return (
    <div
      className={`group relative ${className} hover:bg-blue-50 hover:border hover:border-dashed hover:border-blue-300 hover:rounded-md hover:p-1 transition-all duration-200`}
      onClick={() => setIsEditing(true)}
    >
      <div className="invisible group-hover:visible absolute top-2 right-2 bg-blue-100 rounded-full p-1">
        <Edit className="h-4 w-4 text-blue-600" />
      </div>
      {children}
    </div>
  )
}
