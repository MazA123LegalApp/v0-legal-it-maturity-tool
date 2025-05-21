export interface AssessmentResult {
  [domainId: string]: {
    people: number
    process: number
    tooling: number
    data: number
    improvement: number
  }
}

export interface Domain {
  id: string
  name: string
  description: string
}

export type Dimension = "people" | "process" | "tooling" | "data" | "improvement"

export const domains: Domain[] = [
  {
    id: "service-management",
    name: "IT Service Management",
    description: "How well IT services are managed and delivered.",
  },
  {
    id: "risk-compliance",
    name: "Risk and Compliance",
    description: "How risks are managed and compliance is ensured.",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "How well the organization is protected against cyber threats.",
  },
  {
    id: "incident-problem",
    name: "Incident and Problem Management",
    description: "How incidents and problems are resolved.",
  },
  {
    id: "continuity-resilience",
    name: "Business Continuity and Resilience",
    description: "How well the organization can recover from disruptions.",
  },
  {
    id: "knowledge-data",
    name: "Knowledge and Data Management",
    description: "How knowledge and data are managed.",
  },
  {
    id: "change-deployment",
    name: "Change and Deployment Management",
    description: "How changes are managed and deployed.",
  },
  {
    id: "infrastructure-tooling",
    name: "Infrastructure and Tooling",
    description: "The maturity of the IT infrastructure and tooling.",
  },
]

export const dimensions = {
  people: {
    name: "People & Organization",
  },
  process: {
    name: "Process",
  },
  tooling: {
    name: "Tooling",
  },
  data: {
    name: "Data",
  },
  improvement: {
    name: "Continual Improvement",
  },
}

// Updated maturity level descriptions
export interface MaturityLevelInfo {
  name: string
  range: string
  description: string
}

export const maturityLevels: MaturityLevelInfo[] = [
  {
    name: "Initial",
    range: "1.0 – 1.9",
    description:
      "No formal structure. Activities are ad hoc, undocumented, or dependent on individuals. Little awareness of governance, risk, or control requirements.",
  },
  {
    name: "Developing",
    range: "2.0 – 2.9",
    description:
      "Basic structures exist, but processes are inconsistently applied. Roles may be loosely defined. Reactive rather than proactive. Tooling may be limited or underutilized.",
  },
  {
    name: "Established",
    range: "3.0 – 3.9",
    description:
      "Roles and processes are clearly defined, documented, and consistently applied. Tooling supports day-to-day operations. Compliance and performance monitoring is in place.",
  },
  {
    name: "Managed",
    range: "4.0 – 4.4",
    description:
      "Processes are standardized and measured. Improvements are data-driven. Tools are integrated. Cross-functional coordination is active. Risk and resilience are actively managed.",
  },
  {
    name: "Optimized",
    range: "4.5 – 5.0",
    description:
      "Industry-leading practices. Continuous improvement is embedded. Automation, analytics, and risk forecasting are leveraged. The domain drives business value and resilience.",
  },
]

export const getEmptyResults = (): AssessmentResult => {
  const emptyResults: AssessmentResult = {}
  domains.forEach((domain) => {
    emptyResults[domain.id] = {
      people: 0,
      process: 0,
      tooling: 0,
      data: 0,
      improvement: 0,
    }
  })
  return emptyResults
}

export const calculateDomainAverages = (results: AssessmentResult): Record<string, number> => {
  const domainAverages: Record<string, number> = {}

  domains.forEach((domain) => {
    const domainResult = results[domain.id]
    if (domainResult) {
      const totalScore =
        domainResult.people + domainResult.process + domainResult.tooling + domainResult.data + domainResult.improvement
      domainAverages[domain.id] = totalScore / 5
    } else {
      domainAverages[domain.id] = 0
    }
  })

  return domainAverages
}

export const calculateDimensionAverages = (results: AssessmentResult): Record<string, number> => {
  const dimensionAverages: Record<string, number> = {
    people: 0,
    process: 0,
    tooling: 0,
    data: 0,
    improvement: 0,
  }

  let peopleCount = 0
  let processCount = 0
  let toolingCount = 0
  let dataCount = 0
  let improvementCount = 0

  domains.forEach((domain) => {
    const domainResult = results[domain.id]
    if (domainResult) {
      dimensionAverages.people += domainResult.people
      dimensionAverages.process += domainResult.process
      dimensionAverages.tooling += domainResult.tooling
      dimensionAverages.data += domainResult.data
      dimensionAverages.improvement += domainResult.improvement

      peopleCount++
      processCount++
      toolingCount++
      dataCount++
      improvementCount++
    }
  })

  if (peopleCount > 0) dimensionAverages.people /= peopleCount
  if (processCount > 0) dimensionAverages.process /= processCount
  if (toolingCount > 0) dimensionAverages.tooling /= toolingCount
  if (dataCount > 0) dimensionAverages.data /= dataCount
  if (improvementCount > 0) dimensionAverages.improvement /= improvementCount

  return dimensionAverages
}

export const calculateOverallAverage = (results: AssessmentResult): number => {
  const domainAverages = calculateDomainAverages(results)
  let totalScore = 0
  let validDomainCount = 0

  Object.values(domainAverages).forEach((score) => {
    if (score > 0) {
      totalScore += score
      validDomainCount++
    }
  })

  return validDomainCount > 0 ? totalScore / validDomainCount : 0
}

// Updated maturity level function with new thresholds
export const getMaturityLevel = (score: number): string => {
  if (score < 2.0) return "Initial"
  if (score < 3.0) return "Developing"
  if (score < 4.0) return "Established"
  if (score < 4.5) return "Managed"
  return "Optimized"
}

export const getMaturityColor = (score: number): string => {
  if (score < 2.0) return "text-red-500"
  if (score < 3.0) return "text-orange-500"
  if (score < 4.0) return "text-amber-500"
  if (score < 4.5) return "text-blue-500"
  return "text-green-500"
}

export const getMaturityBgColor = (score: number): string => {
  if (score < 2.0) return "bg-red-50"
  if (score < 3.0) return "bg-orange-50"
  if (score < 4.0) return "bg-amber-50"
  if (score < 4.5) return "bg-blue-50"
  return "bg-green-50"
}

// New function to get the maturity level description
export const getMaturityLevelDescription = (score: number): string => {
  const level = getMaturityLevel(score)
  const levelInfo = maturityLevels.find((l) => l.name === level)
  return levelInfo ? levelInfo.description : ""
}
