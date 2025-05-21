import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Paths that require assessment completion
const PROTECTED_PATHS = [
  "/playbook/domains/cybersecurity/initial",
  "/playbook/domains/cybersecurity/developing",
  "/playbook/domains/cybersecurity/established",
  "/playbook/domains/cybersecurity/managed",
  "/playbook/domains/cybersecurity/optimized",
  // Add other domain/band paths as they are created
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the requested path is a protected band-specific implementation guide
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    // In a real implementation, we would check a server-side session or token
    // For now, we'll use a cookie to simulate assessment completion
    const hasCompletedAssessment = request.cookies.get("assessment_completed")

    // If no assessment completion cookie exists, redirect to the assessment page
    if (!hasCompletedAssessment) {
      return NextResponse.redirect(new URL("/maturity/assessment", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all band-specific implementation guide paths
    "/playbook/domains/:domain/:band*",
  ],
}
