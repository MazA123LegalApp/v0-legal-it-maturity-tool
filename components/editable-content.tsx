"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Edit2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAdminMode } from "@/contexts/admin-context"

interface EditableContentProps {
  children: React.ReactNode
  type: string
  domain?: string
  maturityBand?: string
  id?: string
  title?: string
}

export function EditableContent({ children, type, domain, maturityBand, id = "content", title }: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState<string>("")
  const { isAdminMode } = useAdminMode()
  const { toast } = useToast()
  const pathname = usePathname()

  // Extract HTML content from children
  useEffect(() => {
    if (children && typeof children === "object" && "props" in children) {
      // If children is a React element with props.children that contains HTML
      const childElement = children as React.ReactElement
      if (childElement.props && childElement.props.children) {
        const tempDiv = document.createElement("div")
        // Render the children into the div to get the HTML
        // This is a simplified approach - in a real app you might use a proper HTML serializer
        tempDiv.appendChild(document.createTextNode(childElement.props.children.toString()))
        setContent(tempDiv.innerHTML)
      }
    }
  }, [children])

  const handleSave = async () => {
    try {
      // In a real app, this would save to your database
      console.log("Saving content:", {
        type,
        domain,
        maturityBand,
        id,
        content,
        path: pathname,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Content saved",
        description: "Your changes have been saved successfully.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "There was a problem saving your changes.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  if (!isAdminMode) {
    return <>{children}</>
  }

  return (
    <div className={`relative group ${isEditing ? "border-2 border-blue-500 p-4 rounded-md" : ""}`}>
      {!isEditing ? (
        <>
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 bg-white border-blue-500 text-blue-500 hover:bg-blue-50"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>
          <div className="group-hover:bg-blue-50/30 transition-colors p-1 rounded-md">{children}</div>
        </>
      ) : (
        <div className="space-y-4">
          {title && <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>}
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-3.5 w-3.5 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-3.5 w-3.5 mr-1" />
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
