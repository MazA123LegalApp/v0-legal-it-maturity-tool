"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { domains, dimensions, type AssessmentResult } from "@/lib/assessment-data"
import { HelpCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const MaturityAssessmentPage = () => {
  const router = useRouter()
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0)
  const [results, setResults] = useState<AssessmentResult>({})
  const [showLevelInfo, setShowLevelInfo] = useState(false)
  const [currentInfoDimension, setCurrentInfoDimension] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize results structure once
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

  const currentDomain = domains[currentDomainIndex] || domains[0]

  const handleSliderChange = (dimension: string, value: number[]) => {
    if (!currentDomain) return

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
      setIsSubmitting(true)
      setError(null)

      try {
        // Validate that we have actual scores before saving
        const hasValidScores = Object.values(results).some(
          (domainResult) => domainResult && Object.values(domainResult).some((score) => score > 0),
        )

        if (!hasValidScores) {
          throw new Error("Please complete at least one domain assessment before submitting")
        }

        // Save assessment results with timestamp
        const assessmentData = {
          results,
          timestamp: new Date().toISOString(),
          completedDomains: domains.length,
        }

        localStorage.setItem("assessment_results", JSON.stringify(results))
        localStorage.setItem("assessment_metadata", JSON.stringify(assessmentData))

        // Track completion
        if (typeof window !== "undefined" && window.gtag) {
          try {
            window.gtag("event", "complete_assessment", {
              event_category: "Assessment",
              event_label: "All Domains",
            })
          } catch (trackingError) {
            console.error("Error tracking assessment completion:", trackingError)
          }
        }

        // Navigate to results page after a short delay
        setTimeout(() => {
          router.push("/maturity/results")
        }, 100)
      } catch (error) {
        console.error("Error submitting assessment:", error)
        setError(
          error instanceof Error ? error.message : "An error occurred while saving your assessment. Please try again.",
        )
        setIsSubmitting(false)
      }
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

  // Simple level descriptions dialog
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
            <div>
              <h3 className="font-bold">1 - Initial</h3>
              <p className="text-sm">Ad-hoc processes, limited documentation, reactive approach.</p>
            </div>
            <div>
              <h3 className="font-bold">2 - Developing</h3>
              <p className="text-sm">Basic processes defined, some documentation, still largely reactive.</p>
            </div>
            <div>
              <h3 className="font-bold">3 - Established</h3>
              <p className="text-sm">Standardized processes, good documentation, proactive elements.</p>
            </div>
            <div>
              <h3 className="font-bold">4 - Managed</h3>
              <p className="text-sm">
                Measured and controlled processes, comprehensive documentation, mostly proactive.
              </p>
            </div>
            <div>
              <h3 className="font-bold">5 - Optimized</h3>
              <p className="text-sm">Continuous improvement, complete documentation, fully proactive approach.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Maturity Assessment</h1>
      <p>This page will contain the maturity assessment tool.</p>
      {/* Add your assessment components here */}

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

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <Tabs value={currentDomain?.id} className="w-full">
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

        <TabsContent value={currentDomain?.id} className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>{currentDomain?.name}</CardTitle>
              <CardDescription>{currentDomain?.description}</CardDescription>
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
                    value={[results[currentDomain?.id]?.[key as keyof (typeof results)[string]] || 0]}
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

      {/* Simple inline level descriptions dialog */}
      <LevelDescriptions />
    </div>
  )
}

export default MaturityAssessmentPage
