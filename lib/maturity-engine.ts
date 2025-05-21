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
 * Gets the URL for a band-specific implementation guide
 */
export function getImplementationGuideUrl(domainId: string, band: MaturityBand): string {
  const baseUrl = domainPlaybookUrls[domainId]
  if (!baseUrl) return "/playbook"

  return `${baseUrl}/${band.toLowerCase()}`
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
        {
          name: "MFA Configuration Starter Guide",
          description: "Guide for implementing basic multi-factor authentication",
          fileType: "pdf",
          url: "/templates/cybersecurity/mfa-starter-guide.pdf",
        },
        {
          name: "System Inventory & Access Sheet",
          description: "Template for documenting systems and access rights",
          fileType: "xlsx",
          url: "/templates/cybersecurity/system-inventory.xlsx",
        },
        {
          name: "Security Awareness Email Drafts",
          description: "Ready-to-use email templates for security awareness",
          fileType: "docx",
          url: "/templates/cybersecurity/awareness-emails.docx",
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
        {
          name: "Logging Coverage Worksheet",
          description: "Template for documenting logging requirements across systems",
          fileType: "xlsx",
          url: "/templates/cybersecurity/logging-coverage-worksheet.xlsx",
        },
        {
          name: "User Access Review Tracker",
          description: "Spreadsheet for tracking and reviewing user access rights",
          fileType: "xlsx",
          url: "/templates/cybersecurity/user-access-review.xlsx",
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
        {
          name: "Logging & Monitoring Configuration Workbook",
          description: "Guide for setting up centralized logging and monitoring",
          fileType: "xlsx",
          url: "/templates/cybersecurity/logging-monitoring-config.xlsx",
        },
        {
          name: "Cyber Risk Assessment Template",
          description: "Template for conducting a comprehensive cybersecurity risk assessment",
          fileType: "docx",
          url: "/templates/cybersecurity/risk-assessment.docx",
        },
        {
          name: "Zero Trust Design Checklist",
          description: "Checklist for implementing Zero Trust architecture principles",
          fileType: "pdf",
          url: "/templates/cybersecurity/zero-trust-checklist.pdf",
        },
        {
          name: "Security Policy Framework Template",
          description: "Template for creating a comprehensive security policy framework",
          fileType: "docx",
          url: "/templates/cybersecurity/policy-framework.docx",
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
        {
          name: "SOAR Workflow Configuration Guide",
          description: "Guide for setting up automated security workflows",
          fileType: "pdf",
          url: "/templates/cybersecurity/soar-workflow-guide.pdf",
        },
        {
          name: "Zero Trust Segmentation Plan",
          description: "Template for planning network segmentation based on Zero Trust principles",
          fileType: "docx",
          url: "/templates/cybersecurity/zero-trust-segmentation.docx",
        },
        {
          name: "DLP Policy Deployment Framework",
          description: "Framework for implementing Data Loss Prevention policies",
          fileType: "docx",
          url: "/templates/cybersecurity/dlp-framework.docx",
        },
        {
          name: "Third-Party Security Risk Register",
          description: "Template for tracking and managing vendor security risks",
          fileType: "xlsx",
          url: "/templates/cybersecurity/vendor-risk-register.xlsx",
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
        {
          name: "Red Team Exercise Planning Guide",
          description: "Guide for planning and executing red team exercises",
          fileType: "pdf",
          url: "/templates/cybersecurity/red-team-guide.pdf",
        },
        {
          name: "Threat Sharing & Collaboration Agreement Template",
          description: "Template for establishing threat intelligence sharing agreements",
          fileType: "docx",
          url: "/templates/cybersecurity/threat-sharing-agreement.docx",
        },
        {
          name: "Cybersecurity KPI Benchmark Workbook",
          description: "Workbook for tracking and benchmarking security metrics",
          fileType: "xlsx",
          url: "/templates/cybersecurity/kpi-benchmark.xlsx",
        },
        {
          name: "Cybersecurity Training Kit for Champions",
          description: "Training materials for cybersecurity champions program",
          fileType: "zip",
          url: "/templates/cybersecurity/champions-training-kit.zip",
        },
      ],
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
        {
          name: "Risk Log Template (Beginner)",
          description: "Simple risk register for tracking basic risks",
          fileType: "xlsx",
          url: "/templates/risk-compliance/basic-risk-register.xlsx",
        },
        {
          name: "Risk & Compliance Roles Overview",
          description: "Template for defining compliance responsibilities",
          fileType: "docx",
          url: "/templates/risk-compliance/compliance-roles.docx",
        },
      ],
      Developing: [
        {
          name: "Compliance Obligation Register (Starter Format)",
          description: "Comprehensive register for tracking compliance requirements",
          fileType: "xlsx",
          url: "/templates/risk-compliance/compliance-register.xlsx",
        },
        {
          name: "Policy Register & Review Schedule",
          description: "Template for managing policy review cycles",
          fileType: "xlsx",
          url: "/templates/risk-compliance/policy-review-schedule.xlsx",
        },
        {
          name: "Internal Audit Readiness Checklist",
          description: "Checklist for preparing for internal or client audits",
          fileType: "xlsx",
          url: "/templates/risk-compliance/audit-readiness.xlsx",
        },
        {
          name: "Simple Risk Tracker (Excel)",
          description: "Intermediate risk register with assessment capabilities",
          fileType: "xlsx",
          url: "/templates/risk-compliance/risk-tracker.xlsx",
        },
      ],
      Established: [
        {
          name: "Risk & Compliance Committee Charter",
          description: "Template for establishing a formal governance committee",
          fileType: "docx",
          url: "/templates/risk-compliance/committee-charter.docx",
        },
        {
          name: "Comprehensive Risk Assessment Framework",
          description: "Structured methodology for assessing and scoring risks",
          fileType: "xlsx",
          url: "/templates/risk-compliance/risk-assessment-framework.xlsx",
        },
        {
          name: "Policy Hierarchy Template",
          description: "Framework for organizing policies, standards, and procedures",
          fileType: "docx",
          url: "/templates/risk-compliance/policy-hierarchy.docx",
        },
        {
          name: "Compliance Monitoring Program Guide",
          description: "Guide for implementing a structured compliance monitoring program",
          fileType: "pdf",
          url: "/templates/risk-compliance/compliance-monitoring-guide.pdf",
        },
        {
          name: "Vendor Risk Assessment Toolkit",
          description: "Templates and tools for assessing and managing vendor risks",
          fileType: "zip",
          url: "/templates/risk-compliance/vendor-risk-toolkit.zip",
        },
      ],
      Managed: [
        {
          name: "GRC System Integration Map",
          description: "Template for planning GRC tool integration with other systems",
          fileType: "xlsx",
          url: "/templates/risk-compliance/grc-integration-map.xlsx",
        },
        {
          name: "Compliance KPI Dashboard Guide",
          description: "Guide for creating effective compliance dashboards",
          fileType: "pptx",
          url: "/templates/risk-compliance/compliance-dashboard.pptx",
        },
        {
          name: "Regulatory Change Tracker",
          description: "Tool for monitoring and responding to regulatory changes",
          fileType: "xlsx",
          url: "/templates/risk-compliance/regulatory-tracker.xlsx",
        },
        {
          name: "Audit Readiness Playbook",
          description: "Comprehensive guide for preparing for and responding to audits",
          fileType: "docx",
          url: "/templates/risk-compliance/audit-playbook.docx",
        },
      ],
      Optimized: [
        {
          name: "Predictive Risk Analytics Workbook",
          description: "Templates and models for implementing predictive risk analytics",
          fileType: "xlsx",
          url: "/templates/risk-compliance/predictive-analytics.xlsx",
        },
        {
          name: "Strategic Risk Governance Scorecard",
          description: "Tool for aligning risk management with strategic objectives",
          fileType: "xlsx",
          url: "/templates/risk-compliance/governance-scorecard.xlsx",
        },
        {
          name: "Compliance Program Benchmarking Tool",
          description: "Framework for benchmarking against industry standards",
          fileType: "xlsx",
          url: "/templates/risk-compliance/benchmarking-tool.xlsx",
        },
        {
          name: "Policy Culture & Engagement Toolkit",
          description: "Resources for building a strong compliance culture",
          fileType: "zip",
          url: "/templates/risk-compliance/culture-toolkit.zip",
        },
      ],
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
