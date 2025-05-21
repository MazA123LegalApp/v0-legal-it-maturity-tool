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

/**
 * Maps domain IDs to playbook URLs
 */
export const domainPlaybookUrls: Record<string, string> = {
  cybersecurity: "/playbook/domains/cybersecurity",
  "risk-compliance": "/playbook/domains/risk-compliance",
  "incident-problem": "/playbook/domains/incident-management",
  "continuity-resilience": "/playbook/domains/service-continuity",
  "knowledge-data": "/playbook/domains/knowledge-governance",
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
      ],
      Developing: [
        {
          name: "MFA Rollout Checklist",
          description: "Step-by-step guide for implementing multi-factor authentication",
          fileType: "xlsx",
          url: "/templates/cybersecurity/mfa-rollout-checklist.xlsx",
        },
        {
          name: "Incident Response Policy Starter",
          description: "Template for creating a basic incident response policy",
          fileType: "docx",
          url: "/templates/cybersecurity/incident-response-policy.docx",
        },
      ],
      Established: [
        {
          name: "Vulnerability Management Process",
          description: "Comprehensive vulnerability management process documentation",
          fileType: "docx",
          url: "/templates/cybersecurity/vulnerability-management-process.docx",
        },
        {
          name: "Security Controls Matrix",
          description: "Matrix mapping security controls to compliance requirements",
          fileType: "xlsx",
          url: "/templates/cybersecurity/security-controls-matrix.xlsx",
        },
      ],
      Managed: [
        {
          name: "Threat Intelligence Program Guide",
          description: "Guide for establishing a threat intelligence program",
          fileType: "pdf",
          url: "/templates/cybersecurity/threat-intelligence-program.pdf",
        },
        {
          name: "Security Metrics Dashboard",
          description: "Template for creating a security metrics dashboard",
          fileType: "xlsx",
          url: "/templates/cybersecurity/security-metrics-dashboard.xlsx",
        },
      ],
      Optimized: [
        {
          name: "Zero Trust Implementation Roadmap",
          description: "Detailed roadmap for implementing Zero Trust architecture",
          fileType: "pdf",
          url: "/templates/cybersecurity/zero-trust-roadmap.pdf",
        },
        {
          name: "Advanced Security Program Assessment",
          description: "Tool for assessing and optimizing security program effectiveness",
          fileType: "xlsx",
          url: "/templates/cybersecurity/advanced-security-assessment.xlsx",
        },
      ],
    },
    // Add similar template structures for other domains
    "risk-compliance": {
      Initial: [
        {
          name: "Basic Risk Register Template",
          description: "Simple risk register for tracking basic risks",
          fileType: "xlsx",
          url: "/templates/risk-compliance/basic-risk-register.xlsx",
        },
      ],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    // Default empty arrays for other domains and bands
    "incident-problem": {
      Initial: [],
      Developing: [],
      Established: [],
      Managed: [],
      Optimized: [],
    },
    "continuity-resilience": {
      Initial: [],
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
