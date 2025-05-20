"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import type { LevelDescription } from "@/lib/assessment-data"

interface LevelDescriptionDialogProps {
  title: string
  description: string
  levels: LevelDescription[]
}

export function LevelDescriptionDialog({ title, description, levels }: LevelDescriptionDialogProps) {
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
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {levels.map((level) => (
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
