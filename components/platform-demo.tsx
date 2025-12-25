"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Target,
  FileText,
  Download,
  Users,
  Settings,
  Database,
  TrendingUp,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DemoStep {
  id: string
  title: string
  description: string
  component: React.ReactNode
  duration: number
}

export function PlatformDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [autoProgress, setAutoProgress] = useState(true)

  // Demo data
  const [demoScores, setDemoScores] = useState({
    cybersecurity: 0,
    riskCompliance: 0,
    knowledgeData: 0,
    serviceManagement: 0,
  })

  const demoSteps: DemoStep[] = [
    {
      id: "intro",
      title: "Welcome to Legal IT Maturity Assessment",
      description: "A comprehensive platform to evaluate and improve your legal technology maturity",
      component: (
        <div className="text-center space-y-6 py-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
            <BarChart3 className="h-10 w-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Legal IT Maturity Platform</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Evaluate your organization's IT maturity across key domains and get actionable recommendations
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>8 Key Domains</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>5 Maturity Levels</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Compliance Mapping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Action Roadmaps</span>
            </div>
          </div>
        </div>
      ),
      duration: 3000,
    },
    {
      id: "assessment-start",
      title: "Step 1: Take the Assessment",
      description: "Rate your organization across 5 dimensions for each domain",
      component: (
        <div className="space-y-4">
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg">Cybersecurity Domain</CardTitle>
              <CardDescription>Evaluate your cybersecurity maturity</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">People & Organization</h4>
                  <RadioGroup value="2" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="demo-1" />
                      <Label htmlFor="demo-1" className="text-sm">
                        1 - Initial: Ad-hoc roles
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded">
                      <RadioGroupItem value="2" id="demo-2" checked />
                      <Label htmlFor="demo-2" className="text-sm font-medium">
                        2 - Managed: Basic roles defined
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="demo-3" />
                      <Label htmlFor="demo-3" className="text-sm">
                        3 - Defined: Clear documentation
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="text-center">
                  <Badge variant="outline">4 more dimensions to complete...</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
      duration: 4000,
    },
    {
      id: "assessment-progress",
      title: "Assessment in Progress",
      description: "Completing evaluation across all domains",
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-blue-700 font-medium">Evaluating domains...</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { name: "Cybersecurity", status: "completed", score: 2.2 },
              { name: "Risk & Compliance", status: "completed", score: 1.8 },
              { name: "Knowledge & Data", status: "completed", score: 2.6 },
              { name: "Service Management", status: "current", score: 0 },
              { name: "Infrastructure", status: "pending", score: 0 },
              { name: "Change & Deployment", status: "pending", score: 0 },
            ].map((domain, index) => (
              <div key={domain.name} className="flex items-center gap-3 p-3 rounded-lg border">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    domain.status === "completed"
                      ? "bg-green-500"
                      : domain.status === "current"
                        ? "bg-blue-500 animate-pulse"
                        : "bg-gray-300",
                  )}
                />
                <span className="flex-1 font-medium">{domain.name}</span>
                {domain.status === "completed" && <Badge variant="outline">{domain.score.toFixed(1)}</Badge>}
                {domain.status === "current" && <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>}
              </div>
            ))}
          </div>
        </div>
      ),
      duration: 3000,
    },
    {
      id: "results-overview",
      title: "Step 2: View Your Results",
      description: "Comprehensive analysis of your maturity levels",
      component: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Maturity Assessment Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-700">2.1</div>
                  <div className="text-sm text-orange-600">Overall Score</div>
                  <Badge className="mt-1 bg-orange-100 text-orange-800">Managed</Badge>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">3</div>
                  <div className="text-sm text-red-600">Domains Need Attention</div>
                  <Badge className="mt-1 bg-red-100 text-red-800">Action Required</Badge>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Knowledge & Data", score: 2.6, level: "Managed", color: "green" },
                  { name: "Cybersecurity", score: 2.2, level: "Managed", color: "yellow" },
                  { name: "Risk & Compliance", score: 1.8, level: "Developing", color: "red" },
                  { name: "Service Management", score: 1.5, level: "Developing", color: "red" },
                ].map((domain) => (
                  <div key={domain.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{domain.name}</span>
                        <span className="text-sm font-bold">{domain.score}</span>
                      </div>
                      <Progress value={(domain.score / 5) * 100} className="h-2" />
                    </div>
                    <Badge
                      className={cn(
                        "text-xs",
                        domain.color === "green"
                          ? "bg-green-100 text-green-800"
                          : domain.color === "yellow"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800",
                      )}
                    >
                      {domain.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
      duration: 4000,
    },
    {
      id: "compliance-snapshot",
      title: "Compliance Analysis",
      description: "See how your maturity maps to compliance frameworks",
      component: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Compliance Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-700">67%</div>
                  <div className="text-xs text-blue-600">NIST CSF</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-700">72%</div>
                  <div className="text-xs text-green-600">ISO 27001</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-700">58%</div>
                  <div className="text-xs text-purple-600">EO 14028</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Controls Implemented</span>
                  <span className="font-medium">124 / 187</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Critical Gaps</span>
                  <span className="font-medium text-red-600">23 actions</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Quick Wins Available</span>
                  <span className="font-medium text-green-600">8 actions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
      duration: 3000,
    },
    {
      id: "next-steps",
      title: "Step 3: Get Your Action Plan",
      description: "Prioritized roadmap with specific actions to improve",
      component: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Next Steps Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-lg font-bold">8</div>
                  <div className="text-xs text-gray-600">Quick Wins</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-1" />
                  <div className="text-lg font-bold">23</div>
                  <div className="text-xs text-gray-600">Critical Actions</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-bold">67</div>
                  <div className="text-xs text-gray-600">Total Actions</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 border-l-4 border-l-yellow-400 bg-yellow-50 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      RC-001
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Quick Win</Badge>
                  </div>
                  <div className="font-medium text-sm">Implement password policy documentation</div>
                  <div className="text-xs text-gray-600 mt-1">High impact, low effort • Risk & Compliance</div>
                </div>

                <div className="p-3 border-l-4 border-l-red-500 bg-red-50 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      CS-012
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 text-xs">Critical</Badge>
                  </div>
                  <div className="font-medium text-sm">Deploy endpoint detection and response</div>
                  <div className="text-xs text-gray-600 mt-1">Security priority • Cybersecurity</div>
                </div>

                <div className="text-center pt-2">
                  <Badge variant="outline">+ 65 more actions in your roadmap</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
      duration: 4000,
    },
    {
      id: "export-options",
      title: "Step 4: Export & Implement",
      description: "Get your action plan in formats ready for your team",
      component: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Your Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-sm">Executive PDF</span>
                  </div>
                  <div className="text-xs text-gray-600">Quick wins summary for leadership</div>
                </div>

                <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm">CSV Export</span>
                  </div>
                  <div className="text-xs text-gray-600">Full data for analysis</div>
                </div>

                <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm">Jira Import</span>
                  </div>
                  <div className="text-xs text-gray-600">Project management ready</div>
                </div>

                <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-sm">ServiceNow</span>
                  </div>
                  <div className="text-xs text-gray-600">Change requests format</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium text-sm">Ready to implement!</span>
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Your personalized roadmap includes 67 actions mapped to NIST, ISO 27001, and Executive Order
                  requirements
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
      duration: 4000,
    },
    {
      id: "conclusion",
      title: "Transform Your Legal Technology",
      description: "From assessment to implementation in minutes",
      component: (
        <div className="text-center space-y-6 py-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Take your assessment now and get your personalized improvement roadmap
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Start Assessment
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              View Playbook
            </Button>
          </div>
          <div className="text-xs text-gray-500">✓ Free to use • ✓ No registration required • ✓ Export ready</div>
        </div>
      ),
      duration: 3000,
    },
  ]

  // Auto-progress logic
  useEffect(() => {
    if (!isPlaying || !autoProgress) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (demoSteps[currentStep].duration / 100)
        if (newProgress >= 100) {
          if (currentStep < demoSteps.length - 1) {
            setCurrentStep(currentStep + 1)
            return 0
          } else {
            setIsPlaying(false)
            return 100
          }
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(timer)
  }, [isPlaying, currentStep, autoProgress])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(false)
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setProgress(0)
    setAutoProgress(false)
    setIsPlaying(false)
  }

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Platform Demo
            </CardTitle>
            <CardDescription>See how the Legal IT Maturity Platform works in action</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handlePlay} size="sm" className="gap-2">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{demoSteps[currentStep].title}</span>
            <span className="text-muted-foreground">
              {currentStep + 1} of {demoSteps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">{demoSteps[currentStep].description}</p>
        </div>

        {/* Step indicators */}
        <div className="flex flex-wrap gap-2">
          {demoSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                index === currentStep
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : index < currentStep
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200",
              )}
            >
              {index + 1}. {step.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Demo content */}
        <div className="min-h-[400px] border rounded-lg p-6 bg-gradient-to-br from-gray-50 to-white">
          {demoSteps[currentStep].component}
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="gap-2 bg-transparent"
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoProgress}
                onChange={(e) => setAutoProgress(e.target.checked)}
                className="rounded"
              />
              Auto-advance
            </label>
          </div>

          <Button onClick={handleNext} disabled={currentStep === demoSteps.length - 1} className="gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
