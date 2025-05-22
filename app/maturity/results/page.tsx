import type { Metadata } from "next"
import { unstable_noStore as noStore } from "next/cache"
import ResultsClientPage from "./ResultsClientPage"

export const metadata: Metadata = {
  title: "Assessment Results | Legal IT Maturity Model",
  description: "View your Legal IT Maturity Assessment results and recommendations",
}

export default function MaturityResultsPage() {
  // Prevent this page from being statically generated
  noStore()

  return <ResultsClientPage />
}
