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
