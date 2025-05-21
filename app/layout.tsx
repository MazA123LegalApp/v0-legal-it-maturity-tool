import type React from "react"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminProvider } from "@/contexts/admin-context"
import { Toaster } from "@/components/ui/toaster"
import { AdminModeToggleWrapper } from "@/components/admin-mode-toggle-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Legal IT Maturity Model",
  description: "Assess and improve your legal organization's IT maturity",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AdminProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                  <div className="mr-4 hidden md:flex">
                    <a href="/" className="mr-6 flex items-center space-x-2">
                      <span className="font-bold">Legal IT Maturity</span>
                    </a>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                      <a href="/assessment" className="transition-colors hover:text-foreground/80">
                        Assessment
                      </a>
                      <a href="/playbook" className="transition-colors hover:text-foreground/80">
                        Playbook
                      </a>
                      <a href="/maturity" className="transition-colors hover:text-foreground/80">
                        Maturity Model
                      </a>
                    </nav>
                  </div>
                  <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <Suspense fallback={null}>
                      <AdminModeToggleWrapper />
                    </Suspense>
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} Legal IT Maturity Model. All rights reserved.
                  </p>
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
