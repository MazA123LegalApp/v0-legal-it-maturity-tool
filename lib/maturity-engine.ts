import type { AssessmentResult, Dimension } from "./assessment-data"

// Maturity band types
export type MaturityBand = "Initial" | "Developing" | "Established" | "Managed" | "Optimized"

// Domain score with classification
export interface DomainScore {
  domain: string
  score: number
  band: MaturityBand
  subdomainScores: Record<Dimension, number>
}

// Complete assessment classification
export interface MaturityClassification {
  overallScore: number
  overallBand: MaturityBand
  domainScores: Record<string, DomainScore>
  weakestDomains: DomainScore[]
  strongestDomains: DomainScore[]
}

/**
 * Classifies a score into a maturity band
 */
export function getMaturityBand(score: number): MaturityBand {
  if (score < 2.0) return "Initial"
  if (score < 3.0) return "Developing"
  if (score < 4.0) return "Established"
  if (score < 4.5) return "Managed"
  return "Optimized"
}

/**
 * Calculates the domain score from subdomain scores
 */
export function calculateDomainScore(subdomainScores: Record<Dimension, number>): number {
  const dimensions: Dimension[] = ["people", "process", "tooling", "data", "improvement"]
  const total = dimensions.reduce((sum, dimension) => sum + (subdomainScores[dimension] || 0), 0)
  return total / dimensions.length
}

/**
 * Processes assessment results into a complete maturity classification
 */
export function classifyMaturity(results: AssessmentResult): MaturityClassification {
  const domainScores: Record<string, DomainScore> = {}
  let totalScore = 0
  let validDomainCount = 0

  // Calculate scores for each domain
  Object.keys(results).forEach((domainId) => {
    const subdomainScores = results[domainId]
    if (subdomainScores) {
      const score = calculateDomainScore(subdomainScores)

      if (score > 0) {
        totalScore += score
        validDomainCount++
      }

      domainScores[domainId] = {
        domain: domainId,
        score,
        band: getMaturityBand(score),
        subdomainScores,
      }
    }
  })

  // Calculate overall score
  const overallScore = validDomainCount > 0 ? totalScore / validDomainCount : 0
  const overallBand = getMaturityBand(overallScore)

  // Sort domains by score for weakest/strongest
  const sortedDomains = Object.values(domainScores).sort((a, b) => a.score - b.score)
  const weakestDomains = sortedDomains.slice(0, 3).filter((domain) => domain.score > 0)
  const strongestDomains = sortedDomains
    .reverse()
    .slice(0, 3)
    .filter((domain) => domain.score > 0)

  return {
    overallScore,
    overallBand,
    domainScores,
    weakestDomains,
    strongestDomains,
  }
}

// Domain URL mapping for consistent URL construction
export const domainUrlMapping: Record<string, string> = {
  cybersecurity: "cybersecurity",
  "risk-compliance": "risk-compliance",
  "service-management": "service-management",
  "incident-problem": "incident-problem",
  "knowledge-data": "knowledge-data",
  "change-deployment": "change-deployment",
  "infrastructure-tooling": "infrastructure-tooling",
  "continuity-resilience": "continuity-resilience",
}

export const maturityBandUrlMapping: Record<MaturityBand, string> = {
  Initial: "initial",
  Developing: "developing",
  Established: "established",
  Managed: "managed",
  Optimized: "optimized",
}

/**
 * Maps domain IDs to playbook URLs
 */
export const domainPlaybookUrls: Record<string, string> = {
  cybersecurity: "/playbook/domains/cybersecurity",
  "risk-compliance": "/playbook/domains/risk-compliance",
  "incident-problem": "/playbook/domains/incident-problem",
  "continuity-resilience": "/playbook/domains/continuity-resilience",
  "knowledge-data": "/playbook/domains/knowledge-data",
  "change-deployment": "/playbook/domains/change-deployment",
  "infrastructure-tooling": "/playbook/domains/infrastructure-tooling",
  "service-management": "/playbook/domains/service-management",
}

/**
 * Gets the URL for a specific domain and maturity band
 */
export function getPlaybookUrlForDomain(domainId: string, band: MaturityBand): string {
  const baseUrl = domainPlaybookUrls[domainId]
  if (!baseUrl) return "/playbook"

  return `${baseUrl}#${band.toLowerCase()}`
}

/**
 * Gets the URL for a band-specific implementation guide
 */
export function getImplementationGuideUrl(domainId: string, band: MaturityBand): string {
  const baseUrl = domainPlaybookUrls[domainId]
  if (!baseUrl) return "/playbook"

  const bandLower = maturityBandUrlMapping[band] || band.toLowerCase()
  return `${baseUrl}/${bandLower}`
}

/**
 * Gets downloadable templates for a domain and maturity band
 */
export interface Template {
  name: string
  description: string
  fileType: string
  url: string
}

export function getTemplatesForDomain(domainId: string, band: MaturityBand): Template[] {
  // This would ideally come from a database or API
  // For now, we'll return some sample templates based on domain and band

  const templates: Record<string, Record<MaturityBand, Template[]>> = {
    cybersecurity: {
      Initial: [
        {
          name: "Basic Security Policy Template",
          description: "Starter security policy for organizations at the Initial maturity level",
          fileType: "docx",
          url: "/templates/cybersecurity/initial-security-policy.docx",
        },
        {
          name: "Security Awareness Training Slides",
          description: "Basic security awareness training materials",
          fileType: "pptx",
          url: "/templates/cybersecurity/security-awareness-training.pptx",
        },
        {
          name: "Basic Incident Response Plan Template",
          description: "Simple template for documenting incident response procedures",
          fileType: "docx",
          url: "/templates/cybersecurity/basic-incident-response.docx",
        },
      ],
      Developing: [
        {
          name: "MFA Rollout Checklist",
          description: "Step-by-step guide for implementing multi-factor authentication",
          fileType: "xlsx",
          url: "/templates/cybersecurity/mfa-rollout-checklist.xlsx",
        },
        {
          name: "Incident Response Plan Starter",
          description: "Template for creating a basic incident response policy",
          fileType: "docx",
          url: "/templates/cybersecurity/incident-response-policy.docx",
        },
      ],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "risk-compliance": {
      Initial: [
        {
          name: "Basic Policy Register",
          description: "Simple template for tracking policies and their status",
          fileType: "xlsx",
          url: "/templates/risk-compliance/basic-policy-register.xlsx",
        },
        {
          name: "Compliance Obligations Discovery Sheet",
          description: "Template for identifying and documenting compliance requirements",
          fileType: "xlsx",
          url: "/templates/risk-compliance/compliance-discovery.xlsx",
        },
      ],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "incident-problem": {
      Initial: [
        {
          name: "Basic Incident Log Template",
          description: "Excel template for tracking incidents",
          fileType: "xlsx",
          url: "/templates/incident-problem/basic-incident-log.xlsx",
        },
        {
          name: "Incident Severity Classification Chart",
          description: "Guide for classifying incident severity",
          fileType: "pdf",
          url: "/templates/incident-problem/severity-classification.pdf",
        },
        {
          name: "Escalation Flow Template",
          description: "Visual guide for incident escalation",
          fileType: "pdf",
          url: "/templates/incident-problem/escalation-flow.pdf",
        },
        {
          name: "Repeat Incident Tracker",
          description: "Template for tracking recurring issues",
          fileType: "xlsx",
          url: "/templates/incident-problem/repeat-incident-tracker.xlsx",
        },
      ],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "continuity-resilience": {
      Initial: [
        {
          name: "Critical Systems Inventory Worksheet",
          description: "Template for documenting critical systems",
          fileType: "xlsx",
          url: "/templates/continuity-resilience/critical-systems-inventory.xlsx",
        },
        {
          name: "Basic BCP Template",
          description: "Simple business continuity plan template",
          fileType: "docx",
          url: "/templates/continuity-resilience/basic-bcp.docx",
        },
        {
          name: "Continuity Roles & Contacts Sheet",
          description: "Template for documenting continuity roles and contacts",
          fileType: "xlsx",
          url: "/templates/continuity-resilience/continuity-roles.xlsx",
        },
        {
          name: "Tabletop Exercise Script",
          description: "Guide for conducting a tabletop exercise",
          fileType: "docx",
          url: "/templates/continuity-resilience/tabletop-exercise.docx",
        },
      ],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "knowledge-data": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "change-deployment": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "infrastructure-tooling": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "service-management": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
  }

  return templates[domainId]?.[band] || []
}
