/**
 * Maps internal domain IDs to URL-friendly IDs
 * This ensures consistency across the application
 */
export function getDomainUrlId(domainId: string): string {
  const domainUrlMap: Record<string, string> = {
    "incident-problem": "incident-management",
    "continuity-resilience": "service-continuity",
    "knowledge-data": "knowledge-governance",
    // Add other mappings as needed
  }

  return domainUrlMap[domainId] || domainId
}
