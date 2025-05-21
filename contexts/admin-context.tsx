"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

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

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated as admin
    const adminAuth = sessionStorage.getItem("admin_authenticated")
    setIsAuthenticated(adminAuth === "true")
  }, [])

  const toggleAdminMode = () => {
    if (isAuthenticated) {
      setIsAdminMode((prev) => !prev)
    } else {
      // Redirect to login if not authenticated
      router.push("/admin/login")
    }
  }

  return (
    <AdminContext.Provider value={{ isAdminMode, toggleAdminMode, isAuthenticated }}>{children}</AdminContext.Provider>
  )
}
