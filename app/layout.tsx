import type React from "react"
import "@/app/globals.css"

import { Inter } from "next/font/google"
import Link from "next/link"
import { BookOpen, BarChart3, Home } from "lucide-react"
import { Suspense } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Legal Technology Hub",
  description: "Resources and tools for legal technology modernization and maturity assessment",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen flex flex-col">
            <header className="border-b bg-background sticky top-0 z-10">
              <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="font-semibold flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <span className="hidden sm:inline">Legal Technology Hub</span>
                </Link>
                <nav className="flex gap-4 sm:gap-6">
                  <Link
                    href="/playbook"
                    className="text-sm hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Modernization Playbook</span>
                    <span className="sm:hidden">Playbook</span>
                  </Link>
                  <Link
                    href="/maturity"
                    className="text-sm hover:text-orange-600 transition-colors flex items-center gap-1"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">IT Maturity Assessment</span>
                    <span className="sm:hidden">Assessment</span>
                  </Link>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col md:h-16 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Legal Technology Hub</p>
                <div className="flex gap-4 text-sm text-muted-foreground mt-4 md:mt-0">
                  <Link href="/playbook" className="hover:text-blue-600 transition-colors">
                    Playbook
                  </Link>
                  <Link href="/maturity" className="hover:text-orange-600 transition-colors">
                    Maturity Assessment
                  </Link>
                  <Link
                    href="/admin/login"
                    className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </footer>
          </div>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
