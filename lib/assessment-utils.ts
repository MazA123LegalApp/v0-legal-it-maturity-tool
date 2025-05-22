import type { AssessmentResult } from "./assessment-data"

export function saveAssessmentLocally(results: AssessmentResult): boolean {
  try {
    localStorage.setItem("maturityResults", JSON.stringify(results))
    return true
  } catch (e) {
    console.error("Failed to save results:", e)
    return false
  }
}

export function loadAssessmentLocally(): AssessmentResult | null {
  try {
    const data = localStorage.getItem("maturityResults")
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error("Failed to load results:", e)
    return null
  }
}
