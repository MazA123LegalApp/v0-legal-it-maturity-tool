"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { domains, dimensions, type AssessmentResult } from "@/lib/assessment-data"
import { HelpCircle } from "lucide-react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"

const STORAGE_KEY = "assessment_results"

const MaturityAssessmentPage = () => {
  const router = useRouter()
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0)
  const [results, setResults] = useState<AssessmentResult>({})
  const [showLevelInfo, setShowLevelInfo] = useState(false)
  const [currentInfoDimension, setCurrentInfoDimension] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialized && Object.keys(results).length === 0) {
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
      setInitialized(true)
    }
  }, [initialized, results])

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
    setCurrentDomainIndex((i) => i + 1)
  } else {
    setIsSubmitting(true)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results))

      // ✅ Track event using GTM/Google Analytics
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "complete_assessment",
          module: "Legal IT Maturity Assessment"
        })
      }

      router.push("/maturity/results")
    } catch (err) {
      console.error("Error saving assessment:", err)
      setError("An error occurred while saving your assessment. Please try again.")
      setIsSubmitting(false)
    }
  }
}


  const handlePrevious = () => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex((i) => i - 1)
    }
  }

  const handleShowLevelInfo = (dimension: string) => {
    setCurrentInfoDimension(dimension)
    setShowLevelInfo(true)
  }

  const isLastDomain = currentDomainIndex === domains.length - 1
  const isFirstDomain = currentDomainIndex === 0

  const LevelDescriptions = () => {
    const dimension = dimensions[currentInfoDimension as keyof typeof dimensions]
    if (!dimension) return null

    return (
      <Dialog open={showLevelInfo} onOpenChange={setShowLevelInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dimension.name} - Maturity Levels</DialogTitle>
            <DialogDescription>{dimension.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div><strong>1 - Initial</strong>: Ad-hoc, undocumented</div>
            <div><strong>2 - Developing</strong>: Basic, inconsistent</div>
            <div><strong>3 - Established</strong>: Standardised, consistent</div>
            <div><strong>4 - Managed</strong>: Measured and controlled</div>
            <div><strong>5 - Optimised</strong>: Continuously improved</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Maturity Assessment</h1>
      <p className="mb-6 text-muted-foreground">
        Rate your organisation’s maturity in each dimension using the sliders.
      </p>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <Tabs value={currentDomain.id}>
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

        <TabsContent value={currentDomain.id}>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShowLevelInfo(key)}
                      className="text-xs flex items-center gap-1"
                    >
                      <HelpCircle className="h-3 w-3" />
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
              <Button onClick={handleNext} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : isLastDomain ? "Complete Assessment" : "Next Domain"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <LevelDescriptions />
    </div>
  )
}

export default MaturityAssessmentPage
