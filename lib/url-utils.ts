/**
 * Maps internal domain IDs to URL-friendly IDs
 * This ensures consistency across the application
 */
export function getDomainUrlId(domainId: string): string {
  const domainUrlMap: Record<string, string> = {
    "incident-problem": "incident-problem",
    "continuity-resilience": "continuity-resilience",
    "knowledge-data": "knowledge-data",
    "change-deployment": "change-deployment",
    "infrastructure-tooling": "infrastructure-tooling",
    "service-management": "service-management",
    "risk-compliance": "risk-compliance",
    cybersecurity: "cybersecurity",
  }

  return domainUrlMap[domainId] || domainId
}

/**
 * Maps maturity bands to URL-friendly IDs
 */
export function getMaturityBandUrlId(band: string): string {
  const bandUrlMap: Record<string, string> = {
    Initial: "initial",
    Developing: "developing",
    Established: "established",
    Managed: "managed",
    Optimized: "optimized",
  }

  return bandUrlMap[band] || band.toLowerCase()
}

/**
 * Gets the URL for a domain page
 */
export function getDomainPageUrl(domainId: string): string {
  const urlId = getDomainUrlId(domainId)
  return `/playbook/domains/${urlId}`
}

/**
 * Gets the URL for a domain implementation guide
 */
export function getImplementationGuideUrl(domainId: string, band: string): string {
  const domainUrlId = getDomainUrlId(domainId)
  const bandUrlId = getMaturityBandUrlId(band)
  return `/playbook/domains/${domainUrlId}/${bandUrlId}`
}
