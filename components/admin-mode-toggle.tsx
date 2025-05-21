"use client"

import { Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminMode } from "@/contexts/admin-context"
import { useEffect, useState } from "react"

export function AdminModeToggle() {
  const { isAdminMode, toggleAdminMode } = useAdminMode()
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is admin on client side
  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken")
    setIsAdmin(!!adminToken)
  }, [])

  if (!isAdmin) return null

  return (
    <Button variant={isAdminMode ? "default" : "outline"} size="sm" className="gap-1" onClick={toggleAdminMode}>
      <Edit2 className="h-3.5 w-3.5" />
      {isAdminMode ? "Exit Edit Mode" : "Edit Mode"}
    </Button>
  )
}
