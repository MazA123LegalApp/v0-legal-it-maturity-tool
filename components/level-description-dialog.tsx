"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { dimensionDetails, type Dimension, type LevelDescription } from "@/lib/assessment-data"

interface LevelDescriptionDialogProps {
  dimension?: string
  title?: string
  description?: string
  levels?: LevelDescription[]
  isOpen?: boolean
  onClose?: () => void
}

export function LevelDescriptionDialog({
  dimension,
  title,
  description,
  levels,
  isOpen,
  onClose,
}: LevelDescriptionDialogProps) {
  const [open, setOpen] = useState(false)

  // Handle controlled or uncontrolled state
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen)
    }
  }, [isOpen])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen && onClose) {
      onClose()
    }
  }

  // Get dimension details if dimension is provided
  const dimensionData = dimension ? dimensionDetails[dimension as Dimension] : null

  // Use provided props or fallback to dimension data
  const dialogTitle = title || (dimensionData ? dimensionData.name : "Maturity Level Descriptions")
  const dialogDescription = description || (dimensionData ? dimensionData.description : "")
  const levelData = levels || (dimensionData ? dimensionData.levels : [])

  // If no trigger is provided (controlled mode)
  if (isOpen !== undefined) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {levelData.map((level) => (
              <div key={level.level} className="space-y-2">
                <h3 className="text-lg font-medium">
                  Level {level.level}: {level.title} - {level.description}
                </h3>
                <div className="pl-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">What to look for:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {level.examples.map((example, index) => (
                      <li key={index} className="text-sm">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <DialogClose asChild>
            <Button className="mt-4">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
  }

  // Default uncontrolled mode with trigger
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <HelpCircle className="h-4 w-4" />
          <span className="sr-only">View maturity level descriptions</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {levelData.map((level) => (
            <div key={level.level} className="space-y-2">
              <h3 className="text-lg font-medium">
                Level {level.level}: {level.title} - {level.description}
              </h3>
              <div className="pl-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">What to look for:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {level.examples.map((example, index) => (
                    <li key={index} className="text-sm">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
