"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
  isAdminMode: boolean
  toggleAdminMode: () => void
}

const AdminContext = createContext<AdminContextType>({
  isAdminMode: false,
  toggleAdminMode: () => {},
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // This ensures we only run client-side code after hydration
    setIsClient(true)

    // Check if admin mode was previously enabled
    const storedAdminMode = localStorage.getItem("adminMode") === "true"
    setIsAdminMode(storedAdminMode)
  }, [])

  const toggleAdminMode = () => {
    const newMode = !isAdminMode
    setIsAdminMode(newMode)

    // Store the admin mode preference
    if (isClient) {
      localStorage.setItem("adminMode", newMode.toString())
    }
  }

  return <AdminContext.Provider value={{ isAdminMode, toggleAdminMode }}>{children}</AdminContext.Provider>
}

export const useAdminMode = () => useContext(AdminContext)
