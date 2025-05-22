import { type AssessmentResult, calculateDomainAverages, getMaturityLevel, domains } from "./assessment-data"

export interface DomainMaturityInfo {
  score: number
  level: string
  hasCompleted: boolean
}

/**
 * Saves assessment results to localStorage
 * @param results The assessment results to save
 * @returns boolean indicating if the save was successful
 */
export function saveAssessmentResults(results: AssessmentResult): boolean {
  if (typeof window === "undefined") return false

  try {
    localStorage.setItem("assessment_results", JSON.stringify(results))
    return true
  } catch (error) {
    console.error("Error saving assessment results:", error)
    return false
  }
}

/**
 * Retrieves assessment results from localStorage
 * @returns The assessment results or null if not found or invalid
 */
export function getAssessmentResults(): AssessmentResult | null {
  if (typeof window === "undefined") return null

  try {
    const storedResults = localStorage.getItem("assessment_results")
    if (!storedResults) return null

    const parsed = JSON.parse(storedResults)

    // Basic domain structure check
    const allDomainsPresent = domains.every(domain => parsed.hasOwnProperty(domain.id))
    if (!allDomainsPresent) {
      console.warn("Assessment result missing expected domains.")
      return null
    }

    // Validate required keys in each domain
    for (const domain of domains) {
      const record = parsed[domain.id]
      if (
        !record ||
        typeof record.people !== "number" ||
        typeof record.process !== "number" ||
        typeof record.tooling !== "number" ||
        typeof record.data !== "number" ||
        typeof record.improvement !== "number"
      ) {
        console.warn(`Invalid or incomplete data in domain: ${domain.id}`)
        return null
      }
    }

    return parsed as AssessmentResult
  } catch (error) {
    console.error("Error retrieving assessment results:", error)
    return null
  }
}

export function getDomainMaturityInfo(domainId: string): DomainMaturityInfo {
  const defaultInfo: DomainMaturityInfo = {
    score: 0,
    level: "",
    hasCompleted: false,
  }

  try {
    if (typeof window === "undefined") return defaultInfo

    const storedResults = localStorage.getItem("assessment_results")
    if (!storedResults) return defaultInfo

    const results = JSON.parse(storedResults) as AssessmentResult
    const domainAverages = calculateDomainAverages(results)

    if (!domainAverages[domainId] || domainAverages[domainId] === 0) {
      return defaultInfo
    }

    return {
      score: domainAverages[domainId],
      level: getMaturityLevel(domainAverages[domainId]),
      hasCompleted: true,
    }
  } catch (error) {
    console.error("Error getting domain maturity info:", error)
    return defaultInfo
  }
}

export function getRecommendedRoadmapPhase(maturityLevel: string): number {
  switch (maturityLevel) {
    case "Initial":
      return 1
    case "Developing":
      return 2
    case "Established":
      return 3
    case "Managed":
      return 4
    case "Optimized":
      return 5
    default:
      return 1
  }
}

/**
 * Checks if the user has completed an assessment
 * @returns boolean indicating if assessment has been completed
 */
export function hasCompletedAssessment(): boolean {
  if (typeof window === "undefined") return false

  try {
    const storedResults = localStorage.getItem("assessment_results")
    if (!storedResults) return false

    const results = JSON.parse(storedResults) as AssessmentResult
    const domainAverages = calculateDomainAverages(results)

    return Object.values(domainAverages).some((score) => score > 0)
  } catch (error) {
    console.error("Error checking assessment completion:", error)
    return false
  }
}
