import type React from "react"
import "@/app/globals.css"

import { Fraunces, IBM_Plex_Sans } from "next/font/google"
import Link from "next/link"
import { BookOpen, BarChart3, Home, Shield } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { GoogleTagManager } from "@/components/gtm"
import { AdminProvider } from "@/contexts/admin-context"
import { Toaster } from "@/components/ui/toaster"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
})

export const metadata = {
  title: "Legal Modernization Platform - Operationalizing Federal Cybersecurity Mandates",
  description:
    "A vendor-neutral framework built by legal sector practitioners to help law firms implement CISA directives, OMB mandates, and Executive Order 14028 requirements.",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${ibmPlexSans.variable}`}>
      <head>
        <GoogleTagManager />
      </head>
      <body className={ibmPlexSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AdminProvider>
            <div className="min-h-screen flex flex-col">
              <header className="border-b bg-background sticky top-0 z-10">
                <div className="container flex h-16 items-center justify-between">
                  <Link href="/" className="font-semibold flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    <span className="hidden sm:inline">Legal Modernization Platform</span>
                  </Link>
                  <nav className="flex gap-4 sm:gap-6">
                    <Link
                      href="/playbook"
                      className="text-sm hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span className="hidden sm:inline">Playbook</span>
                    </Link>
                    <Link
                      href="/maturity"
                      className="text-sm hover:text-orange-600 transition-colors flex items-center gap-1"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Assessment</span>
                    </Link>
                    <Link
                      href="/admin/login"
                      className="text-sm hover:text-purple-600 transition-colors flex items-center gap-1"
                    >
                      <Shield className="h-4 w-4" />
                      <span className="hidden sm:inline">Admin</span>
                    </Link>
                  </nav>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0 bg-slate-50">
                <div className="container flex flex-col md:h-16 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Legal Modernization Platform
                  </p>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-4 md:mt-0">
                    <Link href="/playbook" className="hover:text-blue-600 transition-colors">
                      Playbook
                    </Link>
                    <Link href="/maturity" className="hover:text-orange-600 transition-colors">
                      Assessment
                    </Link>
                    <Link href="/contact" className="hover:text-amber-600 transition-colors">
                      Contact
                    </Link>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
