"use client"

import { Button } from "@/components/ui/button"
import { ExportReportButton } from "@/components/export-report-button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ResultsActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <ExportReportButton />

      <Link href="/playbook">
        <Button className="w-full sm:w-auto">
          View Implementation Guides
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
