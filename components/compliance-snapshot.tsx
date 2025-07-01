"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, Target, Info } from "lucide-react"
import { fetchControlMatrix, getControlStats, initializeDemoData, type ControlMatrixItem } from "@/lib/control-matrix"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ComplianceSnapshotProps {
  onViewMatrix?: (filter?: string) => void
}

export function ComplianceSnapshot({ onViewMatrix }: ComplianceSnapshotProps) {
  const [controlData, setControlData] = useState<ControlMatrixItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Initialize demo data for first-time users
        initializeDemoData()

        const data = await fetchControlMatrix()
        setControlData(data)
      } catch (error) {
        console.error("Error loading control data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Listen for status updates from other components
    const handleStatusUpdate = () => {
      loadData()
    }

    window.addEventListener("controlStatusUpdated", handleStatusUpdate)
    return () => window.removeEventListener("controlStatusUpdated", handleStatusUpdate)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Compliance Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const stats = getControlStats(controlData)

  return (
    <div className="space-y-4">
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onViewMatrix?.("not_started")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Compliance Snapshot
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowExplanation(!showExplanation)
              }}
            >
              <Info className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>Track your control implementation progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Ring */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${stats.completionRate >= 80 ? "text-green-500" : stats.completionRate >= 50 ? "text-yellow-500" : "text-red-500"}`}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${stats.completionRate}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold">{Math.round(stats.completionRate)}%</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">
                  {stats.completed} of {stats.total}
                </span>
                <span className="text-sm text-gray-600">actions complete</span>
              </div>
              <Progress value={stats.completionRate} className="h-2" />
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {stats.critical} Critical Gaps
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {stats.inProgress} In Progress
            </Badge>
            <Badge variant="default" className="flex items-center gap-1 bg-green-500">
              <CheckCircle className="h-3 w-3" />
              {stats.completed} Complete
            </Badge>
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={(e) => {
              e.stopPropagation()
              onViewMatrix?.("not_started")
            }}
          >
            View {stats.notStarted} Pending Actions
          </Button>
        </CardContent>
      </Card>

      {/* Explanation Alert */}
      {showExplanation && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p>
                <strong>How completion is calculated:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  <strong>Total Actions:</strong> {stats.total} controls from your Legal Playbook Control Matrix
                </li>
                <li>
                  <strong>Completed:</strong> {stats.completed} actions you've marked as "Complete"
                </li>
                <li>
                  <strong>In Progress:</strong> {stats.inProgress} actions currently being implemented
                </li>
                <li>
                  <strong>Not Started:</strong> {stats.notStarted} actions awaiting implementation
                </li>
                <li>
                  <strong>Critical Gaps:</strong> {stats.critical} high-priority actions not yet started
                </li>
              </ul>
              <p className="text-sm mt-2">
                💡 <strong>Tip:</strong> Click on individual controls in the Control Matrix to update their status and
                track your progress!
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
