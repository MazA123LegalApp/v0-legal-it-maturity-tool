export interface ControlMatrixItem {
  Domain: string
  Playbook_Action_ID: string
  "Playbook Action": string
  EO_14028_Reference: string
  OMB_M22_09_Pillar: string
  NIST_CSF: string
  Evidence_Template: string
  KPI: string
  ISO_27001_AnnexA: string
  status?: "not_started" | "in_progress" | "completed"
  priority?: "low" | "medium" | "high" | "critical"
  Band_Min?: number // Minimum maturity band for this action
  execution_effort?: "low" | "medium" | "high"
  quick_win?: boolean
}

export async function fetchControlMatrix(): Promise<ControlMatrixItem[]> {
  try {
    const response = await fetch("/data/Legal_Playbook_Control_Matrix_with_ISO_ASCII.csv")
    const csvText = await response.text()

    // Parse CSV manually
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    const data: ControlMatrixItem[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // Handle CSV parsing with quoted fields
      const values = parseCSVLine(line)
      if (values.length === headers.length) {
        const item: any = {}
        headers.forEach((header, index) => {
          item[header] = values[index]?.trim().replace(/"/g, "") || ""
        })

        // Add enhanced metadata
        item.status = getStoredStatus(item.Playbook_Action_ID) || "not_started"
        item.priority = determinePriority(item)
        item.Band_Min = determineBandMin(item)
        item.execution_effort = determineExecutionEffort(item)
        item.quick_win = isQuickWin(item)

        data.push(item as ControlMatrixItem)
      }
    }

    return data
  } catch (error) {
    console.error("Error fetching control matrix:", error)
    return []
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

function determineBandMin(item: ControlMatrixItem): number {
  const action = item["Playbook Action"].toLowerCase()
  const kpi = item.KPI.toLowerCase()

  // Advanced controls require higher maturity
  if (action.includes("advanced") || action.includes("automated") || kpi.includes(">=99.9")) {
    return 4 // Managed level
  }

  // Intermediate controls
  if (action.includes("dashboard") || action.includes("monitoring") || kpi.includes(">=99")) {
    return 3 // Established level
  }

  // Basic foundational controls
  if (action.includes("policy") || action.includes("document") || action.includes("basic")) {
    return 1 // Initial level
  }

  // Default to developing level
  return 2
}

function determineExecutionEffort(item: ControlMatrixItem): "low" | "medium" | "high" {
  const action = item["Playbook Action"].toLowerCase()

  if (action.includes("document") || action.includes("policy") || action.includes("review")) {
    return "low"
  }

  if (action.includes("implement") || action.includes("deploy") || action.includes("configure")) {
    return "medium"
  }

  if (action.includes("integrate") || action.includes("automate") || action.includes("advanced")) {
    return "high"
  }

  return "medium"
}

function isQuickWin(item: ControlMatrixItem): boolean {
  const action = item["Playbook Action"].toLowerCase()
  const hasMultipleFrameworks =
    [item.NIST_CSF, item.ISO_27001_AnnexA, item.EO_14028_Reference].filter(Boolean).length > 1

  // Quick wins: high impact, low effort
  return (
    (action.includes("mfa") || action.includes("password") || action.includes("backup")) &&
    hasMultipleFrameworks &&
    determineExecutionEffort(item) === "low"
  )
}

function determinePriority(item: ControlMatrixItem): "low" | "medium" | "high" | "critical" {
  const kpi = item.KPI.toLowerCase()
  const hasEO = !!item.EO_14028_Reference
  const hasMultipleFrameworks =
    [item.NIST_CSF, item.ISO_27001_AnnexA, item.EO_14028_Reference].filter(Boolean).length > 1

  // Critical: Executive Order requirements with high KPIs
  if (hasEO && (kpi.includes("100%") || kpi.includes("mfa") || kpi.includes("privileged"))) {
    return "critical"
  }

  // High: Multiple framework mappings or high availability requirements
  if (hasMultipleFrameworks || kpi.includes(">=99")) {
    return "high"
  }

  // Medium: Single framework mapping
  if (item.EO_14028_Reference || item.NIST_CSF || item.ISO_27001_AnnexA) {
    return "medium"
  }

  return "low"
}

function getStoredStatus(actionId: string): "not_started" | "in_progress" | "completed" | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(`control_status_${actionId}`)
    return stored as "not_started" | "in_progress" | "completed" | null
  } catch {
    return null
  }
}

export function updateControlStatus(actionId: string, status: "not_started" | "in_progress" | "completed") {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(`control_status_${actionId}`, status)

    // Trigger a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("controlStatusUpdated", {
        detail: { actionId, status },
      }),
    )
  } catch (error) {
    console.error("Error saving control status:", error)
  }
}

// Enhanced filtering functions
export function getControlMatrixByDomainAndBand(
  data: ControlMatrixItem[],
  domainName: string,
  maxBand = 5,
): ControlMatrixItem[] {
  return data.filter((item) => {
    const domainMatch =
      item.Domain.toLowerCase().includes(domainName.toLowerCase()) ||
      domainName.toLowerCase().includes(item.Domain.toLowerCase())
    const bandMatch = (item.Band_Min || 1) <= maxBand

    return domainMatch && bandMatch
  })
}

export function getRecommendedActionsForDomains(
  data: ControlMatrixItem[],
  lowScoreDomains: Array<{ name: string; score: number; band: string }>,
): ControlMatrixItem[] {
  const bandToNumber = {
    Initial: 1,
    Developing: 2,
    Established: 3,
    Managed: 4,
    Optimized: 5,
  }

  let recommendedActions: ControlMatrixItem[] = []

  lowScoreDomains.forEach((domain) => {
    const maxBand = bandToNumber[domain.band as keyof typeof bandToNumber] || 2
    const domainActions = getControlMatrixByDomainAndBand(data, domain.name, maxBand)
    recommendedActions = [...recommendedActions, ...domainActions]
  })

  // Remove duplicates and sort by priority
  const uniqueActions = Array.from(new Map(recommendedActions.map((item) => [item.Playbook_Action_ID, item])).values())

  return uniqueActions.sort((a, b) => {
    // Sort by EO criticality first
    const aHasEO = !!a.EO_14028_Reference
    const bHasEO = !!b.EO_14028_Reference

    if (aHasEO && !bHasEO) return -1
    if (!aHasEO && bHasEO) return 1

    // Then by priority
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
    const aPriority = priorityOrder[a.priority || "low"]
    const bPriority = priorityOrder[b.priority || "low"]

    if (aPriority !== bPriority) return bPriority - aPriority

    // Finally by execution effort (easier first)
    const effortOrder = { low: 3, medium: 2, high: 1 }
    const aEffort = effortOrder[a.execution_effort || "medium"]
    const bEffort = effortOrder[b.execution_effort || "medium"]

    return bEffort - aEffort
  })
}

export function getQuickWins(data: ControlMatrixItem[], limit = 5): ControlMatrixItem[] {
  return data.filter((item) => item.quick_win && item.status !== "completed").slice(0, limit)
}

export function getControlMatrixByDomain(data: ControlMatrixItem[], domainName: string): ControlMatrixItem[] {
  return data.filter(
    (item) =>
      item.Domain.toLowerCase().includes(domainName.toLowerCase()) ||
      domainName.toLowerCase().includes(item.Domain.toLowerCase()),
  )
}

export function getUniqueValues(data: ControlMatrixItem[], field: keyof ControlMatrixItem): string[] {
  const values = data.map((item) => item[field]).filter(Boolean)
  return [...new Set(values)].sort()
}

export function getControlStats(data: ControlMatrixItem[]) {
  const total = data.length
  const completed = data.filter((item) => item.status === "completed").length
  const inProgress = data.filter((item) => item.status === "in_progress").length
  const notStarted = data.filter((item) => item.status === "not_started").length
  const critical = data.filter((item) => item.priority === "critical" && item.status === "not_started").length
  const quickWins = data.filter((item) => item.quick_win && item.status === "not_started").length

  return {
    total,
    completed,
    inProgress,
    notStarted,
    critical,
    quickWins,
    completionRate: total > 0 ? (completed / total) * 100 : 0,
  }
}

export function getOMBPillarStats(data: ControlMatrixItem[]) {
  const pillars = getUniqueValues(data, "OMB_M22_09_Pillar")

  return pillars.map((pillar) => {
    const pillarData = data.filter((item) => item.OMB_M22_09_Pillar === pillar)
    const completed = pillarData.filter((item) => item.status === "completed").length
    const total = pillarData.length

    return {
      name: pillar,
      completed,
      total,
      percentage: total > 0 ? (completed / total) * 100 : 0,
    }
  })
}

// Initialize demo data for first-time users
export function initializeDemoData() {
  if (typeof window === "undefined") return

  try {
    const demoInitialized = localStorage.getItem("demo_data_initialized")
    if (demoInitialized) return

    // Set some sample completed actions for demo
    const sampleCompletedActions = ["INF-01", "INF-02", "CYB-01", "SVC-01", "KNO-01"]
    const sampleInProgressActions = ["INF-03", "CYB-02", "RIS-01"]

    sampleCompletedActions.forEach((actionId) => {
      localStorage.setItem(`control_status_${actionId}`, "completed")
    })

    sampleInProgressActions.forEach((actionId) => {
      localStorage.setItem(`control_status_${actionId}`, "in_progress")
    })

    localStorage.setItem("demo_data_initialized", "true")

    // Trigger update event
    window.dispatchEvent(new CustomEvent("controlStatusUpdated"))
  } catch (error) {
    console.error("Error initializing demo data:", error)
  }
}
