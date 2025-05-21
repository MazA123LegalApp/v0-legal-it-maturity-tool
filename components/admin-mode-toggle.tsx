"use client"

import { useAdmin } from "@/contexts/admin-context"
import { Shield, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminModeToggle() {
  const { isAdminMode, toggleAdminMode, isAuthenticated } = useAdmin()

  if (!isAuthenticated) {
    return null
  }

  return (
    <Button
      variant={isAdminMode ? "default" : "outline"}
      size="sm"
      onClick={toggleAdminMode}
      className={`gap-1 ${isAdminMode ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}`}
    >
      {isAdminMode ? (
        <>
          <ShieldAlert className="h-4 w-4" />
          <span className="hidden sm:inline">Exit Edit Mode</span>
          <span className="sm:hidden">Exit</span>
        </>
      ) : (
        <>
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Edit Mode</span>
          <span className="sm:hidden">Edit</span>
        </>
      )}
    </Button>
  )
}
