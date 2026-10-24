import { type AssessmentResult, calculateDomainAverages, getMaturityLevel } from "./assessment-data"

export interface GuidedAssessmentResponse {
  score?: number
  evidence: string
  reviewed: boolean
}

export interface GuidedAssessmentScope {
  firm: string
  sponsor: string
  jurisdiction: string
  cadence: string
}

export type GuidedAssessmentResponses = Record<string, GuidedAssessmentResponse>

export const GUIDED_DOMAINS = [
  { id: "governance", name: "Governance & strategy" },
  { id: "risk", name: "Risk & compliance" },
  { id: "security", name: "Information security" },
  { id: "data", name: "Data & knowledge" },
  { id: "technology", name: "Technology & operations" },
  { id: "client", name: "Client experience" },
] as const

export const GUIDED_CONTROLS = [
  "Accountability and ownership are clearly defined.",
  "Policies and standards are documented and accessible.",
  "Risks are identified, assessed, and reviewed regularly.",
  "Operational processes are measured against agreed outcomes.",
  "Evidence is retained and can be independently checked.",
  "Staff receive role-appropriate guidance and training.",
  "Issues and exceptions have a defined escalation path.",
  "Improvement actions have owners, dates, and follow-up.",
] as const

export function calculateGuidedDomainScores(responses: GuidedAssessmentResponses): Record<string, number> {
  return Object.fromEntries(
    GUIDED_DOMAINS.map((domain) => {
      const scores = GUIDED_CONTROLS.map((_, index) => responses[`${domain.id}-${index}`]?.score).filter(
        (score): score is number => typeof score === "number" && score >= 1 && score <= 5,
      )
      const average = scores.length ? scores.reduce((total, score) => total + score, 0) / scores.length : 0
      return [domain.id, average]
    }),
  )
}

export function getGuidedAssessmentResults(): { responses: GuidedAssessmentResponses; scope: GuidedAssessmentScope | null } | null {
  if (typeof window === "undefined") return null
  try {
    const responses = JSON.parse(localStorage.getItem("guided_assessment_responses") || "null") as GuidedAssessmentResponses | null
    if (!responses) return null
    return {
      responses,
      scope: JSON.parse(localStorage.getItem("guided_assessment_scope") || "null") as GuidedAssessmentScope | null,
    }
  } catch {
    return null
  }
}

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
export function getAssessmentResults(): AssessmentResult | null {
  // Check if we're on the server side
  if (typeof window === "undefined") return null

  try {
    // Try to get assessment results from localStorage
    const storedResults = localStorage.getItem("assessment_results")
    if (!storedResults) return null

    // Parse and return the results
    return JSON.parse(storedResults) as AssessmentResult
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
