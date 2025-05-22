import { unstable_noStore as noStore } from "next/cache"
import ResultsClientPage from "./ResultsClientPage"

export default function ResultsPage() {
  // Prevent static generation of this page
  noStore()

  return <ResultsClientPage />
}
