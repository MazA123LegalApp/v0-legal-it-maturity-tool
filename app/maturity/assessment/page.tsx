"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home, RefreshCw, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type AssessmentResult, domains, getEmptyResults, dimensionDetails } from "@/lib/assessment-data"

export default function AssessmentPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(domains[0].id)
  const [activeLevels, setActiveLevels] = useState<Record<string, number | null>>({
    people: null,
    process: null,
    tooling: null,
    data: null,
    improvement: null,
  })
  const [results, setResults] = useState<AssessmentResult>(() => {
    // Try to load saved results from localStorage
    if (typeof window !== "undefined") {
      const savedResults = localStorage.getItem("assessmentResults")
      if (savedResults) {
        try {
          return JSON.parse(savedResults)
        } catch (e) {
          console.error("Error parsing saved results:", e)
        }
      }
    }
    return getEmptyResults()
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleScoreChange = (domainId: string, dimension: string, value: number) => {
    setResults((prev) => {
      const newResults = {
        ...prev,
        [domainId]: {
          ...prev[domainId],
          [dimension]: value,
        },
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("assessmentResults", JSON.stringify(newResults))
      }

      return newResults
    })
  }

  const handleSaveAndContinue = async () => {
    try {
      setIsSaving(true)

      // Ensure results are saved to localStorage
      localStorage.setItem("assessmentResults", JSON.stringify(results))

      // Set a cookie to indicate assessment completion
      document.cookie = "assessment_completed=true; path=/; max-age=86400" // 24 hours

      // Wait a moment to ensure data is saved
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Navigate to results page
      router.push("/maturity/results")
    } catch (error) {
      console.error("Error saving assessment:", error)
      alert("There was an error saving your assessment. Please try again.")
      setIsSaving(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleResetAssessment = () => {
    if (confirm("Are you sure you want to reset your assessment? All your responses will be cleared.")) {
      const emptyResults = getEmptyResults()
      setResults(emptyResults)
      localStorage.setItem("assessmentResults", JSON.stringify(emptyResults))
      setActiveTab(domains[0].id)
    }
  }

  const toggleLevelDetails = (dimension: string, level: number | null) => {
    setActiveLevels((prev) => ({
      ...prev,
      [dimension]: prev[dimension] === level ? null : level,
    }))
  }

  const getNextTab = () => {
    const currentIndex = domains.findIndex((domain) => domain.id === activeTab)
    if (currentIndex < domains.length - 1) {
      return domains[currentIndex + 1].id
    }
    return null
  }

  const getPrevTab = () => {
    const currentIndex = domains.findIndex((domain) => domain.id === activeTab)
    if (currentIndex > 0) {
      return domains[currentIndex - 1].id
    }
    return null
  }

  const isLastTab = activeTab === domains[domains.length - 1].id
  const isFirstTab = activeTab === domains[0].id

  const getLevelButtonClass = (dimension: string, level: number) => {
    const isActive = activeLevels[dimension] === level
    const baseClasses = "px-3 py-1.5 text-sm font-medium rounded-md transition-colors"

    if (isActive) {
      return `${baseClasses} bg-primary text-primary-foreground`
    }

    return `${baseClasses} bg-muted hover:bg-muted/80`
  }

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">IT Maturity Assessment</h1>
          <p className="text-muted-foreground">Rate your organization's maturity across key domains and dimensions</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleResetAssessment} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset Assessment
          </Button>
          <Link href="/maturity">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Hub
            </Button>
          </Link>
          <Button onClick={handleSaveAndContinue} className="gap-2" disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save & View Results"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Progress: {domains.findIndex((domain) => domain.id === activeTab) + 1} of {domains.length}
          </p>
          <TabsList className="grid grid-cols-4 md:grid-cols-8">
            {domains.map((domain, index) => (
              <TabsTrigger key={domain.id} value={domain.id} className="text-xs md:text-sm">
                {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {domains.map((domain) => (
          <TabsContent key={domain.id} value={domain.id}>
            <Card>
              <CardHeader>
                <CardTitle>{domain.name}</CardTitle>
                <CardDescription>{domain.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* People Dimension */}
                <div>
                  <h3 className="text-lg font-medium mb-2">People & Organization</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rate the maturity of roles, responsibilities, skills, and organizational structure.
                  </p>

                  <div className="space-y-6">
                    <RadioGroup
                      value={results[domain.id].people.toString()}
                      onValueChange={(value) => handleScoreChange(domain.id, "people", Number.parseInt(value))}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id={`${domain.id}-people-1`} />
                        <Label htmlFor={`${domain.id}-people-1`} className="text-sm">
                          1 - Initial: Ad-hoc, undefined roles and responsibilities
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id={`${domain.id}-people-2`} />
                        <Label htmlFor={`${domain.id}-people-2`} className="text-sm">
                          2 - Managed: Basic roles defined but inconsistent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id={`${domain.id}-people-3`} />
                        <Label htmlFor={`${domain.id}-people-3`} className="text-sm">
                          3 - Defined: Clear roles and responsibilities documented
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id={`${domain.id}-people-4`} />
                        <Label htmlFor={`${domain.id}-people-4`} className="text-sm">
                          4 - Quantitatively Managed: Roles optimized with performance metrics
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id={`${domain.id}-people-5`} />
                        <Label htmlFor={`${domain.id}-people-5`} className="text-sm">
                          5 - Optimizing: Continuous improvement of organizational structure
                        </Label>
                      </div>
                    </RadioGroup>

                    <div>
                      <div className="text-sm font-medium mb-2">Maturity Level Details (click to view):</div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <button
                            key={level}
                            onClick={() => toggleLevelDetails("people", level)}
                            className={getLevelButtonClass("people", level)}
                            aria-pressed={activeLevels.people === level}
                          >
                            Level {level}
                          </button>
                        ))}
                      </div>

                      {activeLevels.people !== null && (
                        <div className="bg-muted/50 p-4 rounded-md mt-2">
                          <div className="font-medium">
                            Level {activeLevels.people}: {dimensionDetails.people.levels[activeLevels.people - 1].title}
                          </div>
                          <p className="text-muted-foreground my-2">
                            {dimensionDetails.people.levels[activeLevels.people - 1].description}
                          </p>
                          <div className="mt-2">
                            <div className="text-sm font-medium mb-1">What to look for:</div>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {dimensionDetails.people.levels[activeLevels.people - 1].examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Process Dimension */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Process</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rate the maturity of processes, procedures, and workflows.
                  </p>

                  <div className="space-y-6">
                    <RadioGroup
                      value={results[domain.id].process.toString()}
                      onValueChange={(value) => handleScoreChange(domain.id, "process", Number.parseInt(value))}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id={`${domain.id}-process-1`} />
                        <Label htmlFor={`${domain.id}-process-1`} className="text-sm">
                          1 - Initial: Ad-hoc, undocumented processes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id={`${domain.id}-process-2`} />
                        <Label htmlFor={`${domain.id}-process-2`} className="text-sm">
                          2 - Managed: Basic processes defined but inconsistent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id={`${domain.id}-process-3`} />
                        <Label htmlFor={`${domain.id}-process-3`} className="text-sm">
                          3 - Defined: Standardized processes documented and followed
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id={`${domain.id}-process-4`} />
                        <Label htmlFor={`${domain.id}-process-4`} className="text-sm">
                          4 - Quantitatively Managed: Processes measured and controlled
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id={`${domain.id}-process-5`} />
                        <Label htmlFor={`${domain.id}-process-5`} className="text-sm">
                          5 - Optimizing: Continuous process improvement
                        </Label>
                      </div>
                    </RadioGroup>

                    <div>
                      <div className="text-sm font-medium mb-2">Maturity Level Details (click to view):</div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <button
                            key={level}
                            onClick={() => toggleLevelDetails("process", level)}
                            className={getLevelButtonClass("process", level)}
                            aria-pressed={activeLevels.process === level}
                          >
                            Level {level}
                          </button>
                        ))}
                      </div>

                      {activeLevels.process !== null && (
                        <div className="bg-muted/50 p-4 rounded-md mt-2">
                          <div className="font-medium">
                            Level {activeLevels.process}:{" "}
                            {dimensionDetails.process.levels[activeLevels.process - 1].title}
                          </div>
                          <p className="text-muted-foreground my-2">
                            {dimensionDetails.process.levels[activeLevels.process - 1].description}
                          </p>
                          <div className="mt-2">
                            <div className="text-sm font-medium mb-1">What to look for:</div>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {dimensionDetails.process.levels[activeLevels.process - 1].examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tooling Dimension */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Tooling</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rate the maturity of tools, systems, and technology used.
                  </p>

                  <div className="space-y-6">
                    <RadioGroup
                      value={results[domain.id].tooling.toString()}
                      onValueChange={(value) => handleScoreChange(domain.id, "tooling", Number.parseInt(value))}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id={`${domain.id}-tooling-1`} />
                        <Label htmlFor={`${domain.id}-tooling-1`} className="text-sm">
                          1 - Initial: Basic or manual tools with limited functionality
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id={`${domain.id}-tooling-2`} />
                        <Label htmlFor={`${domain.id}-tooling-2`} className="text-sm">
                          2 - Managed: Tools in place but not integrated
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id={`${domain.id}-tooling-3`} />
                        <Label htmlFor={`${domain.id}-tooling-3`} className="text-sm">
                          3 - Defined: Standardized tools with some integration
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id={`${domain.id}-tooling-4`} />
                        <Label htmlFor={`${domain.id}-tooling-4`} className="text-sm">
                          4 - Quantitatively Managed: Integrated tools with analytics
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id={`${domain.id}-tooling-5`} />
                        <Label htmlFor={`${domain.id}-tooling-5`} className="text-sm">
                          5 - Optimizing: Advanced tools with automation and continuous improvement
                        </Label>
                      </div>
                    </RadioGroup>

                    <div>
                      <div className="text-sm font-medium mb-2">Maturity Level Details (click to view):</div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <button
                            key={level}
                            onClick={() => toggleLevelDetails("tooling", level)}
                            className={getLevelButtonClass("tooling", level)}
                            aria-pressed={activeLevels.tooling === level}
                          >
                            Level {level}
                          </button>
                        ))}
                      </div>

                      {activeLevels.tooling !== null && (
                        <div className="bg-muted/50 p-4 rounded-md mt-2">
                          <div className="font-medium">
                            Level {activeLevels.tooling}:{" "}
                            {dimensionDetails.tooling.levels[activeLevels.tooling - 1].title}
                          </div>
                          <p className="text-muted-foreground my-2">
                            {dimensionDetails.tooling.levels[activeLevels.tooling - 1].description}
                          </p>
                          <div className="mt-2">
                            <div className="text-sm font-medium mb-1">What to look for:</div>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {dimensionDetails.tooling.levels[activeLevels.tooling - 1].examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Data Dimension */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rate the maturity of data management, quality, and analytics.
                  </p>

                  <div className="space-y-6">
                    <RadioGroup
                      value={results[domain.id].data.toString()}
                      onValueChange={(value) => handleScoreChange(domain.id, "data", Number.parseInt(value))}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id={`${domain.id}-data-1`} />
                        <Label htmlFor={`${domain.id}-data-1`} className="text-sm">
                          1 - Initial: Ad-hoc data collection with no formal management
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id={`${domain.id}-data-2`} />
                        <Label htmlFor={`${domain.id}-data-2`} className="text-sm">
                          2 - Managed: Basic data management but inconsistent quality
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id={`${domain.id}-data-3`} />
                        <Label htmlFor={`${domain.id}-data-3`} className="text-sm">
                          3 - Defined: Standardized data management practices
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id={`${domain.id}-data-4`} />
                        <Label htmlFor={`${domain.id}-data-4`} className="text-sm">
                          4 - Quantitatively Managed: Data-driven decision making with analytics
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id={`${domain.id}-data-5`} />
                        <Label htmlFor={`${domain.id}-data-5`} className="text-sm">
                          5 - Optimizing: Advanced analytics with continuous data quality improvement
                        </Label>
                      </div>
                    </RadioGroup>

                    <div>
                      <div className="text-sm font-medium mb-2">Maturity Level Details (click to view):</div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <button
                            key={level}
                            onClick={() => toggleLevelDetails("data", level)}
                            className={getLevelButtonClass("data", level)}
                            aria-pressed={activeLevels.data === level}
                          >
                            Level {level}
                          </button>
                        ))}
                      </div>

                      {activeLevels.data !== null && (
                        <div className="bg-muted/50 p-4 rounded-md mt-2">
                          <div className="font-medium">
                            Level {activeLevels.data}: {dimensionDetails.data.levels[activeLevels.data - 1].title}
                          </div>
                          <p className="text-muted-foreground my-2">
                            {dimensionDetails.data.levels[activeLevels.data - 1].description}
                          </p>
                          <div className="mt-2">
                            <div className="text-sm font-medium mb-1">What to look for:</div>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {dimensionDetails.data.levels[activeLevels.data - 1].examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Improvement Dimension */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Continual Improvement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rate the maturity of improvement processes, feedback loops, and innovation.
                  </p>

                  <div className="space-y-6">
                    <RadioGroup
                      value={results[domain.id].improvement.toString()}
                      onValueChange={(value) => handleScoreChange(domain.id, "improvement", Number.parseInt(value))}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id={`${domain.id}-improvement-1`} />
                        <Label htmlFor={`${domain.id}-improvement-1`} className="text-sm">
                          1 - Initial: Reactive improvements with no formal process
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id={`${domain.id}-improvement-2`} />
                        <Label htmlFor={`${domain.id}-improvement-2`} className="text-sm">
                          2 - Managed: Basic improvement processes but inconsistent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id={`${domain.id}-improvement-3`} />
                        <Label htmlFor={`${domain.id}-improvement-3`} className="text-sm">
                          3 - Defined: Standardized improvement processes with feedback loops
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id={`${domain.id}-improvement-4`} />
                        <Label htmlFor={`${domain.id}-improvement-4`} className="text-sm">
                          4 - Quantitatively Managed: Measured improvement with metrics
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id={`${domain.id}-improvement-5`} />
                        <Label htmlFor={`${domain.id}-improvement-5`} className="text-sm">
                          5 - Optimizing: Culture of continuous improvement and innovation
                        </Label>
                      </div>
                    </RadioGroup>

                    <div>
                      <div className="text-sm font-medium mb-2">Maturity Level Details (click to view):</div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <button
                            key={level}
                            onClick={() => toggleLevelDetails("improvement", level)}
                            className={getLevelButtonClass("improvement", level)}
                            aria-pressed={activeLevels.improvement === level}
                          >
                            Level {level}
                          </button>
                        ))}
                      </div>

                      {activeLevels.improvement !== null && (
                        <div className="bg-muted/50 p-4 rounded-md mt-2">
                          <div className="font-medium">
                            Level {activeLevels.improvement}:{" "}
                            {dimensionDetails.improvement.levels[activeLevels.improvement - 1].title}
                          </div>
                          <p className="text-muted-foreground my-2">
                            {dimensionDetails.improvement.levels[activeLevels.improvement - 1].description}
                          </p>
                          <div className="mt-2">
                            <div className="text-sm font-medium mb-1">What to look for:</div>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {dimensionDetails.improvement.levels[activeLevels.improvement - 1].examples.map(
                                (example, i) => (
                                  <li key={i}>{example}</li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              {!isFirstTab ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    const prevTab = getPrevTab()
                    if (prevTab) setActiveTab(prevTab)
                  }}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous Domain
                </Button>
              ) : (
                <div></div>
              )}

              {!isLastTab ? (
                <Button
                  onClick={() => {
                    const nextTab = getNextTab()
                    if (nextTab) setActiveTab(nextTab)
                  }}
                  className="gap-2"
                >
                  Next Domain
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSaveAndContinue} className="gap-2" disabled={isSaving}>
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Complete & View Results"}
                </Button>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
