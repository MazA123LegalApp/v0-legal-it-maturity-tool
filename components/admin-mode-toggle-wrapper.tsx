"use client"

import dynamic from "next/dynamic"

// Dynamically import the AdminModeToggle component with no SSR
const AdminModeToggle = dynamic(() => import("./admin-mode-toggle").then((mod) => mod.AdminModeToggle), {
  ssr: false,
})

export function AdminModeToggleWrapper() {
  return <AdminModeToggle />
}
