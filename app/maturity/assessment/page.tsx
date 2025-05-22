"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { domains, dimensions, type AssessmentResult } from "@/lib/assessment-data"
import { saveAssessmentResults } from "@/lib/assessment-utils"
import { AssessmentTracker } from "@/components/assessment-tracker"
import { LevelDescriptionDialog } from "@/components/level-description-dialog"

const MaturityAssessmentPage = () => {
  const router = useRouter()
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0)
  const [results, setResults] = useState<AssessmentResult>({})
  const [showLevelInfo, setShowLevelInfo] = useState(false)
  const [currentInfoDimension, setCurrentInfoDimension] = useState("")

  // Initialize results structure if empty
  if (Object.keys(results).length === 0) {
    const initialResults: AssessmentResult = {}
    domains.forEach((domain) => {
      initialResults[domain.id] = {
        people: 0,
        process: 0,
        tooling: 0,
        data: 0,
        improvement: 0,
      }
    })
    setResults(initialResults)
  }

  const currentDomain = domains[currentDomainIndex]

  const handleSliderChange = (dimension: string, value: number[]) => {
    setResults((prev) => ({
      ...prev,
      [currentDomain.id]: {
        ...prev[currentDomain.id],
        [dimension]: value[0],
      },
    }))
  }

  const handleNext = () => {
    if (currentDomainIndex < domains.length - 1) {
      setCurrentDomainIndex(currentDomainIndex + 1)
    } else {
      // Save results and navigate to results page
      saveAssessmentResults(results)
      router.push("/maturity/results")
    }
  }

  const handlePrevious = () => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex(currentDomainIndex - 1)
    }
  }

  const handleShowLevelInfo = (dimension: string) => {
    setCurrentInfoDimension(dimension)
    setShowLevelInfo(true)
  }

  const isLastDomain = currentDomainIndex === domains.length - 1
  const isFirstDomain = currentDomainIndex === 0

  return (
    <AssessmentTracker action="start_assessment" domainId="all">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Legal IT Maturity Assessment</h1>

        <div className="mb-8">
          <p className="text-lg mb-4">Rate your organization's maturity in each dimension on a scale of 1-5:</p>
          <div className="grid grid-cols-5 gap-4 text-center text-sm mb-2">
            <div>1 - Initial</div>
            <div>2 - Developing</div>
            <div>3 - Established</div>
            <div>4 - Managed</div>
            <div>5 - Optimized</div>
          </div>
        </div>

        <Tabs value={currentDomain.id} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
            {domains.map((domain, index) => (
              <TabsTrigger
                key={domain.id}
                value={domain.id}
                onClick={() => setCurrentDomainIndex(index)}
                className={index === currentDomainIndex ? "bg-primary text-primary-foreground" : ""}
              >
                {domain.shortName || domain.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={currentDomain.id} className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{currentDomain.name}</CardTitle>
                <CardDescription>{currentDomain.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {Object.entries(dimensions).map(([key, dimension]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{dimension.name}</h3>
                      <Button variant="ghost" size="sm" onClick={() => handleShowLevelInfo(key)} className="text-xs">
                        View Level Descriptions
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{dimension.description}</p>
                    <Slider
                      value={[results[currentDomain.id]?.[key as keyof (typeof results)[string]] || 0]}
                      min={0}
                      max={5}
                      step={1}
                      onValueChange={(value) => handleSliderChange(key, value)}
                      className="py-4"
                    />
                    <div className="grid grid-cols-6 gap-4 text-center text-xs">
                      <div>N/A</div>
                      <div>Initial</div>
                      <div>Developing</div>
                      <div>Established</div>
                      <div>Managed</div>
                      <div>Optimized</div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handlePrevious} disabled={isFirstDomain} variant="outline">
                  Previous Domain
                </Button>
                <Button onClick={handleNext}>{isLastDomain ? "Complete Assessment" : "Next Domain"}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {showLevelInfo && (
          <LevelDescriptionDialog
            dimension={currentInfoDimension}
            isOpen={showLevelInfo}
            onClose={() => setShowLevelInfo(false)}
          />
        )}
      </div>
    </AssessmentTracker>
  )
}

export default MaturityAssessmentPage
