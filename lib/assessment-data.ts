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

// Add back the dimensionDetails export
export interface LevelDescription {
  level: number
  title: string
  description: string
  examples: string[]
}

export interface DimensionDetails {
  name: string
  description: string
  levels: LevelDescription[]
}

// Export the dimensionDetails object
export const dimensionDetails: Record<Dimension, DimensionDetails> = {
  people: {
    name: "People & Organization",
    description: "Maturity of roles, responsibilities, skills, and organizational structure.",
    levels: [
      {
        level: 1,
        title: "Initial",
        description: "Ad-hoc, undefined roles and responsibilities",
        examples: [
          "No defined IT roles or responsibilities",
          "Skills are not documented or managed",
          "No training or development plans",
          "Reactive staffing with no planning",
        ],
      },
      {
        level: 2,
        title: "Developing",
        description: "Basic roles defined but inconsistent",
        examples: [
          "Basic roles and responsibilities documented",
          "Some skills tracking but not comprehensive",
          "Occasional training but not structured",
          "Basic staffing plans exist",
        ],
      },
      {
        level: 3,
        title: "Established",
        description: "Clear roles and responsibilities documented",
        examples: [
          "Formal organizational structure with clear reporting lines",
          "Comprehensive skills matrix maintained",
          "Regular training and development programs",
          "Succession planning for key roles",
        ],
      },
      {
        level: 4,
        title: "Managed",
        description: "Roles optimized with performance metrics",
        examples: [
          "Performance metrics for all roles",
          "Skills gaps actively managed with data",
          "Training effectiveness measured",
          "Resource allocation optimized based on metrics",
        ],
      },
      {
        level: 5,
        title: "Optimized",
        description: "Continuous improvement of organizational structure",
        examples: [
          "Organizational structure regularly reviewed and optimized",
          "Proactive skills development aligned with future needs",
          "Culture of continuous learning and improvement",
          "Innovative approaches to talent management",
        ],
      },
    ],
  },
  process: {
    name: "Process",
    description: "Maturity of processes, procedures, and workflows.",
    levels: [
      {
        level: 1,
        title: "Initial",
        description: "Ad-hoc, undocumented processes",
        examples: [
          "Processes are not documented",
          "Different approaches used each time",
          "No standardization across teams",
          "Reactive process execution",
        ],
      },
      {
        level: 2,
        title: "Developing",
        description: "Basic processes defined but inconsistent",
        examples: [
          "Some processes documented",
          "Basic workflows established",
          "Inconsistent adherence to processes",
          "Limited process ownership",
        ],
      },
      {
        level: 3,
        title: "Established",
        description: "Standardized processes documented and followed",
        examples: [
          "Comprehensive process documentation",
          "Consistent implementation across teams",
          "Clear process ownership and governance",
          "Regular process reviews",
        ],
      },
      {
        level: 4,
        title: "Managed",
        description: "Processes measured and controlled",
        examples: [
          "Process performance metrics defined and tracked",
          "Statistical analysis of process effectiveness",
          "Proactive process controls",
          "Data-driven process improvements",
        ],
      },
      {
        level: 5,
        title: "Optimized",
        description: "Continuous process improvement",
        examples: [
          "Systematic approach to process innovation",
          "Automated process improvement identification",
          "Benchmarking against industry best practices",
          "Processes continuously adapted to changing needs",
        ],
      },
    ],
  },
  tooling: {
    name: "Tooling",
    description: "Maturity of tools, systems, and technology used.",
    levels: [
      {
        level: 1,
        title: "Initial",
        description: "Basic or manual tools with limited functionality",
        examples: [
          "Manual processes with minimal tooling",
          "Spreadsheets and basic applications",
          "No integration between tools",
          "Ad-hoc tool selection",
        ],
      },
      {
        level: 2,
        title: "Developing",
        description: "Tools in place but not integrated",
        examples: [
          "Dedicated tools for key functions",
          "Limited automation of routine tasks",
          "Tools selected based on requirements",
          "Basic tool documentation",
        ],
      },
      {
        level: 3,
        title: "Established",
        description: "Standardized tools with some integration",
        examples: [
          "Standardized toolset across the organization",
          "Some integration between systems",
          "Formal tool selection process",
          "Regular tool updates and maintenance",
        ],
      },
      {
        level: 4,
        title: "Managed",
        description: "Integrated tools with analytics",
        examples: [
          "Comprehensive tool integration",
          "Advanced automation of processes",
          "Tool usage metrics and optimization",
          "Predictive analytics capabilities",
        ],
      },
      {
        level: 5,
        title: "Optimized",
        description: "Advanced tools with automation and continuous improvement",
        examples: [
          "AI-enhanced tooling and automation",
          "Continuous tool evaluation and improvement",
          "Proactive adoption of emerging technologies",
          "Tools that adapt to changing business needs",
        ],
      },
    ],
  },
  data: {
    name: "Data",
    description: "Maturity of data management, quality, and analytics.",
    levels: [
      {
        level: 1,
        title: "Initial",
        description: "Ad-hoc data collection with no formal management",
        examples: [
          "No data governance or standards",
          "Data stored in silos",
          "Inconsistent data formats",
          "Manual data collection and reporting",
        ],
      },
      {
        level: 2,
        title: "Developing",
        description: "Basic data management but inconsistent quality",
        examples: [
          "Basic data standards defined",
          "Some data quality checks",
          "Manual reporting with some automation",
          "Limited data sharing between teams",
        ],
      },
      {
        level: 3,
        title: "Established",
        description: "Standardized data management practices",
        examples: [
          "Formal data governance framework",
          "Consistent data quality standards",
          "Centralized data repositories",
          "Regular data quality reviews",
        ],
      },
      {
        level: 4,
        title: "Managed",
        description: "Data-driven decision making with analytics",
        examples: [
          "Advanced analytics capabilities",
          "Automated data quality monitoring",
          "Data-driven decision making",
          "Predictive data modeling",
        ],
      },
      {
        level: 5,
        title: "Optimized",
        description: "Advanced analytics with continuous data quality improvement",
        examples: [
          "AI/ML-powered data analytics",
          "Real-time data processing and insights",
          "Continuous data quality improvement",
          "Data as a strategic asset",
        ],
      },
    ],
  },
  improvement: {
    name: "Continual Improvement",
    description: "Maturity of improvement processes, feedback loops, and innovation.",
    levels: [
      {
        level: 1,
        title: "Initial",
        description: "Reactive improvements with no formal process",
        examples: [
          "Improvements only after failures",
          "No systematic approach to improvement",
          "Limited feedback collection",
          "No innovation program",
        ],
      },
      {
        level: 2,
        title: "Developing",
        description: "Basic improvement processes but inconsistent",
        examples: [
          "Some improvement initiatives",
          "Basic feedback mechanisms",
          "Occasional innovation activities",
          "Limited measurement of improvements",
        ],
      },
      {
        level: 3,
        title: "Established",
        description: "Standardized improvement processes with feedback loops",
        examples: [
          "Formal improvement methodology",
          "Regular feedback collection and analysis",
          "Structured innovation program",
          "Improvement metrics defined",
        ],
      },
      {
        level: 4,
        title: "Managed",
        description: "Measured improvement with metrics",
        examples: [
          "Comprehensive improvement metrics",
          "Data-driven improvement prioritization",
          "Innovation performance tracking",
          "Systematic approach to experiments",
        ],
      },
      {
        level: 5,
        title: "Optimized",
        description: "Culture of continuous improvement and innovation",
        examples: [
          "Improvement embedded in organizational culture",
          "Proactive identification of improvement opportunities",
          "Innovation as a core competency",
          "Continuous adaptation to changing environment",
        ],
      },
    ],
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
