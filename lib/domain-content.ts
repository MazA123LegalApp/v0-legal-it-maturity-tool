// Domain content utility functions
import { domains } from "./assessment-data"

export type MaturityBand = "initial" | "developing" | "established" | "managed" | "optimized"

export interface DomainContent {
  title: string
  description: string
  whatThisMeans: string
  priorities: string[]
  templates: string[]
  quickWins: string[]
  relatedLinks: { text: string; href: string }[]
}

// Function to get domain name by ID
export function getDomainNameById(domainId: string): string {
  const domain = domains.find((d) => d.id === domainId)
  return domain ? domain.name : "Unknown Domain"
}

// Function to get domain ID by name
export function getDomainIdByName(domainName: string): string | undefined {
  const domain = domains.find((d) => d.name === domainName)
  return domain ? domain.id : undefined
}

// Function to get maturity band name from score
export function getMaturityBandFromScore(score: number): MaturityBand {
  if (score < 2.0) return "initial"
  if (score < 3.0) return "developing"
  if (score < 4.0) return "established"
  if (score < 4.5) return "managed"
  return "optimized"
}

// Function to get maturity band display name
export function getMaturityBandDisplayName(band: MaturityBand): string {
  switch (band) {
    case "initial":
      return "Initial (1.0–1.9)"
    case "developing":
      return "Developing (2.0–2.9)"
    case "established":
      return "Established (3.0–3.9)"
    case "managed":
      return "Managed (4.0–4.4)"
    case "optimized":
      return "Optimized (4.5–5.0)"
    default:
      return "Unknown"
  }
}

// Function to get domain content placeholder
export function getDomainContentPlaceholder(domainId: string, band: MaturityBand): DomainContent {
  const domainName = getDomainNameById(domainId)
  const bandName = getMaturityBandDisplayName(band)

  return {
    title: `${domainName} — ${bandName}`,
    description: `Implementation guide for ${domainName} at the ${band} maturity level`,
    whatThisMeans: `Your firm is at the ${band} maturity level for ${domainName}.`,
    priorities: [
      "Priority 1: Define key processes and responsibilities",
      "Priority 2: Implement basic controls and documentation",
      "Priority 3: Establish regular reviews and assessments",
      "Priority 4: Develop metrics and reporting",
      "Priority 5: Create training and awareness programs",
    ],
    templates: [
      "Basic Assessment Template",
      "Process Documentation Guide",
      "Roles and Responsibilities Matrix",
      "Implementation Checklist",
    ],
    quickWins: [
      "Document current processes and identify gaps",
      "Assign clear ownership for key responsibilities",
      "Implement basic monitoring and reporting",
      "Conduct a training session for key stakeholders",
    ],
    relatedLinks: [
      { text: `View ${domainName} Overview`, href: `/playbook/domains/${domainId}` },
      { text: "Jump to Roadmap", href: "/playbook/roadmap" },
      { text: `Download ${bandName} Toolkit`, href: "#" },
    ],
  }
}
