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

export const GUIDED_CONTROLS: Record<string, readonly string[]> = {
  governance: [
    "Strategic objectives for the legal function are documented and approved by accountable leadership.",
    "Decision rights and ownership for legal operations are assigned to named roles.",
    "The legal operating model is reviewed against organisational priorities at a defined cadence.",
    "Performance measures are used to evaluate whether legal services deliver agreed outcomes.",
    "Governance decisions, approvals, and exceptions are recorded in a retrievable form.",
    "People with governance responsibilities receive guidance appropriate to their role.",
    "Material governance issues are escalated through a defined leadership forum.",
    "Governance improvements have owners, target dates, and documented follow-up.",
  ],
  risk: [
    "Legal and regulatory obligations affecting the organisation are identified and maintained.",
    "Risk ownership is assigned for material legal, compliance, and operational risks.",
    "Risk assessments use defined criteria and are refreshed at a documented cadence.",
    "Controls are mapped to the risks and obligations they are intended to address.",
    "Compliance evidence is retained with enough context for independent review.",
    "Relevant personnel receive training on applicable legal and compliance responsibilities.",
    "Breach, exception, and non-compliance escalation routes are documented and understood.",
    "Risk treatment actions are prioritised, tracked, and reviewed through completion.",
  ],
  security: [
    "Information security responsibilities for legal systems and information are assigned.",
    "Security policies and standards governing legal information are documented and accessible.",
    "Security risks to confidential legal information are assessed and reviewed regularly.",
    "Access, authentication, and other security controls are measured against defined requirements.",
    "Security logs, approvals, and control evidence are retained for independent review.",
    "Personnel receive role-appropriate security and confidentiality training.",
    "Security incidents and suspected compromises follow a documented escalation path.",
    "Security remediation actions are assigned, dated, prioritised, and verified after completion.",
  ],
  data: [
    "Ownership is assigned for the quality, classification, and lifecycle of legal data.",
    "Data definitions, handling standards, and retention requirements are documented.",
    "Data risks, including confidentiality, integrity, availability, and privacy risks, are reviewed.",
    "Data quality and access processes are measured against agreed service expectations.",
    "Key data sources, lineage, and evidence of review can be independently checked.",
    "Users receive guidance on handling, sharing, retaining, and disposing of legal information.",
    "Data incidents, quality exceptions, and unauthorised access concerns have defined escalation routes.",
    "Data improvement actions have accountable owners, target dates, and follow-up evidence.",
  ],
  technology: [
    "Ownership is assigned for the legal technology portfolio and critical operational services.",
    "Technology standards, procedures, and service requirements are documented and accessible.",
    "Technology and supplier risks are identified, assessed, and reviewed on a defined cadence.",
    "Service performance, availability, and operational outcomes are measured against agreed targets.",
    "Configuration, change, service, and supplier records are retained for independent review.",
    "Technology users and administrators receive guidance appropriate to their responsibilities.",
    "Operational incidents, changes, and service exceptions follow defined escalation routes.",
    "Technology improvement actions are prioritised, assigned, dated, and reviewed for effectiveness.",
  ],
  client: [
    "Client service ownership and accountability are clearly defined for the legal function.",
    "Client service standards, communication expectations, and intake procedures are documented.",
    "Client, matter, and service-delivery risks are identified and reviewed regularly.",
    "Client experience and service outcomes are measured against agreed expectations.",
    "Matter, request, feedback, and service evidence is retained and independently reviewable.",
    "Staff receive guidance on client communication, service quality, and professional responsibilities.",
    "Client complaints, conflicts, delays, and service exceptions have defined escalation routes.",
    "Client-service improvements have owners, target dates, and documented follow-up.",
  ],
} as const

export function calculateGuidedDomainScores(responses: GuidedAssessmentResponses): Record<string, number> {
  return Object.fromEntries(
    GUIDED_DOMAINS.map((domain) => {
      const scores = GUIDED_CONTROLS[domain.id].map((_, index) => responses[`${domain.id}-${index}`]?.score).filter(
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
