import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getMaturityColor, getMaturityBgColor } from "@/lib/assessment-data"
import { type DomainMaturityInfo, getRecommendedRoadmapPhase } from "@/lib/assessment-utils"

interface MaturityBannerProps {
  domainId: string
  domainName: string
  maturityInfo: DomainMaturityInfo
}

export function MaturityBanner({ domainId, domainName, maturityInfo }: MaturityBannerProps) {
  if (!maturityInfo.hasCompleted) {
    return (
      <div className="mb-8 p-6 border border-dashed border-slate-300 rounded-lg bg-slate-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-slate-800 mb-1">Complete your assessment</h3>
            <p className="text-slate-600">
              Take the maturity assessment to receive personalized recommendations for {domainName}.
            </p>
          </div>
          <Link href="/maturity/assessment">
            <Button className="whitespace-nowrap">Start Assessment</Button>
          </Link>
        </div>
      </div>
    )
  }

  const phase = getRecommendedRoadmapPhase(maturityInfo.level)
  const roadmapLink = `/playbook/domains/${domainId}/roadmap#phase-${phase}`

  return (
    <div className={`mb-8 p-6 rounded-lg ${getMaturityBgColor(maturityInfo.score)}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <Compass className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-slate-800">Your {domainName} Maturity:</h3>
              <span className={`font-bold ${getMaturityColor(maturityInfo.score)}`}>
                {maturityInfo.level} ({maturityInfo.score.toFixed(1)})
              </span>
            </div>
            <p className="text-slate-600">
              Based on your assessment, we recommend starting with Phase {phase} of the roadmap.
            </p>
          </div>
        </div>
        <Link href={roadmapLink}>
          <Button className="whitespace-nowrap gap-2">
            Recommended Next Steps
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
