"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const maturityLevels = ["Initial", "Developing", "Established", "Managed", "Optimized"]

const IncidentProblemPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {maturityLevels.map((level) => (
          <Card key={level}>
            <CardHeader>
              <CardTitle>Incident & Problem Management - {level}</CardTitle>
              <CardDescription>Guidance for achieving {level} maturity.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Key Activities</h3>
                    <p>Description of key activities for {level} maturity in Incident & Problem Management.</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Activity 1</li>
                      <li>Activity 2</li>
                      <li>Activity 3</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold">Key Performance Indicators (KPIs)</h3>
                    <p>Description of KPIs for {level} maturity in Incident & Problem Management.</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>KPI 1</li>
                      <li>KPI 2</li>
                      <li>KPI 3</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold">Key Roles & Responsibilities</h3>
                    <p>
                      Description of roles and responsibilities for {level}
                      maturity in Incident & Problem Management.
                    </p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Role 1</li>
                      <li>Role 2</li>
                      <li>Role 3</li>
                    </ul>
                  </div>
                </div>
              </ScrollArea>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                  <FileText className="h-3 w-3" />
                  View {level} Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default IncidentProblemPage
