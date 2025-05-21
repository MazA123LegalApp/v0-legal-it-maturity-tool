"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
  isAdminMode: boolean
  toggleAdminMode: () => void
  isAuthenticated: boolean
}

const AdminContext = createContext<AdminContextType>({
  isAdminMode: false,
  toggleAdminMode: () => {},
  isAuthenticated: false,
})

export const useAdmin = () => useContext(AdminContext)
// Add the missing export that's being referenced elsewhere
export const useAdminMode = () => useContext(AdminContext)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark that we're on the client
    setIsClient(true)

    // Check if user is authenticated as admin
    const adminAuth = sessionStorage.getItem("admin_authenticated")
    setIsAuthenticated(adminAuth === "true")
  }, [])

  const toggleAdminMode = () => {
    if (isAuthenticated) {
      setIsAdminMode((prev) => !prev)
    } else if (isClient) {
      // Redirect to login if not authenticated
      window.location.href = "/admin/login"
    }
  }

  return (
    <AdminContext.Provider value={{ isAdminMode, toggleAdminMode, isAuthenticated }}>{children}</AdminContext.Provider>
  )
}
