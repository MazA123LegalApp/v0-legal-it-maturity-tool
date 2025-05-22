"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { domains, dimensions, type AssessmentResult } from "@/lib/assessment-data"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"

const STORAGE_KEY = "maturityResults"

export default function MaturityAssessmentPage() {
  const router = useRouter()
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0)
  const [results, setResults] = useState<AssessmentResult>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLevelInfo, setShowLevelInfo] = useState(false)
  const [currentInfoDimension, setCurrentInfoDimension] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Initialize empty results structure
  useEffect(() => {
    const initial: AssessmentResult = {}
    domains.forEach((domain) => {
      initial[domain.id] = { people: 0, process: 0, tooling: 0, data: 0, improvement: 0 }
    })
    setResults(initial)
  }, [])

  const handleSliderChange = (dimension: string, value: number[]) => {
    const domainId = domains[currentDomainIndex].id
    setResults((prev) => ({
      ...prev,
      [domainId]: {
        ...prev[domainId],
        [dimension]: value[0],
      },
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
      router.push("/maturity/results")
    } catch (err) {
      console.error("Error saving to localStorage", err)
      setError("Failed to save your assessment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFirstDomain = currentDomainIndex === 0
  const isLastDomain = currentDomainIndex === domains.length - 1
  const currentDomain = domains[currentDomainIndex]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Maturity Assessment</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Tabs value={currentDomain?.id}>
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-6">
          {domains.map((domain, i) => (
            <TabsTrigger key={domain.id} value={domain.id} onClick={() => setCurrentDomainIndex(i)}>
              {domain.shortName || domain.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={currentDomain?.id}>
          <Card>
            <CardHeader>
              <CardTitle>{currentDomain?.name}</CardTitle>
              <CardDescription>{currentDomain?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {Object.entries(dimensions).map(([key, dim]) => (
                <div key={key} className="mb-6">
                  <div className="flex justify-between items-center">
                    <h4>{dim.name}</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setCurrentInfoDimension(key)
                        setShowLevelInfo(true)
                      }}
                    >
                      <HelpCircle className="w-4 h-4 mr-1" />
                      Levels
                    </Button>
                  </div>
                  <Slider
                    value={[results[currentDomain?.id]?.[key as keyof (typeof results)[string]] || 0]}
                    min={0}
                    max={5}
                    step={1}
                    onValueChange={(val) => handleSliderChange(key, val)}
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => setCurrentDomainIndex(currentDomainIndex - 1)} disabled={isFirstDomain}>
                Previous
              </Button>
              <Button
                onClick={isLastDomain ? handleSubmit : () => setCurrentDomainIndex(currentDomainIndex + 1)}
                disabled={isSubmitting}
              >
                {isLastDomain ? "Complete Assessment" : "Next"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showLevelInfo} onOpenChange={setShowLevelInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maturity Levels</DialogTitle>
            <DialogDescription>{dimensions[currentInfoDimension as keyof typeof dimensions]?.description}</DialogDescription>
          </DialogHeader>
          <ul className="mt-4 space-y-2 text-sm">
            <li><strong>1 - Initial:</strong> Ad hoc, undocumented.</li>
            <li><strong>2 - Developing:</strong> Basic structure.</li>
            <li><strong>3 - Established:</strong> Defined and consistent.</li>
            <li><strong>4 - Managed:</strong> Measured and controlled.</li>
            <li><strong>5 - Optimized:</strong> Proactive and improving.</li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  )
}
