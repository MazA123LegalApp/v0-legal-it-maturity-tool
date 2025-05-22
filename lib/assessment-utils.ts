import { getMaturityLevel } from "./assessment-data"

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
export function saveAssessmentResults(results: any): boolean {
  // Check if we're on the server side
  if (typeof window === "undefined") return false

  try {
    // Save results to localStorage
    localStorage.setItem("assessment_results", JSON.stringify(results))
    return true
  } catch (error) {
    console.error("Error saving assessment results:", error)
    return false
  }
}

/**
 * Retrieves assessment results from localStorage
 * @returns The assessment results or null if not found
 */
export function getAssessmentResults(): any | null {
  // Check if we're on the server side
  if (typeof window === "undefined") return null

  try {
    // Try to get assessment results from localStorage
    const storedResults = localStorage.getItem("assessment_results")
    if (!storedResults) return null

    // Parse and return the results
    return JSON.parse(storedResults)
  } catch (error) {
    console.error("Error retrieving assessment results:", error)
    return null
  }
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

    const results = JSON.parse(storedResults)

    // Check if this domain has been assessed
    if (!results.domainScores || !results.domainScores[domainId] || results.domainScores[domainId] === 0) {
      return defaultInfo
    }

    return {
      score: results.domainScores[domainId],
      level: getMaturityLevel(results.domainScores[domainId]),
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
    const results = JSON.parse(storedResults)

    // Check if we have domain scores and at least one domain has been assessed
    return results && results.domainScores && Object.values(results.domainScores).some((score: any) => score > 0)
  } catch (error) {
    console.error("Error checking assessment completion:", error)
    return false
  }
}
