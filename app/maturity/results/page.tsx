export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import ResultsClientPage from "./ResultsClientPage"

export const metadata: Metadata = {
  title: "Assessment Results | Legal IT Maturity Model",
  description: "View your Legal IT Maturity Assessment results and recommendations",
}

export default function MaturityResultsPage() {
  return <ResultsClientPage />
}
