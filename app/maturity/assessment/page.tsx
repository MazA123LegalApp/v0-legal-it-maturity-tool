"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { domains, dimensions, type AssessmentResult } from "@/lib/assessment-data"

const STORAGE_KEY = "maturityResults"

export default function MaturityAssessmentPage() {
  const router = useRouter()
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0)
  const [results, setResults] = useState<AssessmentResult>({})
  const [showLevelInfo, setShowLevelInfo] = useState(false)
  const [currentInfoDimension, setCurrentInfoDimension] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentDomain = domains[currentDomainIndex]

  useEffect(() => {
    const init: AssessmentResult = {}
    domains.forEach((d) => {
      init[d.id] = { people: 0, process: 0, tooling: 0, data: 0, improvement: 0 }
    })
    setResults(init)
  }, [])

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
      try {
        setIsSubmitting(true)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
        router.push("/maturity/results")
      } catch (err) {
        console.error(err)
        setError("Unable to save assessment.")
        setIsSubmitting(false)
      }
    }
  }

  const handlePrevious = () => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex((i) => i - 1)
    }
  }

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
          <div className="space-y-4 mt-4 text-sm">
            <div><strong>1 - Initial:</strong> Ad hoc, undocumented</div>
            <div><strong>2 - Developing:</strong> Some structure exists</div>
            <div><strong>3 - Established:</strong> Consistent and defined</div>
            <div><strong>4 - Managed:</strong> Measured and optimized</div>
            <div><strong>5 - Optimized:</strong> Proactive and refined</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Maturity Assessment</h1>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <Tabs value={currentDomain.id} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-6">
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
                      onClick={() => {
                        setCurrentInfoDimension(key)
                        setShowLevelInfo(true)
                      }}
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
                    onValueChange={(val) => handleSliderChange(key, val)}
                    className="py-4"
                  />
                  <div className="grid grid-cols-6 text-xs text-center text-muted-foreground">
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
              <Button onClick={handlePrevious} disabled={currentDomainIndex === 0} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNext} disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : currentDomainIndex === domains.length - 1
                  ? "Complete Assessment"
                  : "Next Domain"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <LevelDescriptions />
    </div>
  )
}
