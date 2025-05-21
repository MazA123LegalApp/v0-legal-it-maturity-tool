"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MaturityBannerProps {
  level: number
}

export function MaturityBanner({ level }: MaturityBannerProps) {
  const getMaturityLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Initial"
      case 2:
        return "Developing"
      case 3:
        return "Established"
      case 4:
        return "Managed"
      case 5:
        return "Optimized"
      default:
        return "Unknown"
    }
  }

  const getMaturityDescription = (level: number) => {
    switch (level) {
      case 1:
        return "Basic, reactive practices with minimal documentation"
      case 2:
        return "Developing processes with some standardization"
      case 3:
        return "Established, documented processes across the organization"
      case 4:
        return "Measured and controlled processes with quantitative management"
      case 5:
        return "Continuously improving processes focused on optimization"
      default:
        return ""
    }
  }

  const progress = (level / 5) * 100

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {getMaturityLabel(level)} Maturity (Level {level}/5)
            </h2>
            <p className="text-muted-foreground">{getMaturityDescription(level)}</p>
          </div>
          <div className="md:w-1/3">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Initial</span>
              <span>Optimized</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
