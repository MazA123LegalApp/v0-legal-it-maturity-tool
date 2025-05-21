import { type AssessmentResult, calculateDomainAverages, getMaturityLevel } from "./assessment-data"

export interface DomainMaturityInfo {
  score: number
  level: string
  hasCompleted: boolean
}

export function getDomainMaturityInfo(domainId: string): DomainMaturityInfo {
  // Default values if no assessment data is found
  const defaultInfo: DomainMaturityInfo = {
    score: 0,
    level: "",
    hasCompleted: false,
  }

  try {
    // Try to get assessment results from localStorage
    if (typeof window === "undefined") return defaultInfo

    const storedResults = localStorage.getItem("assessment_results")
    if (!storedResults) return defaultInfo

    const results = JSON.parse(storedResults) as AssessmentResult
    const domainAverages = calculateDomainAverages(results)

    // Check if this domain has been assessed
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
  // Check if we're on the server side
  if (typeof window === "undefined") return false

  try {
    // Try to get assessment results from localStorage
    const storedResults = localStorage.getItem("assessment_results")
    if (!storedResults) return false

    // Parse the results and check if they're valid
    const results = JSON.parse(storedResults) as AssessmentResult
    const domainAverages = calculateDomainAverages(results)

    // Check if at least one domain has been assessed
    return Object.values(domainAverages).some((score) => score > 0)
  } catch (error) {
    console.error("Error checking assessment completion:", error)
    return false
  }
}
